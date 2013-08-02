using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Text;
using System.IO;
using System.IO.Compression;
using System.Web.UI.HtmlControls;

using CN100.HttpCombiner.Model;
using CN100.HttpCombiner.Common;
using CN100.Public.Common;
using CN100.HttpCombiner.Enum;

using Microsoft.Ajax.Utilities;


namespace CN100.HttpCombiner.Web
{
    public class HttpCombinerHandle : IHttpHandler
    {

        private const bool DO_GZIP = true;

        private static TimeSpan CACHE_DURATION
        {
            get {
               string strCacheDuration= AppConfigHelper.GetConfigValue(Constnatmanager.Config.CacheDurationName);
               return TimeSpan.FromHours(int.Parse(strCacheDuration));
            }
        }

        private static bool IsAppendCacheExtension
        {
            get
            {
                string strIsAppendCacheExtension = AppConfigHelper.GetConfigValue(Constnatmanager.Config.IsAppendCacheExtension);
                return strIsAppendCacheExtension == "1";
            }
        }

        private bool IsCached(HttpRequest request,string tag)
        {
            bool isCached = false;

            if (request.Headers["If-None-Match"] != null)
            {
                string eTag = request.Headers["If-None-Match"].ToString();
                if (eTag == tag)
                {
                    isCached = true;
                }
            }

            return isCached;
        }

        private void WriteCacheStatus(HttpResponse response,CombinerModel model,string eTag)
        {

            SetResponse(response, model, eTag);
            response.StatusCode = 304;
            response.Flush();
            response.End();
        }

        public void ProcessRequest(HttpContext context)
        {
            HttpRequest request = context.Request;
            string configName = request["s"] ?? string.Empty;
            string version = request["v"] ?? string.Empty;
            CombinerModel model = GetConfigItem(configName, version);

            if (model == null)
            {
                throw new Exception(string.Format("config not found, config name is {0}, verssion is {1}", configName, version));
            }

            bool isCompressed = DO_GZIP && this.CanGZip(context.Request) && !model.IsDebug;
            string cacheID = SystemConfigOperation.GetCacheKey(configName, version, model.IsCache);
            string rootPath = context.Server.MapPath(".");
            byte[] bytes = DataProcess(context, rootPath, model, isCompressed, cacheID);
            this.ResponseOperation(context.Response, bytes, model, isCompressed);
        }

        private string GetETag(byte[] bytes,string cacheID)
        {
            string cacheTag =string.Empty;

            if (CacheHelper.ReadData(cacheID) != null)
            {
                cacheTag = CacheHelper.ReadData(cacheID).ToString();
            }

            if (string.IsNullOrEmpty(cacheTag))
            {
                string strContent = Encoding.UTF8.GetString(bytes, 0, bytes.Length);
               cacheTag = System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(strContent, "MD5");
               CacheHelper.WriteData(cacheID, cacheTag, CACHE_DURATION);
            }

            return cacheTag;
        }

        /// <summary>
        /// 1, file process
        /// 2. write cache
        /// </summary>
        /// <param name="context"></param>
        /// <param name="rootPath"></param>
        /// <param name="model"></param>
        /// <param name="isCompressed"></param>
        /// <param name="cacheID"></param>
        /// <returns></returns>
        private byte[] DataProcess(HttpContext context, string rootPath, CombinerModel model,bool isCompressed, string cacheID)
        {
            byte[] bytes = readCache(cacheID);

            if (bytes == null || bytes.Length == 0)
            {
                CacheHelper.Remove(model.GUID);
                bytes = FilesProcess(rootPath, model, isCompressed, model.IsDebug);

                if (model.IsCache)
                {
                    CacheHelper.WriteData(cacheID, bytes, CACHE_DURATION);
                }
            }
            else
            {
                string eTag = GetETag(bytes, model.GUID);

                if (IsCached(context.Request, eTag))
                {
                    WriteCacheStatus(context.Response, model, eTag);
                }
                return bytes;
            }

            return bytes;
        }

        /// <summary>
        /// file process, include gzip and minify function
        /// </summary>
        /// <param name="rootPath"></param>
        /// <param name="model"></param>
        /// <param name="isCompressed"></param>
        /// <param name="isDebug"></param>
        /// <returns></returns>
        private byte[] FilesProcess(string rootPath, CombinerModel model, bool isCompressed, bool isDebug)
        {
            string[] fileNames = model.Items.Select(i => i.Name).ToArray();
            string[] arrContent =new  string[fileNames.Length];
            ContentType contentType = model.ContentType;
            int index=0;

            foreach (string fileName in fileNames)
            {
                string name = fileName.Trim();
                string strContent = this.ReadFileContent(rootPath, name);

                if (contentType == ContentType.javascript && strContent.LastIndexOf(";")+1!=strContent.Length) 
                {
                    strContent += ";";
                }

                arrContent[index]=strContent;
                index++;
            }

            string content = string.Join("", arrContent);
            byte[] bytes = Encoding.UTF8.GetBytes(content);

            if (!isDebug && model.IsMinify)
            {
                StringBuilder contentBuilder = new StringBuilder();

                for (int i = 0; i < arrContent.Length; i++)
                {
                    contentBuilder.Append(HttpHelper.MinifiContentToString(arrContent[i], model.ContentType));
                }

                bytes = Encoding.UTF8.GetBytes(contentBuilder.ToString());
            }

            if (isCompressed)
            {
                bytes = CompressBytes(bytes);
            }

            return bytes;
        }

        private byte[] CompressBytes(byte[] bytes)
        {
            using (MemoryStream memoryStream = new MemoryStream(5000))
            {
                using (Stream write = (Stream)(new GZipStream(memoryStream, CompressionMode.Compress)))
                {
                    write.Write(bytes, 0, bytes.Length);
                }

                bytes = memoryStream.ToArray();
            }
            return bytes;
        }

        private byte[] MinifyResourceContent(string content, ContentType contentType)
        {
            if (contentType != ContentType.defualt)
            {
                return HttpHelper.MinifyContent(content, contentType);
            }

            return null;
        }

        

        public string ReadFileContent(string physicalPath, string virtualPath)
        {
            try
            {
                return HttpHelper.ReadContent(physicalPath, virtualPath);
            }
            catch (Exception ex)
            {
                throw new Exception(string.Format("url : {0},   ******  {1}", virtualPath, ex.StackTrace));
            }
        }

        private void SetResponse(HttpResponse response, CombinerModel model,string eTag)
        {
            DateTime expireTime = ConvertToDatetime(model.Expires);
            response.ContentType = string.Format(Constnatmanager.Link.Type, model.ContentType.ToString());
            response.Cache.SetExpires(expireTime);
            response.Cache.SetMaxAge(new TimeSpan(expireTime.Ticks));
            response.Cache.SetCacheability(HttpCacheability.Public);
            response.Cache.SetLastModified(model.CreateDate);
            response.Cache.SetETag(eTag);

            if (IsAppendCacheExtension)
            {
                response.Cache.AppendCacheExtension("must-revalidate, proxy-revalidate");
            }
        }

        private void ResponseOperation(HttpResponse response, byte[] bytes, CombinerModel model, bool isCompressed)
        {
            response.AppendHeader("Content-Length", bytes.Length.ToString());
            
            if (isCompressed)
            {
                response.AppendHeader("Content-Encoding", "gzip");
            }

            string eTag = GetETag(bytes, model.GUID);
            SetResponse(response,model, eTag);
            response.OutputStream.Write(bytes, 0, bytes.Length);
            response.Flush();
        }

        private byte[] readCache(string cacheID)
        {
            return CacheHelper.ReadData(cacheID) as byte[];
        }

        private DateTime ConvertToDatetime(string expires)
        {
            string unit = expires.Substring(expires.Length - 1);
            string strDate = expires.Replace(unit, "");
            int intDate = int.Parse(strDate);
            DateTime expireTime = new DateTime();

            switch (unit)
            {
                case "M":
                    expireTime = DateTime.Now.AddMonths(intDate);
                    break;
                case "d":
                    expireTime = DateTime.Now.AddDays(intDate);
                    break;
                case "h":
                    expireTime = DateTime.Now.AddHours(intDate);
                    break;
                case "m":
                    expireTime = DateTime.Now.AddMinutes(intDate);
                    break;
            }

            return expireTime;
        }

        private int GetExpireSecond(DateTime expireTime)
        {
            TimeSpan spanToday = new TimeSpan(DateTime.Now.Ticks);
            TimeSpan spanSub = new TimeSpan(expireTime.Ticks).Subtract(spanToday);
            return spanSub.Days * 24 * 60 * 60 + spanSub.Hours * 60 * 60 + spanSub.Minutes * 60;
        }

        private CombinerModel GetConfigItem(string name, string version)
        {
            string strFilePath = AppConfigHelper.GetConfigValue(Constnatmanager.Config.XmlConfigFilePath);

            if (!string.IsNullOrEmpty(strFilePath))
            {
                SystemConfigOperation operation = new SystemConfigOperation();
                return operation.GetConfigItem(strFilePath, name, version);
            }

            return null;
        }

        private bool CanGZip(HttpRequest request)
        {
            string acceptEncoding = request.Headers["Accept-Encoding"];
            bool isFlag = false;

            if (!string.IsNullOrEmpty(acceptEncoding) &&
                 (acceptEncoding.Contains("gzip") || acceptEncoding.Contains("deflate")))
            {
                isFlag = true;
            }

            return isFlag;
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}
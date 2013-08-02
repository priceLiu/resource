using System;
using System.Collections.Generic;
using System.IO;
using System.Web.Caching;
using System.Linq;

using CN100.HttpCombiner.Model;
using CN100.Public.Common;

namespace CN100.HttpCombiner.Common
{
    public class SystemConfigOperation
    {


        public bool SaveData(List<CombinerModel> list, string fileName)
        {
            try
            {
                string strFilePath = GetAbsolutPath(fileName);
                XMLHelper.SaveToXml(strFilePath, list);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public List<CombinerModel> ReadData(string fileName)
        {
            List<CombinerModel> list = new List<CombinerModel>();
            object obj = CacheHelper.ReadData(ConstMember.CONFIG_CACHE_ID);

            if (obj == null)
            {
                string strFilePath = GetAbsolutPath(fileName);

                try
                {
                    obj = XMLHelper.LoadFromXml(strFilePath, list.GetType());
                    CacheDependency dep = new CacheDependency(strFilePath);
                    CacheHelper.WriteData(ConstMember.CONFIG_CACHE_ID, dep, obj);
                }
                catch
                {
                }
            }

            if (obj != null && obj is List<CombinerModel>)
            {
                list = obj as List<CombinerModel>;
            }

            return list;
        }

        public CombinerModel GetConfigItem(string filePath, string name, string version)
        {
            SystemConfigOperation operation = new SystemConfigOperation();
            List<CombinerModel> list = operation.ReadData(filePath);
            return list.Where(l => l.Name == name && l.Version == version).FirstOrDefault<CombinerModel>();
        }

        public static string GetCacheKey(string configName, string version, bool isCompressed)
        {
            return string.Format("CN100.HttpCombiner.{0}.{1}.{2}", configName, version, isCompressed);
        }

        public static string GetAbsolutPath(string filePath)
        {
            string path = filePath;

            if (!String.IsNullOrEmpty(filePath))
            {
                if (!filePath.Contains(":"))
                {
                    try
                    {
                        path = System.Web.HttpContext.Current.Server.MapPath(filePath);
                    }
                    catch (Exception)
                    {
                        throw new FileNotFoundException(String.Format("File \"{0}\" not find in Server", filePath));
                    }
                }
            }

            return path;
        }
    }
}

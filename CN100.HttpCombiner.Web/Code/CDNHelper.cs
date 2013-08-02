using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CN100.CDNCacheManagement.BLL;
using CN100.HttpCombiner.Enum;

namespace CN100.HttpCombiner.Web
{
    public class CDNHelper
    {
        public static string ClearCDNCache(string path, string clearCDNType)
        {
            if (clearCDNType.Equals(ClearCDNType.Url.ToString()))
            {
                return ClearUrlCache(path);
            }
            else
            {
                return ClearDirCache(path);
            }
        }

        public static string ClearUrlCache(string path)
        {
            ChinaCacheManage manager = new ChinaCacheManage();
            string result = string.Empty;
            try
            {

                string[] urls = string.IsNullOrWhiteSpace(path) ? null : path.Split('|');

                ClearCacheResult clearCacheResult = manager.ClearUrlCache(urls);
                if (clearCacheResult.Result)
                {
                    result += string.Format("成功清除:url:{0};dir:{1};超过url:{2},超过dir:{3} \\r\\n",
                                            clearCacheResult.SuccessUrls, clearCacheResult.SuccessDirs,
                                            clearCacheResult.ExceedUrls, clearCacheResult.ExceedDirs);
                }
                else
                {
                    result += "清除失败";
                }



            }
            catch (Exception ex)
            {
                result = ex.Message;
            }

            return result;
        }


        public static string ClearDirCache(string path)
        {
            ChinaCacheManage manager = new ChinaCacheManage();
            string result = string.Empty;
            try
            {

                string[] dirList = string.IsNullOrWhiteSpace(path) ? null : path.Split('|');

                ClearCacheResult clearCacheResult = manager.ClearDirCache(dirList);
                if (clearCacheResult.Result)
                {
                    result = string.Format("成功清除:url:{0};dir:{1};超过url:{2},超过dir:{3}\\r\\n",
                                            clearCacheResult.SuccessUrls, clearCacheResult.SuccessDirs,
                                            clearCacheResult.ExceedUrls, clearCacheResult.ExceedDirs);
                }
                else
                {
                    result = "清除失败";
                }



            }
            catch (Exception ex)
            {
                result = ex.Message;
            }

            return result;
        }

    }
}
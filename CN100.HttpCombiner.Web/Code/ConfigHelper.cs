using CN100.HttpCombiner.Common;
using CN100.HttpCombiner.Model;
using CN100.Public.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CN100.HttpCombiner.Enum;

namespace CN100.HttpCombiner.Web
{
    public class ConfigHelper
    {
        public static List<CombinerModel> LoadXMLConfigItems(string configFilePath)
        {
            SystemConfigOperation systemComfigOperation = new SystemConfigOperation();
            string strFilePath = AppConfigHelper.GetConfigValue(configFilePath);

            List<CombinerModel> combinerList = systemComfigOperation.ReadData(strFilePath);
            return combinerList;
        }

        public static bool RemoveXMLItem(CombinerModel item, List<CombinerModel> combinerList)
        {
            return combinerList.Remove(item);
        }

        public static void RemoveCache(CombinerModel item)
        {
            string key = SystemConfigOperation.GetCacheKey(item.Name, item.Version, item.IsCache);
            CacheHelper.Remove(key);
        }

        public static CombinerModel GetConfigItem(string guid, List<CombinerModel> combinerList)
        {
            foreach (CombinerModel item in combinerList)
            {
                if (item.GUID.Equals(guid))
                {
                    return item;
                }
            }

            return null;
        }


        public static List<CombinerModel> AddXMLConfig(string name, string description, string expires, string iNames,
                                                       ContentType contentType, bool isCache, bool isMinify,
                                                        List<CombinerModel> combinerList, bool isDebug, string version)
        {

            //if (string.IsNullOrEmpty(version))
            //{
            //    version = DateTime.Now.ToString("yyyyMMddHHmmss");
            //}
            //string version = DateTime.Now.ToString("yyyyMMddHHmmss");

            string url = HttpContext.Current.Request.Url.Host;

            if (HttpContext.Current.Request.Url.Port != 80)
            {
                url = HttpContext.Current.Request.Url.DnsSafeHost;
            }
            string linkUrl = string.Format(Constnatmanager.Link.CSS, url, name, version);

            if (contentType == Enum.ContentType.javascript)
            {
                linkUrl = string.Format(Constnatmanager.Link.Javascript, url, name, version);
            }

            CombinerModel newCombiner = new CombinerModel()
            {
                GUID = Guid.NewGuid().ToString(),
                Name = name,
                Description = description,
                Version = version,
                IsCache = isCache,
                IsMinify = isMinify,
                CreateDate = DateTime.Now,
                ContentType = contentType,
                LinkUrl = linkUrl,
                Expires = expires,
                IsDebug = isDebug
            };

            List<string> itemsNames = string.IsNullOrWhiteSpace(iNames) ? null : iNames.Split('|').ToList();

            if (itemsNames != null)
            {
                List<Item> combinerItemList = new List<Item>();

                foreach (var item in itemsNames)
                {
                    Item combinerItem = new Item();
                    combinerItem.Name = item;
                    combinerItemList.Add(combinerItem);
                }

                newCombiner.Items = combinerItemList;
            }

            combinerList.Add(newCombiner);

            return combinerList;
        }

    }
}
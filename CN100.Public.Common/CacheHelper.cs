using System;
using System.Web;
using System.Web.Caching;
using System.Collections;
using System.Collections.Generic;

namespace CN100.Public.Common
{
    public class CacheHelper
    {
        public static void WriteData(string cacheID, object data)
        {
            WriteData(cacheID, null, data);
        }

        public static void WriteData(string cacheID, object data, TimeSpan spanExpire)
        {
            HttpRuntime.Cache.Insert(cacheID,
                    data, null, System.Web.Caching.Cache.NoAbsoluteExpiration,
                    spanExpire);
        }

        public static void WriteData(string cacheID, CacheDependency cacheDependency, object data)
        {
            HttpRuntime.Cache.Insert(
                           cacheID, data, cacheDependency, Cache.NoAbsoluteExpiration,
                           Cache.NoSlidingExpiration, CacheItemPriority.NotRemovable, null
                           );
        }

        public static object ReadData(string cacheID)
        {
            return HttpRuntime.Cache.Get(cacheID);
        }

        public static void Remove(string cacheID)
        {
            HttpRuntime.Cache.Remove(cacheID);
        }

        public static void RemoveAll()
        {
            IDictionaryEnumerator enumerator = HttpRuntime.Cache.GetEnumerator();

            while (enumerator.MoveNext())
            {
                HttpRuntime.Cache.Remove(enumerator.Key.ToString());
            }
        }

        public static List<CacheModel> ReadAll()
        {
            List<CacheModel> cacheList = new List<CacheModel>();

            Cache cache = HttpRuntime.Cache;

            if (cache.Count > 0)
            {
                IDictionaryEnumerator enumerator = cache.GetEnumerator();

                while (enumerator.MoveNext())
                {
                    CacheModel cacheItem = new CacheModel()
                    {
                        Key = enumerator.Key.ToString(),
                        Value = enumerator.Value.ToString()
                    };
                    cacheList.Add(cacheItem);
                }
            }

            return cacheList;
        }


    }

    [Serializable]
    public class CacheModel
    {
        public string Key { get; set; }

        public string Value { get; set; }
    }
}

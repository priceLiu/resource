using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using System.Collections.Specialized;

using CN100.HttpCombiner.Model;
using CN100.Public.Common;

namespace CN100.HttpCombiner.Web
{
    /// <summary>
    /// CacheManagerHandler 的摘要说明
    /// </summary>
    public class CacheManagerHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = Constnatmanager.CONTENT_TYPE;

            HttpRequest request = context.Request;
            OperatingType cmd = (OperatingType)System.Enum.Parse(typeof(OperatingType), request[Constnatmanager.Request.CMD]);

            string cacheID = context.Request.Form[Constnatmanager.Request.Form.CACHEID];

            switch (cmd)
            {
                case OperatingType.Remove:
                    CacheHelper.Remove(cacheID);
                    break;
                case OperatingType.RemoveAll:
                    CacheHelper.RemoveAll();
                    break;
                default:
                    break;
            }

           // context.Response.Write(JsonConvert.SerializeObject(result));
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
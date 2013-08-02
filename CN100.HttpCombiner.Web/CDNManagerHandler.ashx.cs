using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CN100.HttpCombiner.Model;
using Newtonsoft.Json;

namespace CN100.HttpCombiner.Web
{
    /// <summary>
    /// CDNManagerHandler 的摘要说明
    /// </summary>
    public class CDNManagerHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = Constnatmanager.CONTENT_TYPE;

            HttpRequest request = context.Request;

            string result = CDNHelper.ClearCDNCache(request[Constnatmanager.Request.Form.PATH], request[Constnatmanager.Request.Form.CLEARTYPE]);

            context.Response.Write(JsonConvert.SerializeObject(result));

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
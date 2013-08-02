using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using Newtonsoft.Json;
using CN100.Public.Common;

namespace CN100.HttpCombiner.Web
{
    /// <summary>
    /// LoginHandler 的摘要说明
    /// </summary>
    public class LoginHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string configName = ConfigurationManager.AppSettings[Constnatmanager.AppSetting.LOGINNAME];
            string configpsw = ConfigurationManager.AppSettings[Constnatmanager.AppSetting.PASSWORD];

            bool result = true;
            HttpRequest request = context.Request;
            string requestName = request[Constnatmanager.Request.Form.NAME];
            string requestPassword = request[Constnatmanager.Request.Form.PASSWORD];

            if (!configName.ToLower().Equals(requestName.ToLower()) || !configpsw.ToLower().Equals(requestPassword.ToLower()))
            {
                result = false;
            }
            else
            {
                CookieHelper.SetCookie("LoginName", requestName);
            }

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
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace CN100.Public.Common
{
    public class CookieHelper
    {
        public static void SetCookie(string name, string value, DateTime? expires = null)
        {
            SetCookie(name, value, null, null, expires);
        }

        public static void SetCookie(string name, string value, string domian, string cookiePath, DateTime? expires = null)
        {
            HttpContext.Current.Response.Cookies.Remove(name);
            value = HttpUtility.UrlEncode(value);
            HttpCookie cookie = new HttpCookie(name, value);

            if (!string.IsNullOrEmpty(domian))
            {
                cookie.Domain = domian;
            }

            if (!string.IsNullOrEmpty(cookiePath))
            {
                cookie.Path = cookiePath;
            }

            if (expires != null)
            {
                cookie.Expires = expires.Value;
            }
            HttpContext.Current.Response.Cookies.Add(cookie);
        }


        public static string GetCookieValueByName(string name)
        {
            string value = null;
            if (HttpContext.Current.Request.Cookies[name] != null)
            {
                value = HttpContext.Current.Request.Cookies[name].Value;
                value = HttpUtility.UrlDecode(value);
            }

            return value;
        }


        public static HttpCookie GetCookie(string name)
        {
            return HttpContext.Current.Request.Cookies[name];
        }

        public static void ClearCookie(string name)
        {
            ClearCookie(name, null, null);
        }

        public static void ClearCookie(string name, string domain, string cookiePath)
        {
            HttpCookie cookie = new HttpCookie(name);
            cookie.Expires = DateTime.Now.AddDays(-1);

            if (!string.IsNullOrEmpty(cookiePath))
            {
                cookie.Path = cookiePath;
            }

            if (!string.IsNullOrEmpty(domain))
            {
                cookie.Domain = domain;
            }
            HttpContext.Current.Response.Cookies.Add(cookie);
        }
    }
}

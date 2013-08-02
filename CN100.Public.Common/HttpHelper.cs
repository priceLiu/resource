
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.IO;
using Microsoft.Ajax.Utilities;
using System.Web;
using CN100.HttpCombiner.Enum;

namespace CN100.Public.Common
{
    public class HttpHelper
    {
        public static string ReadUrl(string url)
        {
            HttpWebRequest myHttpWebRequest = (HttpWebRequest)WebRequest.Create(url);
            HttpWebResponse myHttpWebResponse = (HttpWebResponse)myHttpWebRequest.GetResponse();
            Stream receiveStream = myHttpWebResponse.GetResponseStream();
            Encoding encode = System.Text.Encoding.GetEncoding("utf-8");
            StreamReader readStream = new StreamReader(receiveStream, encode);
            string content = readStream.ReadToEnd();
            myHttpWebResponse.Close();
            readStream.Dispose();
            return content;
        }


        public static string ReadContent(string rootPath, string virtualPathOrUrl)
        {
            if (virtualPathOrUrl.StartsWith("http://", StringComparison.InvariantCultureIgnoreCase))
            {
                return HttpHelper.ReadUrl(virtualPathOrUrl);
            }
            else
            {
                string name = string.Format("{0}{1}", rootPath ,virtualPathOrUrl.Replace("~",""));
                return FileHelper.ReadFile(name);
            }
        }

        public static byte[] MinifyContent(string content, ContentType contentType)
        {
            Minifier minifier = new Minifier();

            if (contentType == ContentType.css)
            {
                content = minifier.MinifyStyleSheet(content);
            }
            else if (contentType == ContentType.javascript)
            {
                content = minifier.MinifyJavaScript(content);
            }

            return Encoding.UTF8.GetBytes(content);
        }

        public static string MinifiContentToString(string content, ContentType contentType)
        {
            Minifier minifier = new Minifier();

            if (contentType == ContentType.css)
            {
                content = minifier.MinifyStyleSheet(content);
            }
            else if (contentType == ContentType.javascript)
            {
                content = minifier.MinifyJavaScript(content);
            }

            return content;
        }

    }

 
}

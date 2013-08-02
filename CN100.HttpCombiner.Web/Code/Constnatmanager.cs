using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CN100.HttpCombiner.Web
{
    public class Constnatmanager
    {
        public class Config
        {
            public const string XmlConfigFilePath = "XmlConfigFilePath";
            public const string CacheDurationName = "CacheDuration";
            public const string IsAppendCacheExtension = "IsAppendCacheExtension";
        }

        public class Link
        {
            public const string CSS = "<link href=\"http://{0}/HttpCombinerHandle.ashx?s={1}&v={2}\" rel=\"stylesheet\" type=\"text/css\" />";

            public const string Javascript = "<script src=\"http://{0}/HttpCombinerHandle.ashx?s={1}&v={2}\" type=\"text/javascript\"></script>";

            public const string Type = "text/{0};charset=UTF-8";
        }

        public class Request
        {
            public const string CMD = "cmd";

            public class Form
            {
                public const string CACHEID = "CacheID";

                public const string GUID = "guid";

                public const string NAME = "name";

                public const string DESCRIPTION = "description";

                public const string VERSION = "version";

                public const string ISMINIFY = "isMinify";

                public const string ISCACHE = "isCache";

                public const string EXPIRES = "expires";

                public const string ITEMSNAMES = "itemsNames";

                public const string CONTENTTYPE = "contentType";

                public const string ISDEBUG = "isDebug";

                public const string PATH = "path";

                public const string CLEARTYPE = "clearType";

                public const string PASSWORD = "password";
            }
        }

        public class AppSetting
        {
            public const string LOGINNAME = "LoginName";

            public const string PASSWORD = "PassWord";
        }

        public class Message
        {
            public const string FAILE = "提交失败!";

            public const string SUCCESS = "成功！";

            public const string REPEAT = "存在重复的名称和版本号！";
        }

        public const string CONTENT_TYPE = "text/plain";
    }
}
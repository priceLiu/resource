using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CN100.HttpCombiner.Common
{
    public class AppConfigHelper
    {
        public static string GetConfigValue(string key)
        {
            return System.Configuration.ConfigurationManager.AppSettings[key];
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using System.Collections.Specialized;

using CN100.HttpCombiner.Common;
using CN100.HttpCombiner.Model;
using CN100.HttpCombiner.Enum;

namespace CN100.HttpCombiner.Web
{
    /// <summary>
    /// ModifyCombinerConfigHandler 的摘要说明
    /// </summary>
    public class CombinerConfigManagerHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = Constnatmanager.CONTENT_TYPE;
            ActionResult action;

            HttpRequest request = context.Request;
            OperatingType cmd = (OperatingType)System.Enum.Parse(typeof(OperatingType), request[Constnatmanager.Request.CMD]);
            List<CombinerModel> combinerList = ConfigHelper.LoadXMLConfigItems(Constnatmanager.Config.XmlConfigFilePath);
            bool result = false;
            string message = Constnatmanager.Message.FAILE;
            string guid = context.Request.Form[Constnatmanager.Request.Form.GUID];
            CombinerModel configItem = ConfigHelper.GetConfigItem(guid, combinerList);

            string name = string.Empty;
            string description = string.Empty;
            string expires = string.Empty;
            string iNames = string.Empty;
            string version = string.Empty;
            ContentType contentType = ContentType.defualt;
            bool isCache = false;
            bool isMinify = false;
            bool isDebug = false;

            if (cmd == OperatingType.Modify || cmd == OperatingType.Add)
            {
                name = context.Request.Form[Constnatmanager.Request.Form.NAME];
                description = context.Request.Form[Constnatmanager.Request.Form.DESCRIPTION];
                expires = context.Request.Form[Constnatmanager.Request.Form.EXPIRES];
                iNames = context.Request.Form[Constnatmanager.Request.Form.ITEMSNAMES];
                contentType = (ContentType)Convert.ToInt32(context.Request.Form[Constnatmanager.Request.Form.CONTENTTYPE]);
                isCache = Convert.ToBoolean(Convert.ToInt32(context.Request.Form[Constnatmanager.Request.Form.ISCACHE]));
                isMinify = Convert.ToBoolean(Convert.ToInt32(context.Request.Form[Constnatmanager.Request.Form.ISMINIFY]));
                version = context.Request.Form[Constnatmanager.Request.Form.VERSION];
                isDebug = Convert.ToBoolean(Convert.ToInt32(context.Request.Form[Constnatmanager.Request.Form.ISDEBUG]));
            }

            try
            {
                switch (cmd)
                {
                    case OperatingType.Modify:

                        if ((combinerList.Where(c => c.Name.Equals(name, StringComparison.CurrentCultureIgnoreCase) && c.Version.Equals(version, StringComparison.CurrentCultureIgnoreCase)).Count() > 0)
                            && !(configItem.Name.Equals(name) && configItem.Version.Equals(version)))
                        {
                            message = Constnatmanager.Message.REPEAT;
                            result = false;
                        }
                        else
                        {
                            result = combinerList.Remove(configItem);
                            ConfigHelper.RemoveCache(configItem);
                            ConfigHelper.AddXMLConfig(name, description, expires, iNames, contentType, isCache, isMinify, combinerList, isDebug, version);
                        }
                        break;
                    case OperatingType.Delete:
                        result = combinerList.Remove(configItem);
                        ConfigHelper.RemoveCache(configItem);
                        break;
                    case OperatingType.Add:
                        if (combinerList.Where(c => c.Name.Equals(name, StringComparison.CurrentCultureIgnoreCase) && c.Version.Equals(version, StringComparison.CurrentCultureIgnoreCase)).Count() > 0)
                        {
                            message = Constnatmanager.Message.REPEAT;
                            result = false;
                        }
                        else
                        {
                            List<CombinerModel> combinerMList = ConfigHelper.AddXMLConfig(name, description, expires, iNames, contentType, isCache, isMinify, combinerList, isDebug, version);
                            if (combinerMList != null)
                            {
                                result = true;
                            }
                        }
                        break;
                    default:
                        break;
                }

                if (result)
                {
                    SystemConfigOperation systemComfigOperation = new SystemConfigOperation();
                    string strFilePath = AppConfigHelper.GetConfigValue(Constnatmanager.Config.XmlConfigFilePath);
                    result = systemComfigOperation.SaveData(combinerList, strFilePath);
                }

                if (result)
                {
                    message = Constnatmanager.Message.SUCCESS;
                }

                action = new ActionResult(result, message);

            }
            catch (Exception ex)
            {
                action = new ActionResult(false, ex.Message);
            }

            context.Response.Write(JsonConvert.SerializeObject(action));
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
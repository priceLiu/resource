using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CN100.HttpCombiner.Enum;

namespace CN100.HttpCombiner.Web
{
    public partial class CleanCDN : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                LoadData();
            }
        }

        private void LoadData()
        {
            string urls = Request["Urls"];
            string dirs = Request["Dirs"];

            ClearCDNType clearCDNType = ClearCDNType.Dir;
            string path = string.Empty;
            string result = string.Empty;

            if (string.IsNullOrEmpty(urls) && string.IsNullOrEmpty(dirs))
            {
                result = "缺少清除路径！";
                return;
            }
            else if (!string.IsNullOrEmpty(dirs))
            {
                clearCDNType = ClearCDNType.Dir;
                path = dirs;
            }
            else
            {
                clearCDNType = ClearCDNType.Url;
                path = urls;
            }

            result = CDNHelper.ClearCDNCache(path, clearCDNType.ToString());
            Response.Write(result);
        }
    }
}
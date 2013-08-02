using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CN100.HttpCombiner.Model;
using CN100.HttpCombiner.Common;

namespace CN100.HttpCombiner.Web
{
    public partial class CDNManager : PageBase
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
            SystemConfigOperation sysConfigOperation = new SystemConfigOperation();
            string strFilePath = AppConfigHelper.GetConfigValue(Constnatmanager.Config.XmlConfigFilePath);
            IList<CombinerModel> combinerList = sysConfigOperation.ReadData(strFilePath).OrderByDescending(t => t.CreateDate).ToList();
            
            rlist.DataSource = combinerList;
            rlist.DataBind();
        }
    }
}
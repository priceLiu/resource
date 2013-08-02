using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CN100.HttpCombiner.Common;
using CN100.HttpCombiner.Model;

namespace CN100.HttpCombiner.Web
{
    public partial class ModifyCombinerConfig1 : PageBase
    {
        public CombinerModel combiner { get; set; }

        public OperatingType operatingType
        {
            get { return (OperatingType)Convert.ToInt16(Request.QueryString["operatingType"]); }
        }

        public string guid
        {
            get { return Request.QueryString["guid"]; }
        }

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
            IList<CombinerModel> combinerList = sysConfigOperation.ReadData(strFilePath);

            if (string.IsNullOrEmpty(guid))
            {
                combiner = new CombinerModel();
            }
            else
            {
                combiner = combinerList.Where(x => x.GUID == guid).FirstOrDefault();
            }

        }
    }
}
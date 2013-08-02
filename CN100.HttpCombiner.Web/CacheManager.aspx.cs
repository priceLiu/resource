using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CN100.HttpCombiner.Common;
using CN100.HttpCombiner.Model;
using CN100.Public.Common;
using System.Collections;

namespace CN100.HttpCombiner.Web
{
    public partial class CacheManager : PageBase
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
            List<CacheModel> cacheList = CacheHelper.ReadAll();

            rlist.DataSource = cacheList;
            rlist.DataBind();
        }

    }

}
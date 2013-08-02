using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CN100.Public.Common;

namespace CN100.HttpCombiner.Web
{
    public class PageBase : System.Web.UI.Page
    {
        protected override void OnLoad(EventArgs e)
        {
            if (string.IsNullOrEmpty(CookieHelper.GetCookieValueByName("LoginName")))
            {
                Response.Redirect("Login.aspx");
                return;
            }
            base.OnLoad(e);

        }
    }
}
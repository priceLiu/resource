using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CN100.HttpCombiner.Model;

namespace CN100.HttpCombiner.Common
{
    public class TestHelper
    {
        public static List<CombinerModel> CreateTestData()
        {
            List<CombinerModel> Resources = new List<CombinerModel>();

            CombinerModel model = new CombinerModel();
            model.GUID = Guid.NewGuid().ToString();
            model.Name = "IndexCss";
            model.Description = "首页css样式";
            model.IsCache = true;
            model.IsMinify = true;
            model.Version = "1.0";
            model.CreateDate = DateTime.Now;
            model.Expires = "3h";

            List<Item> items = new List<Item>();
            items.Add(new Item() { Name = "~/style/a.css" });
            items.Add(new Item() { Name = "http://www.cn100.com/b.css" });
            model.Items = items;
            Resources.Add(model);

            model = new CombinerModel();
            model.GUID = Guid.NewGuid().ToString();
            model.Name = "IndexJs";
            model.Description = "首页Js";
            model.IsCache = true;
            model.IsMinify = true;
            model.Version = "1.0";
            model.CreateDate = DateTime.Now;
            model.Expires = "4h";

            items = new List<Item>();
            items.Add(new Item() { Name = "~/Scripts/a.js" });
            items.Add(new Item() { Name = "http://www.cn100.com/b.Js" });
            model.Items = items;
            Resources.Add(model);

            return Resources;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using CN100.HttpCombiner.Enum;

namespace CN100.HttpCombiner.Model
{
    /// <summary>
    /// 压缩实体
    /// </summary>
    [Serializable]
    public class CombinerModel
    {
        /// <summary>
        /// GUID
        /// </summary>
        public string GUID { get; set; }
        /// <summary>
        /// 配置名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 描述
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// 是否压缩
        /// </summary>
        public bool IsMinify { get; set; }
        /// <summary>
        /// 是否缓存
        /// </summary>
        public bool IsCache { get; set; }
        /// <summary>
        /// 版本号
        /// </summary>
        public string Version { get; set; }

        /// <summary>
        /// 内容类型
        /// </summary>
        public ContentType ContentType { get; set; }

        /// <summary>
        /// 引用链接
        /// </summary>
        public string LinkUrl { get; set; }

        /// <summary>
        /// 是否调试
        /// </summary>
        public bool IsDebug { get; set; }

        /// <summary>
        /// 1M:1个月,1d:1天,1h:1小时,1m:一分钟
        /// </summary>
        public string Expires { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreateDate { get; set; }

        /// <summary>
        /// 文件列表
        /// </summary>
        public List<Item> Items { get; set; }

        /// <summary>
        /// 文件列表名称
        /// </summary>
        public string ItemsName
        {
            get
            {
                string Names = string.Join("<br />", Items.Select(x => x.Name).ToArray());
                return Names;
            }
        }
    }

    [Serializable]
    public class Item
    {
        public string Name { get; set; }
    }
}

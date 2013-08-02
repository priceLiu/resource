using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CN100.HttpCombiner.Web
{
    /// <summary>
    /// Json方法执行结果
    /// </summary>
    public class ActionResult
    {
        /// <summary>
        /// 消息
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// 数据
        /// </summary>
        public object Data { get; set; }

        /// <summary>
        /// 错误代码
        /// </summary>
        public object ErrorCode { get; set; }

        public ActionResult(object errorCode, string message)
        {
            ErrorCode = errorCode;
            Message = message;
        }

        public ActionResult(object errorCode, string message, object data)
        {
            ErrorCode = errorCode;
            Message = message;
            Data = data;
        }
    }
}

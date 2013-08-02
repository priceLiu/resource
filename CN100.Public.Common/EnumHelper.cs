using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Reflection;

namespace CN100.Public.Common
{
    /// <summary>
    /// 枚举帮助类
    /// </summary>
    /// <typeparam name="T">枚举类型</typeparam>
    public class EnumHelper<T>
    {
        /// <summary>
        /// 获取枚举描述集合
        /// </summary>
        /// <returns></returns>
        public static List<string> GetEnumDescriptionList()
        {
            List<string> list = new List<string>();
            foreach (T _enum in Enum.GetValues(typeof(T)))
            {
                string description = GetEnumDescription(_enum);
                if (!list.Contains(description))
                    list.Add(description);
            }

            return list;
        }

        /// <summary>
        /// 获取枚举的文字描述
        /// </summary>
        /// <param name="_enum">枚举</param>
        /// <returns></returns>
        public static string GetEnumDescription(T _enum)
        {
            FieldInfo field = _enum.GetType().GetField(_enum.ToString());
            DescriptionAttribute[] attributes = (DescriptionAttribute[])field.GetCustomAttributes(typeof(DescriptionAttribute), false);
            return (attributes.Length > 0) ? attributes[0].Description : _enum.ToString();
        }

        /// <summary>
        /// 获取枚举的默认属性
        /// </summary>
        /// <param name="_enum">枚举</param>
        /// <returns></returns>
        public static string GetEnumDefaultValue(T _enum)
        {
            FieldInfo field = _enum.GetType().GetField(_enum.ToString());
            DefaultValueAttribute[] attributes = (DefaultValueAttribute[])field.GetCustomAttributes(typeof(DefaultValueAttribute), false);
            return (attributes.Length > 0) ? attributes[0].Value.ToString() : _enum.ToString();
        }

        /// <summary>
        /// 获取枚举的文字描述
        /// </summary>
        /// <param name="value">枚举值</param>
        /// <returns></returns>
        public static string GetEnumDescription(int value)
        {
            string name = Enum.GetName(typeof(T), value);
            if (string.IsNullOrEmpty(name))
                return string.Empty;

            return GetEnumDescription(name);
        }

        /// <summary>
        /// 获取枚举的文字描述
        /// </summary>
        /// <param name="value">枚举名称</param>
        /// <returns></returns>
        public static string GetEnumDescription(string name)
        {
            T _enum = (T)Enum.Parse(typeof(T), name);
            return GetEnumDescription(_enum);
        }

        /// <summary>
        /// 把枚举装潢成字典（key：枚举描述，value：枚举值）
        /// </summary>
        /// <returns></returns>
        public static Dictionary<int, string> ConvertValueToDictionary()
        {
            Dictionary<int, string> dic = new Dictionary<int, string>();
            foreach (T _enum in Enum.GetValues(typeof(T)))
            {
                string description = GetEnumDescription(_enum);
                dic.Add(Convert.ToInt32(_enum), description);
            }

            return dic;
        }

        /// <summary>
        /// 把枚举默认属性装潢成字典（key：枚举默认属性，value：枚举值）
        /// </summary>
        /// <returns></returns>
        public static Dictionary<int, string> ConvertDefaultValueToDictionary()
        {
            Dictionary<int, string> dic = new Dictionary<int, string>();
            foreach (T _enum in Enum.GetValues(typeof(T)))
            {
                string displayName = GetEnumDefaultValue(_enum);
                dic.Add(Convert.ToInt32(_enum), displayName);
            }

            return dic;
        }

        /// <summary>
        /// 把枚举装潢成字典（key：枚举描述，value：枚举名称)
        /// </summary>
        /// <param name="convertType">转换类型</param>
        /// <returns></returns>
        public static Dictionary<string, string> ConvertNameToDictionary()
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            foreach (string name in Enum.GetNames(typeof(T)))
            {
                string description = GetEnumDescription(name);
                dic.Add(name, description);
            }

            return dic;
        }
    }
}

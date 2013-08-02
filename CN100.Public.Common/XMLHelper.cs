using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CN100.Public.Common
{
   public class XMLHelper
    {
        public static void SaveToXml(string xmlFilePath, object dataObj) 
        {
            SaveToXml(xmlFilePath, dataObj, dataObj.GetType()); 
        }

        public static void SaveToXml(string xmlFilePath, object dataObj, System.Type objectType)
        {
            using (System.IO.StreamWriter writer = new System.IO.StreamWriter(xmlFilePath))
            {
                System.Xml.Serialization.XmlSerializer xs = new System.Xml.Serialization.XmlSerializer(objectType);
                xs.Serialize(writer, dataObj);
                writer.Close();
            }
        }

        public static object LoadFromXml(string xmlFilePath, System.Type objectType)
        {
            using (System.IO.StreamReader reader = new System.IO.StreamReader(xmlFilePath))
            {
                System.Xml.Serialization.XmlSerializer xs = new System.Xml.Serialization.XmlSerializer(objectType);
                object obj = xs.Deserialize(reader);
                reader.Close();

                return obj;
            }
        }
    }
}

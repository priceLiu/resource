using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace CN100.Public.Common
{
    public class FileHelper
    {

        public static string ReadFile(string filePath)
        {
            using (StreamReader reader = new StreamReader(filePath, Encoding.UTF8))
            {
                return reader.ReadToEnd();
            }
        }

        public static void WriteFile(string fileContent, string filePath, bool isAppend = true)
        {
            using (StreamWriter writer = new StreamWriter(filePath, isAppend, Encoding.UTF8))
            {
                writer.Write(fileContent);
                writer.Flush();
                writer.Dispose();
            }
        }
    }
}

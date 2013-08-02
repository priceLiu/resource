using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Cryptography;
using System.IO;

namespace CN100.Public.Common
{
    public class SecurityHelper
    {
        //默认密钥向量
        private static byte[] Keys = { 0x12, 0x34, 0x56, 0x78, 0x90, 0xAB, 0xCD, 0xEF };
        /**/
        /**/
        /**/
        private static DESCryptoServiceProvider des = new DESCryptoServiceProvider();

        /// <summary>
        /// DES加密字符串
        /// </summary>
        /// <param name="encryptString">待加密的字符串</param>
        /// <param name="encryptKey">加密密钥,要求为8位</param>
        /// <returns>加密成功返回加密后的字符串，失败返回源串</returns>
        public static string EncryptDES(string encryptString, string encryptKey)
        {
            byte[] inputByteArray = Encoding.GetEncoding("UTF-8").GetBytes(encryptString);
            des.Key = ASCIIEncoding.ASCII.GetBytes(encryptKey.Substring(0, 8));
            des.IV = ASCIIEncoding.ASCII.GetBytes(encryptKey.Substring(0, 8));
            MemoryStream ms = new MemoryStream();
            CryptoStream cs = new CryptoStream(ms, des.CreateEncryptor(), CryptoStreamMode.Write);
            cs.Write(inputByteArray, 0, inputByteArray.Length);
            cs.FlushFinalBlock();

            StringBuilder ret = new StringBuilder();
            foreach (byte b in ms.ToArray())
            {
                ret.AppendFormat("{0:X2}", b);
            }
            return ret.ToString();
        }

        /**/
        /**/
        /**/
        /// <summary>
        /// DES解密字符串
        /// </summary>
        /// <param name="decryptString">待解密的字符串</param>
        /// <param name="decryptKey">解密密钥,要求为8位,和加密密钥相同</param>
        /// <returns>解密成功返回解密后的字符串，失败返源串</returns>
        public static string DecryptDES(string decryptString, string decryptKey)
        {
            byte[] inputByteArray = new byte[decryptString.Length / 2];

            for (int x = 0; x < decryptString.Length / 2; x++)
            {
                int i = (Convert.ToInt32(decryptString.Substring(x * 2, 2), 16));
                inputByteArray[x] = (byte)i;
            }

            des.Key = ASCIIEncoding.ASCII.GetBytes(decryptKey.Substring(0, 8));
            des.IV = ASCIIEncoding.ASCII.GetBytes(decryptKey.Substring(0, 8));
            MemoryStream ms = new MemoryStream();
            CryptoStream cs = new CryptoStream(ms, des.CreateDecryptor(), CryptoStreamMode.Write);
            cs.Write(inputByteArray, 0, inputByteArray.Length);
            cs.FlushFinalBlock();

            return System.Text.Encoding.UTF8.GetString(ms.ToArray());
        }

        /// <summary>
        /// RSA 的密钥产生 产生私钥 和公钥 
        /// </summary>
        /// <param name="xmlKeys"></param>
        /// <param name="xmlPublicKey"></param>
        public void RSAKey(out string xmlKeys, out string xmlPublicKey)
        {
            System.Security.Cryptography.RSACryptoServiceProvider rsa = new RSACryptoServiceProvider();
            xmlKeys = rsa.ToXmlString(true);
            xmlPublicKey = rsa.ToXmlString(false);
        }

        const string PUBLICKEY = "<RSAKeyValue><Modulus>1E1BqQ0uipllOGPMKB4YO/ZutHO0pfQz6jQKFs1y958Vm8YO77APoI65hFYZbFLer3MKx2Obp1Y0DyUyuNIes+IhS7I4nHBS4igdvhohUZDhLLphiuDZ3i5NkBQDVqex/UdTvLbzmVI29bThTEGyWzHYtrIjNqM+IJJnqOquXMs=</Modulus><Exponent>AQAB</Exponent></RSAKeyValue>";
        const string PRIVATEKEY = "<RSAKeyValue><Modulus>1E1BqQ0uipllOGPMKB4YO/ZutHO0pfQz6jQKFs1y958Vm8YO77APoI65hFYZbFLer3MKx2Obp1Y0DyUyuNIes+IhS7I4nHBS4igdvhohUZDhLLphiuDZ3i5NkBQDVqex/UdTvLbzmVI29bThTEGyWzHYtrIjNqM+IJJnqOquXMs=</Modulus><Exponent>AQAB</Exponent><P>8iXyePGppOkS1hnvMPC5FVfbSDMfSAPfsmXCX3LgoJYxt+n0p1Mm/ZyVnSHm8xJdObGznLRyrVZomuuk6DCyYw==</P><Q>4HI71hZ7VYSWT0ZTehNKvAlhxETWNQlD2YxRwvuHmcVI2+tN7m/RTLkspfXyKsd/opvcqnQeHv2m/LUtiUWEeQ==</Q><DP>UtLH7LY74DwYRUL5nTO5GqPCTR+vQ2KP0OUdZqhUTJkSyGUtWU4HuBcm1WgTJnDRkjpFxQOzdbZocRTIguKlIQ==</DP><DQ>0qJiBUiT9m23oi4dqTLxsAYd+lOfs6Y+RqupD5N+bpD3D2yEdn/5rEcb36Qw4HTZE4GyVUUj/3GMhRyC35CeAQ==</DQ><InverseQ>M1c29WqJO9ET8ymHaBq+Q5gRdpJ79jzV2RlydcMq0dCmHiHjeAwFilVj8AROjvuiOo71fUCleL9+leuOoKgUvg==</InverseQ><D>W14obQX0Ssf7rQoeOgHBskS7nkPRsj5n/VqKIQgoe3NmzFSv5u3hu9rQ8qhPZrQ/jEi5kdhHi/voicAblTkw5rcS7qfamv8NOLz6KV5HwUcyW0eAqL97w7LOJohw7S/3NGblftA76oHGpOpKpZf+u1g7e7w8xRS6RbZ3zqP6yzE=</D></RSAKeyValue>";

        /// 
        /// 加密
        /// 
        /// 待加密的字符串
        ///
        [ThreadStatic]
        private static RSACryptoServiceProvider rsa = null;

        [ThreadStatic]
        private static RSACryptoServiceProvider dersa = null;

        public static string RSAEncryption(string word)
        {
            if (rsa == null)
            {
                rsa = new RSACryptoServiceProvider();
                rsa.FromXmlString(PUBLICKEY);
            }

            byte[] plaindata = System.Text.Encoding.Default.GetBytes(word);
            byte[] encryptdata = rsa.Encrypt(plaindata, false);
            string encryptstring = Convert.ToBase64String(encryptdata);
            return encryptstring;
        }

        public static string RSADecryption(string encryptWord)
        {
            if (dersa == null)
            {
                rsa = new RSACryptoServiceProvider();
                rsa.FromXmlString(PRIVATEKEY);
            }

            byte[] encryptdata = Convert.FromBase64String(encryptWord);
            byte[] decryptdata = rsa.Decrypt(encryptdata, false);
            string plaindata = System.Text.Encoding.Default.GetString(decryptdata);

            return plaindata;
        }
    }
}

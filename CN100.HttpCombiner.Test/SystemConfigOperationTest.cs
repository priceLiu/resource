using CN100.HttpCombiner.Common;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using CN100.HttpCombiner.Model;
using System.Collections.Generic;

namespace CN100.HttpCombiner.Test
{
    
    
    /// <summary>
    ///这是 SystemConfigOperationTest 的测试类，旨在
    ///包含所有 SystemConfigOperationTest 单元测试
    ///</summary>
    [TestClass()]
    public class SystemConfigOperationTest
    {


        private TestContext testContextInstance;

        /// <summary>
        ///获取或设置测试上下文，上下文提供
        ///有关当前测试运行及其功能的信息。
        ///</summary>
        public TestContext TestContext
        {
            get
            {
                return testContextInstance;
            }
            set
            {
                testContextInstance = value;
            }
        }

        #region 附加测试特性
        // 
        //编写测试时，还可使用以下特性:
        //
        //使用 ClassInitialize 在运行类中的第一个测试前先运行代码
        //[ClassInitialize()]
        //public static void MyClassInitialize(TestContext testContext)
        //{
        //}
        //
        //使用 ClassCleanup 在运行完类中的所有测试后再运行代码
        //[ClassCleanup()]
        //public static void MyClassCleanup()
        //{
        //}
        //
        //使用 TestInitialize 在运行每个测试前先运行代码
        //[TestInitialize()]
        //public void MyTestInitialize()
        //{
        //}
        //
        //使用 TestCleanup 在运行完每个测试后运行代码
        //[TestCleanup()]
        //public void MyTestCleanup()
        //{
        //}
        //
        #endregion


        /// <summary>
        ///SaveData 的测试
        ///</summary>
        [TestMethod()]
        public void SaveDataTest()
        {
            SystemConfigOperation target = new SystemConfigOperation(); // TODO: 初始化为适当的值
            List<CombinerModel> list = null; // TODO: 初始化为适当的值
            list = TestHelper.CreateTestData();
            string fileName = "E://CombinerConfig.xml"; // TODO: 初始化为适当的值
            bool expected = false; // TODO: 初始化为适当的值
            bool actual;
            actual = target.SaveData(list, fileName);
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("验证此测试方法的正确性。");
        }

        /// <summary>
        ///ReadData 的测试
        ///</summary>
        [TestMethod()]
        public void ReadDataTest()
        {
            SystemConfigOperation target = new SystemConfigOperation(); // TODO: 初始化为适当的值
            string fileName = "E://CombinerConfig.xml"; // TODO: 初始化为适当的值
            List<CombinerModel> expected = null; // TODO: 初始化为适当的值
            List<CombinerModel> actual;
            actual = target.ReadData(fileName);
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("验证此测试方法的正确性。");
        }

        /*
                * 目的：
                *       打开页面，加载样式，脚本。
                *       删除缓存。
                * 步骤：
                *       1.打开页面，自动加载样式，脚本。
                *       2.查看缓存管理页面。
                *       3.删除选中缓存。
                * 预期值：
                *       有保存缓存，可删除缓存，缓存删除成功。
        */


        /*
         * 
         */
    }
}

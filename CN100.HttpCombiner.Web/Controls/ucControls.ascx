<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ucControls.ascx.cs"
    Inherits="CN100.HttpCombiner.Web.Controls.ucControls" %>
<script type='text/javascript' src='/Scripts/jquery-1.7.2.min.js'></script>
<style type="text/css">
    ul
    {
        margin: 0;
        padding: 0;
    }
    
    ul li
    {
        list-style: none;
    }
    
    #div
    {
        width: 960px;
        height: 28px;
    }
    
    #div ul li
    {
        float: left;
        height: 28px;
        display: inline;
        line-height: 28px;
        padding: 0px 20px;
        position: relative;
    }
    
    #div ul li ul
    {
        position: absolute;
        z-index: 99;
        display: none;
        top: 28px;
        width: 140px;
        left: 0px;
    }
    
    #div ul li ul li
    {
        display: block;
        width: 140px;
        height: 26px;
        line-height: 26px;
        background-color: #666;
        border-bottom: 1px #FFFFFF solid;
    }
    
    #div ul li a
    {
        color: #000000;
        text-decoration: none;
    }
</style>
<script type="text/javascript">
    $(function () {
        $("#div ul li").hover(function () {
            $(this).css("background", "#333333").children("ul").slideDown();
            $(this).css("color", "#fff");
            $(this).find("a").css("color", "#fff");
        }, function () {
            $(this).css("background", "#fff").children("ul").slideUp();
            $(this).find("a").css("color", "#000");

        })
        $("#div ul li ul li").hover(function () {
            $(this).css("background", "#333");
        }, function () {
            $(this).css("background", "#666");
        })
    })
</script>
<div id="div">
    <ul>
        <li><a href="../ConfigManager.aspx">配置管理</a></li>
        <li><a href="../ModifyCombinerConfig.aspx">添加配置</a></li>
        <li><a href="#">缓存管理</a>
            <ul>
                <li><a href="../CacheManager.aspx">缓存管理</a></li>
                <li><a href="../CDNManager.aspx">列表删除CDN缓存</a></li>
                <li><a href="../RemoveCDN.aspx">路径删除CDN缓存</a></li>
            </ul>
        </li>
        <%-- <ul>
                <li><a href="../CacheManager.aspx">清除单一缓存</a></li>
                <li>清除所有缓存</li>
                <li><a href="../CacheManager.aspx">读取所有缓存</a></li>
            </ul>--%>
        <!--<li><a href="#">新闻中心</a>
            <ul>
                <li>新闻中心</li>
                <li>新闻中心</li>
                <li>新闻中心</li>
            </ul>
        </li>-->
    </ul>
</div>
<hr />

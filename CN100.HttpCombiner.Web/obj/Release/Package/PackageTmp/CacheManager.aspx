<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CacheManager.aspx.cs" Inherits="CN100.HttpCombiner.Web.CacheManager" %>

<%@ Register src="Controls/ucControls.ascx" tagname="ucControls" tagprefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        #myrefundlist
        {
            font-family: "Trebuchet MS" , Arial, Helvetica, sans-serif;
            width: 96%;
            border-collapse: collapse;
            margin: 6px 0;
        }
        #myrefundlist td, #myrefundlist th
        {
            border: 1px solid #98bf21;
            padding: 3px 7px 2px 7px;
        }
        #myrefundlist th
        {
            text-align: left;
            padding-top: 5px;
            padding-bottom: 4px;
            background-color: #A7C942;
            color: #ffffff;
        }
        #myrefundlist tr.alt td
        {
            color: #000000;
            background-color: #EAF2D3;
        }
    </style>
</head>
<body>
    <uc1:ucControls ID="ucControls1" runat="server" />
    <form id="form1" runat="server">
    <div>
        <table class="table" id="myrefundlist" width="100%">
            <tr class="tableth">
                <th>
                    配置名称
                </th>
                <th>
                    操作
                </th>
            </tr>
            <asp:Repeater ID="rlist" runat="server">
                <ItemTemplate>
                    <tr>
                        <td class="tablew130">
                            <%# Eval("Key")%>
                        </td>
                        <td class="tablew120">
                            <a href="javascript:void(0)" onclick='DelCache("<%# Eval("Key").ToString().Replace("\\","\\\\") %>")'>删除缓存</a>
                        </td>
                    </tr>
                </ItemTemplate>
            </asp:Repeater>
        </table>
    </div>

    </form>
    <br />
    <a id="RemoveAllCache" onclick="RemoverAllCache()"  href="javascript:void(0)" >删除所有缓存</a>
</body>
</html>
<script src="Scripts/jquery-1.7.2.js" type="text/javascript"></script>
<script src="Scripts/artDialog415/artDialog.js?skin=aero" type="text/javascript"></script>
<script type="text/javascript">
    function DelCache(CacheID) {
        if (!confirm("是否要删除该缓存？")) {
            return false;
        }
        $.post(
            "CacheManagerHandler.ashx?cmd=Remove",
            { "CacheID": CacheID },
            function (data) {
                if (data.ErrorCode == false) {
                    art.dialog({ "title": "错误", content: data.Message, icon: "error", width: 300, lock: true });
                }
                else {
                    window.location.href = "CacheManager.aspx";
                }
            });
    }

    function RemoverAllCache() {
        if (!confirm("是否要删除所有缓存？")) {
            return false;
        }
        $.post(
            "CacheManagerHandler.ashx?cmd=RemoveAll",
            {},
            function () {
                window.location.href = "CacheManager.aspx";
            });
    }
</script>

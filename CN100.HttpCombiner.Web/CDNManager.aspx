<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CDNManager.aspx.cs" Inherits="CN100.HttpCombiner.Web.CDNManager" %>

<%@ Register Src="Controls/ucControls.ascx" TagName="ucControls" TagPrefix="uc1" %>
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
    <form id="form1" runat="server">
    <uc1:ucControls ID="ucControls1" runat="server" />
    <br />
    <div>
        <table class="table" id="myrefundlist" width="100%">
            <tr class="tableth">
                <th>
                    选择
                </th>
                <th style="min-width: 80px;">
                    配置名称
                </th>
                <th>
                    版本号
                </th>
                <th style="min-width: 450px">
                    文件列表
                </th>
                <th style="width: 120px;">
                    操作
                </th>
            </tr>
            <asp:Repeater ID="rlist" runat="server">
                <ItemTemplate>
                    <tr>
                        <td>
                            <input type="checkbox" value='<%# Eval("ItemsName")%>' name="ckbItemName" />
                        </td>
                        <td class="tablew130">
                            <%# Eval("Name")%>
                        </td>
                        <td class="tablew110">
                            <%# Eval("Version")%>
                        </td>
                        <td>
                            <%# Eval("ItemsName")%>
                        </td>
                        <td class="tablew120">
                            &nbsp; <a href='javascript:void(0);' onclick='RemoverCDNCache("<%# Eval("ItemsName") %>")'
                                id="btnDel">清除CDN缓存</a>
                        </td>
                    </tr>
                </ItemTemplate>
            </asp:Repeater>
        </table>
    </div>
    </form>
    <br />
    <a id="delAllCDNCache" onclick="RemoverCheckCache()" href="javascript:void(0)">清除选中CDN缓存</a>
</body>
</html>
<script src="Scripts/artDialog415/artDialog.js?skin=aero" type="text/javascript"></script>
<script src="Scripts/jquery-1.7.2.js" type="text/javascript"></script>
<script type="text/javascript">
    // $(document).ready(function () { delCombiner(GUID); });


    function RemoverCDNCache(ItemsName) {
        if (!confirm("是否要清除该CDN缓存？")) {
            return false;
        }
        var clearType = "Url";
        var path = ItemsName.replace("<br />", "|");
        $.post(
              "CDNManagerHandler.ashx",
               { "path": path, "clearType": clearType },
            function (result) {
                art.dialog({ "title": "错误", content: result, icon: "error", width: 300, lock: true });
            });
    }

    function RemoverCheckCache() {
        if (!confirm("是否要清除选中的CDN缓存？")) {
            return false;
        }

        var clearType = "Url";
        var path = "";
        var $checkBox = $("input[name^='ckbItemName']:checked");
        if ($checkBox.length > 0) {
            $checkBox.each(function (obj) {
                var itemName = $(this).val();
                if ($.trim(itemName) != "") {
                    path += (itemName + "|");
                }
            });
            path = itemNames.replace("<br />", "|");
            path = itemNames.replace(/(\|*$)/g, "");
        }
        else {
            art.dialog({ "title": "错误", content: "至少选择一个！", icon: "error", width: 300, lock: true });
            return false;
        }

        $.post(
              "CDNManagerHandler.ashx",
               { "path": path, "clearType": clearType },
            function (result) {
                art.dialog({ "title": "错误", content: result, icon: "error", width: 300, lock: true });
            });
    }

        

</script>

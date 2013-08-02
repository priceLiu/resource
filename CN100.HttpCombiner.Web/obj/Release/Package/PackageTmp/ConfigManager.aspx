<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ConfigManager.aspx.cs"
    Inherits="CN100.HttpCombiner.Web.ConfigManager" %>

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
                <th style="min-width:80px;">
                    配置名称
                </th>
                <th>
                    描述
                </th>
                <th>
                    是否压缩
                </th>
                <th>
                    是否缓存
                </th>
                <th>
                    版本号
                </th>
                <th>
                    期限
                </th>
                <th>
                    内容类型
                </th>
                <th>
                    引用链接
                </th>
                <th style="min-width:450px">
                    文件列表
                </th>
                <th style="width:80px;">
                    操作
                </th>
            </tr>
            <asp:Repeater ID="rlist" runat="server">
                <ItemTemplate>
                    <tr>
                        <td class="tablew130">
                            <%# Eval("Name")%>
                        </td>
                        <td class="tablew140">
                            <%# Eval("Description")%>
                        </td>
                        <td class="tablew130">
                            <%# Convert.ToBoolean(Eval("IsMinify")) ? "是":"否"%>
                        </td>
                        <td class="tablew90">
                            <%# Convert.ToBoolean(Eval("IsCache")) ? "是" : "否"%>
                        </td>
                        <td class="tablew110">
                            <%# Eval("Version")%>
                        </td>
                        <td class="tablew90">
                            <%# Eval("Expires")%>
                        </td>
                        <td>
                            <%# Eval("ContentType")%>
                        </td>
                        <td>
                            <%# (Eval("LinkUrl")??"").ToString().Replace("<", "&lt;").Replace(">", "&gt;")%>
                        </td>
                        <td>
                            <%# Eval("ItemsName")%>
                        </td>
                        <td class="tablew120">
                            <a href='ModifyCombinerConfig.aspx?operatingType=1&guid=<%# Eval("GUID")%>'>修改</a>
                            &nbsp; <a href='javascript:void(0);' onclick='delCombiner("<%# Eval("GUID") %>")'
                                id="btnDel">删除</a>
                        </td>
                    </tr>
                </ItemTemplate>
            </asp:Repeater>
        </table>
    </div>
    </form>
    <a id="AddCombinerConfig" href="ModifyCombinerConfig.aspx">添加配置</a>
</body>
</html>
<script src="Scripts/artDialog415/artDialog.js?skin=aero" type="text/javascript"></script>
<script src="Scripts/jquery-1.7.2.js" type="text/javascript"></script>
<script type="text/javascript">
    // $(document).ready(function () { delCombiner(GUID); });


    function delCombiner(GUID) {
        if (!confirm("是否要删除该配置？")) {
            return false;
        }
        $.post(
              "CombinerConfigManagerHandler.ashx?cmd=Delete",
               { "guid": GUID },
            function (data) {
                if (data.ErrorCode == false) {
                    art.dialog({ "title": "错误", content: data.Message, icon: "error", width: 300, lock: true });
                }
                else {
                    window.location.href = "ConfigManager.aspx";
                }
            });
    }

</script>

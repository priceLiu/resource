<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RemoveCDN.aspx.cs" Inherits="CN100.HttpCombiner.Web.RemoveCDN" %>

<%@ Register Src="Controls/ucControls.ascx" TagName="ucControls" TagPrefix="uc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .form-row
        {
            overflow: hidden;
            padding: 0.45em 0px 0.45em 0px;
            margin: 0px;
            width: 65%;
        }
        .form-row1
        {
            overflow: hidden;
            padding: 0.45em 0px 0.45em 0px;
            margin: 0px;
            width: 700px;
            float: left;
        }
        .form-row2
        {
            overflow: hidden;
            padding: 0.45em 0px 0.45em 0px;
            margin: 0px;
            width: 20%;
            float: right;
        }
        
        .form-label
        {
            text-align: right;
            float: left;
            width: 150px;
        }
        
        .form-field
        {
            margin-left: 2%;
            float: left;
        }
        
        .red
        {
            color: red;
        }
        
        input[type="text"]
        {
            width: 200px;
            height: 15px;
        }
        
        select
        {
            width: 205px;
        }
        
        input[type="button"]
        {
            width: 150px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <uc1:ucControls ID="ucControls1" runat="server" />
    <div id="divModifyCombinerConfig" style="width: 1000px;">
        <div>
            <div class="form-row">
                <div class="form-label">
                    <label>
                        类型:</label><label class="red">*</label>
                </div>
                <div class="form-field">
                    <select id="slcClearType" class="odAr_valid" name="slcClearType">
                        <%foreach (var item in CN100.Public.Common.EnumHelper<CN100.HttpCombiner.Enum.ClearCDNType>.ConvertValueToDictionary())
                          {%>
                        <option value="<%=item.Key %>">
                            <%=item.Value%></option>
                        <%} %>
                    </select>
                </div>
            </div>
            <div id="ulEvidence">
                <div class="form-row1">
                    <div class="form-label">
                        <label>
                            文件路径/URL:</label><label class="red">*</label>
                    </div>
                    <div class="form-field">
                        <input type="text" value="" name="txtItemsName0" id="txtItemsName0" style="width: 450px;" />
                        <a id="a2" href="javascript:void(0)" onclick='btnDeleteTxt(this)'>删除</a>
                    </div>
                </div>
                <div class="form-row2">
                    <a id="aAddItemText" href="javascript:void(0)" style="position: absolute;" onclick='btnAddtxtItem("0")'>
                        添加文件</a>
                </div>
            </div>
            <br />
            <br />
            <div class="form-field" style="clear: both;">
                <input type="button" value="清除" id="RemoverCDNCache" />
            </div>
        </div>
    </div>
    </form>
</body>
</html>
<script src="Scripts/jquery-1.7.2.js" type="text/javascript"></script>
<script src="Scripts/artDialog415/artDialog.js?skin=aero" type="text/javascript"></script>
<script type="text/javascript">
    $(document).ready(function () {
        RemoverCDNCache();
    });


    function RemoverCDNCache() {
        $("#RemoverCDNCache").click(function () {
            var path = "";
            var clearType = $("#slcClearType").val();
            var $inputItems = $("input[name^='txtItemsName']");
            if ($inputItems.length > 0) {
                for (var i = 0; i < $inputItems.length; i++) {
                    var itemName = $inputItems.eq(i).val();
                    if (!IsURL(itemName)) {
                        art.dialog({ "title": "错误", content: "URL输入不正确！", icon: "error", width: 300, lock: true }); ;
                        return;
                    }
                    if ($.trim(itemName) != "") {
                        path += (itemName + "|");
                    }

                }
            }
            path = path.replace(/(\|*$)/g, "");

            $.post(
              "CDNManagerHandler.ashx",
               { "path": path, "clearType": clearType },
            function (result) {
                art.dialog({ "title": "错误", content: result, icon: "error", width: 300, lock: true });

            });
        });
    }

    function btnAddtxtItem(i) {
        var $li = $('<div class="form-row1">'
                        + '<div class="form-label">'
                            + '<label> 文件路径/URL:</label><label class="red">*</label>'
                        + '</div>'
                        + '<div class="form-field">'
                            + '<input type="text" style="width:450px;" id="txtItemsName' + i + '" name="txtItemsName' + i + '"/>&nbsp;<a name="aDelete" style="cursor:pointer" href="javascript:void(0)" >删除</a>'
                        + '</div>'
                    + '</div>');
        $("#ulEvidence").append($li);
        $(".aui_outer").css("style", "zoom:1;");
        $("a[name='aDelete']", $li).click(function () {
            var $items = $("input[name^='txtItemsName']");
            if ($items.length > 1) {
                $(this).parent().parent().remove();
            }
            else {
                alert("最少需要一个文件路径！");
            }
        });
    }

    function btnDeleteTxt(objthis) {
        var $items = $("input[name^='txtItemsName']");
        if ($items.length > 1) {
            $(objthis).parent().parent().remove();
        }
        else {
            alert("最少需要一个文件路径！");
        }
    }


    function IsURL(str_url) {
        var strRegex = "^http(s)?://(www.)?[^\.]+\.[^\.]{2,3}";
        var re = new RegExp(strRegex);
        if (re.test(str_url)) {
            return (true);
        } else {
            return (false);
        }
    }
</script>

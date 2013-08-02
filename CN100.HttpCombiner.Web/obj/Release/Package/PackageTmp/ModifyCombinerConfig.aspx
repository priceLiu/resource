<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ModifyCombinerConfig.aspx.cs"
    Inherits="CN100.HttpCombiner.Web.ModifyCombinerConfig1" %>

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
            width: 750px;
        }
        
        .form-row2
        {
            overflow: hidden;
            padding: 0.45em 0px 0.45em 0px;
            margin: 0px;
            width: 20%;
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
    <div id="divModifyCombinerConfig">
        <div style="width: 1000px;">
            <div class="form-row">
                <div class="form-label">
                    <label>
                        配置名称:</label><label class="red">*</label>
                </div>
                <div class="form-field">
                    <input type="text" value="<%=combiner.Name %>" name="txtName" id="txtName" />
                </div>
            </div>
            <div class="form-row">
                <div class="form-label">
                    <label>
                        描述:</label><label class="red">*</label>
                </div>
                <div class="form-field">
                    <input type="text" value="<%=combiner.Description %>" name="txtDescription" id="txtDescription" />
                </div>
            </div>
            <div class="form-row">
                <div class="form-label">
                    <label>
                        版本号:</label><label class="red">*</label>
                </div>
                <div class="form-field">
                    <input type="text" value="<%=combiner.Version %>" name="txtVersion" id="txtVersion" />
                </div>
            </div>
            <div class="form-row">
                <div class="form-label">
                    <label>
                        是否压缩:</label><label class="red">*</label>
                </div>
                <div class="form-field">
                    <select id="slcIsMinify" class="odAr_valid" name="slcIsMinify">
                        <option value="1">是</option>
                        <option value="0">否</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-label">
                    <label>
                        是否缓存:</label><label class="red">*</label>
                </div>
                <div class="form-field">
                    <select id="slcIsCache" class="odAr_valid" name="slcIsCache">
                        <option value="1">是</option>
                        <option value="0">否</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-label">
                    <label>
                        是否调试:</label><label class="red">*</label>
                </div>
                <div class="form-field">
                    <select id="slcIsDebug" class="odAr_valid" name="slcIsDebug">
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-label">
                    <label>
                        内容类型:</label><label class="red">*</label>
                </div>
                <div class="form-field">
                    <select id="slcContentType" class="odAr_valid" name="slcContentType">
                        <%foreach (var item in CN100.Public.Common.EnumHelper<CN100.HttpCombiner.Enum.ContentType>.ConvertValueToDictionary())
                          {
                              if (item.Key != -1)
                              {      
                        %>
                        <option value="<%=item.Key %>">
                            <%=item.Value %></option>
                        <%}
                          } %>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-label">
                    <label>
                        缓存期限:</label><label class="red">*</label>
                </div>
                <div class="form-field">
                    <input type="text" name="txtExpires" id="txtExpires" />
                    <select id="slcExpires" name="slcExpires">
                        <option value="h">小时</option>
                        <option value="m">分钟</option>
                        <option value="d">天</option>
                        <option value="M">月</option>
                        <option value="y">年</option>
                    </select>
                </div>
            </div>
            <div id="ulEvidence">
                <%if (operatingType == CN100.HttpCombiner.Model.OperatingType.Modify)
                  {
                      for (int i = 0; i < combiner.Items.Count; i++)
                      {
                          var item = combiner.Items[i];
                %>
                <div class="form-row" style="float: left;">
                    <div class="form-label">
                        <label>
                            文件路径:</label><label class="red">*</label>
                    </div>
                    <div class="form-field">
                        <input style="width: 450px;" type="text" value="<%=item.Name %>" name="txtItemsName<%=i %>"
                            id="txtItemsName<%=i %>" />
                        <a id="aDeleteText<%=i %>" href="javascript:void(0)" onclick='btnDeleteTxt(this)'>删除</a>
                    </div>
                </div>
                <% 
                      }
                  }
                  else
                  {%>
                <div class="form-row" style="float: left;">
                    <div class="form-label">
                        <label>
                            文件路径:</label><label class="red">*</label>
                    </div>
                    <div class="form-field">
                        <input type="text" value="" name="txtItemsName0" id="txtItemsName0" style="width: 450px;" />
                        <a id="a2" href="javascript:void(0)" onclick='btnDeleteTxt(this)'>删除</a>
                    </div>
                </div>
                <%} %>
                <div class="form-row2" style="float: right;">
                    <a id="aAddItemText" href="javascript:void(0)" style="position: absolute;" onclick='btnAddtxtItem("0")'>
                        添加文件</a>
                </div>
            </div>
            <br />
            <br />
            <div class="form-field" style="clear: both;">
                <input type="button" value="提交" id="btnSubmit" />
            </div>
            <input type="hidden" id="hidGUID" value="<%=combiner.GUID %>" />
        </div>
    </div>
    </form>
</body>
</html>
<script src="Scripts/jquery-1.7.2.js" type="text/javascript"></script>
<script src="Scripts/artDialog415/artDialog.js?skin=aero" type="text/javascript"></script>
<script type="text/javascript">
    $(document).ready(function () {
        InitDefaultValue();
        btnSubmit();
    });

    function InitDefaultValue() {
        var guid = "<%=guid %>";

        if ($.trim(guid) != '') {
            var isMinify = "<%=combiner.IsMinify %>";
            if (isMinify == "False") {
                $("#slcIsMinify").val(0);
            }
            else {
                $("#slcIsMinify").val(1);
            }

            var isCache = "<%=combiner.IsCache %>";
            if (isCache == "False") {
                $("#slcIsCache").val(0);
            }
            else {
                $("#slcIsCache").val(1);
            }

            var expires = "<%=combiner.Expires %>";
            $("#txtExpires").val(expires.replace(/[^0-9]/ig, ""));
            $("#slcExpires").val(expires.replace(/[^a-z]/ig, ""));

            var contentType = "<%=combiner.ContentType %>";
            if (contentType == "css") {
                $("#slcContentType").val(0);
            }
            else {
                $("#slcContentType").val(1);
            }

            var isDebug = "<%=combiner.IsDebug %>"
            if (isDebug == "True") {
                $("#slcIsDebug").val(1);
            }
            else {
                $("#slcIsDebug").val(0);
            }

        }
    };

    function btnSubmit() {
        /// <summary>申请退款</summary>
        $("#btnSubmit").click(function () {

            if (!check()) {
                return;
            }
            var name = $("#txtName").val();
            var description = $("#txtDescription").val();
            var isMinify = $("#slcIsMinify").val();
            var isCache = $("#slcIsCache").val();
            //var version = "<%=combiner.Version %>";
            var txtexpires = $("#txtExpires").val();
            var slcExpires = $("#slcExpires").val();
            var guid = $("#hidGUID").val();
            var slcContentType = $("#slcContentType").val();
            var itemsNames = "";
            var $items = $("input[name^='txtItemsName']");
            var expires = txtexpires + slcExpires;
            var isDebug = $("#slcIsDebug").val();
            var version = $("#txtVersion").val();
            if ($items.length > 0) {
                $items.each(function (obj) {
                    var itemsName = $(this).val();
                    if ($.trim(itemsName) != "") {
                        itemsNames += (itemsName + "|");
                    }
                });
                itemsNames = itemsNames.replace(/(\|*$)/g, "");
            }

            var operatingType = "<%=operatingType %>";
            var cmd;

            if (operatingType == "Modify") {
                cmd = "Modify";
            }
            else {
                cmd = "Add";
            }

            var url = "CombinerConfigManagerHandler.ashx?cmd=" + cmd;

            $.post(
             url,
               {
                   "name": name, "description": description,
                   "isMinify": isMinify, "isCache": isCache, "contentType": slcContentType,
                   "expires": expires, "guid": guid, "itemsNames": itemsNames, "version": version, "isDebug": isDebug
               },
            function (data) {
                if (data.ErrorCode == false) {
                    art.dialog({ "title": "错误", content: data.Message, icon: "error", width: 300, lock: true });
                }
                else {
                    window.location.href = "ConfigManager.aspx";
                }
            }
        , "json");

        });
    }

    function btnAddtxtItem(i) {
        var $li = $('<div class="form-row" style="float:left;">'
                        + '<div class="form-label">'
                            + '<label> 文件路径:</label><label class="red">*</label>'
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

    function check() {
        var name = $("#txtName").val();
        var description = $("#txtDescription").val();
        var txtexpires = $("#txtExpires").val();
        var itemsNames = "";
        var $items = $("input[name^='txtItemsName']");
        var version = $("#txtVersion").val();
        if ($items.length > 0) {
            $items.each(function (obj) {
                var itemsName = $(this).val();
                if ($.trim(itemsName) != "") {
                    itemsNames += (itemsName + "|");
                }
            });
            itemsNames = itemsNames.replace(/(\|*$)/g, "");
        }

        if ($.trim(name) == "") {
            alert("请输入名称！");
            return false;
        }

        if ($.trim(description) == "") {
            alert("请输入描述！");
            return false;
        }

        if ($.trim(txtexpires) == "") {
            alert("请输入期限！");
            return false;
        }

        if ($.trim(version) == "") {
            alert("请输入版本号！");
            return false;
        }

        if ($.trim(itemsNames) == "") {
            alert("请输入文件路径！");
            return false;
        }

        return true;
    }
</script>

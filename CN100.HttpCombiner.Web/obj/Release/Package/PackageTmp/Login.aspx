<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="CN100.HttpCombiner.Web.Login" %>

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
        
        input[type="password"]
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
    <div>
        <div class="form-row">
            <div class="form-label">
                <label>
                    用户名:</label><label class="red">*</label>
            </div>
            <div class="form-field">
                <input type="text" value="" name="txtName" id="txtName" />
            </div>
        </div>
        <div class="form-row">
            <div class="form-label">
                <label>
                    密码:</label><label class="red">*</label>
            </div>
            <div class="form-field">
                <input value="" name="txtPassword" id="txtPassword" type="password" />
            </div>
            <div class="form-field" style="clear: both;">
                <input type="button" value="登录" id="btnLogin" />
            </div>
        </div>
    </div>
    </form>
</body>
</html>
<script src="Scripts/jquery-1.7.2.min.js" type="text/javascript"></script>
<script src="Scripts/artDialog415/artDialog.js?skin=aero" type="text/javascript"></script>
<script type="text/javascript">
    $(document).ready(function () { btnLogin(); });
    function btnLogin() {
        $("#btnLogin").click(function () {
            var name = $("#txtName").val();
            var password = $("#txtPassword").val();

            var url = "LoginHandler.ashx";

            $.post(
            url,
            { "name": name, "password": password },
             function (result) {
                 if (result == "false") {
                     art.dialog({ "title": "错误", content: "用户名或密码不正确", icon: "error", width: 300, lock: true });
                 }
                 else {
                     window.location.href = "ConfigManager.aspx";
                 }
             }
            );

        });
    }

</script>

$(".hc_title li").click(function () {
    var obj = $(this);
    var index = obj.index();
    var liobj = $(".hc_left .hc_list");
    var tobj = $(".hc_left ul.hc_title  li");
    for (var i = 0; i < liobj.length; i++) {
        if (i == index) {
            liobj.eq(i).show();
            if (!obj.hasClass("hc_title_select")) {
                tobj.eq(i).addClass("hc_title_select");
            }
        }
        else {
            liobj.eq(i).hide();
            if (tobj.eq(i).hasClass("hc_title_select")) {
                tobj.eq(i).removeClass("hc_title_select");
            }
        }
    }
});

$(".hc_page a[id*='btn']").live("click", function () {
    var obj = $(this);
    var id = obj.attr("id");
    var tid = $("#tid").val();
    var total = 1;
    var pageindex = 1;
    try {
        total = parseInt($("#total").text());
        pageindex = parseInt($("#curpage").text());
    } catch (e) {
        total = 1;
        pageindex = 1;
    }
    if (id.indexOf("pbtn") > -1) {
        pageindex = pageindex - 1;
    }
    else if (id.indexOf("fbtn") > -1) {
        pageindex = 1;
    }
    else if (id.indexOf("nbtn") > -1) {
        pageindex = pageindex + 1;
    }
    else if (id.indexOf("ebtn") > -1) {
        pageindex = total;
    }
    $.post("/handler/backgroundHandler.ashx?ra=" + Math.random(), { ac: "p", page: pageindex, tid: tid }, function (data) {
        if (data.err == 0) {
            $("#contentbox").html(data.msg);
            $(".hc_page").html(data.pagestr);
        }
        else {
            alert(data.msg);
        }
    }, "json");
});

$(function () {
    var imgobj = $(".hc_qalist img");
    if (imgobj.length == 0) {
        return;
    }
    var cimg; //当前图片
    for (var i = 0; i < imgobj.length; i++) {
        cimg = imgobj.eq(i);
        if (cimg.outerWidth() > 680) {
            cimg.attr("width", 680);
        }
    }
});

function SetQQKF() {
    var arr = new Array();
    arr.push("<div class=\"qqkf\">");
    arr.push("<div class=\"serverOnline\">");
    arr.push("<h3></h3>");
    arr.push("<ul>");
    arr.push("<li><span>1号客服:</span><a href=\"tencent://message/?uin=2428789350&amp;Menu=yes\"></a></li>");
    arr.push("<li><span>2号客服:</span><a href=\"tencent://message/?uin=2488983109&amp;Menu=yes\"></a></li>");
    arr.push("<li><span>3号客服:</span><a href=\"tencent://message/?uin=1665308176&amp;Menu=yes\"></a></li>");
    arr.push("<li><span>4号客服:</span><a href=\"tencent://message/?uin=2286126348&amp;Menu=yes\"></a></li>");
    arr.push("<li><span>5号客服:</span><a href=\"tencent://message/?uin=2365168704&amp;Menu=yes\"></a></li>");
    arr.push("<li><span>6号客服:</span><a href=\"tencent://message/?uin=1632878072&amp;Menu=yes\"></a></li>");
    arr.push("</ul>");
    arr.push("<p>客户至上 用心服务</p>");
    arr.push("</div>");
    arr.push("<a href=\"#\" class=\"nav\"></a>");
    arr.push("</div>");
    var html = arr.join("");
    $(".hc_con").append(html);
}
;
$(function () {
    SetQQKF();
    $(".qqkf").live("mouseover",function () {
        var obj = $(this);
        obj.find(".serverOnline").show();
    }).live("mouseout",function () {
        var obj = $(this);
        obj.find(".serverOnline").hide();
    })
})
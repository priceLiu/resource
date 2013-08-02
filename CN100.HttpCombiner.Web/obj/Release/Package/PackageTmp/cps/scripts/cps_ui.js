// JavaScript Document
//var channCode = "DTB";//频道ID独立使用JS时，可开启此变量-大台北：DTB，潮流服饰馆：CLFSG，时尚街头鞋：SSJTX
var domain_url = "http://ada.cn100.com/", // http://192.168.0.29:8080/ada/prod-info.action
	/*头图轮换*/
	$listbox = $("#listbox li"),
	$clicklist = $("#clicklist li"),
	Tlistbox = $listbox[0],
	Tclicklist = $clicklist[0],
	index = tindex = FadeTemp = 0,
	/*瀑布流*/
	$cps_body = $('#container'), //瀑布流主体
	currentWidth = 1188, //定义初始宽度
	numOfCol_cont = 5, //列数暂不可变
	cps_offset_x = 5,
	cps_offset_y = 7,
	imgUrlW = 200, //图片宽
	imgUrlH = 200, //图片高
	userIconW = 32,
	userIconH = 32,
	temp_len = 30, //定义临时初始加载数量
	st1_page = true, //是否第一屏
	reload_fun = true, //是否加载
	i_len = 0, //临时初始数
	now_page = 1, //当前页：1
	now_page_tmp = 2, //临时页
	load_cont = 15, ///定义每次加载数量
	now_cont = 0, //现在的屏数
	page_cont = 5, //分页屏数
	total_page = Math.ceil(5 / page_cont), //总页数
	price_s = ""; //价格区间

$(window).load(function() {
	//window resize兼容IE
	$(window).wresize(recontent_size);
	recontent_size();
	/*加载数据*/
	//load_data();
	//blocksit define
	$(window).scroll(function() {
		if (reload_fun) {
			//setTimeout(function(){
			if (now_cont != page_cont) {
				var Cur_WindowH = $(window).height(), //浏览器可见高度
					Cur_WindowW = $(window).width(), //浏览器可见宽
					Cur_scrollTop = $(document).scrollTop(), //滚动条相对于顶部位置
					load_offset = $("#load_more").offset(); //
				if (load_offset.top <= Cur_WindowH || Cur_WindowH + Cur_scrollTop >= load_offset.top) {
					load_data();
				};
			};
			//},500)
		};
	});

	/*鼠标经过产品效果*/
	$(document).on("mouseenter mouseleave", "#container .grid", function(event) {
		if (event.type == "mouseenter") {
			$(this).addClass("ghover");
		} else {
			$(this).removeClass("ghover");
		};
	});

	/*查看所有评论*/
	$(document).on("click", "#container .comm_share", function() {
		var prodId_str = $(this).parent().attr("id");
		lookup_alltask(prodId_str, 1, 20, 1);
	});

	/*喜欢按钮*/
	$(document).on("click", "#container .grid .like", function(event) {

		//未登录时，弹出登录框
		if ($("body").hasClass("openLoginWindow")) {
			var formstr = "<div id=\"curloginboxcou\">" + "<div id=\"divUser\" class=\"LO_divUser\"><p class=\"divUser_name\"><span>用户名：</span><input type=\"text\" name=\"UserName\" value=\"\"></p>" + "<p><span style=\"margin-right: 0px;\">密&nbsp;&nbsp;码：</span><input type=\"password\" name=\"UserPWD\" value=\"\"></p>" + "</div>" + "<div id=\"tipmsg\" style=\"color:Red\"></div>" + "<div style=\"text-align:center;padding-top:5px;\"><input type=\"button\" value=\"登录\" name=\"btLogin\" id=\"btLogin\" onclick='cps_redpacket.login()'></div>" + "<div style=\"text-align:right;padding-right:5px;margin-top:20px;\"><a id=\"forgetPassword\" href=\"http://login.cn100.com/ForgetPassword.aspx\">忘记密码？</a> | <a id=\"linkReg\" href=\"http://member.cn100.com/UserRegister/MemberRegisterMgr.aspx\">免费注册</a></div>" + "</div>";
			art.dialog({
				title: "用户登录",
				content: formstr,
				width: 300,
				height: 150,
				top: 300,
				fixed: true,
				lock: true,
				id: "mylogin"
			});
		}
		//登录时，直接加1
		else if ($("body").hasClass("shutLoginWindow")) {

			var likebase_sta = "",
				prodId_str = $(this).attr("prodid"),
				like_cont = $('.likecont', this).text(),
				wUserName = $(".cn100_welcome a:first").html(),
				wUserCookie = $.cookie(wUserName) === null ? "" : $.cookie(wUserName);

			if (like_cont == "") {
				like_cont = 0;
			};
			like_cont = parseInt(like_cont);
			if (!$(this).hasClass("liked")) {
				$(this).addClass("liked");
				likebase_sta = "1";
				$('.likecont', this).html(like_cont + 1);
				wUserCookie += "#" + $(this).parents(".gridbg").attr("id") + ",";
				var nowDate = new Date();
				$.cookie(wUserName, wUserCookie, {
					expires: new Date(nowDate.setHours(23, 59, 59))
				});
				upload_likebase(prodId_str, likebase_sta);
			};	
		};
	});
	/*价格区间*/
	$(document).on("click", "#price_space li", function() {
		$("#price_space li").removeClass("selected");
		$(this).addClass("selected");
		price_s = $(this).attr("price_s");
		if (price_s == "all") {
			price_s = ""
		};
		now_page_tmp = 1;
		reset_pul(1);
		c_pagingtion();
	});

	/*头图轮换*/
	$clicklist.click(function() {
		if ($(this).hasClass("ban_select")) return false;
		var index = $clicklist.index($(this));
		tindex = index;
		$(this).addClass("ban_select").siblings().removeClass("ban_select");
		$(Tlistbox).fadeOut(1000);
		$($listbox[index]).fadeIn(1000);
		Tclicklist = $(this);
		Tlistbox = $listbox[index];
		return false;
	});
	//模拟点击
	$(Tclicklist).trigger("click");
	FadeT = setInterval(function() {
		AutoRun($clicklist)
	}, 5000);

	$clicklist.add($listbox).hover(function() {
		clearInterval(FadeT);
	}, function() {
		FadeT = setInterval(function() {
			AutoRun($clicklist)
		}, 5000);
	});
});

/*头图自动轮换	*/

function AutoRun($clicklist) {
	tindex = (tindex + 1) % $clicklist.length;
	$($clicklist[tindex]).trigger("click");
};

/*查看全部评论*/

function lookup_alltask(prodId_str, pageNo, pageSize, mode) {
	/*	var json = jQuery.parseJSON(data_tmp3);
	lookup_data(prodId_str,pageNo,pageSize,mode,json);	*/
	$.ajax({
		type: "POST",
		url: domain_url + "cv?m=fac",
		data: {
			"productId": prodId_str,
			"pageNo": pageNo,
			"pageSize": 20
		},
		dataType: "jsonp",
		cache: false,
		async: true,
		crossDomain: true,
		jsonp: "callback",
		jsonpCallback: "callback",
		success: function(json) {
			lookup_data(prodId_str, pageNo, pageSize, mode, json);
		},
		complete: function(XMLHttpRequest, textStatus) {

		},
		error: function(xhr) {
			alert("服务器繁忙，请稍后重试！");
		}
	});
};

function imgResize(imgUrlSource, imgW, imgH) {
	var imgUrlSrc = trimNull(imgUrlSource), //获取图片路径
		ext = imgUrlSrc.substring(imgUrlSrc.lastIndexOf(".")),
		imgUrl = imgUrlSrc.split("=")[1];
	if (imgUrl != undefined) {
		imgUrl = imgUrl.split(".")[0].split("X");
		if (imgUrl == undefined) {
			imgUrl = [200, 200];
		};
	} else {
		imgUrlSrc = imgUrlSrc + "=" + imgW + "X" + imgH + ext;
		imgUrl = [200, 200];
	};
	return imgUrlSrc;
}

function lookup_data(prodId_str, pageNo, pageSize, mode, json) {
	var comm_shareall = "",
		aCom_totalPage = 1,
		data = json[0].result,
		aCom_totalPage = json[0].totalPages;

	for (var i = 0; i < data.length; i++) {
		var imgUrlSrc = imgResize(data[i].userIcon, userIconW, userIconH);
		comm_shareall += '<li><span class="pic" userId="' + data[i].userId + '"><img src="' + imgUrlSrc + '" width="' + userIconW + '" height="' + userIconH + '"></span>' +
			'<p><a>"' + data[i].userName + '"</a>' +
			'<span>' + data[i].content + '</span></p>' +
			'<div class="clear"></div>' +
			'</li>';
	};
	//是否重载
	if (mode == 1) {
		comm_shareall = '<div class="share share_all" id="share_aCom"><ul>' + comm_shareall + '</ul></div><div id="pagination-aCom"></div>';
		art.dialog({
			title: $("#" + prodId_str).find(".prodimg").attr("title") + "的商品所有评论",
			content: comm_shareall,
			//id:'cps_comm_all',
			width: 600,
			height: 380,
			top: 100,
			lock: true
			//cancelValue: '关闭'
		});
		aCom_pagingtion(aCom_totalPage, pageNo, prodId_str, pageSize);
	} else {
		$("#share_aCom").html("<ul>" + comm_shareall + "</ul>");
		aCom_pageroll(aCom_totalPage, pageNo);
	};
};

//更新喜欢数

function upload_likebase(prodId_str, likebase_sta) {
	$.ajax({
		url: domain_url + "cv?m=ulb",
		data: {
			"productId": prodId_str,
			"likebaseSta": likebase_sta,
			"channCode": channCode
		},
		dataType: "jsonp",
		cache: false,
		async: true,
		crossDomain: true,
		jsonp: "callback",
		jsonpCallback: "callback",
		success: function(json) {},
		complete: function(XMLHttpRequest, textStatus) {},
		error: function(xhr) {}
	});
};

/*加载页面产品数据*/

function load_data() {
	reload_fun = false;
	/*    json = jQuery.parseJSON(data_tmp2);
	blocklist_data(json);*/

	$.ajax({
		url: domain_url + "cv?m=getpc",
		data: {
			pageNo: now_page_tmp, //请求的页码
			pageSize: load_cont,
			channCode: channCode, //频道ID
			pricePlace: price_s //区间
		},
		dataType: "jsonp",
		cache: false,
		async: true,
		crossDomain: true,
		jsonp: "callback",
		jsonpCallback: "callback",
		success: function(json) {
			if (json.totalPages == "0") {
				$("#page_more").hide();
				$("#container").css({
					"font-size": "16px",
					"text-align": "center",
					"padding-top": "24px"
				}).html("暂无匹配数据，请浏览其它选项！");

			} else {
				blocklist_data(json);
			}
		},
		complete: function(XMLHttpRequest, textStatus) {

		},
		error: function(xhr) {
			alert("服务器繁忙，请稍后重试！");
		}
	});
};

function blocklist_data(json) {
	var c = "",
		prod = json.result,
		total_len = prod.length;

	for (var i = 0; i < total_len; i++) {
		var prodName = prod[i].prodName,
			prod_price = trimNull(prod[i].price);

		if (prodName.length > 30) {
			prodName = prodName.substr(0, 30) + "..."
		};
		var imgUrlSrc = imgResize(prod[i].imgUrl, imgUrlW, imgUrlH);
		//id='+prod[i].prodId+'		
		c += '<div class="grid"><div class="gridbg" id="' + prod[i].prodId + '">' +
			'<div class="imgholder"><div class="itemprice"><span class="num">¥' + prod_price + '</span></div><a href="' + prod[i].prodLink + '" target="_blank"><img src="' + imgUrlSrc + '" class="prodimg"  title="' + prod[i].prodName + '" alt="' + prod[i].prodName + '" width="' + imgUrlW + '" height="' + imgUrlH + '"></a>' +
			'</div>' +
			'<div class="info">' +
			'<div class="tbuy"><div class="tbuybg"><a href="' + prod[i].prodLink + '" target="_blank" title="立即购买">立即购买</a></div></div>' +
			'<p>' + prodName + '</p>' +
			'<div class="info_fun">' +
			'<div class="like" prodid="' + prod[i].prodId + '"><a class="likeit" href="javascript:;"></a><span class="likecont">' + trimNull(prod[i].likeBase) + '</span></div>' +
			'<div class="comment"><span class="commenttxt">评论</span><span class="num">' + prod[i].commentCount + '</span></div>' +
			'</div>' +
			'<div class="clear"></div>' +
			'</div>';

		/*根据评论个数出底部评论区域*/
		if (prod[i].comments.length > 0) {
			var radom_cont = 3;
			if (prod[i].comments.length <= 2) {
				radom_cont = prod[i].comments.length;
			};
			for (var j = 0; j < Math.ceil(Math.random() * radom_cont); j++) {
				var userIconUrlSrc = imgResize(prod[i].comments[j].USERICON, userIconW, userIconH);
				c += '<div class="share">' +
					'<div class="pic"><img src="' + userIconUrlSrc + '"  width="' + userIconW + '" height="' + userIconH + '" /></div>' +
					'<p><a class="name" href="javascript:;">' + trimNull(prod[i].comments[j].USERNAME) + '</a><span>' + trimNull(prod[i].comments[j].CONTENT) + '</span></p>' +
					'<div class="clear"></div></div>';
			};

			if (prod[i].commentCount > 2) {
				c += '<div class="comm_share"><a href="javascript:;"> 查看全部' + trimNull(prod[i].commentCount) + '条评论...</a>  </div>';
			};
		};
		c += '</div></div>';
	};
	$cps_body.append(c);

	$cps_body.BlocksIt({
		numOfCol: numOfCol_cont,
		offsetX: cps_offset_x,
		offsetY: cps_offset_y
	});

	now_cont++;
	//重载页码
	if (st1_page) {
		total_page = Math.ceil(parseInt(json.totalPages) / page_cont);
		if (total_page < page_cont) {
			//page_cont = total_page
		};
		c_pagingtion();
		$(window).trigger("scroll");
		st1_page = false;
	};
	if (now_cont == page_cont || now_cont == parseInt(json.totalPages)) {
		$("#load_more").hide();
		$("#pagination-cps").show();
		return;
	};

	if (now_cont < page_cont) {
		reload_fun = true;
		now_page_tmp++;
		$("#load_more").show();
	};
	GetUserInfo();
};

/*重置瀑布*/

function reset_pul(mode) {
	//mode = 1.重载页码
	$cps_body.html("").removeAttr("style");
	$(window).scrollTop(0);
	now_cont = 0;
	if (mode == 1) {
		st1_page = true;
	}
	load_data();
	pageroll();
};
/*生成页码*/

function c_pagingtion() {
	/*暂时隐藏分页
	//主页按钮分页
	$(document).on("click", "#pagination-cps a", function() {
		if ($(this).hasClass("previous")) {
			if (now_page != 1) {
				now_page--;
				$("#pagination-cps a").removeClass("active").eq(now_page).addClass("active");
				now_page_tmp = (now_page - 2) * page_cont;
				reset_pul();
			};
		} else if ($(this).hasClass("next")) {
			//下一页按钮click事件 
			if (now_page != total_page) {
				now_page++;
				$("#pagination-cps a").removeClass("active").eq(now_page).addClass("active");
				now_page_tmp = now_page * page_cont + 1;
				reset_pul();
			};
		} else {
			now_page = parseInt($(this).text());
			now_page_tmp = (now_page - 1) * page_cont + 1;
			$("#pagination-cps a").removeClass("active");
			$(this).addClass("active");
			reset_pul();
		};
	});

	if (total_page == 1) {
		//$("#pagination-cps").hide();
	} else {
		var d = '<a index="-1" class="previous previous-off"  href="javascript:;">&#171;上一页</a>' +
			'<a index="0" class="active" href="javascript:;">1</a>';
		for (var i = 2; i <= total_page; i++) {
			d += '<a index="' + i + '" href="javascript:;">' + i + '</a>';
		};
		d += '<a index="1" class="next" href="javascript:;">下一页 &#187;</a>';
		$("#pagination-cps").html(d);
	};
	*/
};

function pageroll() {
	if (now_page == 1 && now_page == total_page) {
		$("#pagination-cps .previous").addClass("previous-off");
		$("#pagination-cps .next").addClass("next-off");
		return;
	} else if (now_page < total_page && now_page != 1) {
		$("#pagination-cps .previous").removeClass("previous-off");
		$("#pagination-cps .next").removeClass("next-off");
	} else if (now_page >= total_page) {
		$("#pagination-cps .next").addClass("next-off");
		$("#pagination-cps .previous").removeClass("previous-off");
	} else if (now_page == 1) {
		$("#pagination-cps .previous").addClass("previous-off");
	};
};

/*生成评论页码*/

function aCom_pagingtion(aCom_totalPage, pageNo, prodId_str, pageSize) {
	//主页按钮分页
	$(document).off("click", "#pagination-aCom a").on("click", "#pagination-aCom a", function() {
		if ($(this).hasClass("previous")) {
			if (pageNo != 1) {
				pageNo--;
				$("#pagination-aCom a").removeClass("active").eq(pageNo).addClass("active");
				lookup_alltask(prodId_str, pageNo, pageSize);
			};
		} else if ($(this).hasClass("next")) {
			//下一页按钮click事件
			if (pageNo != aCom_totalPage) {
				pageNo++;
				$("#pagination-aCom a").removeClass("active").eq(pageNo).addClass("active");
				lookup_alltask(prodId_str, pageNo, pageSize);
			};
		} else {
			pageNo = parseInt($(this).text());
			$("#pagination-aCom a").removeClass("active");
			$(this).addClass("active");
			lookup_alltask(prodId_str, pageNo, pageSize);
		};
	});
	if (aCom_totalPage == 1) {
		//$("#pagination-cps").hide();
	} else {
		var d = '<a index="-1" class="previous previous-off"  href="javascript:;">&#171;上一页</a>' +
			'<a index="0" class="active" href="javascript:;">1</a>';
		for (var i = 2; i <= aCom_totalPage; i++) {
			d += '<a index="' + i + '" href="javascript:;">' + i + '</a>';
		}
		d += '<a index="1" class="next" href="javascript:;">下一页 &#187;</a>';
		$("#pagination-aCom").html(d);
	};
}

function aCom_pageroll(aCom_totalPage, pageNo) {
	if (pageNo == 1 && pageNo == aCom_totalPage) {
		$("#pagination-aCom .previous").addClass("previous-off");
		$("#pagination-aCom .next").addClass("next-off");
		return;
	} else if (pageNo < aCom_totalPage && pageNo != 1) {
		$("#pagination-aCom .previous").removeClass("previous-off");
		$("#pagination-aCom .next").removeClass("next-off");
	} else if (pageNo >= aCom_totalPage) {
		$("#pagination-aCom .next").addClass("next-off");
		$("#pagination-aCom .previous").removeClass("previous-off");
	} else if (pageNo == 1) {
		$("#pagination-aCom .previous").addClass("previous-off");
	};
};

function trimNull(value) {
	if (value == null || value == undefined || value == "null") {
		return "";
	} else {
		return value;
	};
};

function recontent_size() {
	var winWidth = $(window).width();
	var conWidth;
	if (winWidth <= 1120) {
		//conWidth = 1120;
		//numOfCol_cont = 4
	} else {
		conWidth = 1188;
		numOfCol_cont = numOfCol_cont;
	};
	if (conWidth != currentWidth) {
		currentWidth = conWidth;
		$cps_body.width(conWidth);
		$cps_body.BlocksIt({
			numOfCol: numOfCol_cont,
			offsetX: cps_offset_x,
			offsetY: cps_offset_y
		});
	};
};
/*   
=============================================================================== 
WResize is the jQuery plugin for fixing the IE window resize bug 
$( window ).wresize( content_resize ); 
content_resize();
=============================================================================== 
*/
(function($) {
	$.fn.wresize = function(f) {
		version = '1.1';
		wresize = {
			fired: false,
			width: 0
		};

		function resizeOnce() {
			if ($.browser.msie) {
				if (!wresize.fired) {
					wresize.fired = true;
				} else {
					var version = parseInt($.browser.version, 10);
					wresize.fired = false;
					if (version < 7) {
						return false;
					} else if (version == 7) {
						//a vertical resize is fired once, an horizontal resize twice 
						var width = $(window).width();
						if (width != wresize.width) {
							wresize.width = width;
							return false;
						};
					};
				};
			};

			return true;
		};

		function handleWResize(e) {
			if (resizeOnce()) {
				return f.apply(this, [e]);
			};
		};

		this.each(function() {
			if (this == window) {
				$(this).resize(handleWResize);
			} else {
				$(this).resize(f);
			};
		});

		return this;
	};

})(jQuery);

/**
 * jQuery Cookie plugin
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 */
jQuery.cookie = function(key, value, options) {
	// key and value given, set cookie...
	if (arguments.length > 1 && (value === null || typeof value !== "object")) {
		options = jQuery.extend({}, options);

		if (value === null) {
			options.expires = -1;
		};

		if (typeof options.expires === 'number') {
			var days = options.expires,
				t = options.expires = new Date();
			t.setDate(t.getDate() + days);
		};

		return (document.cookie = [
			encodeURIComponent(key), '=',
			options.raw ? String(value) : encodeURIComponent(String(value)),
			options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
			options.path ? '; path=' + options.path : '',
			options.domain ? '; domain=' + options.domain : '',
			options.secure ? '; secure' : ''
		].join(''));
	};

	// key and possibly options given, get cookie...
	options = value || {};
	var result, decode = options.raw ? function(s) {
			return s;
		} : decodeURIComponent;
	return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

/*========================================
新增：用以支持登录才可以点击“喜欢”功能
*=========================================*/
var cps_redpacket = {};

/*登录*/
cps_redpacket.login = function() {
	var obj = $(this);
	var pobj = $("#curloginboxcou");
	var userObj = pobj.find("input[name='UserName']");
	var pwdObj = pobj.find("input[name='UserPWD']");
	if ($.trim(userObj.val()) == "") {
		userObj.focus();
		return;
	}
	if ($.trim(pwdObj.val()) == "") {
		pwdObj.focus();
		return;
	}
	var domain = "http://login.cn100.com/AjaxFile/AjaxLogin.ashx?ra=" + Math.random();
	var data = {
		UserName: userObj.val(),
		Pwd: pwdObj.val()
	};
	$.ajax({
		type: "GET",
		async: true,
		url: domain,
		data: data,
		dataType: "jsonp",
		cache: false,
		jsonp: "jsoncallback",
		crossDomain: true,
		success: function(json) {
			if (json.result == 0) {
				$("#tipmsg").html(json.msg);
			} else {
				var str = "_Customer_Cn100_COM=" + json.msg + "; domain='.cn100.com'; path=/;";
				document.cookie = str;
				art.dialog({
					id: "mylogin"
				}).close();
				GetUserInfo();
			};
		}
	});
};

//重构login脚本

function GetUserInfo() {
	var n = "http://login.cn100.com";
	n != "" && $.ajax({
		type: "GET",
		url: "" + n + "/AjaxFile/UserInfo.ashx",
		data: {
			t: 1,
			ac: "useranddomain",
			template: 1
		},
		dataType: "jsonp",
		cache: !1,
		crossDomain: !0,
		jsonp: "jsoncallback",
		success: function(n) {
			var t = n[2],
				i = n[0],
				wUserName = "";
			$(".cn100_shops").replaceWith(t.Html);
			wUserName = $(".cn100_welcome a:first").html();

			if (wUserName == "登录") {
				$("body").removeClass("shutLoginWindow").addClass("openLoginWindow");
			} else {
				$("body").removeClass("openLoginWindow").addClass("shutLoginWindow");

				//获得cookie值确定喜欢按钮是否可点击
				if ($.cookie(wUserName) !== null) {
					$($.cookie(wUserName)).find(".like").addClass("liked");
				};
			};
		},
		complete: function() {},
		error: function() {}
	})
}
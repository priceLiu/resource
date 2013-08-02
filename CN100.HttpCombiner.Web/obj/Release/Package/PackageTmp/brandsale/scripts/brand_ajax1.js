//var url="http://192.168.0.29:8080/ada/prod-info!channBrandPage.action";
var datatmp = {};

var brandlisturl = "brandsalelist.html?urlDate="; //品牌列表页面地址
var showprod = "",brandIconStr = "";
var brandbgpic, brandtitle, prod, prodlen, prodimgurl, onsale, brandname, prodname, prodLink, curPrice, oldPrice, isSoldOut;
var total_page=1,now_page=1,now_page_tmp=1,page_cont=1,mycategoryId="",myurl="http://ada.cn100.com/cv?m=getbdp&callback=callback&channCode=PPTM";
//加载页面数据

function ajaxRequest(url, activeId, brandId, index) {
	//如果请求函数时活动和品牌ID为空，从地址栏获得参数
	if (activeId == "") {
		var activeId = GetQueryString("activeId"); //活动ID
	}
	if (brandId == "") {
		var brandId = GetQueryString("brandId"); //品牌ID
	};
	$.ajax({
		url: url,
		data: {
			channCode: "PPTM",
			activeId: activeId,
			brandId: brandId
		},
		type: "get",
		dataType: "jsonp",
		cache: false,
		async: true,
		crossDomain: true,
		//jsonp:"callback",
		jsonpCallback: "callback",
		success: function(data, textStatus) {
			var data = data;
			if (index == 1) {
				indexshow();
			} else if (index == 2) {
				listshow();
			};

			function indexshow() {
				//活动时间
				var startTime = data[0].START_DATE;
				var endTime = data[0].END_DATE;
				cheapestCountDown(startTime, endTime);
				//产品信息
				datatmp = strToJson(data[0].CHANN_BRAND_PAGE); //把返回的字符串转成JSON
				var typelen = datatmp.length;

				brandlisturl +="&channCode=PPTM" + "&activId=" + data[0].ACTIV_ID;
				for (var i = 0; i < typelen; i++) {
					brandlisturl += "&brandId=" + datatmp[i].BRANDID;
					brandbgpic = imgResize(datatmp[i].PICURL,1190,279);
					brandtitle = datatmp[i].BRANDTITLE;
					prod = datatmp[i].prods;
					prodlen = prod.length;

					brand();

					brandlisturl = brandlisturl.split("&brandId=")[0];

					showprod += "<ul class=\"bs_pro_con\">";
					for (var j = 0; j < prodlen; j++) {
						prodimgurl = imgResize(prod[j].PICURL,212,212);
						onsale = prod[j].ONSALE;
						brandname = prod[j].BRANDNAME;
						prodname = prod[j].PRODNAME;
						prodLink = prod[j].prodLink;
						list(0);


					};
					showprod += '</ul><div class="clear"></div></div>';

					var $bs_conBox = $(".bs_conBox");
					$bs_conBox.html(showprod);

				};
			};
			//列表页

			function listshow() {
				//活动时间
				var startTime = data.START_DATE;
				var endTime = data.END_DATE;
				total_page=data.totalPages;

				cheapestCountDown(startTime, endTime);


				//品牌列表

				//品牌信息
				brandlisturl +="&channCode=PPTM" + "&activId=" + data.ACTIV_ID + "&brandId=" + data.BRAND_ID;
				brandbgpic = imgResize(data.PIC_URL,1190,279);
				brandtitle = data.BRAND_TITLE;
				brand();
				brandlisturl = brandlisturl.split("urlDate=")[0];

				//分类
				var prodSort = strToJson(data.CUST_CATEGORY);
				showprod += '<p class="bs_brand_class"><b>分类：</b>';
				for (var n = 0; n < prodSort.length; n++) {
					showprod += '<a href="javascript:;" categoryId="'+prodSort[n].ID+'">' + prodSort[n].CLASSIFY_NAME + '</a><i>(' + prodSort[n].PRODNUM + ')</i>';
				}
				showprod += '</p><div class="bs_pro_con"><ul>';

				////////////////////////////

				//产品信息
				var prods = strToJson(data.prods);

				for (var p = 0; p < prods.length; p++) {
					prodimgurl = imgResize(prods[p].imgUrl,212,212);
					onsale = prods[p].onSale;
					brandname = prods[p].BRANDNAME;
					prodname = prods[p].prodName;
					prodLink = prods[p].prodLink;
					isSoldOut = prods[p].isSoldOut;
					oldPrice = prods[p].oldPrice;
					curPrice = prods[p].curprice;
					list(1);
				}
				showprod += '</ul><div class="clear"></div></div>';

				var $bs_conBox = $(".bs_conBox");
				$bs_conBox.html(showprod);

				c_pagingtion();

				//品牌展示信息
				var icons = strToJson(data.BRANDS),
				nowUrl=document.location.href;

				brandIconStr += '<li class="iconTitle"><a href="#" onclick="return false;"><img width="116" height="55" alt="" src="http://resource1.cn100.com/brandsale/images/bs_online_brand.png"/></a></li>';

				for (var i = 0,iLen=icons.length; i <iLen ; i++) {
					iChannCode = icons[i].CHANNCODE;
					iActivId = icons[i].ACTIVID;
					iBrandId = icons[i].BRANDID;
					iPicUrl = imgResize(icons[i].PICURL,116,55);
					brandlisturl+="urlDate=&channCode="+iChannCode+"&activId="+iActivId+"&brandId="+iBrandId;
					brandIcon(nowUrl,i);
					brandlisturl = brandlisturl.split("urlDate=")[0];
					
				};
				brandlisturl+='<li class="closeLi"><a href="#" class="bs_brand_close">收起</a></li>';

				$(".bs_brand_logo").html(brandIconStr);

				//顶部广告图
				var adPic = strToJson(data.ads),
					adStr="";

				for (var p = 0; p < adPic.length; p++) {
					var adUrl = adPic[p].PIC_LINK_URL,
						adImgSrc = imgResize(adPic[p].PIC_SRC_URL,1190,100);
					
					adStr+='<a href="'+adUrl+'" target="_blank"><img src="'+adImgSrc+'" width="1190" height="100" alt=""/></a>';
				};

				$(".bs_top_img").html(adStr);

				//预留广告切换函数插入

				var $category = $(".bs_brand_logo li:gt(9)"),
					$moreLi = $(".moreLi"),
					$closeLi = $(".closeLi");

				$category.hide();

				$moreLi.click(function() {
					$(this).hide();
					$closeLi.show();
					$category.show();
				});

				$closeLi.click(function() {
					$(this).hide();
					$moreLi.show();
					$category.hide();
				});

			};

			//列表页展示

			function list(price) {
				showprod += '<li> <a href="' + prodLink + '" target="_blank" class="prodAImg"><img src="' + prodimgurl + '" width="212" height="212" alt=""/><i class="bs_onsale_' + onsale + ' ie6_png24">折扣</i></a> <b>' + brandname + '</b><br>' +
					'<a href="' + prodLink + '" target="_blank">' + prodname + '</a> ';
				if (price == 1) {
					showprod += '<i class="bs_price">￥' + curPrice + '</i><i class="bs_greyprice">原价￥' + oldPrice + '</i><div class="clear"></div>'
				};
				showprod += '</li>';
			};

			//品牌展示

			function brand() {
				showprod += '<div class="bs_con">' +
					'<a href="' + brandlisturl + '" class="brandAImg"><img src="' + brandbgpic + '" width="1190" height="279" alt=""/></a>' +
					'<p class="bs_countdown">剩余<i id="RemainD">3</i>天<i id="RemainH">13</i>小时<i id="RemainM">30</i>分<i id="RemainS">06</i>秒</p>' +
					'<p class="bs_enterbrand"><a href="#" target="_blank"><span><i class="bs_enter_font">进入</i>' + brandtitle + '<i class="bs_enter_symbol">&nbsp;>></i></span></a></p>' +
					'</div>';
			};

			//小品牌logo

			function brandIcon(nowUrl,i) {
				if(i===9){
					brandIconStr+='<li class="moreLi"><a class="bs_more_brand" href="#">更多品牌</a></li>';
				};
				if (nowUrl.indexOf(brandlisturl) != -1) {
					brandIconStr += '<li class="currentLogo">' +
						'<a href="' + brandlisturl + '"><img src="' + iPicUrl + '" width="116" height="55" alt=""/></a>' +
						'</li>';
				} else {
					brandIconStr += '<li>' +
						'<a href="' + brandlisturl + '"><img src="' + iPicUrl + '" width="116" height="55" alt=""/></a>' +
						'</li>';
				};
			};

			//新增分类与分页功能

			function ajaxCategoryPage(mydata) {
				$.ajax({
					url: myurl,
					data: mydata,
					type: "get",
					dataType: "jsonp",
					cache: false,
					async: true,
					crossDomain: true,
					//jsonp:"callback",
					jsonpCallback: "callback",
					success: function(data, textStatus) {

						var dataProd = data.prods;
						showprod = "";
						for (var p = 0; p < dataProd.length; p++) {
							prodimgurl = imgResize(dataProd[p].imgUrl,212,212);
							onsale = dataProd[p].onSale;
							brandname = dataProd[p].BRANDNAME;
							prodname = dataProd[p].prodName;
							prodLink = dataProd[p].prodLink;
							isSoldOut = dataProd[p].isSoldOut;
							oldPrice = dataProd[p].oldPrice;
							curPrice = dataProd[p].curprice;
							list(1);
						};
						$(".bs_pro_con ul").html(showprod);
						pageroll();

					},
					complete: function(XMLHttpRequest, textStatus) {

					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {

						alert("服务器繁忙，请稍后重试！");
					}
				})
			};

			/*生成页码*/

function c_pagingtion() {
	//主页按钮分页
	$(document).on("click", "#pagination-cps a", function() {
		if ($(this).hasClass("previous")) {
			if (now_page != 1) {
				now_page--;
				$("#pagination-cps a").removeClass("active").eq(now_page).addClass("active");
				now_page_tmp = (now_page - 2) * page_cont;							
			};
		} else if ($(this).hasClass("next")) {
			//下一页按钮click事件 
			if (now_page != total_page) {
				now_page++;
				$("#pagination-cps a").removeClass("active").eq(now_page).addClass("active");
				now_page_tmp = now_page * page_cont + 1;
			};
		} else {
			now_page = parseInt($(this).text());
			now_page_tmp = (now_page - 1) * page_cont + 1;
			$("#pagination-cps a").removeClass("active");
			$(this).addClass("active");
		};
		ajaxCategoryPage({
								"activId": data.ACTIV_ID,
								"brandId": data.BRAND_ID,
								"categoryId": mycategoryId,
								"pageNo": now_page,
								"pageSize": 15
							});

	});
$(document).on("click", ".bs_brand_class a", function() {
	$(this).addClass("currentSort").siblings("a").removeClass();
					mycategoryId=$(this).attr("categoryId");
					ajaxCategoryPage({
						"activId": data.ACTIV_ID,
						"brandId": data.BRAND_ID,
						"categoryId": mycategoryId,
						"pageNo": 1,
						"pageSize": 15
					});
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
};

		},
		complete: function(XMLHttpRequest, textStatus) {

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {

			alert("服务器繁忙，请稍后重试！");
		}
	})
}


//获取请求参数

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
};

//字符串转JSON

function strToJson(str) {
	return $.parseJSON(str);
};

//倒计时函数

function cheapestCountDown(startTime, endTime,idIndex) {
	var TotalMilliSeconds = endTime - startTime,
		idIndex=idIndex||"";

	function takeCount() {
		//计数减 1 秒
		TotalMilliSeconds -= 1000;
		//计算天时分秒
		var days = Math.floor(TotalMilliSeconds / (1000 * 60 * 60 * 24));
		var hours = Math.floor(TotalMilliSeconds / (1000 * 60 * 60)) % 24;
		var minutes = Math.floor(TotalMilliSeconds / (1000 * 60)) % 60;
		var seconds = Math.floor(TotalMilliSeconds / 1000) % 60;
		//将天时分秒插入到html中
		document.getElementById("RemainD"+idIndex).innerHTML = days;
		document.getElementById("RemainH"+idIndex).innerHTML = hours;
		document.getElementById("RemainM"+idIndex).innerHTML = minutes;
		document.getElementById("RemainS"+idIndex).innerHTML = seconds;
	};
	//执行倒计时功能
	var t=setInterval(takeCount, 1000);
	//倒计时
};

//缺：首页产品链接，列表页品牌名称



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

//jsp日期转成js时间戳
function myJsGetTime(jspTime) {
	var myJsTime = jspTime,
		myJsDate = myJsTime.replace(/[- :]/g, ",").split(".0")[0],
		myJsArr = myJsDate.split(",");
	for (var i = 0, len = myJsArr.length; i < len; i++) {
		if (i === 1) {
			myJsArr[i] = parseInt(myJsArr[i],10) - 1;

		} else {
			myJsArr[i] = parseInt(myJsArr[i],10)
		};
	};

	return (new Date(myJsArr[0], myJsArr[1], myJsArr[2], myJsArr[3], myJsArr[4], myJsArr[5]).getTime());
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
};

function trimNull(value) {
	if (value == null || value == undefined || value == "null") {
		return "";
	} else {
		return value;
	};
};
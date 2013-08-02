
/* --------------- 爆款：20130704 ------------ */

$(function(){

	//瀑布流
	$("#bs_product").masonry({
	  itemSelector : ".bs_list",
		gutterWidth: 25,
		columnWidth: 261,
		isFitWidth: true
	});
	
	$(".bs_recommend").css("height",$("#bs_product").height()+40);
	
	//产品列表鼠标划过
	$("#bs_hot_list").delegate("li", "hover", function(){
		$(this).toggleClass("bs_hot_list_hover");
	});
	
	$("#bs_product").delegate("li", "hover", function(){
		$(this).toggleClass("bs_list_hover");
	});
	
	//弹窗
	myPop();

});

//弹窗
function myPop(){
	$(".bs_share_more a").click(function(){
		$("#bs_mask").css({
			display:"block",height:$(document).height()
		});
		$("#bs_pop").css({
			left:($("body").width()-$("#bs_pop").width())/2+"px",
			top:($(window).height()-$("#bs_pop").height())/2+$(window).scrollTop()+"px",
			display:"block"
		});
	});	
	$("#bs_closed, #bs_mask").click(function(){
		$("#bs_mask").css("display","none");
		$("#bs_pop").css("display","none");
	});		
}

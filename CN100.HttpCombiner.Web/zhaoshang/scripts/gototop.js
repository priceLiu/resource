function jsgotop(tempp, tdistance, tflag, tclass, tBoxID, tBtnID, nofdFlag) {
	var tdistance = tdistance || 10,
		tclass = tclass || "jsgotop",
		tBoxID = tBoxID || "jsgotop",
		tBtnID = tBtnID || "jsgotop",
		tflag = tflag || false,
		nofdFlag = nofdFlag || false,
		signOX = 0;
	if (!tflag) {
		newSpan = $(document.createElement('span')).attr("id", tBoxID).addClass(tclass).appendTo("body");
	};
	$(window).scroll(function() {
		pot = $(window).scrollTop();
		if (signOX == 0 && pot > tempp) {
			$("#" + tBoxID).stop().css({
				"opacity": "1"
			}).animate({
				top: pot + tdistance
			}, 300, function() {
				$(this).fadeIn(300);
			});
			signOX = 1;
		} else if (signOX == 1 && pot > tempp) {
			$("#" + tBoxID).stop().css({
				"opacity": "1"
			}).fadeIn(50).animate({
				top: pot + tdistance
			}, 500);
		} else if (signOX == 1 && pot < tempp + 1) {
			if (nofdFlag) {
				$("#" + tBoxID).stop().animate({
					top: tempp
				}, 200);
			} else {
				$("#" + tBoxID).stop().animate({
					top: tempp
				}, 200, function() {
					$(this).fadeOut(120)
				});
			}
			signOX = 0;
		};
	});
	$("#" + tBtnID).click(function() {
		$("html,body").animate({
			scrollTop: "0"
		}, 500);
		return false;
	});
	$("#" + tBtnID).hover(function() {
		$(this).animate({
			"opacity": "0.8"
		}, 100);
	}, function() {
		$(this).animate({
			"opacity": "0.5"
		}, 100);
	});
};



$(function() {
	var rbut = $(".b_rbut");
	var lbut = $(".b_lbut");
	rbut.click(function() {
		var $allshowUl = $(this).parents().find(".b_con ul");
		$allshowUl.animate({
			left: -740
		}, "show");
	});
	lbut.click(function() {
		var $allshowUl = $(this).parents().find(".b_con ul");
		$allshowUl.animate({
			left: 0
		}, "show");
	});



});


//公告滚动函数
(function($) {
	$.wMarquee = function(options) {
		var defaults = {
			wBox: ".wBox",
			wTag: "li",
			wHeight: 28,
			wSpeed: 100,
			wDelay: 200
		};
		var o = $.extend({}, defaults, options);

		function wMqEvent() {
			$(o.wBox).find(o.wTag).first().animate({
				marginTop: -o.wHeight
			}, o.wSpeed, function() {
				$(this).appendTo(o.wBox).css("margin-top", "0");
			});
		};

		wMqT = setInterval(wMqEvent, o.wDelay);
	};
})(jQuery);
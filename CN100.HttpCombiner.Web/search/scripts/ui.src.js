
$(window).load(function () {
    //头部分页
    $("#pageup").attr("href", $(".this").attr("href"));
    $("#nextpage").attr("href", $(".upage").eq(1).attr("href"));

    setTimeout(function () {
        var classBut = $('.but');
        classBut.click(function () {

            if ($(this).parent().hasClass('hei')) {
                $(this).parent().removeClass('hei');
            }
            else {
                $(this).parent().addClass('hei');
            };
			$(this).parent().parent().hasClass("butAct") ? $(this).parent().parent().removeClass("butAct") : $(this).parent().parent().addClass("butAct");
        });
        var choBut = $('.seach_classbox .allclassbox .choose_box .cbox .choose span');
        choBut.hover(function () {
            $(this).addClass("spanhover");
            $(this).find('.erro').addClass('errohover');
        }, function () {
            $(this).removeClass("spanhover");
            $(this).find('.erro').removeClass('errohover');
        });

        var $classBut = $('.seach_classbox .allclass .bgfff .but1');
        var $otherhei = $('#otherhei');

        $classBut.click(function () {

            if ($otherhei.hasClass('otherhei')) {
                $otherhei.removeClass('otherhei');
                $(this).parent().height($otherhei.removeClass('otherhei').parent().height());
            }
            else {
                $otherhei.addClass('otherhei');
            }
        });

    }, 1000);
	
	/*add 20130523 by Isaac Ho*/
	var pI = $("#rank-priceform .cpb input"),//价格区间
		pR = $("#rank-priceform .reset"),//价格区间清除
		pO = $("#rank-priceform .fm-price input");
			
		pO.blur(function() {
			 $("#rank-priceform").removeClass("focus");
			 
		});
		
		pI.on("keyup click",function(e){
			if(e.type=="keyup"){
				clearNoNum(this);		
			}else if(e.type=="click"){
				$("#rank-priceform").addClass("focus");	
			}
		});
		//$("body").
		$(document).on("submit",function(e){
			var minP = parseFloat($("#rank-priceform .cpb input.txtl").val()),
			maxP = parseFloat($("#rank-priceform .cpb input.txtr").val());
			if(minP > maxP){
				$("#rank-priceform .cpb input.txtl").val(maxP);
				$("#rank-priceform .cpb input.txtr").val(minP);
			};
		});
		
		pR.on("click",function(e) {
			$("#rank-priceform .cpb input").val("");
		});

    var sBut = $('.seach_classbox .sbut');

    var sparents = $('.seach_classbox');
    var acnone = $('.seach_classbox .acnone')
    sBut.click(function () {
        //alert(acnone.find("div").length);
        if (acnone.find("div").length == 0) {
            acnone.remove();
        }
        else if ($(this).siblings().children().hasClass('acnone')) {

            sparents.find('.acnone').removeClass("acnone").addClass("acblock");
        }
        else {
            sparents.find('.acblock').removeClass("acblock").addClass("acnone");
        }
    });
    var wbut = $('.seach_button');
    $(window).scroll(function () {
        $whei = $(window).scrollTop();
        if ($whei > 450) {
            wbut.addClass('seach_posi');
        }
        else {
            wbut.removeClass('seach_posi');
        }
    });
    var $hoveli = $('.seach_probox ul li .pro');
	var $newTag = $(document.createElement("i")).attr("id", "sJsBorder");
    $hoveli.hover(function() {
		$(this).css({
			"border-color": "#DB0552", 
			"height":"335px"
		})
		$newTag.appendTo($(".imgs",this));
		$(".p_num",this).stop().slideDown();
        
	},
	function() {
		$(this).css({
			"border-color": "#eaeaea"
		});
		$(this).css({
			"height":"315px"
		});
					
		$(".p_num",this).stop().slideUp();
		$("#sJsBorder").remove();
	});
    var $priceBut = $('.seach_button .uprice, .seach_button .dprice,.seach_button ')


    var pclick = $priceBut.click(function () {
        if ($(this).siblings().hasClass("ahover")) {
            $(this).siblings().removeClass("ahover");
            $(this).addClass("ahover");
        }
    })

    //    var ISBNDiscout = $('.rebate')
    //    ISBNDiscout.click(function () {

    //        if (!$(this).hasClass("ahover")) {
    //            $(this).removeClass("ahover");
    //            $(this).addClass("ahover");
    //        }
    //        else {
    //            $(this).removeClass("ahover");
    //        }
    //    })

    var sea_but = $('.seach_button .sort a,.seach_button .srot_po');
    var sea_show = $('.seach_button .srot_po')
    sea_but.hover(function () {
        sea_show.show();
    }, function () {
        sea_show.hide();
    })
});

/*
*
*字数验证、输入类型验证
*clearNoNum(this,mode)
*mode:
*	0:正常模式，且不能为0
*	1:
*	2:
*	3: 
* 	4: 正整数
* 	5:
* 	6:
*	7: 
* 	8: 保留两位小数，且不能为0
*  默认：保留两位小数
*/
function clearNoNum(obj)
{
		//先把非数字的都替换掉，除了数字和.
		obj.value = obj.value.replace(/[^\d.]/g,"");
		//必须保证第一个为数字而不是.
		obj.value = obj.value.replace(/^\./g,"");
		//保证只有出现一个.而没有多个.
		//保证.只出现一次，而不能出现两次以上
		obj.value = obj.value.replace(/\.{2,}/g, "");
		obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
}
// JavaScript Document
/*design by Isaac Ho 2013.05.16*/
/*
使用说明：
添加.inputTextM,.inputTextL,.inputTextS,.inputTextBL任一样式到所需input里。
并添加  ptitle="提示字母" 属性。
*/
(function ($) {
  $.fn.cn100Tips = function(options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      mode: "base",  // These are the defaults
	  maxLength:255,
      //"background-color": "white"
    }, options );
 	var sets = $.extend(settings,options || {});
    //  the collection based on the settings variable
    return this.each(function() {
		//css makeup
	 //add tips dom
	switch(sets.mode){
	 case "base":
		 $(".inputTextM,.inputTextL,.inputTextS,.inputTextBL",this).each(function(index, element) {
			var tipsTxt = trimNull($(this).attr("ptitle"));
			if(tipsTxt!=""){
				$(this).parent().attr({"tips":"tips"+index}).click(function(e) {
					var tindex = $(this).attr("tips");
					if($("#"+tindex).is(":visible")){
						$("#"+tindex).hide();	
					}
				});
				$(this).parent().focusout(function(e) {
					var tindex = $(this).attr("tips");
					if($.trim($("input,textarea",this).val())==""){
						$("#"+tindex).show();
					}
				});
				var itemLeft = $(this).offset().left +1,
				itemTop = $(this).offset().top +3;
				$("body").append("<div class='tipsT' id='tips"+index+"' style='position:absolute; left:"+ itemLeft +"px; top:"+ itemTop+"px; width:"+$(this).width()+"px; height:"+$(this).height()+"px; '>"+tipsTxt+"</div>")
			}
		});
		//bind event
		$(document).on("click",".tipsT",function(){
			var tindex = $(this).attr("id");
			$("label[tips="+tindex+"]").focus();
			$(this).hide();
		}
		)
	 break; 
	 case "maxLength":
	 	$(this).after('<font class="contI">'+$(this).val().length+'/'+sets.maxLength+'</font>');
	 	$(this).on("keyup",function() {
			var thisLength = $(this).val().length;
			if (thisLength <= sets.maxLength) {
				$(this).next().html(Math.ceil(thisLength) + '/'+sets.maxLength);
			} else {
				$(this).val($(this).val().substring(0, sets.maxLength));
			}
			return true
		});
	 break;
	 }
	
		function trimNull(val) {
					if (val == null || val == undefined || val == "null") {
						return "";
					}
					else {
						return val;
					}
		};
    });
 	//
   };
})(jQuery);
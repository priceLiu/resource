/**
 * 热卖频道
 * User: HuanLei
 * Date: 13-7-2
 */
 
$(function(){
	//加载点击切换广告条
	hsAccordion();
	hsAccordionCur();
	
	//产品列表鼠标划过
	$("#hs2_product_info").delegate("li", "hover", function(){
		$(this).toggleClass("hs2_product_active");
	});
	
});
 

 

//广告条
function hsAccordion(){
	var oAccordion = document.getElementById("hs2_accordion");
	var aDt = oAccordion.getElementsByTagName("dt");
	var aDd = oAccordion.getElementsByTagName("dd");
	//aDt[0].style.width = "0px";
	//aDd[0].style.width = "798px";
	for(var i=0; i<aDt.length; i++){
		aDt[i].index = i;
		aDt[i].onclick = function(){
			for(var i=0; i<aDt.length; i++){
				startMove(this, {width:0});
				startMove(aDt[i], {width:91});
				startMove(aDd[i], {width:0});
			}
			startMove(aDt[this.index], {width:0});
			startMove(aDd[this.index], {width:798});
		}
	}
}
 

function hsAccordionCur(){
	var oAccordion = document.getElementById("hs2_accordion");
	var aDt = oAccordion.getElementsByTagName("dt");
	var aDd = oAccordion.getElementsByTagName("dd");
	var aLink = oAccordion.getElementsByTagName("a");
	var curUrl = window.location.href;

	aDt[0].style.width = "0px";
	aDd[0].style.width = "798px";
	
	for(var i=0; i<aLink.length; i++){
		aLink[i].index = i;
		
		if(curUrl.indexOf(aLink[i].href) != -1){
			aDt[0].style.width = "91px";
			aDd[0].style.width = "0px";
			aDt[i].style.width = "0";
			aDd[i].style.width = "789px";
		}
	}
}


function startMove(obj, json, fn){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var bStop = true;
        for(attr in json){
            var iCur = 0;
            if(attr == "opacity"){
                iCur =  Math.round(parseFloat(getStyle(obj, attr)*100));
            }else{
                iCur = parseInt(getStyle(obj, attr));
            };
            var iSpeed = (json[attr]-iCur)/8;
            iSpeed = iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if(iCur != json[attr]){
                bStop = false;
            }
            if(attr == "opacity"){
                obj.style.filter = "alpha(opacity:"+(iCur+iSpeed)+")";
                obj.style.opacity = (iCur+iSpeed)/100;
            }else{
                obj.style[attr] = iCur+iSpeed+"px";
            }
        }
        if(bStop){
            clearInterval(obj.timer);
            if(fn){
                fn();
            };
        }
        
    }, 30);
};

function getStyle(obj, attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj, false)[attr];
    }
};

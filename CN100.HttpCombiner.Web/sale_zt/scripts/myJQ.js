// JavaScript Document


	//--------------------------------弹出---------------------------------//
function showDiv(showD){
			var $showBut=$(showD.showBut);
			var $closeBut=$(showD.closeBut);
			var $newDiv=$(showD.newDiv);
			var $bodyh=$(document.body).height();
			var $bodyw=$(document.body).width();
			var $windowH=$(window).height();
			$showBut.click(function(){
				var $screen=$("<div class='screen'></div>");
				$newDiv.before($screen);
				if($bodyh>$windowH){
				$(".screen").width($bodyw).height($bodyh);
				}
				else{
					$(".screen").width($bodyw).height($windowH);
					}
				$newDiv.fadeIn("fast");
				})
			$closeBut.click(function(){
				$newDiv.fadeOut("fast");
				$(".screen").remove();
				})
				}
	//--------------------------------弹出---------------------------------//


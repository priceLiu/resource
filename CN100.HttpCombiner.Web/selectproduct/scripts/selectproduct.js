// JavaScript Document


function selAlert(abut,tipsCode){
	$(abut).click(function(){
		 
//信息提示
				switch(tipsCode) {
				case "1":
				tipsContent = '<div class="spztTipsContent"><p style="padding:12px 0">该选品账号已存在，请输入新的选品账号</p>'+
								'<div class="spztBtnList"><b class="spztBtnOrg"><a href="#top" class="" target="_self">确定</a></b></div></div>';
				break;
				case "2":
				tipsContent = '<div class="spztTipsContent"><p style="padding:12px 0">该选品昵称已存在，请输入新的选品昵称</p>'+
								'<div class="spztBtnList"><b class="spztBtnOrg"><a href="#top" class="" target="_self">确定</a></b></div></div>'
				break;
				case "3":
				tipsContent = '<div class="spztTipsContent"><p style="padding:12px 0">你确定要删除该选品？</p>'+
								'<div class="spztBtnList"><b class="spztBtnOrg"><a href="#top" class="" target="_self">确定</a></b><b class="spztBtnGrey"><a href="#top" class="" target="_self">取消</a></b></div></div>'
				break;
				case "4":
				tipsContent='<div class="detail"><p><em></em><span>推介成功！已将该商品推介到杂志中！</span></p><p class="refnewsbox"><a class="refnews" href="#">推介该商品到新的杂志</a></p><p class="synchro"> <input class="inputcke" type="checkbox" checked="checked" /><span>同步该商品的推介信息到新的杂志</span></p><p><a class="refother" href="#">推介其他商品</a></p></div>'
				break;
				case "5":
				tipsContent='<div class="detail"><p class="warmprompt">该帐号有关联的杂志，请先取消 杂志与账号的关联，再删除账号？</p><p class="affirm"><a class="confirm" href="#">管理杂志</a><a class="reset" href="#">放弃删除</a></p></div>'
				break;
				case "6":
				tipsContent = '<div class="spztTipsContent"><p style="padding:12px 0">你确定要删除该帐号？</p>'+
								'<div class="spztBtnList"><b class="spztBtnOrg"><a href="#top" class="" target="_self">确定</a></b><b class="spztBtnGrey"><a href="#top" class="" target="_self">取消</a></b></div></div>'
				break;
				case "7":
				tipsContent = '<div class="detail"><p class="message">你确定要删除该杂志？？<p class="affirm"><a class="confirm" href="#">确定</a><a class="reset" href="#">取消</a></p></div>'
				break;
				case "8":
				tipsContent = '<div class="detail"><p class="warmprompt">删除杂志操作会清空杂志中的所有选品，如果要将杂志 中的选品推介到其他杂志，请逐个修改选品推介信息。</p><p class="affirm"><a class="reset" href="#">直接删除</a><a class="confirm" href="#">转移选品</a><a class="reset" href="#">取消</a></p></div>'
				break;
				case "9":
				tipsContent = '<div class="detail"><ul class="smailpiclist"><li><img src="images/picsmall.jpg" width="58" height="59"/></li><li><img src="images/picsmall.jpg"/></li><li><img src="images/picsmall.jpg"/></li><li><img src="images/picsmall.jpg"/></li><li><img src="images/picsmall.jpg"/></li><li><img src="images/picsmall.jpg"/></li><li><img src="images/picsmall.jpg"/></li><li><img src="images/picsmall.jpg"/></li><li><img src="images/picsmall.jpg"/></li></ul><p class="select"><select ><option value="四宫格">四宫格</option></select></p><p class="affirm"><a class="confirm" href="#">重新生成</a><a class="reset" href="#">取消</a></p></div>'
				break;
				default:
				tipsContent = '<div class="spztTipsContent"><div class="spztBtnList"><b class="spztBtnGrey"><a href="#top" class="" target="_self">返回</a></b></div></div>';
				break;
			}

 
  art.dialog({
          title: "信息提示",
          content: tipsContent,
          height: 125,
		  width:260,
		  padding:0,
          drag: false,
          lock: true
  });})}

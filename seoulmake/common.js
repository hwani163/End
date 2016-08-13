jq(document).ready(function(){

	//메뉴
	jq("#gnb > ul > li").bind("mouseenter",function() {
		jq(".sub_2depth").hide();
		jq("#gnb > ul > li").removeClass('on');
		jq(this).addClass('on');
		jq(this).children().next().css('display','block');
	});
	jq("#gnb > ul > li").bind("mouseleave",function() {
		jq(".sub_2depth").hide();
		jq("#gnb > ul > li").removeClass('on');
	});

	jq("#gnb > ul > li > a").focus(function() {
		jq(".sub_2depth").hide();
		jq("#gnb > ul > li").removeClass('on');
		jq(this).parent().addClass('on');
		jq(this).next().css('display','block');
	});

	jq(".btn_focus").focus(function() {
		jq(".sub_2depth").hide();
		jq("#gnb > ul > li").removeClass('on');
	});

	// left메뉴
	jq(document).on('click','.mMenu > li > a',function(){
		jq('.mMenu > li').removeClass('on');
		jq(this).parent().addClass('on');
//		e.preventDefault();
//		e.stopPropagation();
	});

	jq(document).on('click','.sMenu > li > a',function(){
		jq('.sMenu > li > ul').hide();
		jq(this).parent().find('ul').show();
//		e.preventDefault();
//		e.stopPropagation();
	});

});
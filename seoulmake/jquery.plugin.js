jq(function() {

	var firefox = navigator.userAgent.indexOf("Firefox") != -1;
	
	/*2015-08-05 공지사항/채용공고 추가 시작******************************
	var bbs = jq(".bbs_tit > li > a");
	bbs.click(function(){
		TabMenu.OnOff(jq(this), bbs);
		return false;
	});
	bbs.focusin(function(){
		TabMenu.OnOff(jq(this), bbs);
	});
	//2015-08-05 언론보도/계약,입찰
	var bbs2 = jq(".bbs_tit2 > li > a");
	bbs2.click(function(){
		TabMenu.OnOff(jq(this), bbs2);
		return false;
	});
	
	bbs2.focusin(function(){
		TabMenu.OnOff(jq(this), bbs2);
	});*/

	//2015-08-05 메인 진료과 안내,센터,클리닉,의료진검색 탭
	/*var tab4 = jq(".tab_go > ul > li > a");
	tab4.click(function(){
		TabMenu.OnOff(jq(this), tab4);
		
	});
	
	tab4.focusin(function(){
		TabMenu.OnOff(jq(this), tab4);
	}); //*/

	

	/*function viewAction(fadeNum){
		jq('.icon_list .icon_cont:eq(' + fadeNum + ')').addClass('on').siblings().removeClass('on'); 
		//console.log(fadeNum)
	}
	jq('.icon_list .prev').click(function(){
		var obj = jq('.icon_cont.on').prev().get(0); //현재 on되있는 .icon_cont를 선택하여 obj변수에 담는다.
		if (obj) {
			viewAction(jq(obj).index()); //만약 obj가 있으면 viewAction함수를 실행한다.
		} 
	});
	jq('.icon_list .next').click(function(){
		var obj = jq('.icon_list .icon_cont.on').next().get(0); //현재 on되있는 .icon_cont를 선택하여 obj변수에 담는다.
		if (obj) {
			viewAction(jq(obj).index()); //만약 obj가 있으면 viewAction함수를 실행한다.
		} 
	});*/

	/*function viewAction2(fadeNum){
		jq('.icon_list2 .icon_cont:eq(' + fadeNum + ')').addClass('on').siblings().removeClass('on'); 
		//console.log(fadeNum)
	}
	jq('.icon_list2 .prev2').click(function(){
		var obj = jq('.icon_list2 .icon_cont.on').prev().get(0); //현재 on되있는 .icon_cont를 선택하여 obj변수에 담는다.
		if (obj) {
			viewAction2(jq(obj).index()); //만약 obj가 있으면 viewAction함수를 실행한다.
		} 
	});
	jq('.icon_list2 .next2').click(function(){
		var obj = jq('.icon_list2 .icon_cont.on').next().get(0); //현재 on되있는 .icon_cont를 선택하여 obj변수에 담는다.
		if (obj) {
			viewAction2(jq(obj).index()); //만약 obj가 있으면 viewAction함수를 실행한다.
		} 
	});*/

	/*function viewAction3(fadeNum){
		/*jq('.icon_list3 .icon_cont:eq(' + fadeNum + ')').addClass('on').siblings().removeClass('on');
		//console.log(fadeNum)
	}*/
	/*jq('.icon_list3 .prev3').click(function(){
		var obj = jq('.icon_list3 .icon_cont.on').prev().get(0); //현재 on되있는 .icon_cont를 선택하여 obj변수에 담는다.
		if (obj) {
			viewAction3(jq(obj).index()); //만약 obj가 있으면 viewAction함수를 실행한다.
		} 
	});*/
	/*jq('.icon_list3 .next3').click(function(){
		var obj = jq('.icon_list3 .icon_cont.on').next().get(0); //현재 on되있는 .icon_cont를 선택하여 obj변수에 담는다.
		if (obj) {
			viewAction3(jq(obj).index()); //만약 obj가 있으면 viewAction함수를 실행한다.
		} 
	});*/

	//이미지 온오프 공통 2015-08-05
	jq('.onoff a')
		.bind('mouseenter focusin', function(){
		jq(this).find('>img').attr('src',jq(this).find('>img').attr('src').replace('_off','_on'));
	});
	jq('.onoff a')
		.bind('mouseleave focusout', function(){
		jq(this).find('>img').attr('src',jq(this).find('>img').attr('src').replace('_on','_off'));
	});
	
	/*통합검색
	jq('.select_box .box.open').bind('click',function(){
		jq('.select_box ul').hide();
		jq(this).parent().find('ul').show();
		jq('.select_box .box.open').show();
		jq('.select_box .box.close').hide();
		jq(this).parent().find('.box.open').hide();
		jq(this).parent().find('.box.close').show();
		jq(this).parent().find('.box').focus();
	});
	jq('.select_box .box.close').bind('click',function(){
		jq('.select_box ul').hide();
		jq('.select_box .box.open').show();
		jq('.select_box .box.close').hide();
		jq(this).parent().find('.box').focus();
	});

	jq('.quick_cont .open').click(function(){
		if (jq('.quick_cont ul').css('height') == '287px'){
			jq('.quick_cont ul').animate({'height':'574px'});
			jq(this).find('>img').attr('src',jq(this).find('>img').attr('src').replace('btn_more.png','btn_more_close.png'));
		} else {
			jq('.quick_cont ul').animate({'height':'287px'});
			jq(this).find('>img').attr('src',jq(this).find('>img').attr('src').replace('btn_more_close.png','btn_more.png'));
		}
	});*/

	//추가 끝 ***************************************************

	/*컨텐츠 내용탭
	var Stab = jq("#Tab_href > li > a"),
		Jtab = jq(".j_tab");
	Stab.click(function(){
		TabMenu.Href(jq(this));
	});*/

	/*서브gnb
	var gnb = jq("#gnb > li"),
		gnbd = gnb.find(".content > div:last-child > ul > li > ul:last-child > li:last-child > a"),
		tinx = jq("#gnb > li.ov").index();
	gnbd = firefox ? gnbd : gnb;
	
	gnb.mouseenter(function(){
		TabMenu.Hover(jq(this), true);
	});

	jq("#gnb").mouseleave(function(){
		if(tinx !== -1){
			jq("#gnb > li").eq(tinx).addClass("ov");
		}
	});
	gnb.mouseleave(function(){
		TabMenu.Hover(jq(this), false);
	});
	gnb.focusin(function(){
		TabMenu.TabFocus(jq(this), true);
	});
	gnbd.focusout(function(){
		TabMenu.TabFocus(jq(this), false);
	});
*/

	/*서브lnb
	var lnb = jq("#lnb > li"),
		tag = "<a href='#none' class='lnb_a'><i>하위 메뉴 펼치기</i></a>";
	lnb.each(function() {
		if (jq(this).find("ul").length > 0) {
			jq(this).find("ul").before(tag);
		};
	});
	lnb.find(".lnb_a").click(function(){
		Lnb.Click(jq(this));
	});*/

	/*탭메뉴
	var tab = jq("#TabMenu > ul > li > a"),
		tab2 = jq(".lfaci > ul > li > a");
	if (jq("#TabMenu > .SubMenu").length > 0) {
		jq("#TabMenu").css("height", jq(".SubMenu").outerHeight());
	};
	tab.click(function(){
		TabMenu.Play(jq(this), tab);
	});
	tab.not(jq("#TabMenu > ul > li.on > a")).focusin(function(){
		TabMenu.Play(jq(this), tab);
	});


	tab2.click(function(){
		TabMenu.Play(jq(this), tab2);
	});
	tab2.not(jq(".lfaci > ul > li.on > a")).focusin(function(){
		TabMenu.Play(jq(this), tab2);
	});*/

	/*레이어 팝업
	var Popup = jq(".OpenPopup"),
		LayerBg = jq("#LayerBg"),
		LayerClose = jq(".LayerClose");
	Popup.click(function(){
		LayerPopup.Open(jq(this));
	});
	LayerBg.click(function(){
		LayerPopup.Close(jq(this));
	});
	LayerClose.click(function(){
		jq("#Tab_href li").each(function(index) { 
			if(jq(this).find('img').eq(0).attr('src').indexOf('_on') >-1) {
				jq(".con03_list").eq(index).find("button").eq(0).addClass("button_on");
				jq(".button_on").focus();
			} 
		});			
		LayerPopup.Close(jq(this));
	});*/

	/*오버시 이미지 바뀜
	var ImgTag = jq("#Img"),
		Img = jq("#ImgChange > ul > li > a");
	Img.hover(function(){
		ImgChange.SrcChange(jq(this), ".gif", "_on.gif");
	}, function() {
		ImgChange.SrcChange(jq(this), "_on.gif", ".gif");
	});*/

	/*select 이동
	var btn = jq(".lan_btn, .fot_btn"),
		fwin = jq(".fwin");
	btn.click(function(){
		Selects.Click(jq(this), true);
	});
	fwin.click(function(){
		Selects.Click(jq(this), false);
	})*/

	/*토글클래스
	var hidtxt = jq(".hidden_toggle");
	hidtxt.click(function(){
		Toggle.Class(jq(this), "hidden_text");
	});*/

	
	/*window function
	jq(window).load(function(){
		Lnb.Height();
	});
	jq(window).scroll(function(){
		Quick.Scroll();
	});
	jq(window).resize(function(){
		LayerPopup.Check();
	});*/


	/* class start */
	//lnb
	/*var Lnb = {
		Click: function(jqthis) {
			if (!jqthis.parent("li").hasClass("on")) {
				lnb.removeClass("on");
				jqthis.parent("li").addClass("on");
				Lnb.Height();
			} else {
				jqthis.parent("li").removeClass("on");
			}
		},
		Height: function() {
			Lnb.Chei = jq("#page > .container > .content").outerHeight();
			Lnb.Lhei = jq("#lnb").outerHeight() + 144;
			if (Lnb.Lhei > Lnb.Chei) {
				jq("#page > .container > .content").css("height", Lnb.Lhei);
			}
		}
	}*/

	/*탭메뉴 크래스
	var TabMenu = {
		Play: function(jqthis, Tab) {
			if (!jqthis.hasClass("on")) {

				if (jqthis.find("> img").length > 0) {
					ImgChange.SrcChange(jqthis, "_off.gif", "_on.gif");
				}

				if (jqthis.next(".SubMenu").length > 0 || jqthis.next(".TabBoard").length > 0) {
					var suboard = jqthis.next(".SubMenu") || jqthis.next(".TabBoard");
					jq("#TabMenu").css("height", suboard.outerHeight());
				}

				jqthis.parent("li").addClass("on");
				Tab.not(jqthis).each(function() {
					jq(this).parent("li").removeClass("on");
					if (jq(this).find("> img").length > 0) {
						ImgChange.SrcChange(jq(this), "_on.gif", "_off.gif");
					}
				});
			}
			return false;
		},
		TabFocus: function(jqthis, is) {
			if (is) {
				jq("#gnb").children("li").removeClass("ov");
				jqthis.addClass("on");
			} else {
				jqthis.parents("#gnb").find("> li").removeClass("on");
			}
		},
		Hover: function(jqthis, is) {
			if (firefox) {
				if (is) {
					jq("#gnb").children("li").removeClass("ov");
					jqthis.addClass("on");
				} else {
					jqthis.parents("#gnb").find("> li").removeClass("on");
				}
			} else {
				if (is) {
					jq("#gnb").children("li").removeClass("ov");
					jqthis.addClass("on");
				} else {
					setTimeout(function(){
						jqthis.removeClass("on");
					}, 10);
				}
			}

		},
		OnOff: function(jqthis, elm) {
			if (!jqthis.hasClass("on")) {
				jqthis.parent("li").addClass("on");
				ImgChange.SrcChange(jqthis, "_off.gif", "_on.gif");
				elm.not(jqthis).each(function() {
					jq(this).parent("li").removeClass("on");
					ImgChange.SrcChange(jq(this), "_on.gif", "_off.gif");
				});
			};
			//return false;
		},
		Href: function(jqthis) {
			this.Class = jqthis.attr("href").replace("#", ".");
			if (!jq(this.Class).hasClass("on")) {
				Jtab.removeClass("on");
				jq(this.Class).addClass("on");
				ImgChange.SrcChange(jqthis, "_off.gif", "_on.gif");
				if (jqthis.find("> img").length > 0) {
					Stab.not(jqthis).each(function() {
						ImgChange.SrcChange(jq(this), "_on.gif", "_off.gif");
					})
				}
			}
		}
	};*/

	/*레이어 팝업 크래스
	var LayerPopup = {
		Open: function(jqthis) {
			LayerPopup.ThisHref = jqthis.attr("href").replace("#", "."),
			  LayerPopup.ScrTop = jq(window).scrollTop() || jq("body").scrollTop();

			LayerPopup.Check();


			jq("#LayerBg").attr("style", "filter:alpha(opacity=70)").show(0);

			jq(LayerPopup.ThisHref).show(0);
			jq(".LayerPopup2").not(jq(LayerPopup.ThisHref)).hide();

			return false;
		},
		Check: function() {
			if (jq(LayerPopup.ThisHref).outerHeight() > jq(window).height()) {
				jq(LayerPopup.ThisHref).css({
					"position": "absolute",
					"top": LayerPopup.ScrTop + 30,
					"margin-left": -(jq(LayerPopup.ThisHref).outerWidth() / 2)
				});
			} else {
				jq(LayerPopup.ThisHref).css({
					"position":"fixed",
					"top": "50%",
					"margin-top": -(jq(LayerPopup.ThisHref).outerHeight() / 2),
					"margin-left": -(jq(LayerPopup.ThisHref).outerWidth() / 2)
				});
			}
		},
		Close: function(jqthis) {
			if (jqthis.attr("href")) {
				var ThisHref = jqthis.attr("href").replace("#", "");
				jq("." + ThisHref).hide(0);
				if (jqthis.parents(".guide_lay").length > 0) {
					jq("#LayerBg").hide(0);
					jq(".LayerPopup2").hide(0);
				}
			} else {
				if (jqthis.attr("id") === "LayerBg") {
					jq("#LayerBg").hide(0);
				}
				jq(".LayerPopup").hide(0);
			}
			return false;
		}
	}*/

	/*퀵메뉴
	var Quick = {
		Scroll: function() {
			var Qui = jq("#Quick"),
				Body = jq("body"),
				Html = jq("html"),
				BHhei = Body.outerHeight() || Html.outerHeight(),
				BHtop = Body.scrollTop() || Html.scrollTop(),
				Pagest = BHhei - 550 + Qui.outerHeight();

			if (jq("#Quick").length > 0) {
				if (BHtop > 300 && Pagest > BHtop) {
					Qui.stop(true, false).animate({
						top: BHtop - 210
					}, 500);
				} else {
					Qui.stop(true, false).animate({
						top: 90
					}, 500);
				}
			}
			return false;
		}
	}*/

	/*select링크
	var Selects = {
		Click: function(jqthis, win) {
			this.Class = jqthis.attr("href");
			this.url = jq(this.Class).find("option:selected").attr("value");

			if (this.url && win) {
				window.open(this.url, "");
			} else {
				window.location.href = this.url;
			}
			return false;
		}
	}

	var Toggle = {
		Class: function(jqthis, clas) {
			this.elm = jqthis.attr("href");
			jq(this.elm).toggleClass(clas);
		}
	}*/

	/*이미니 온오프
	var ImgChange = {
			SrcChange: function(jqthis, fr, la) {
				var src = jqthis.find("> img").attr("src");
				src = src.replace(fr, la);
				jqthis.find("> img").attr("src", src);
			}
		}*/
		/* class end */
});
	/*!
	 * jcms JavaScript Library v0.0.1
	 * Copyright 2013 jener system and jcchoi10
	 * Date: 2013-05-07 16:04:01
	 */
	 
	function popup_window(pageurl, winname, w, h, scroll_yes, attr)
	{	// attr = ',resizable=no, status=yes';
	
		if(typeof(attr) == "undefined")
			attr = "";
		var leftpos = (screen.width) ? (screen.width-w)/2 : 0;
		var toppos = (screen.height) ? (screen.height-h)/2 : 0;
		var settings = 'height='+h+',width='+w+',top='+toppos+',left='+leftpos+',scrollbars='+scroll_yes + attr;
		var win = window.open(pageurl, winname, settings);
		return win;
	}
	
	
	/*******************************************************************
	// setDatepicker : 
    //jquery-1.9.1.js,jquery-ui.js,jquery-ui.css  파일 필요함
	setDatepicker(); //달력셋팅하는 부분, 페이지에서 한번호출  
	jq("#testdate").datepicker(); //아이디별 한번 호출
	jq("#testdate").val(get_date_format());//현재날짜셋팅 1999-12-31
	<form>
	<input class="text calendar" type="text" id="testdate" name="testdate" size="12" readonly="readonly" />
	</form>
	*******************************************************************/

	function setDatepicker(flag){
		jq.datepicker.regional['ko'] = {
			defaultDate: null,
			closeText: '닫기',
			prevText: '이전',
			nextText: '다음',
			currentText: '오늘',
			changeMonth:true,
			changeYear:true,
			monthNames: ['1월','2월','3월','4월','5월','6월', '7월','8월','9월','10월','11월','12월'],
			monthNamesShort:  ['1월','2월','3월','4월','5월','6월', '7월','8월','9월','10월','11월','12월'],
			dayNames: ['일','월','화','수','목','금','토'],
			dayNamesShort: ['일','월','화','수','목','금','토'],
			dayNamesMin:  ['일','월','화','수','목','금','토'],
			weekHeader: '요일',
			dateFormat: (flag == 'y') ? 'yy.mm.dd' : 'yymmdd',
			firstDay: 0,
			isRTL: false,
			showMonthAfterYear: true, 
			showButtonPanel:true,
			yearSuffix: '',
			showOn:"both", // 'button' :, 'both' : 
			buttonImage:"/pms/img/board/icon_calendar.gif", 
			showAnim:"slide", //[show|slideDown|fadeIn]
			buttonText:'달력', //  alt
			buttonImageOnly: true
		}; 
		
		jq.datepicker.setDefaults(jq.datepicker.regional['ko']); 
		jq("#ui-datepicker-div").hide();
	}


	function setDatepickerEng(flag){
		jq.datepicker.regional['ko'] = {
			defaultDate: null,
			closeText: 'close',
			prevText: 'prev',
			nextText: 'next',
			currentText: 'today',
			changeMonth:true,
			changeYear:true,
			monthNames: ['1(JAN)','2(FEB)','3(MAR)','4(APR)','5(MAY)','6(JUN)', '7(JUL)','8(AUG)','9(SEP)','10(OCT)','11(NOV)','12(DEC)'],
			monthNamesShort: ['1(JAN)','2(FEB)','3(MAR)','4(APR)','5(MAY)','6(JUN)', '7(JUL)','8(AUG)','9(SEP)','10(OCT)','11(NOV)','12(DEC)'],
			dayNames: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
			dayNamesShort: ['Su','Mo','Tu','We','Th','Fr','Sa'],
			dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
			weekHeader: 'Wk',
			dateFormat: (flag == 'y') ? 'yy.mm.dd' : 'yymmdd',
			firstDay: 0,
			isRTL: false,
			showMonthAfterYear: true, 
			showButtonPanel:true,
			yearSuffix: '',
			showOn:"both", // 'button' :, 'both' :  
			buttonImage:"/pms/img/board/icon_calendar.gif", 
			showAnim:"slide", //[show|slideDown|fadeIn]
			buttonText:'calendar', //  alt
			buttonImageOnly: true
		}; 
		
		jq.datepicker.setDefaults(jq.datepicker.regional['ko']); 
		jq("#ui-datepicker-div").hide();
	}

	function get_date_format()
	{
		 var date = new Date();
	 
			var yyyy = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			var mm="mm"; 
			var dd="dd" ;
			var date1=""; 
			
			 
			if(m<10) mm="0" +m; 
			else mm=m;
			if(d<10) dd="0" +d; 
			else dd=d; 
			 
			date1=yyyy+"" +mm+""+dd; 
	 	return date1;
	} 

	function get_date_format_prev()
	{
		 var date = new Date();
		 
			var yyyy = date.getFullYear()-1;
			var m = date.getMonth()+1;
			var d = date.getDate();
			var mm="mm"; 
			var dd="dd"; 
			var date1=""; 

			if(m<10) mm="0" +m; 
			else mm=m;
			if(d<10) dd="0" +d; 
			else dd=d; 
			 
			date1=yyyy+"" +mm+""+dd; 
	 	return date1;
	} 
	
	function get_total_page(page_no,page_totalrows,list_size)
	{
		var html_total_page= "총 : <strong>"+ page_totalrows +"</strong> (<strong class='now'>"+page_no+"</strong>/"+(parseInt(page_totalrows/list_size)+1)+" page)";
		return html_total_page;
	} 
	
	function get_list_page(func_name,page_noX,total_rowsX,list_sizeX)
	{
	
		var blockPage=0,blockPagePrev=0, nextPage=0, prePage=0;
		var returnTag="";
		var pageCnt=0;
		var blockSize=10;
		var i=0;
		var page_no=0,total_rows=0,list_size=0;
		page_no=parseInt(page_noX);
		total_rows=parseInt(total_rowsX);
		list_size=parseInt(list_sizeX);
		
		if (list_size<1) {
			list_size=10;
		}
	
		if (total_rows > 1){
				pageCnt = parseInt((total_rows -1)/list_size+1);
		}else{
				pageCnt=0;
		}
	
		blockPage = parseInt((page_no-1)/blockSize) * blockSize + 1; 
		//페이지가 속한 시작페이지
		
		
		if (blockPage > 1){
			blockPagePrev = blockPage-blockSize;
			if (blockPagePrev<1) blockPagePrev=1;
			returnTag = returnTag + "<a href='#' onclick='" + func_name +"("+  blockPagePrev + "); return false;'  class='direction'><img src='/jcms/images/bbs/btn_prev2.gif' alt='10개 이전'/></a> ";
		}
	
		if (page_no > 1){
		   prePage =parseInt(page_no)-1;
		   returnTag = returnTag + "<a href='#' onclick='" + func_name +"("+ (prePage) + "); return false;'  class='direction'><img src='/jcms/images/bbs/btn_prev1.gif' alt='이전'/></a>";
		}
	
		i=1;
		while(i <= 10 && blockPage <= pageCnt){
			if(i > 1){
				returnTag = returnTag + ".";
			}
			if (blockPage == page_no){
				returnTag = returnTag + "<b>" + blockPage  + "</b>";
			}else{
				returnTag =  returnTag + "<a href='#' onclick='" + func_name +"("+  blockPage  + "); return false;'>" + blockPage + "</a>";
			}
			blockPage = blockPage + 1;
			i = i + 1;
		}
	
		nextPage = parseInt(page_no)+ 1;
		if (page_no < pageCnt) {
		    returnTag = returnTag + "<a href='#' onclick='" + func_name +"("+  nextPage + "); return false;'  class='direction'><img src='/jcms/images/bbs/btn_next1.gif' alt='다음'/></a>";
		}
	
		if (blockPage <= pageCnt){
			returnTag =  returnTag +"<a href='#' onclick='" + func_name +"("+  blockPage + "); return false;'  class='direction'><img src='/jcms/images/bbs/btn_next2.gif' alt='10개 이후'/></a>";
		}
		
		return returnTag;
		
	 
	}
	
	// time1=btime.substr(0,2)+":"+btime.substr(2,2); 
	function NN(str){    
		 if(str == null || str == "null" || str == "undefined"){
		        return "00";
		    }else{
				if(parseInt(str) <10) str="0"+parseInt(str);
		        return str;
		    }
	} 
	 

	// 자릿수만큼 문자열 채우기
	// str_pad(변수, 총자릿수, 채울문자, 채울 방향); // L,R, B

	function str_pad(input, length, string, type) {
		if (input.length >= length) return input;	

		

		var string = string || '0', 

			input = input + '',

			type = type || 'L';

			inputLength = input.length;

			pad = Array(length - inputLength + 1).join(string);

		switch (type) {

			case 'L': 

				result = pad + input;

				break;

			case 'R': 

				result = input + pad;

				break;

			case 'B': 

				var i = parseInt((length - inputLength) / 2);

				result = pad.substring(0,i) + input + pad.substring(i, length - i + 1);			

				break;

		}

	    return result;

	//document.write( str_pad('12', 5, 0) + '<br/>' ); 
	//document.write( str_pad('12', 5, 0, 'STR_PAD_LEFT') + '<br/>' ); 
	//document.write( str_pad('12', 5, 0, 'STR_PAD_RIGHT')  + '<br/>' ); 
	//document.write( str_pad('12', 5, 0, 'STR_PAD_BOTH')  + '<br/>' )


	}


	function nvl1(str){    
		 if(str == null || str == "null" || str == "undefined"){
		        return "";
		    }else{
		        return str;
		    }
	} 
	function nvl(str,repl){    
		  if(str == null || str == "null" || str == "undefined"){
		        return repl;
		    }else{
		        return str;
		    }
	}
	function text2html(  strText){
		var strHtml =""; 
		strHtml=strText;
		strHtml = strHtml.replace(/\r\n/g, "-RN");
		strHtml = strHtml.replace(/\n/g, "-N");
		strHtml = strHtml.replace(/\r/g, "-R");
		
		strHtml = strHtml.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
		//strHtml = strHtml.replace(/ /g, "&nbsp;");
		strHtml = strHtml.replace(/"/g, "&quot;");
		strHtml = strHtml.replace(/'/g, "&apos;");
		return strHtml;
	
	}
	
	function html2text( strHtml){
		var strText ="";
		
		strText=strHtml; 
		strText = strText.replace(/<rn>/g,"");//"\r\n"
		//strText = strText.replace(/<r>/g,"\r");
		//strText = strText.replace("/<n>/g","\n");
		
		//strText = strText.replace(/&nbsp;/g," "); //스페이스는 수정안함
		strText = strText.replace(/&quot;/g,"\"");
		strText = strText.replace(/&apos;/g,"\'");
		return strText;
	}
	function ajax_proc(url1,callback_func1,frm1,dataType1,type1,async1){  
		var param = jq(frm1).serialize(); 
		jq.ajax({
			async:async1,//true,false
			data:param,
			dataType:dataType1,//"json"
			type:type1,//"post"
			url:url1,
			success:callback_func1,
			error:function(request, status, error){
				alert("Error Code : " + request.status + "\nStatus : " + request.responseText);
			}
		});
	} 
	
	function trim(str) 
	{
		return str.replace(/^\s*|\s*$/g,"");
	}
	
	//-- ======================================================================== 
	//    ajax  관련함수
	//-- ======================================================================== 
	
	//---------ajax new create----------
		
		
	function ajaxCall(paramMap,callback_func){
		//paramMap={url:"test.do",mode:"findDeptNavi",testcode:"00001",....} //url,mode 는 필수항목입니다.
		var url=paramMap.url; 
		jq.ajax({
			data:paramMap,
			dataType:"json",
			type:"post",
			url:url,
			success:function(data){
				callback_func(data);
			},
			error:function(request, status, error){ 
				 //alert("Error Code : " + request.status + "\nStatus : " + request.responseText);
			}
		});
	}
	 
	
	function selectBox_addOptions(listid,data,value_name,text_name)
	{
		for(var i=0; i<data.length; i++){
			var query="jq('<option/>', {	text:data[i]."+text_name+",	value:data[i]."+value_name+"}).appendTo('#"+listid+"')";
			eval(query);
			//jq("<option/>", {text:data[i].gname,	value:data[i].gid}).appendTo('#codecdv');
		}
	}
	function selectBox_removeAllOptions(listid)
	{ 
		var cnt=jq("#"+listid+" option").size();  
		for (var i=0;i<cnt;i++){
			 jq("#"+listid+" option:eq(0)").remove();			  
		}
	}
	
	
	function codeService_findCodeListByGroup(grpcdc,listid,currentMode,currentValue){
		var param ="grpcdc="+grpcdc+"&mode=findCodeListByGroup";
		jq.ajax({
			data:param,
			dataType:"json",
			type:"post",
			url:"/pms/code/ajax.do", 
			success:function(data){
				selectBox_addOptions(listid,data.findCodeListByGroup,"codec","korcodenmv");
				if(currentMode == 'edit')jq("#"+listid).val(currentValue);
			},
			error:function(request, status, error){
				//alert("Error Code : " + request.status + "\nStatus : " + request.responseText);
			}
		});
	}  
	 
	
	
	function codeService_findCodeListByGroupIn(grpcdc,listids,currentMode,currentValues){
	  	
		var param ="grpcdc="+grpcdc+"&mode=findCodeListByGroupIn";
	
		var grpcdcArr = grpcdc.split(","); //"'id1','id2','id3'"
		var listidArr = listids.split(",");
		var currentValueArr = currentValues.split(",");
		var listcnt=listidArr.length; 
		
		if(listcnt.length < 1) {
			alert("입력값을 확인해주세요.");
			return false;
		}
		var query="";
		jq.ajax({
			data:param,
			dataType:"json",
			type:"post",
			url:"/pms/code/ajax.do", 
			success:function(data){   
				for(var j=0;j<listcnt;j++){ 
					for(var i=0; i<data.findCodeListByGroupIn.length; i++){ 
						  if( data.findCodeListByGroupIn[i].grpcdc == grpcdcArr[j].substr(1,4)){ //grpcdcArr[j].substr(1,4) is  'E001'==>E001
						    jq('<option/>', {	
						    	text:data.findCodeListByGroupIn[i].korcodenmv,
						    	value:data.findCodeListByGroupIn[i].codec} 
						    ).appendTo('#'+listidArr[j]); 
						  }
						 //eval(query); 
					}
					//jq("<option/>", {text:data[i].gname,	value:data[i].gid}).appendTo("#"+listid);
				}
				if(currentMode == 'edit'){
					for(var j=0;j<listcnt;j++){
							jq("#"+listidArr[j]).val(currentValueArr[j]);
					}
				}
			},
			error:function(request, status, error){
				//alert("Error Code : " + request.status + "\nStatus : " + request.responseText);
			}
		});
	}  
	

	function attachService_findUploads_sample(url,param1,listid,value_name,text_name)
	{
		var param =param1+"&mode=findUploads";
		jq.ajax({
			data:param,
			dataType:"json",
			type:"post",
			url:url, 
			success:function(data){
				selectBox_addOptions(listid,data.findUploads,value_name,text_name);
			},
			error:function(request, status, error){ 
				 alert("Error Code : " + request.status + "\nStatus : " + request.responseText);
			}
		});
		
	}  
	
	
	function attachService_findAttachFiles_sample(url,param1,listid,value_name,text_name)
	{
		var param =param1+"&mode=findAttachFiles";
		
		jq.ajax({
			data:param,
			dataType:"json",
			type:"post",
			url:url, 
			success:function(data){
				selectBox_addOptions(listid,data.findAttachFiles,value_name,text_name);
			},
			error:function(request, status, error){
				//alert("Error Code : " + request.status + "\nStatus : " + request.responseText);
			}
		});
		
	}  
	
	
	
	function attachService_deleteUpload_sample(url,param1,seq){
		var attachNos_id="attachNos";
		var listid ='cbFiles';
		var value_name='filesnn';
		var text_name='orgfilenmv';
		var param =param1+"&mode=deleteUpload";
	
		jq.ajax({
			data:param,
			dataType:"json",
			type:"post",
			url:url, 
			success:function(data){
				if (data.result=="ok") {//data=='ok'
					var nos = jq("#"+attachNos_id).val().split(",");
					var attachNos = "";
					for(var i = 0; i < nos.length; i++) {
						if(nos[i] == seq || nos[i] == "")		continue;
						if(attachNos != "")	attachNos += ",";
						attachNos += nos[i];
					}
					jq("#"+attachNos_id).val(attachNos);
					selectBox_addOptions(listid,data.deleteUpload,value_name,text_name);
				} else {
					alert('에러가 발생하여 처리되지 않았습니다');
				}
			},
			error:function(request, status, error){
				//alert("Error Code : " + request.status + "\nStatus : " + request.responseText);
			}
		});
		
	}  
	
	 
	
function sample(){
 /*
// 		DeptService.findDeptNavi("<c:out value='${dto.adminBean.deptcdc}'/>", function(deptname) {
//			jq('#deptnmv').html(deptname.substring(3, deptname.length)+"&nbsp;&nbsp;&nbsp;");
//		});
//		com.pms.controller.impl.user.DeptControllerImpl,com.pms.controller.impl.admin.DeptControllerImpl
		
		 ajaxCall({url:"/pms/dept/ajax.do",mode:"findDeptNavi",deptcdc:"<c:out value='${dto.adminBean.deptcdc}'/>"},function(deptname){
				jq('#deptnmv').html(deptname.substring(3, deptname.length)+"&nbsp;&nbsp;&nbsp;");
		});
		  
		
//		DeptService.findLowDeptList("<%=CommonProjectInfo.ROOT_DEPT_CODE%>", function(data) {
//			DWRUtil.addOptions("deptSelect", data.findLowDeptList, "deptcdc", "deptnmv");
//			jq('#deptSelect').val("<c:out value='${dto.deptSelect}'/>");
//		});
		
		 ajaxCall({url:"/pms/dept/ajax.do",mode:"findLowDeptList",highDeptCode:"<%=CommonProjectInfo.ROOT_DEPT_CODE%>"},function(data){
			selectBox_addOptions("deptSelect",data.findLowDeptList,"deptcdc","deptnmv");
			jq('#deptSelect').val("<c:out value='${dto.deptSelect}'/>");
		});
		
		
//		DeptService.findEqualDeptList("${dto.boardDeptcdv}", function(data) {
//			DWRUtil.addOptions("deptcdv", data.findEqualDeptList, "deptcdc", "deptnmv");
//			jq("#deptcdv").val("${dto.boardDeptcdv}");
//		});
		
		 ajaxCall({url:"/pms/dept/ajax.do",mode:"findEqualDeptList",deptcdv:"${dto.boardDeptcdv}"},function(data){
			selectBox_addOptions("deptcdv",data.findEqualDeptList,"deptcdc","deptnmv");
			jq('#deptcdv').val("<c:out value='${dto.boardDeptcdv}'/>");
		});
		
		  
		
//		DeptService.findBoardDeptList("<%=CommonSiteUtil.DONGROOT_DEPT_CODE%>", function(data) {
//			DWRUtil.addOptions("deptcdv", data, "deptcdc", "deptnmv");
//			jq("#deptcdv").val("${dto.boardBean.deptcdv}");
//		});
		
		 ajaxCall({url:"/pms/dept/ajax.do",mode:"findBoardDeptList",deptcdv:"${dto.boardDeptcdv}"},function(data){
			selectBox_addOptions("deptcdv",data.findBoardDeptList,"deptcdc","deptnmv");
			jq('#deptcdv').val("<c:out value='${dto.boardBean.deptcdv}'/>");
		});
		
		
		 
//		  ....
//		  depth
//		  ${dto.maxdepth}
//		  ....
//		  
//		DeptService.findDeptListByUpdept(deptcdv, function(data) {
//			for(var i = (depth+1); i <= ${dto.maxdepth}; i++) {
//				DWRUtil.removeAllOptions("deptSelect"+i);
//				if(i > (depth + 1))
//					document.getElementById("deptSelect"+i).options.add(new Option("          ", ""));
//				jq("#btnSave" + i).addClass("hidden");
//				jq("#orderChange" + i).val("");
//				jq("#deptcdv" + i).val("");
//			}
//		
//			if(data.length == 0)
//				document.getElementById("deptSelect"+(depth+1)).options.add(new Option("          ", ""));
//			else
//				DWRUtil.addOptions("deptSelect"+(depth+1), data, "deptcdc", "deptnmv");
//		}); 
		 
	
	    	ajaxCall({url:"/pms/dept/ajax.do",mode:"findDeptListByUpdept",deptcdv:deptcdv, function(data) {
			
			for(var i = (depth+1); i <= ${dto.maxdepth}; i++) {
				 selectBox_removeAllOptions("deptSelect"+i);
		
				if(i > (depth + 1))
					document.getElementById("deptSelect"+i).options.add(new Option("          ", ""));
				jq("#btnSave" + i).addClass("hidden");
				jq("#orderChange" + i).val("");
				jq("#deptcdv" + i).val("");
			}
		
			if(data.length == 0)
				document.getElementById("deptSelect"+(depth+1)).options.add(new Option("          ", ""));
			else
			    selectBox_addOptions("deptSelect"+(depth+1),data.findDeptListByUpdept,"deptcdc","deptnmv");
			    
		});
		 
		
	 
//	 
//		DeptService.isExists($F('deptcdc'), function(data) {
//			if(data > 0) {
//				alert("이미 사용중인 부서코드 입니다.\n\n다른 코드를 사용하시기 바랍니다.");
//				$("deptcdc").focus();
//				$("deptcdc").select();
//			} else {
//				alert("입력한 부서코드는 사용 가능합니다.");
//				$("deptnmv").focus();
//			}
//		}); 
//	
		
		 ajaxCall({url:"/pms/dept/ajax.do",mode:"isExists",deptcdc:$F('deptcdc')},function(data){
			if(data.isExists > 0) {
				alert("이미 사용중인 부서코드 입니다.\n\n다른 코드를 사용하시기 바랍니다.");
				$("deptcdc").focus();
				$("deptcdc").select();
			} else {
				alert("입력한 부서코드는 사용 가능합니다.");
				$("deptnmv").focus();
			}
		});
		 
		
// 관리자메뉴관리//
// amenuService_findLowAmenuAllList // 사용안함
		
//		
//		AmenuService.findAmenuListByUpmenu(menucdv, function(data) {
//			for(var i = (depth+1); i <= ${dto.maxdepth}; i++) {
//				DWRUtil.removeAllOptions("menuSelect"+i);
//				if(i > (depth + 1))
//					document.getElementById("menuSelect"+i).options.add(new Option("          ", ""));
//				jq("#btnSave" + i).addClass("hidden");
//				jq("#orderChange" + i).val("");
//				jq("#menucdv" + i).val("");
//			}
//		
//			if(data.length == 0)
//				document.getElementById("menuSelect"+(depth+1)).options.add(new Option("          ", ""));
//			else
//				DWRUtil.addOptions("menuSelect"+(depth+1), data, "menucdv", "menunmv");
//		}); 
//		
//		com.pms.controller.impl.admin.AmenuControllerImpl
		  
		ajaxCall({url:"/pms/admin/amenu/ajax.do",mode:"findAmenuListByUpmenu",menucdv:menucdv},function(data){
			for(var i = (depth+1); i <= ${dto.maxdepth}; i++) {
				//DWRUtil.removeAllOptions("menuSelect"+i);
				selectBox_removeAllOptions("menuSelect"+i);
				if(i > (depth + 1))
					document.getElementById("menuSelect"+i).options.add(new Option("          ", ""));
				jq("#btnSave" + i).addClass("hidden");
				jq("#orderChange" + i).val("");
				jq("#menucdv" + i).val("");
			}
		
			if(data.length == 0)
				document.getElementById("menuSelect"+(depth+1)).options.add(new Option("          ", ""));
			else
				//DWRUtil.addOptions("menuSelect"+(depth+1), data.findAmenuListByUpmenu, "menucdv", "menunmv");
			 selectBox_addOptions("menuSelect"+(depth+1),data.findAmenuListByUpmenu,"menucdv","menunmv");
		});
		 
		
//		
//		AmenuService.findLowAmenuListForAdminid({adminidv:"<%=loginidv%>", deptcdv:"<%=deptcdv%>", topmenucdv:topmenu}, function(data) {
//			loadTopMenuTree(data);
//			reloadAuthMenu();
//			loadAdminMenu();
//		});
//		
		
		ajaxCall({url:"/pms/admin/amenu/ajax.do",mode:"findLowAmenuListForAdminid",adminidv:"<%=loginidv%>",deptcdv:"<%=deptcdv%>",topmenucdv:topmenu}, function(data){
			loadTopMenuTree(data.findLowAmenuListForAdminid);
			reloadAuthMenu();
			loadAdminMenu();
		});
		
		 
//		
//		AmenuService.findAmenuBeanByMap({menucdv:menucdv, upmenucdv:upmenucdv}, 
//		
		ajaxCall({url:"/pms/admin/amenu/ajax.do",mode:"findAmenuBeanByMap",menucdv:menucdv, upmenucdv:upmenucdv},callback_func);

//		
//		 AmenuService.isExists($F('menucdv'), function(data) {
//				if(data > 0) {
//					alert("이미 사용중인 메뉴코드 입니다.\n\n다른 코드를 사용하시기 바랍니다.");
//					jq('#menucd'+(LowDepth-1)).focus();
//				} else {
//					alert("입력한 메뉴코드는 사용 가능합니다.");
//					$("menunmv").focus();
//				}
//			});
//			
//			amenuService_isExists($F('menucdv'),LowDepth){
	    //
		
		ajaxCall({url:"/pms/admin/amenu/ajax.do",mode:"isExists",menucdv:$F('menucdv')},function(){
			if(data.isExists > 0) {
					alert("이미 사용중인 메뉴코드 입니다.\n\n다른 코드를 사용하시기 바랍니다.");
					jq('#menucd'+(LowDepth-1)).focus();
				} else {
					alert("입력한 메뉴코드는 사용 가능합니다.");
					$("menunmv").focus();
				}
		});
		 
		
		
//		 사용자메뉴관리 //
//		
//		 UmenuService.findUmenuListByUpmenu({sitecdv:'${dto.sitecdv}', highMenuCode:menucdv}, function(data) {
//				for(var i = (depth+1); i <= ${dto.maxdepth}; i++) {
//					DWRUtil.removeAllOptions("menuSelect"+i);
//					if(i > (depth + 1))
//						document.getElementById("menuSelect"+i).options.add(new Option("          ", ""));
//					jq("#btnSave" + i).addClass("hidden");
//					jq("#orderChange" + i).val("");
//					jq("#menucdv" + i).val("");
//				}
//			if(data.length == 0)
//					document.getElementById("menuSelect"+(depth+1)).options.add(new Option("          ", ""));
//				else
//					DWRUtil.addOptions("menuSelect"+(depth+1), data, "menucdv", "menunmv");
//			});
//		 umenuService_findUmenuListByUpmenu("menuSelect",depth,${dto.maxdepth});
//		
//		   com.pms.controller.impl.admin.UmenuControllerImpl 
		
		ajaxCall({url:"/pms/admin/umenu/ajax.do",mode:"findUmenuListByUpmenu",sitecdv:'${dto.sitecdv}', highMenuCode:menucdv},function(){
			for(var i = (depth+1); i <= ${dto.maxdepth}; i++) {
					//DWRUtil.removeAllOptions("menuSelect"+i);
					selectBox_removeAllOptions("menuSelect"+i);
					if(i > (depth + 1))
						document.getElementById("menuSelect"+i).options.add(new Option("          ", ""));
					jq("#btnSave" + i).addClass("hidden");
					jq("#orderChange" + i).val("");
					jq("#menucdv" + i).val("");
			}
			if(data.findUmenuListByUpmenu.length == 0)
					document.getElementById("menuSelect"+(depth+1)).options.add(new Option("          ", ""));
				else
					selectBox_addOptions("menuSelect"+(depth+1), data.findUmenuListByUpmenu, "menucdv", "menunmv");
					//DWRUtil.addOptions("menuSelect"+(depth+1), data, "menucdv", "menunmv");
			});
		
		 
		
//		
//		 UmenuService.findUmenuBean({menucdv:menucdv, upmenucdv:upmenucdv, sitecdv:"${dto.umenuBean.sitecdv}"}, function(umenuBean) {
//			....
//			}
//			 umenuService_findUmenuBean(menucdv,upmenucdv,"${dto.umenuBean.sitecdv}",callback_func_미정){
//		 
		 ajaxCall({url:"/pms/admin/umenu/ajax.do",mode:"findUmenuBean",menucdv:menucdv, upmenucdv:upmenucdv, sitecdv:"${dto.umenuBean.sitecdv}"},callback_func);
		
//		
//		 UmenuService.findUmenuAssignInfo({adminidv:adminidv, deptcdv:jq('#deptcdv').val()}, function(data) {
//			...
//			});
//		
		
		ajaxCall({url:"/pms/admin/umenu/ajax.do",mode:"findUmenuAssignInfo",adminidv:adminidv, deptcdv:jq('#deptcdv').val()},callback_func);
		
//		
//		 	UmenuService.isExists({sitecdv:$F('sitecdv'), menucdv:$F('menucdv')}, function(data) {
//				...
//			});
//		
		ajaxCall({url:"/pms/admin/umenu/ajax.do",mode:"isExists",sitecdv:$F('sitecdv'), menucdv:$F('menucdv')},callback_func);
		 
		
//		관리자관리 //
//		
//		 AdminService.isExists($F("adminidv").strip(), function(data) {
//				...
//			});
//		
//		 com.pms.controller.impl.admin.AdminControllerImpl
		
		ajaxCall({url:"/pms/admin/ajax.do",mode:"isExists",adminidv:$F("adminidv").strip()},callback_func);
		
		
//		 AdminService.findAdminOrderForDept(deptcd, function(showordern) {
//					jq('#showordern').val(showordern);
//				});
		
		ajaxCall({url:"/pms/admin/ajax.do",mode:"findAdminOrderForDept",deptcd:deptcd},function(showordern){
			jq('#showordern').val(showordern);
		});
		
		 
		
//		 AdminService.findAdminListByDept(deptcdc, function(data) {
//		
		  ajaxCall({url:"/pms/admin/ajax.do",mode:"findAdminListByDept",deptcdc:deptcdc},callback_func); 
		 
		
//		 마일리지정책관리  //
//		 MileageService.isExistsItem($F('mileagecdc'), function(data) {
//				if(data > 0) {
//					alert("이미 사용중인 정책코드 입니다.\n\n다른 코드를 사용하시기 바랍니다.");
//					$("mileagecdc").focus();
//					$("mileagecdc").select();
//				} else {
//					alert("입력한 정책코드는 사용 가능합니다.");
//					$("mileitemv").focus();
//				}
//			});
//		
//		 com.pms.controller.impl.admin.MileageControllerImpl
		 ajaxCall({url:"/pms/admin/mileage/ajax.do",mode:"isExistsItem",mileagecdc:$F('mileagecdc')}, function(data) {
				if(data.isExistsItem > 0) {
					alert("이미 사용중인 정책코드 입니다.\n\n다른 코드를 사용하시기 바랍니다.");
					$("mileagecdc").focus();
					$("mileagecdc").select();
				} else {
					alert("입력한 정책코드는 사용 가능합니다.");
					$("mileitemv").focus();
				}
			});
		
		 
		
//		관리자 권한별 메뉴  관리 //
//		 AuthsetService.findAuthsetListByAuthgrp({authgrpcdc:authcode, topmenucdv:topmenu}, function(data) {
//				for(var i = 0; i < data.length; i++) {
//					mtree.checkDisableSelectNode(data[i].menucdv);
//				}
//			});
//		
//		 url:"/pms/admin/authset/ajax.do", //com.pms.controller.impl.admin.AuthsetControllerImpl'
		  ajaxCall({url:"/pms/admin/authset/ajax.do",mode:"findAuthsetListByAuthgrp",authgrpcdc:authcode, topmenucdv:topmenu}, function(data) {
			for(var i = 0; i < data.findAuthsetListByAuthgrp.length; i++) {
					mtree.checkDisableSelectNode(data.findAuthsetListByAuthgrp[i].menucdv);
				}
			});
		
		 
//		 AuthsetService.existLowMenu({authgrpcdc:authgrpcdc, menucdv:menucdv}, function(data) {
//			
//		 
		  ajaxCall({url:"/pms/admin/authset/ajax.do",mode:"existLowMenu",authgrpcdc:authgrpcdc, menucdv:menucdv}, callback_func);
		
//		관리자별 메뉴권한  관리  //
//		com.pms.controller.impl.admin.AuthmenuControllerImpl'
//		   /pms/admin/authmenu/ajax.do
//			AuthmenuService.findAuthmenuListByAdminid({adminidv:adminidv, topmenucdv:topmenu}, function(data) {
//			...
//		
		
		  ajaxCall({url:"/pms/admin/authmenu/ajax.do",mode:"findAuthmenuListByAdminid",adminidv:adminidv, topmenucdv:topmenu}, callback_func);
		
		 
//		AuthmenuService.removeAdminAuth("${dto.adminBean.adminidv}", function() {
//						alert("초기화 되었습니다.");
//					});
	 
		  ajaxCall({url:"/pms/admin/authmenu/ajax.do",mode:"removeAdminAuth",adminidv:"${dto.adminBean.adminidv}"}, function() {
						alert("초기화 되었습니다.");
					});
		
		
		
//		관리자별 업무권한  관리  //
//		 AuthaffairService.findMyAuthAffair($F('admin_select'), function(data) {
//		url:"/pms/admin/authaffair/ajax.do", 
//		com.pms.controller.impl.admin.AuthaffairControllerImpl
		
		 ajaxCall({url:"/pms/admin/authaffair/ajax.do",mode:"findMyAuthAffair",adminidv:$F('admin_select')}, callback_func );
		 
		
//		 통합게시판 관리 /
//		 public int getCountExistesOpinionPwd(String boardidn, String boardseqn, String opinionseqn, String passwordv) {
//		 
		  ajaxCall({url:"/pms/board/ajax.do",mode:"getCountExistesOpinionPwd", boardidn:boardidn,  boardseqn:boardseqn,  opinionseqn:opinionseqn,  passwordv:passwordv}, callback_func );
		 
//		 public int getCountExistesPwd(String boardidn, String boardseqn, String passwordv) {
		
		  ajaxCall({url:"/pms/board/ajax.do",mode:"getCountExistesPwd", boardidn:boardidn,  boardseqn:boardseqn,  opinionseqn:opinionseqn,  passwordv:passwordv}, callback_func );
		
		
		
		
		 
//		 유형 관리
//		 ResearchResultService.increaseHitcnt(seq, function() {});
//		 url:"/pms/research/ajax.do", //com.pms.controller.impl.user.ResearchResultControllerImpl'
		ajaxCall({url:"/pms/research/ajax.do",mode:"increaseHitcnt", seq:seq, callback_func );
		 
		
		
//		통계 관리//
//		메뉴 접속 이력 //
//		MenustatService.saveMenuHist({browser:navigator.userAgent, sitecdv:"<%=sitecdv%>", menucdv:menucdv}, {});
//		url:"/pms/user/menustat/ajax.do", //com.pms.controller.impl.user.MenustatControllerImpl
		 
		ajaxCall({url:"/pms/user/menustat/ajax.do",mode:"saveMenuHist", browser:navigator.userAgent, sitecdv:"<%=sitecdv%>", menucdv:menucdv}, callback_func );
		
		
		//방문자 이력  //
		//	VisitstatService.saveVisitHist({browser:navigator.userAgent, sitecdv:"<%=sitecdv%>"}, {});
		//	url:"/pms/admin/visitorstat/ajax.do", //com.pms.controller.impl.admin.VisitstatControllerImpl'

		ajaxCall({url:"/pms/admin/visitorstat/ajax.do",mode:"saveVisitHist",browser:navigator.userAgent, sitecdv:"<%=sitecdv%>"}, callback_func );
*/}    
//function callback_func1(){
//	alert("callback_func make youyself ")	
//	
//}

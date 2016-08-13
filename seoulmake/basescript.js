////////////////////////////////////////////////////////////////////
// 파일명  : /js/basescript.js
// 기능    : 일반 공통 자바 스크립트 함수
// 함수명  : 동사_명사( [생략가능인수] )
//        : 시작단어의 첫글자 소문자 사용 각 단어의 첫글자는 대문자 사용
////////////////////////////////////////////////////////////////////


/*******************************************************************
// string.trim() : JavsScript String 객체의 공백제거
// str = str.trim();
*******************************************************************/
String.prototype.trim = function()
{
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

/*******************************************************************
// trim : 문자열의 앞뒤 공백 제거
// 리턴값 : 공백제거한 문자열
// str = trim(str);
*******************************************************************/
function trim(str)
{
	return str.trim();
}

/*******************************************************************
// trimStr : 문자열에서 특정 문자열 제거, 대소문자 구분됨
// 인수   : 전체문자열, 제거문자열
// 리턴값 : 특정 문자열을 제거한 문자열
*******************************************************************/
function trimStr(str, rmch)
{	// 정규식의 예약어
	rmch = rmch.replace(".", "\\.");
	rmch = rmch.replace("*", "\\*");
	rmch = rmch.replace("+", "\\+");
	rmch = rmch.replace("^", "\\^");
	rmch = rmch.replace("$", "\\$");
	rmch = rmch.replace("|", "\\|");
	rmch = rmch.replace("(", "\\(");
	rmch = rmch.replace("?", "\\?");
	var re = new RegExp(rmch, "g")
	return str.replace(re, "");
}

function strEscape(str) {
	var xre = new RegExp("  ", "g")
	return str.replace(xre, "");
}

/*******************************************************************
// trimObj : input 객체를 받아 공백 제거후 값을 객체에 저장, 길이 반환
// 인수   : 입력 객체 (document.form.name)
// 리턴값 : 공백 제거한 문자열의 길이
*******************************************************************/
function trimObj(strobj)
{
	var str = strobj.value;
	strobj.value = str.trim();
	return strobj.value.length;
}

/*******************************************************************
// 기능 : 문자열에 포함되어 있는 Html Tag를 &코드로 변환
// parameter : Html 태그 변환 대상 문자열
// 리턴값 : 변환된 문자열
*******************************************************************/
function encodeHtmlTag(str)
{
	str = str.replace(/&/g, "&amp;");
	str = str.replace(/"/g, "&quot;");
	str = str.replace(/</g, "&lt;");
	str = str.replace(/>/g, "&gt;");
	str = str.replace(/'/g, "&#39;");
	return str;
}

/*******************************************************************
// curString : 일정한 길이의 문자열로 축약
// 인수   : str:문자열, cutlen: Byte 수 [, 마지막 연결 문자열]
// 리턴값 : cutlen 보다 문자열의 길이가 큰경우 초과된 글자를 자르고 '...' 추가
*******************************************************************/
function cutString(str, cutlen, endStr)
{
	if(typeof(endStr) == "undefined")
		endStr = "";
	var strlen = str.length;
	var retstr = str;
	var b = 0;
	for(var i = 0; i < strlen; i++) {
		b = (str.charCodeAt(i) > 255) ? b+3:b+1;
		if(cutlen <= b) {
			retstr = str.substring(0, i+1) + endStr;
			break;
		}
	 }
	 return retstr;
}

/*******************************************************************
// onlyCodeForId : 특수문자 키보드 입력 못하게 한다
// 인수   : event 객체
// 리턴값 : boolean
*******************************************************************/
function onlyCodeForId(e) {
	if(window.event){
		if (event.keyCode < 20 ||  (event.keyCode>=48 && event.keyCode<=57)
		  || (event.keyCode>=65 && event.keyCode<=90)
		  || (event.keyCode>=96 && event.keyCode<=105) ) {
		    event.returnValue = true;
		} else {
		    event.returnValue = false;
		}
	} else {
		if ( e.which < 20 || (e.which>=48 && e.which<=57)
		  || (e.which>=65 && e.which<=90)
		  || (e.which>=96 && e.which<=105) ) {
		} else {
			e.preventDefault();
		}
	}
}

/*******************************************************************
// isValidEmail : 올바른 이메일 주소인가 체크
// 인수   : 이메일 주소 문자열
// 리턴값 : 올바른 주소 : true
*******************************************************************/
function isValidEmail(strEmail)
{
	strEmail = strEmail.trim();
	if(strEmail.length > 0) {
		var arrMatch = strEmail.match(/^(\".*\"|[A-Za-z0-9_-]([A-Za-z0-9_-]|[\+\.])*)@(\[\d{1,3}(\.\d{1,3}){3}]|[A-Za-z0-9][A-Za-z0-9_-]*(\.[A-Za-z0-9][A-Za-z0-9_-]*)+)$/);
    	if(arrMatch == null) {
			alert('이메일 주소가 올바르지 않습니다.\n\n다시 확인하시기 바랍니다.');
			return false;
	    }
	}
	return true;
}

/*******************************************************************
// isValidJuminno : 올바른 주민번호인가 체크
// 인수   : 주민번호 앞 6자리 입력필드 속성명 , 주민번호 뒤 7자리 입력필드 속성명
// 리턴값 : 올바른 주민번호 : true
*******************************************************************/
function isValidJuminno(objectName1, objectName2)
{

	var resiFirst = objectName1.value;
	var resiLast = objectName2.value;
	var chk = 0;
	if(resiFirst.length < 6) {
		alert("주민번호가 올바르지 않습니다.");
		objectName1.focus();
		objectName1.select();
		return false;
	}
	if(resiLast.length < 7) {
		alert("주민번호가 올바르지 않습니다.");
		objectName2.focus();
		objectName2.select();
		return false;
	}
	if(resiFirst.match(/[^(\+|\-)?][^\d]+/) != null) {
		alert('주민등록번호에 잘못된 문자가 있습니다.');
		objectName1.focus();
		objectName1.select();
		return false;
	}
	if(resiLast.match(/[^(\+|\-)?][^\d]+/) != null) {
		alert('주민등록번호에 잘못된 문자가 있습니다.');
		objectName2.focus();
		objectName2.select();
		return false;
	}
	var nYear   = resiFirst.substring(0,2);
	var nMondth = resiFirst.substring(2,4);
	var nDay    = resiFirst.substring(4,6);
	var nSex    = resiLast.charAt(0);
	if(resiFirst.length!=6 || nMondth<1 || nMondth>12 || nDay<1 || nDay>31) {
		alert('올바른 주민등록번호가 아닙니다.');
		objectName1.focus();
		objectName1.select();
		return false;
	}
	if(resiLast.length!=7 || (nSex!=1 && nSex!=2 && nSex!=3 && nSex!=4)) {
		alert('올바른 주민등록번호가 아닙니다.');
		objectName2.focus();
		objectName2.select();
		return false;
	}

	var i;
	for(i=0; i < 6; i++) {
		chk += ( (i+2) * parseInt( resiFirst.charAt(i) ));
	}
	for(i=6; i < 12; i++) {
		chk += ( (i%8+2) * parseInt( resiLast.charAt(i-6) ));
	}
	chk = 11 - (chk%11);
	chk %= 10;

	if(chk != parseInt( resiLast.charAt(6))) {
		alert('유효하지않은 주민등록번호입니다!!');
		objectName1.focus();
		return false;
	}
	return true;
}

/*******************************************************************
// isImageExt : 이미지 파일명 확장자 체크
// 인수   : 파일명
// 리턴값 : 올바른 이미지 파일명 : true
*******************************************************************/
function isImageExt(imgfile)
{
	// 확장자가 대소문자 .gif이거나 .jpg인지
	var isMatch = imgfile.match(/\.(gif|jpg)$/i);
	if(isMatch == null)
		return false;
	return true;
}

/*******************************************************************
// isDocExt : 문서 파일명 확장자 체크
// 인수   : 파일명
// 리턴값 : 올바른 이미지 파일명 : true
*******************************************************************/
function isDocExt(imgfile)
{
	// 확장자가 대소문자 .gif이거나 .jpg인지
	var isMatch = imgfile.match(/\.(doc|xls|hwp|pdf|ppt|jpg|gif|txt)$/i);
	if(isMatch == null)
		return false;
	return true;
}

/*******************************************************************
// isNumeric : 문자열이 모두 숫자인지 체크 (앞의 부호 포함)
// 인수   : 문자열
// 리턴값 : 모두 숫자 : true
*******************************************************************/
function isNumeric(str)
{
	var isMatch = str.match(/[^(\+|\-)?][^\d]+/);
	if(isMatch == null)
		return true;
	alert("숫자 이외의 문자는 입력할 수 없습니다.");
	return false;
}

function isNumber(str) {
	var isMatch = str.match(/[^0-9]/);
	if(isMatch == null)
		return true;
	return false;
}
/*******************************************************************
// isOnlyNum : 문자열이 모두 숫자인지 체크 (앞의 부호 포함)
// 인수   : event 객체
// 리턴값 : boolean
*******************************************************************/
function isOnlyNum(e) {
	if(window.event){
		// event.keyCode < 20 : Tab, Enter, shift, Alt key등..
		if ( event.keyCode < 20 || (event.keyCode>=48 && event.keyCode<=57)
		    || (event.keyCode>=96 && event.keyCode<=105)) {
		    event.returnValue = true;
		} else {
		    event.returnValue = false;
		}
	}else{
		if (e.which > 20 && (e.which < 48 || (e.which > 57  && e.which < 96) || e.which > 105) ) {
			e.preventDefault();
		}
	}
}

/*******************************************************************
// isAlphabet : 문자열이 모두 알파벳인지 체크
// 인수   : 문자열
// 리턴값 : 모두 영문 : true
*******************************************************************/
function isAlphabet(str)
{
	var isMatch = str.match(/[^a-zA-Z]/);
	if(isMatch == null)
		return true;
	alert("영문 이외의 문자는 입력할 수 없습니다.");
	return false;
}

/*******************************************************************
// isAlphaNumeric : 문자열이 모두 알파벳 & 숫자인지 체크
// 인수   : 문자열
// 리턴값 : 모두 영문 : true
*******************************************************************/
function isAlphaNumeric(str)
{
	var isMatch = str.match(/[^a-z0-9A-Z]/);
	if(isMatch == null)
		return true;
	alert("영문 및 숫자 이외의 문자는 입력할 수 없습니다.");
	return false;
}

/*******************************************************************
// 기능 : 문자열에 악성코드 존재 여부 체크
// parameter : str
// 리턴값 : 악성코드 존재 여부
*******************************************************************/
var g_strcritical = "<iframe|<frame|<script|<link|<embed|<textarea|<alert";
function checkHasCritical(str)
{
	var re = new RegExp(g_strcritical, "gi");
	if(str.match(re) == null)
		return false;
	return true;
}

/*******************************************************************
// limitStrlen : 입력 문자 길이 제한
// 인수   : 입력 객체 (document.form.name), 최대 Byte 수
// 리턴값 : 최대길이를 초과하는경우 초과된 글자를 삭제한다.
*******************************************************************/
function limitStrlen(obj, maxlimit)
{
	var i, b = 0;
	var val = obj.value;
	var len = val.length;
	for(i = 0; i < len; i++) {
		b = (val.charCodeAt(i) > 255) ? b+2:b+1;
		if(b > maxlimit)
			break;
	}
	if(b > maxlimit) {
		alert("최대 " + maxlimit + " Byte(한글:" + maxlimit/2 + "자, 영문:" + maxlimit + "자)까지 입력하실 수 있습니다.");
		obj.value = val.substring(0, i);
		obj.focus();
	}
}
/*******************************************************************
// limitStrlen2 : 입력 문자 길이 제한
// 인수   : 입력 객체 (document.form.name), 최대 Byte 수
// 리턴값 : 최대길이 초과시 false, 아니면 true
*******************************************************************/
function limitStrlen2(val, maxlimit)
{
	var i, b = 0;
	var len = val.length;
	for(i = 0; i < len; i++) {
		b = (val.charCodeAt(i) > 255) ? b+2:b+1;
		if(b > maxlimit)
			break;
	}
	if(b > maxlimit) {
		alert("최대 " + maxlimit + " Byte(한글:" + maxlimit/2 + "자, 영문:" + maxlimit + "자)까지 입력하실 수 있습니다.");
		return false;
	}
	return true;
}

/*******************************************************************
// moveNextObject : 현재 객체의 글자수를 체크 다음객체로 커서 포커스 이동
// 인수   : 현재 객체, 문자열 길이, 다음 객체
// 리턴값 : 모두 영문 : true
*******************************************************************/
function moveNextObject(fromobj, toobj, len)
{
	if(fromobj.value.length >= len)
		toobj.focus();
}

function moveNextFocus(formname, nowObj, nextObj) {
	var sForm = 'document.'+ formname +'.'
	var oNow = eval(sForm + nowObj);
	if (typeof oNow == 'object') {
		if ( oNow.value.length == oNow.maxLength) {
			var oNext = eval(sForm + nextObj);
			if ((typeof oNext) == 'object')
				oNext.focus();
		}
	}
}

/*******************************************************************
// popupCenterWindow : 팝업창을 화면 중앙에 띄움
// 인수 : URL, 창이름, 넓이, 높이, 스크롤 여부[, 그외 인수(",status=yes" - 콤마필요)]
// 리턴값 : window 객체
*******************************************************************/
function popupCenterWindow(pageurl, winname, w, h, scroll, attr)
{	// attr = ',resizable=no, status=yes';
	if(typeof(attr) == "undefined")
		attr = "";
	var leftpos = (screen.width) ? (screen.width-w)/2 : 0;
	var toppos = (screen.height) ? (screen.height-h)/2 : 0;
	var settings = 'height='+h+',width='+w+',top='+toppos+',left='+leftpos+',scrollbars='+scroll + attr;
	var win = window.open(pageurl, winname, settings);
	return win;
}

/*******************************************************************
// popupMouseWindow : 팝업창을 마우스의 현재 위치에 띄움
// 인수 : URL, 창이름, 넓이, 높이, 스크롤 여부[, 그외 인수]
// 리턴값 : window 객체
*******************************************************************/
function popupMouseWindow(pageurl, winname, w, h, scroll, attr)
{	// attr = ',resizable=no, status=yes';
	if(typeof(attr) == "undefined")
		attr = "";
	var leftpos = event.x + window.screenLeft;
	var toppos = event.y + window.screenTop;
	var settings = 'height='+h+',width='+w+',top='+toppos+',left='+leftpos+',scrollbars='+scroll + attr;
	var win = window.open(pageurl, winname, settings);
	return win;
}

/*******************************************************************
// popupImage : 이미지 크게보기 팝업창
// 인수 : 이미지 파일 URL[, 가로위치, 세로위치]
*******************************************************************/
function popupImage(imgname, t, l)
{
	if(typeof(t) == "undefined")
		t = 0;
	if(typeof(l) == "undefined")
		l = 0;
	var leftpos = event.x + window.screenLeft + l;
	var toppos =  event.y + window.screenTop + t;

	var htmlz = "<html><head><title>이미지크게보기</title><style>body{margin:0;cursor:pointer;}</style></head>";
	htmlz += "<body scroll=auto onload='width1=document.getElementById(\"Timage\").width+12;if(width1>1024)width1=1024;height1=document.getElementById(\"Timage\").height+30;if(height1>768)height1=768;top.window.resizeTo(width1,height1);' onclick='top.window.close();'>";
	htmlz += "<img src='"+imgname+"' title='클릭하시면 닫힙니다.' name='Timage' id='Timage'></body></html>";
	var imagez = window.open('', "image", "width="+ 100 +", height="+ 100 + ", top=" + toppos + ",left=" + leftpos + ",scrollbars=no,resizable=no,toolbar=0,menubar=0,menu=0,location=0,directories=0,status=no");
	imagez.document.open();
	imagez.document.write(htmlz);
	imagez.document.close();
}

/*******************************************************************
// resizeFrame : 프레임 높이 조절

*******************************************************************/
// frameLoadTimer : 프레임 페이지 로딩완료 체크 타이머
var frameLoadTimer;
function resizeFrame()
{	// 0.1초마다 resizeRetry() 호출
	frameLoadTimer = 1;
	resizeRetry("true");
}

function resizeRetry(bfirst)
{
	if(frameLoadTimer) {
		if(document.body.readyState == "complete") {
			clearInterval(frameLoadTimer);
			frameLoadTimer = 0;
			var ifWidth = document.body.scrollWidth;// + (document.body.offsetWidth-document.body.clientWidth);
			var ifHeight = parseInt(document.body.scrollHeight);
			self.resizeTo(ifWidth,ifHeight);
		} else {
			if(bfirst == "true")
				frameLoadTimer = setInterval('resizeRetry()',100);
		}
	}
}

//------ jcchoi----//

//input 입력시 숫자만 가능  
function onlyNum(){
	if(!((event.keyCode >= 48 && event.keyCode <= 57) 
		 || (event.keyCode >= 96 && event.keyCode <= 105) 
		 || (event.keyCode == 8) 
		 || (event.keyCode == 9))){
		  event.returnValue=false; 
	}
}
//숫자 소수,음수
function onlyNumDot(){
	if(!((event.keyCode >= 48 && event.keyCode <= 57) 
		 || (event.keyCode >= 96 && event.keyCode <= 105) 
		 || (event.keyCode == 8) 
		 || (event.keyCode == 9)
		 || (event.keyCode == 45) // '-'
		 || (event.keyCode == 46) // '.'
		 )){
		  event.returnValue=false;  
	} 
}
//input 입력시 알파벳만 가능  
function onlyAlpha(){
	if(!((event.keyCode >= 65 && event.keyCode <= 90) 
		 || (event.keyCode >= 97 && event.keyCode <= 122) 
		 || (event.keyCode == 8) 
		 || (event.keyCode == 9))){ 
	 		event.returnValue=false;   
	}
}

//특수문자 입력 막기 45 is '-'  47 is  '/'
function onlyNumAlpha() {
	if ((event.keyCode >= 32 && event.keyCode <= 47) 
	|| (event.keyCode >= 58 && event.keyCode <= 64) 
	|| (event.keyCode >= 91 && event.keyCode <= 96) 
	|| (event.keyCode >= 123 && event.keyCode <= 126)
	) {  
		 event.returnValue = false;  
	}
}

function validateLen(str1,min,max) {
	return (str1.trim().length >= min && str1.trim().length <= max )?true:false; 
}

function validateAlphaNum(str1) {
	var  pattern = /[0-9a-zA-Z]/;
	return (pattern.test(str1))?true:false;
}

function validateNum(str1) {
 var  pattern = /[0-9]/;
 return (pattern.test(str1))?true:false; 
}
function validateNumDot(str1) {
    var pattern =  /^[-]?\d+(?:[.]\d+)?$/;
    //소수2자리까지 var pattern = /^\d+(?:[.]?[\d]?[\d])?$/;    
    return (pattern.test(str1))?true:false; 
}

function validateAlpha(str1) {
 var  pattern = /[a-zA-Z]/;
 return(pattern.test(str1))?true:false;
}
function validateUpper(str1) {
	var  pattern = /[A-Z]/;
 	return(pattern.test(str1))?true:false;
}
function validateLower(str1) {
	var  pattern = /[a-z]/;
	return(pattern.test(str1))?true:false; 
}
function validateSpec(str1) {  
	  var  pattern = /[`~!@#$%^&*()-_=+|\\\{\[\]\}\;\:\'\"\,\<\.\>\/\?]/; 
	//  var pattern = /[`~!@#$%^&amp;*|\\\'\";:\/?]/gi;
 return(pattern.test(str1))?true:false;

}



function validatePasswd(pwd) {

 		if(pwd==null ||pwd =="")
	     {
	        alert("비밀번호를 입력해 주세요.");
	        return false;
	    }
// 	    if(pwd2 != null && pwd2 != ""){
// 	 	    if(pwd != pwd2 )
// 	 	    {
// 	 	        alert("패스워드가 서로 다릅니다.");
// 	 	        return false;
// 	 	    }
// 	    }
// 	    if(userid != null && userid != ""){
// 	 	    if(userid.indexOf(pwd) > -1)
// 	 	    {
// 	 	        alert("비밀번호에 아이디를 사용할 수 없습니다.");
// 	 	        return false;
// 	 	    }
	    	
// 	    }
		    
	    if(pwd.length<8 || pwd.length>16)
	    {
	        alert("비밀번호는 문자, 숫자, 특수문자의 조합으로 8~16자리로 입력해주세요.");
	        return false;
	    }
	    if(!pwd.match(/([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/))
	    {
	        alert("비밀번호는 문자, 숫자, 특수문자의 조합으로 8~16자리로 입력해주세요.");
	        return false;
	    }
	  
	    
	    
	    var SamePass_0 = 0; //동일문자 카운트
	    var SamePass_1 = 0; //연속성(+) 카운드
	    var SamePass_2 = 0; //연속성(-) 카운드

	    
	    var chr_pass_0;
	    var chr_pass_1;
	    var chr_pass_2;

	    
	    for(var i=0; i < pwd.length; i++)
	    {
	        chr_pass_0 = pwd.charAt(i);
	        chr_pass_1 = pwd.charAt(i+1);
	        
	        //동일문자 카운트
	        if(chr_pass_0 == chr_pass_1)
	        {
	            SamePass_0 = SamePass_0 + 1
	        }
	        
	       
	        chr_pass_2 = pwd.charAt(i+2);
	        //연속성(+) 카운드
	        if(chr_pass_0.charCodeAt(0) - chr_pass_1.charCodeAt(0) == 1 && chr_pass_1.charCodeAt(0) - chr_pass_2.charCodeAt(0) == 1)
	        {
	            SamePass_1 = SamePass_1 + 1
	        }
	        
	        //연속성(-) 카운드
	        if(chr_pass_0.charCodeAt(0) - chr_pass_1.charCodeAt(0) == -1 && chr_pass_1.charCodeAt(0) - chr_pass_2.charCodeAt(0) == -1)
	        {
	            SamePass_2 = SamePass_2 + 1
	        }
	    }
	    if(SamePass_0 > 1)
	    {
	        alert("동일문자를 3번 이상 사용할 수 없습니다.");
	        return false;
	    }
	   
	    if(SamePass_1 > 1 || SamePass_2 > 1 )
	    {
	        alert("연속된 문자열(123 또는 321, abc, cba 등)을\n 3자 이상 사용 할 수 없습니다.");
	        return false;
	    }
	 return true;
	  
}


//휴대전화 + 일반전화   
function validatePhone(str1) {
 var pattern = /^(0[2-8][0-5]?|01[01346-9])-?([1-9]{1}[0-9]{2,3})-?([0-9]{4})$/;
 var pattern15xx = /^(1544|1566|1577|1588|1644|1688)-?([0-9]{4})$/;
 return pattern.exec(str1) || pattern15xx.exec(str1) ? true :false;
}
	//일반 전화번호
function validateHomePhone(str1) {
	    var pattern = /^(0[2-8][0-5]?)-?([1-9]{1}[0-9]{2,3})-?([0-9]{4})$/;
	    var pattern15xx = /^(1544|1566|1577|1588|1644|1688)-?([0-9]{4})$/;
	    return ( pattern.exec(str1) || pattern15xx.exec(str1))?true:false;
}
	//휴대전화
function validateMobilePhone(str1) {
	    var pattern = /^(01[01346-9])-?([1-9]{1}[0-9]{2,3})-?([0-9]{4})$/;
	    return pattern.exec(str1)?true:false;
}

	//이메일
function validateEmail(str1){
 var pattern = /^[_a-zA-Z0-9-\.]+@[\.a-zA-Z0-9-]+\.[a-zA-Z]+$/;
	return	pattern.test(str1)?true:false;
}

//날짜   
function validateDate(str1) {
	//YYYYMMDDHH24MISS
	//(19[7-9][0-9]|20\d{2})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])
	 
	//YYYY-MM-DD,YYYYMMDD
var pattern = /^(19[1-9][0-9]|20\d{2})-?(0[1-9]|1[0-2])-?(0[1-9]|[1-2][0-9]|3[0-1])$/;  
 return pattern.exec(str1) ? true :false;
}


//주민번호
function validateRRN(str1) {
	    var pattern = /^([0-9]{6})-?([0-9]{7})$/;

		 if (!pattern.test(str1)){
				returnfalse;
		 }
	     str1 = RegExp.$1 + RegExp.$2;
	     var sum = 0;
	     var last = str1.charCodeAt(12) - 0x30;
	     var bases = "234567892345";
	     for (var i=0; i<12; i++) {
	        if (isNaN(str1.substring(i,i+1))){
				return false;
			}
	        sum += (str1.charCodeAt(i) - 0x30) * (bases.charCodeAt(i) - 0x30);
	    }
	    var mod = sum % 11;
	    if( (11 - mod) % 10 != last )
			return false;
		return true;
}
	//재외국인
function validateFRN(str1) {
	    var pattern = /^(\d{6})-?(\d{5}[7-9]\d{1})$/;
		 if (!pattern.test(str1)){
			return false;
		 }
	    str1 = RegExp.$1 + RegExp.$2;
	    if ((str1[7]*10 + str1[8]) %2)
			return false;

	    var sum = 0;
	    var last = str1.charCodeAt(12) - 0x30;
	    var bases = "234567892345";
	    for (var i=0; i<12; i++) {
	        if (isNaN(str1.substring(i,i+1)))
				return false;
	        sum += (str1.charCodeAt(i) - 0x30) * (bases.charCodeAt(i) - 0x30);
	    }
	    var mod = sum % 11;
		if((11 - mod + 2) % 10 != last)
			return false;
		return true;
}
	//사업자등록번호
function validateBRN(str1) {
 var pattern = /([0-9]{3})-?([0-9]{2})-?([0-9]{5})/;
	 if (!pattern.test(str1))
		return false;
 str1 = RegExp.$1 + RegExp.$2 + RegExp.$3;
 var cVal = 0;
 for (var i=0; i<8; i++) {
     var cKeyNum = parseInt(((_tmp = i % 3) == 0) ? 1 : ( _tmp  == 1 ) ? 3 : 7);
     cVal += (parseFloat(str1.substring(i,i+1)) * cKeyNum) % 10;
 }
 var li_temp = parseFloat(str1.substring(i,i+1)) * 5 + "0";
 cVal += parseFloat(li_temp.substring(0,1)) + parseFloat(li_temp.substring(1,2));
if(parseInt(str1.substring(9,10)) != 10-(cVal % 10)%10)
	   	return false;
	return true;
}



//input 입력시 길이와 숫자만 가능  
function onlyNumMax(text1,max) {

	if(!validateLen(text1.value,0,max-1)) {
		event.returnValue = false;  
	}
	onlyNumMax();
}
//길이와 숫자 소수,음수
function onlyNumDotMax(text1,max) {

	if(!validateLen(text1.value,0,max-1)) {
		event.returnValue = false;  
	}
	onlyAlphaMax(text1,max);
}
//input 입력시길이와  알파벳만 가능  
function onlyAlphaMax(text1,max) {

	if(!validateLen(text1.value,0,max-1)) {
		event.returnValue = false;  
	}
	onlyAlphaMax();
}

//길이와 특수문자 입력 막기 45 is '-'  47 is  '/'
function onlyNumAlphaMax(text1,max) {

	if(!validateLen(text1.value,0,max-1)) {
		event.returnValue = false;  
	}
	onlyNumAlpha();
}

//모든문자 길이제한
function onlyWordMax(text1,max) {

	if(!validateLen(text1.value,0,max-1)) {
		event.returnValue = false;  
	}
}


function validateChk(){
	/*
var text3= form1.text3;	  
var min=1,max=10;
<input  type="text" name="text0"  onkeypress="onlyNum()"/><br />
<input  type="text" name="text1"  onkeypress="onlyAlpha()"/><br />
<input  type="text" name="text2" onkeypress="onlyNumAlpha()"/><br /> 


if(!validateLen(text3.value,min,max)){
		alert(" 글자길이는 " +4+ " ~ " +8 +"  이내로 입력해 주세요"); 
		text3.focus;
}

if(!validateAlphaNum(text3.value)){
	 alert("숫자, 소문자, 대문자가  한글자 이상 들어가야 합니다!");
	 text3.focus;
} 

if(!validateNum(text3.value)){
		 alert("숫자가  한글자 이상 들어가야 합니다!");
		 text3.focus;
} 

if(!validateLower(text3.value)){
	 alert("소분자가  한글자 이상 들어가야 합니다!");
	 text3.focus;
}  

if(!validateUpper(text3.value)){
	 alert("대분자가  한글자 이상 들어가야 합니다!");
	 text3.focus;
}  

if(!validateSpec(text3.value)){
	 alert("특수문자가  한글자 이상 들어가야 합니다!");
	 text3.focus;
}  

if(!validateAlpha(text3.value)){
	 alert("대,소문자가  한글자 이상 들어가야 합니다!");
	 text3.focus;
}  
if(!validateBRN(text3.value)){//주민번호
	 alert("대,소문자가  한글자 이상 들어가야 합니다!");
	 text3.focus;
}  
if(!validateFRN(text3.value)){//재외국인
	 alert("재외국인 번호 을 확인해주세요.");
	 text3.focus;
}  

if(!validateEmail(text3.value)){
	 alert("이메일주소를 확인해주세요.");
	 text3.focus;
}  
if(!validateMobilePhone(text3.value)){
	 alert("핸드폰 번호를 확인해주세요.");
	 text3.focus;
}  
if(!validateHomePhone(text3.value)){//일반 전화번호
	 alert("전화번호를 확인해주세요.");
	 text3.focus;
}  
if(!validatePhone(text3.value)){//휴대전화 + 일반전화
	 alert("전화번호를 확인해주세요.");
	 text3.focus;
}  
if(!validatePasswd(text3.value)){//패스워드 - 서울시 온리
	 alert("패스워드를 확인해주세요.");
	 text3.focus;
}  
	return true;

*/
}

String.prototype.startsWith = function(pattern) {
	return this.indexOf(pattern) === 0;
}

String.prototype.endsWith = function(pattern) {
	var d = this.length - pattern.length;
	return d >= 0 && this.lastIndexOf(pattern) === d;
}

String.prototype.empty = function() {
	return this == '';
}


String.prototype.strip = function() {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
}

String.prototype.stripTags = function() {
    return this.replace(/<\/?[^>]+>/gi, '');
}

function loginChk() {
	popupCenterWindow("http://as.seoulmc.or.kr/member/login_popup.asp", "login", 700, 412);
}

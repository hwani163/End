/*
 * jQuery Validator
 * developer : bonsung goo
 * since : 2015.05.19
 * modify :
 * version : v0.1
 * description : Common validation
 * 	1. is로 시작 하는 함수는 조건문에서 사용 : ex) if(jq.isBlank(" ")){}
 * 	2. get으로 시작하는 함수는 리턴값을 받음 : ex) var num = jq.getNum("1111");
 */
jq.extend({
	// 공백이나 널인지 체크
	isBlank : function(value) {
        var str = this.trim(value);
        for(var i = 0; i < str.length; i++) {
            if ((str.charAt(i) != "\t") && (str.charAt(i) != "\n") && (str.charAt(i)!="\r")) {
                return false;
            }
        }
        return true;
	},

	//아이디 패턴검사 (영문소문자/숫자 조합 4~12자리면 "TRUE", 아니면 "FALSE")
	isId : function(value) {	
		if(this.isBlank(value)) return true;			// 값이 공백일 경우에는 검사를 하지않고 "TRUE"를 리턴
		var filter = /^[a-z\d]{4,12}$/;	
		var filter2 = /[a-z]/;
		//var filter3 = /[\d]/;
		return ((filter.test(value) && filter2.test(value))) ?  true : false;
	},
	
	// 비밀번호 패턴검사 (영문소문자/숫자 조합 6~14자리면 "TRUE", 아니면 "FALSE")
	isPassword : function(value) {
		if(this.isBlank(value)) return true;			// 값이 공백일 경우에는 검사를 하지않고 "TRUE"를 리턴
		var filter = /^[a-z\d]{6,14}$/;
		var filter2 = /[a-z]/;
		var filter3 = /[\d]/;
		return ((filter.test(value) && filter2.test(value) && filter3.test(value))) ?  true : false;
	},
	
	// 비밀번호 패턴검사 (4~12자리면 "TRUE", 아니면 "FALSE")
	isPasswordNum : function(value) {
		if(this.isBlank(value)) return true;			// 값이 공백일 경우에는 검사를 하지않고 "TRUE"를 리턴
		var filter = /^[a-z\d]{4,12}$/;
		return filter.test(value) ?  true : false;
	},

	// 한글만 유효 검사 (한글만 포함되어 잇으면 "TRUE", 다른 문자가 폼함되어 있으면 "FALSE")
	isKor : function(value) {
		if(this.isBlank(value)) return true;			// 값이 공백일 경우에는 검사를 하지않고 "TRUE"를 리턴
		var filter=/^[ㄱ-힣]+$/;
		return (filter.test(value)) ?  true : false;
	},
	
	// 알파벳만 유효 검사 (알파벳만 포함되어 잇으면 "TRUE", 다른 문자가 폼함되어 있으면 "FALSE")
	isAlpha : function(value) {
		if(this.isBlank(value)) return true;			// 값이 공백일 경우에는 검사를 하지않고 "TRUE"를 리턴
		var filter=/^[a-zA-Z]+$/;
		return (filter.test(value)) ?  true : false;
	},
	
	// 날짜 유효 검사 (날짜형식(YYYY-MM-DD) "TRUE", 아니면 "FALSE")
	isDate : function(value) {
		if(this.isBlank(value)) return true;			// 값이 공백일 경우에는 검사를 하지않고 "TRUE"를 리턴
		var filter=/^[\d]{4}\-[\d]{2}\-[\d]{2}$/;
		return (filter.test(value)) ?  true : false;
	},
	
	// 알파벳/숫자만 유효 검사 (알파벳과 숫자만 포함되어 잇으면 "TRUE", 다른 문자가 폼함되어 있으면 "FALSE")
	isAlphaNum : function(value) {
		if(this.isBlank(value)) return true;			// 값이 공백일 경우에는 검사를 하지않고 "TRUE"를 리턴
		var filter=/^[\w]+$/;
		return (filter.test(value)) ?  true : false;
	},

	// 주민등록번호 유효 검사 (주민등록번호면 "TRUE", 아니면 "FALSE")
	isRegistNo : function(value) {
		try {
		if(this.isBlank(value)) return true;			// 값이 공백일 경우에는 검사를 하지않고 "TRUE"를 리턴
		var ssn = value.replace("-","");
		var filter = /^[\d]{6}[1234][\d]{6}$/;
		if(!filter.test(ssn)) return false;

		var sex = parseInt(ssn.substr(6,1),10);
		var yy  = parseInt(sex > 2 ? "20"+ssn.substr(0,2) : "19"+ssn.substr(0,2),10);
		var mm  = parseInt(ssn.substr(2,2),10);
		var dd  = parseInt(ssn.substr(4,2),10);
		if(yy < 1900 || yy > 2100 || mm < 1 || mm > 12 || dd < 1 || dd > 31) return false;
		
		var chk = 0;
		for(var i = 0; i <=11; i++){
			chk = chk + (((i % 8) + 2) * parseInt(ssn.substring(i, i + 1),10));
		}
		
		return ((11 - (chk % 11)) % 10) == ssn.substr(12,1) ? true : false;
		} catch(e) {
			alert(e.description);
			return false;
		}
	},

	// 외국인등록번호 유효 검사 (주민등록번호면 "TRUE", 아니면 "FALSE")
	isForeignNo : function(value) {
		if(this.isBlank(value)) return true;			// 값이 공백일 경우에는 검사를 하지않고 "TRUE"를 리턴
		var ssn = value.replace("-","");
		var filter = /^[\d]{6}[5678][\d]{6}$/;
		if(!filter.test(ssn)) return false;

		var sum = 0;
		var odd = 0;
		var buf = new Array(13);

		for(i = 0; i < 13; i++) {
			buf[i] = parseInt(ssn.charAt(i));
		}

		odd = buf[7]*10 + buf[8];
		if(odd%2 != 0) return false;
		if((buf[11] != 6)&&(buf[11] != 7)&&(buf[11] != 8)&&(buf[11] != 9)) return false;

		multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];

		for (i = 0, sum = 0; i < 12; i++){
			sum += (buf[i] *= multipliers[i]);
		}

		sum = 11-(sum%11);
		if(sum >= 10) sum -= 10;
		sum += 2;
		if(sum >= 10) sum -= 10;
		return (sum == buf[12]) ? true : false ;
	},
	
	// 이미지파일만 유효 검사 (이미지면 "TRUE", 아니면 "FALSE")
	isImageFile : function(value) {
		if(this.isBlank(value)) return true;			// 값이 공백일 경우에는 검사를 하지않고 "TRUE"를 리턴
		value = value.substr(value.lastIndexOf("\\")+1);
		var filter=/\.(jpg|gif|png|bmp|jpeg)$/i;
		return (filter.test(value) && this.checkSpecialChar(value)) ?  true : false;
	},

	// 파일확장자 검사 (실행파일이 아니면 "TRUE", 실행파일이면 "FALSE")
	checkFileName : function(value) {
		if(this.isBlank(value)) return true;			// 값이 공백일 경우에는 검사를 하지않고 "TRUE"를 리턴
		value = value.substr(value.lastIndexOf("\\")+1);
		var filter=/\.(asp|jsp|php|cgi|exe|sh|class)$/i;
		return (!filter.test(value) && this.checkSpecialChar(value)) ?  true : false;
	},
	
	// 특수문자 입력 검사 (특수문자가 포함되어 있지 않으면 "TRUE", 포함되어 잇으면 "FALSE")
	checkSpecialChar : function(value) {
		if(this.isBlank(value)) return true;			// 값이 공백일 경우에는 검사를 하지않고 "TRUE"를 리턴
		var filter=/[#/:;'\"]/;
		var filter2=/[\-]{2}/;
		return (!filter.test(value) && !filter2.test(value)) ?  true : false;
	},
	
	// 특수문자 입력 검사 (특수문자가 포함되어 있지 않으면 "TRUE", 포함되어 잇으면 "FALSE")
	checkSpecialChar2 : function(value) {
		if(this.isBlank(value)) return true;			// 값이 공백일 경우에는 검사를 하지않고 "TRUE"를 리턴
		var filter=/[\"]/;
		var filter2=/[\-]{2}/;
		return (!filter.test(value) && !filter2.test(value)) ?  true : false;
	},

	// 문자열 길이 검사 (문자열의 길이가 넘지 않으면 "TRUE", 넘으면 "FALSE")
	checkLength : function(value, min, max) {
		if(this.isBlank(value)) return true;			// 값이 공백일 경우에는 검사를 하지않고 "TRUE"를 리턴
		return (value.length >= min && value.length <= max);
	},

	// 숫자범위 검사 (숫자범위가 넘지 않으면 "TRUE", 넘으면 "FALSE")
	checkRange : function(value, min, max) {
		if(this.isBlank(value)) return true;			// 값이 공백일 경우에는 검사를 하지않고 "TRUE"를 리턴
		return (parseInt(value,10) >= min && parseInt(value,10) <= max);
	},
	
	//
	
	//  문자열의 byte 길이 반환
	getByte : function(value){
        var cnt = 0;
        for (var i = 0; i < value.length; i++) {
            if (value.charCodeAt(i) > 127)
                cnt += 2;
            else
                cnt++;
        }
        return cnt;		
	},
	
	// 정수형으로 반환
	getInt : function(value){
		if(!isNaN(value)){
			return parseInt(value);
		}
		return null;
	},
	
	// 숫자만 반환
	getNum : function(value){
		return (this.trim(value.replace(/[^0-9]/g, "")));
	},
	
	// 숫자에 3자리마다 , 를 찍어서 반환
	getMoney : function(value){
        var num = this.trim(value);
        while((/(-?[0-9]+)([0-9]{3})/).test(num)) {
            num = num.replace((/(-?[0-9]+)([0-9]{3})/), "$1,$2");
        }
        return num;
	},
	
	// 숫자의 자리수(cnt)에 맞도록 반환
	getDigit : function(value, count){
        var digit = "";
        var iNum = this.getNum(value);
        if (value.length < count) {
            for(var i = 0; i < count - iNum.length; i++) {
                digit += "0";
            }
        }
        
        return digit + iNum;	
	},
	
    // " -> &#34; ' -> &#39;로 바꾸어서 반환
	getQuota : function(value){
		return value.replace(/"/g, "&#34;").replace(/'/g, "&#39;");
	},
	
    // URL에서 파라메터 제거한 순수한 url 얻기
	getURI : function(value){
        var arr = value.split("?");
        arr = arr[0].split("#");
        return arr[0];  		
	},
	
	// 정규식에 쓰이는 특수문자를 찾아서 이스케이프 한다.
	getMeta : function(value){
        var result = ""
            for(var i = 0; i < value.length; i++) {
                if((/([\$\(\)\*\+\.\[\]\?\\\^\{\}\|]{1})/).test(value.charAt(i))) {
                    result += value.charAt(i).replace((/([\$\(\)\*\+\.\[\]\?\\\^\{\}\|]{1})/), "\\$1");
                }
                else {
                    result += value.charAt(i);
                }
            }
        return result;
	},
	
	// 정규식에 쓰이는 특수문자를 찾아서 이스케이프한다.
	getRemove : function(value, pattern){
		return (pattern == null) ? value : eval("value.replace(/[" + this.getMeta(pattern) + "]/g, \"\")");
	},

	// 최소 최대 길이인지 검증
    // jq.isLength(value, min [,max])
	isLength : function(value){
        var min = arguments[1];
        var max = arguments[2] ? arguments[2] : null;
        var bRet = true;
        if(value.length < min) {
            bRet = false;
        }
        if(max && value.length > max) {
            bRet = false;
        }		
		return bRet;
	},
	
    // 최소 최대 바이트인지 검증
    // jq.isByteLength(value, min [,max])
	isByteLength : function(value){
        var min = arguments[1];
        var max = arguments[2] ? arguments[2] : null;
        var bRet = true;
        if(this.getByte(value) < min) {
            bRet = false;
        }
        if(max && this.getByte(value) > max) {
        	bRet= false;
        }
        return bRet;
	},
	
    // 숫자로 구성되어 있는지 학인
    // arguments[1] : 허용할 문자셋
	isNum : function(value){
		return (/^[0-9]+$/).test(this.getRemove(value,arguments[1])) ? true : false;
	},

    // 영어만 허용 - arguments[1] : 추가 허용할 문자들
	isEng : function(value){
		return (/^[a-zA-Z]+$/).test(this.getRemove(value,arguments[1])) ? true : false;
	},
	
    // 숫자와 영어만 허용 - arguments[1] : 추가 허용할 문자들
	isEngNum : function(value){
		return (/^[0-9a-zA-Z]+$/).test(this.getRemove(value,arguments[1])) ? true : false;
	},
	
    // 아이디 체크 영어와 숫자만 체크 첫글자는 영어로 시작 - arguments[1] : 추가 허용할 문자들
	isUserId : function(){
		return (/^[a-zA-z]{1}[0-9a-zA-Z]+$/).test(this.getRemove(value,arguments[1])) ? true : false;
	},
	
	// 한글 체크 - arguments[1] : 추가 허용할 문자들
	isKor : function(value){
		return (/^[가-힣]+$/).test(this.remove(value, arguments[1])) ? true : false;
	},
	
	// 주민번호 체크 - arguments[1] : 등록번호 구분자
	isRegistNo : function(value){
        var arg = arguments[1] ? arguments[1] : "";
        var jumin = eval("value.match(/[0-9]{2}[01]{1}[0-9]{1}[0123]{1}[0-9]{1}" + arg + "[1234]{1}[0-9]{6}$/)");
        if(jumin == null) {
            return false;
        }
        else {
            jumin = this.getNum(jumin.toString());
        }

        // 생년월일 체크
        var birthYY = (parseInt(jumin.charAt(6)) == (1 ||2)) ? "19" : "20";
        birthYY += jumin.substr(0, 2);
        var birthMM = jumin.substr(2, 2) - 1;
        var birthDD = jumin.substr(4, 2);
        var birthDay = new Date(birthYY, birthMM, birthDD);
        if(birthDay.getYear() % 100 != jumin.substr(0,2) || birthDay.getMonth() != birthMM || birthDay.getDate() != birthDD) {
            return false;
        }      

        var sum = 0;
        var num = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
        var last = parseInt(jumin.charAt(12));
        for(var i = 0; i < 12; i++) {
            sum += parseInt(jumin.charAt(i)) * num[i];
        }
        return ((11 - sum % 11) % 10 == last) ? true : false;
	},
	
	// 외국인 등록번호 체크 - arguments[1] : 등록번호 구분자
	isForeignNo : function(value){
        var arg = arguments[1] ? arguments[1] : "";
        var jumin = eval("value.match(/[0-9]{2}[01]{1}[0-9]{1}[0123]{1}[0-9]{1}" + arg + "[5678]{1}[0-9]{1}[02468]{1}[0-9]{2}[6789]{1}[0-9]{1}$/)");
        if(jumin == null) {
            return false;
        }
        else {
            jumin = this.getNum(jumin.toString());
        }
        // 생년월일 체크
        var birthYY = (parseInt(jumin.charAt(6)) == (5 || 6)) ? "19" : "20";
        birthYY += jumin.substr(0, 2);
        var birthMM = jumin.substr(2, 2) - 1;
        var birthDD = jumin.substr(4, 2);
        var birthDay = new Date(birthYY, birthMM, birthDD);
        if(birthDay.getYear() % 100 != jumin.substr(0,2) || birthDay.getMonth() != birthMM || birthDay.getDate() != birthDD) {
            return false;
        }
        if((parseInt(jumin.charAt(7)) * 10 + parseInt(jumin.charAt(8))) % 2 != 0) {
            return false;
        }
        var sum = 0;
        var num = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
        var last = parseInt(jumin.charAt(12));
        for(var i = 0; i < 12; i++) {
            sum += parseInt(jumin.charAt(i)) * num[i];
        }
        return (((11 - sum % 11) % 10) + 2 == last) ? true : false;
	},
	
	// 사업자번호 체크 - arguments[1] : 등록번호 구분자
	isBizNo : function(value){
        var arg = arguments[1] ? arguments[1] : "";
        var biznum = eval("value.match(/[0-9]{3}" + arg + "[0-9]{2}" + arg + "[0-9]{5}$/)");
        if(biznum == null) {
            return false;
        }
        else {
            biznum = this.getNum(biznum.toString());
        }

        var sum = parseInt(biznum.charAt(0));
        var num = [0, 3, 7, 1, 3, 7, 1, 3];
        for(var i = 1; i < 8; i++) sum += (parseInt(biznum.charAt(i)) * num[i]) % 10;
        sum += Math.floor(parseInt(parseInt(biznum.charAt(8))) * 5 / 10);
        sum += (parseInt(biznum.charAt(8)) * 5) % 10 + parseInt(biznum.charAt(9));
        return (sum % 10 == 0) ? true : false;		
	},
	
	// 법인 등록번호 체크 - arguments[0] : 등록번호 구분자
	isCorpNo : function(value){
        var arg = arguments[1] ? arguments[1] : "";
        var corpnum = eval("value.match(/[0-9]{6}" + arg + "[0-9]{7}$/)");
        if(corpnum == null) {
            return false;
        }
        else {
            corpnum = this.getNum(corpnum.toString());
        }
        var sum = 0;
        var num = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
        var last = parseInt(corpnum.charAt(12));
        for(var i = 0; i < 12; i++) {
            sum += parseInt(corpnum.charAt(i)) * num[i];
        }
        return ((10 - sum % 10) % 10 == last) ? true : false;
	},

	// 이메일의 유효성을 체크
	isEmail : function(value) {
        return (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/).test(this.trim(value));
	},
	
	// 전화번호 체크 - arguments[0] : 전화번호 구분자
	isPhone : function(value) {
        var arg = arguments[1] ? arguments[1] : "";
		return eval("(/^[0-9]{2,3}" + arg + "[0-9]{3,4}" + arg + "[0-9]{4}$/).test(value)");
	},
	
	// 핸드폰번호 체크 - arguments[0] : 핸드폰 구분자
	isMobile : function(value) {
        var arg = arguments[1] ? arguments[1] : "";
        return eval("(/^[0-9]{3}" + arg + "[0-9]{3,4}" + arg + "[0-9]{4}$/).test(value)");		
	},
	
	isZipcode : function(value) {
		var arg = arguments[1] ? arguments[1] : "";
		return eval("(/^[0-9]{3}" + arg + "[0-9]{3}$/).test(value)");
	},
	
	// MD5 암호화 함수
	getMD5 : function(string) {

		 function RotateLeft(lValue, iShiftBits) 
		 { 
			 return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits)); 
		 }

		 function AddUnsigned(lX,lY) 
		 {
			 var lX4,lY4,lX8,lY8,lResult;
			 lX8 = (lX & 0x80000000);
			 lY8 = (lY & 0x80000000);
			 lX4 = (lX & 0x40000000);
			 lY4 = (lY & 0x40000000);
			 lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
			 if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
			 if (lX4 | lY4) {
				 if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
				 else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			 } else return (lResult ^ lX8 ^ lY8);
		  }


		  function F(x,y,z) { 
			   return (x & y) | ((~x) & z);
		  }

		  function G(x,y,z) { 
			  return (x & z) | (y & (~z));
		  }

		  function H(x,y,z) { 
			  return (x ^ y ^ z);
		  }

		  function I(x,y,z) { 
			  return (y ^ (x | (~z)));
		  }

		  function FF(a,b,c,d,x,s,ac) {
			 a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
			 return AddUnsigned(RotateLeft(a, s), b);
		  }

		  function GG(a,b,c,d,x,s,ac) {
			 a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
			 return AddUnsigned(RotateLeft(a, s), b);
		  }

		  function HH(a,b,c,d,x,s,ac) {
			 a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
			 return AddUnsigned(RotateLeft(a, s), b);
		  }

		  function II(a,b,c,d,x,s,ac) {
			 a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
			 return AddUnsigned(RotateLeft(a, s), b);
		  }

		  function ConvertToWordArray(string) {
				var lWordCount;
				var lMessageLength = string.length;
				var lNumberOfWords_temp1=lMessageLength + 8;
				var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
				var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
				var lWordArray=Array(lNumberOfWords-1);
				var lBytePosition = 0;
				var lByteCount = 0;
				while ( lByteCount < lMessageLength ) {
					lWordCount = (lByteCount-(lByteCount % 4))/4;
					lBytePosition = (lByteCount % 4)*8;
					lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
					lByteCount++;
				}
				lWordCount = (lByteCount-(lByteCount % 4))/4;
				lBytePosition = (lByteCount % 4)*8;
				lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
				lWordArray[lNumberOfWords-2] = lMessageLength<<3;
				lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
				return lWordArray;
		   }
		 
		   function WordToHex(lValue) {
				 var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
				 for (lCount = 0;lCount<=3;lCount++) {
					 lByte = (lValue>>>(lCount*8)) & 255;
					 WordToHexValue_temp = "0" + lByte.toString(16);
					 WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
				 }
				 return WordToHexValue;
		   }

		   var x=Array();
		   var k,AA,BB,CC,DD,a,b,c,d;
		   var S11=7, S12=12, S13=17, S14=22;
		   var S21=5, S22=9 , S23=14, S24=20;
		   var S31=4, S32=11, S33=16, S34=23;
		   var S41=6, S42=10, S43=15, S44=21;
			// Steps 1 and 2.  Append padding bits and length and convert to words
		   x = ConvertToWordArray(string);
			// Step 3.  Initialise
		   a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
			// Step 4.  Process the message in 16-word blocks
			for (k=0;k<x.length;k+=16) {
				AA=a; BB=b; CC=c; DD=d;
				a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
				d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
				c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
				b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
				a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
				d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
				c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
				b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
				a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
				d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
				c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
				b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
				a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
				d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
				c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
				b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
				a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
				d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
				c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
				b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
				a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
				d=GG(d,a,b,c,x[k+10],S22,0x2441453);
				c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
				b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
				a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
				d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
				c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
				b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
				a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
				d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
				c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
				b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
				a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
				d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
				c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
				b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
				a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
				d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
				c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
				b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
				a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
				d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
				c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
				b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
				a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
				d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
				c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
				b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
				a=II(a,b,c,d,x[k+0], S41,0xF4292244);
				d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
				c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
				b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
				a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
				d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
				c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
				b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
				a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
				d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
				c=II(c,d,a,b,x[k+6], S43,0xA3014314);
				b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
				a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
				d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
				c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
				b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
				a=AddUnsigned(a,AA); b=AddUnsigned(b,BB); c=AddUnsigned(c,CC); d=AddUnsigned(d,DD);
			}

			var temp= WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
			return temp.toUpperCase();
	}
});

function unescapeQuot(str) {
	str=str.replace(/&#039;/g,"'");
	str=str.replace(/&#034;/g,'"');
	
	return str;
}
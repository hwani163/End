function sysIntrospect(obj) {
	var str='';
	for (i in obj) {
		str+=i+'\t'+obj[i]+'\n';
	}

	return str;
}
function sysShowSpec(obj) {
	alert(sysIntrospect(obj));
}
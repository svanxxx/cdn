function guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		s4() + '-' + s4() + s4() + s4();
}
function pad(num, size) {
	var s = num + "";
	while (s.length < size) s = "0" + s;
	return s;
}
function DateToString(dt) {
	return pad((dt.getMonth() + 1), 2) + "-" + pad(dt.getDate(), 2) + "-" + dt.getFullYear();
}
function StringToDate(st) {
	var vals = st.split('-');
	if (vals.length != 3)
		return new Date();
	return new Date(vals[2], parseInt(vals[0]) - 1, vals[1]);
}
//progress
function StartProgress(txt) {
	//doing some cleanup of old progress - some functions may fail leaving progress messages
	var now = new Date();
	$(".loadingprogress").each(function () {
		var createddt = new Date($(this).attr("timestart"));
		if ((now - createddt) > 60000)
			$(this).remove();
	})
	var min = $(".loadingprogress").length * 50;
	var uuid = guid();
	var messagetext = txt == undefined ? "Loading..." : txt;
	$(document.body).append("<div id='" + uuid + "' class='loadingprogress' timestart='" + now + "'>" + messagetext + "</div>");
	$("#" + uuid).css({ bottom: min });
	return uuid;
}
function EndProgress(id) {
	$("#" + id).remove();
}
//URL helper
function replaceUrlParam(url, paramName, paramValue) {
	if (paramValue == null) {
		paramValue = '';
	}
	var pattern = new RegExp('\\b(' + paramName + '=).*?(&|$)');
	if (url.search(pattern) >= 0) {
		return url.replace(pattern, '$1' + paramValue + '$2');
	}
	url = url.replace(/\?$/, '');
	return url + (url.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue;
}
function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function GetPage() {
	return window.location.href.substring(0, location.href.indexOf(".aspx") + 5);
}
function GetSitePath() {
	var p = GetPage();
	return p.substring(0, p.lastIndexOf("/") + 1);
}
function GetPageName() {
	var p = GetPage();
	return p.substring(p.lastIndexOf("/") + 1, p.lastIndexOf(".aspx") + 5);
}
function removeUrlParam(sourceURL, key) {
	var rtn = sourceURL.split("?")[0],
		param,
		params_arr = [],
		queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
	if (queryString !== "") {
		params_arr = queryString.split("&");
		for (var i = params_arr.length - 1; i >= 0; i -= 1) {
			param = params_arr[i].split("=")[0];
			if (param === key) {
				params_arr.splice(i, 1);
			}
		}
		rtn = rtn + "?" + params_arr.join("&");
	}
	return rtn;
}

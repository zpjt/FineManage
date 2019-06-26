<!DOCTYPE html>
<html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="renderer" content="webkit"/>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@page import="com.actionsoft.webframework.bean.AWSWebServerConfig"%>

<%
 response.setHeader("Expires", "Sat, 6 May 1995 12:00:00 GMT");
 response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
 response.addHeader("Cache-Control", "post-check=0, pre-check=0");
 response.setHeader("Pragma", "no-cache");
%>
<%
  String loginTime=Long.toString(System.currentTimeMillis());
%>

<title></title>
<link rel="shortcut icon" type="image/ico" href="favicon.ico"/>
<link rel="stylesheet" type="text/css" href="commons/css/awsui.css"/>
<link rel="stylesheet" type="text/css" href="index/theme1/theme.css"/>
<script type="text/javascript" src="commons/js/jquery/scripts/jquery.js"></script>
<script type="text/javascript" src="commons/js/awsui.js"></script>
<script type="text/javascript" src="commons/js/public.js"></script>
<script type="text/javascript" src="commons/js/lang.js"></script>
<script type="text/javascript" src="apps/_bpm.portal/js/client.login.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	if($.browser.isIE6 || $.browser.isIE7){
	    window.location.href = "./version.jsp";
	}
	var bg = "index/theme1/bg" + getRandom(7) + ".jpg";
	$("#login-bg").attr("src", bg);
	$("input:first").focus();
	$("#userid, #pwd").on("keyup", function(e){
		if(e.keyCode == 13){
			loginAccount(0);
		}
	})
	onFocus();
});
function loadLang(){
	try{
		var lang=getPortalLang();
		document.getElementById('portal_lang').value=lang;
	}catch(e){}
}
function getRandom(n){
	return Math.floor(Math.random()*n+1)
}
</script>
</head>
<body>
<script language="javascript">
<%if (!AWSWebServerConfig.isDefLogin()) {%>
	window.location='index_sso.jsp';//CAS SSO
<%}%>
</script>
<form name="frmLogin" id="frmLogin" method="post" > 
	<img src="" id="login-bg"/>
		<div class="login-main">
			
			<div style="padding-left:10px;position:absolute;DISPLAY: none" id='autoLoginProcess' name='autoLoginProcess'>
					<div id="showProcessTitle" name="showProcessTitle" style="text-align: left; font-family: 微软雅黑, Verdana, Arial, Helvetica, sans-serif; color:black; "></div>
			</div>
			<div class="login-main-form">
				<div class="login-main-form-process"></div>
				<div class="login-main-form-top">
					<div class="aws-login-font" id="welcome" style="font-size:18px;position:absolute;top:-50px;text-align:center;width:100%">欢迎登录医院工作门户</div>
					<input style="display:none">
					<input onclick="breakAutoProcess();" id="userid" name="userid" maxlength="32" placeholder="用户名" style="" type="text" autocomplete="off"/>
					<input style="display:none">
					<input onclick="breakAutoProcess();" id="pwd" name="pwd" maxlength="32" placeholder="密码" type="password" autocomplete="off"/>
					<span onclick="return loginAccount(0);" class="login-button aws-login-font" id="loginBtn">登录</span>
					<div style="margin:8px 0px;">
						<input name="rememberMeUid" id="rememberMeUid" type="checkbox"/>
						<label class="aws-login-font" style="vertical-align:middle;" for="rememberMeUid" id="rememberUserNameField">记住用户名</label>
						<input name="rememberMePwd" id="rememberMePwd" type="checkbox"/>
						<label class="aws-login-font" style="vertical-align:middle;" for="rememberMePwd" id="rememberPasswordField">记住密码</label>
					</div>
				</div>
				<div style="text-align:right;position:absolute;bottom:12px;right:37px;">
					<select class="aws-login-font"  name=lang id=lang onchange="setLangCookie(this.value);loadLang();">
									<option value=cn>中文</option>
									<option value=en>English</option>
									<option value=big5>繁體</option>
					</select>
				</div>
			</div>
		</div>
<div class="login-mian-form-mid"><img width="0px" src="https://www.ssmc-sz.com/img/logo_sm.png" style="border:0px;margin-right:1px;"/>
<a target="_blank" href="https://www.ssmc-sz.com">
<div style="font-size:36px;color:#222;background:#39F;position:absolute;right:555px;top:488px;text-align:center;width:40%">☞深圳市萨米医疗中心官方网站☜</div>
					</a></div>
<input type="hidden" name="cmd" />
<input type="hidden" name="sid" />
<input type="hidden" name="deviceType" />
<input type="hidden" name="_CACHE_LOGIN_TIME_" value="<%=loginTime%>" />					
</form>
</body>
</html>
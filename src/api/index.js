import "js/common/ajaxhook.min.js";

const {baseUrl,resourse} = window.jsp_config; 

const rootUrl = !resourse &&  "./" || baseUrl; 




hookAjax({

	    onload:function(xhr){

	      if(xhr.status>=400){

	      	alert("请求报错"+xhr.status+":"+xhr.responseURL);
	      	return true ;
	      }	 	


	    	if(xhr.responseXML){
	    		
	    		window.open (rootUrl+'login.html','_top')
	    		return true ;
	    	}
	    },
});


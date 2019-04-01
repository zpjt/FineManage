import "api/index.js";

const {role_id,baseUrl,user_id} = window.jsp_config;

class ApI {
	getLeftMenu(roleId,flag=0){
		//  flag:0 前端页面 1：后端页面；
		return new Promise((resolve,reject)=>{
			$.get(baseUrl+"Perm/getMenu",{role_id:roleId,flag:flag,user_id},function(res) {
				resolve(res);
			}, "json");
		});
	}
   checkPwd(pwd){
   		return Promise.resolve($.post(baseUrl+"login/checkPwd",{pwd,user_id}));
   }
   changePwd(pwd){

   		return Promise.resolve($.ajax(
   			{
   				method:"post",
   				url:baseUrl+"login/changePwd",
		   		data:{user_id,pwd},
   			}
   		));
   }
   
}



const api = new ApI();


export {api};
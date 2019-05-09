
import "./index.js";

const control = "Perm/";
const {baseUrl,user_id} = window.jsp_config;
const URL= baseUrl+control;

class API {

	

	getFineDire(obj){
		const  role_id =window.jsp_config.role_id;
		return Promise.resolve($.get(URL+"getFineDire",{user_id,role_id}));
	}

	getUserList(obj){
		const  role_id =window.jsp_config.role_id;
		return Promise.resolve($.get(URL+"getUserList",{role_id,user_id}));
	}
	getFineDireByUser(user_id){
		const  role_id =window.jsp_config.role_id;
		return Promise.resolve($.get(URL+"getFineDireByUser",{user_id,role_id}));
	}

	setFileRole(obj){
		
		return Promise.resolve(
				$.ajax({
					method:"post",
					url:URL+"setFileRole",
					contentType:"application/json",
					data:JSON.stringify(obj),
				})
			);
	}
	

}  

const api = new API();

export {api};


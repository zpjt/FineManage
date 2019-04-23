
import "./index.js";

const {baseUrl} = window.jsp_config;
const control = "Perm/";

const URL= baseUrl+control;
const MAIN= baseUrl+"main/";

class API {

	

	getUserList(){
		const  role_id =window.jsp_config.role_id;
		return Promise.resolve($.get(URL+"getFineUserList",{role_id}));
	}
	
	addUser(obj){
		return Promise.resolve(
				$.ajax({
					method:"post",
					url:URL+"addUser",
					contentType:"application/json",
					data:JSON.stringify(obj),
				})
			);
	}
	checkName(data){
		return Promise.resolve($.post(URL+"checkName",data));
	}
	delUser(obj){
		return Promise.resolve($.post(URL+"delUser",obj));

	}	
	getRoleList(){
		return Promise.resolve($.get(URL+"getRoleList"));
	}
	
	getOrgList(){
		return Promise.resolve($.get(URL+"getOrgList"));
	}
	checkPwd({user_id,pwd}){
		return Promise.resolve($.post(URL+"checkPwd",{user_id,pwd}));
	}
	upUser(obj){
			return Promise.resolve(
				$.ajax({
					method:"post",
					url:URL+"upUser",
					contentType:"application/json",
					data:JSON.stringify(obj),
				})
			);
	}
}  


const api = new API();
export {api};
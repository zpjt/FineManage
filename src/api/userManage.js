
import "./index.js";

const {baseUrl,role_id} = window.jsp_config;
const control = "Perm/";

const URL= baseUrl+control;
const MAIN= baseUrl+"main/";

class API {

	

	getUserList(){
		return Promise.resolve($.get(URL+"getFineUserList"));
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
}  


const api = new API();
export {api};
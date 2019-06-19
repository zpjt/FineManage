
import "./index.js";

const {baseUrl,user_id} = window.jsp_config;
const control = "Perm/";

const URL= baseUrl+control;
const MAIN= baseUrl+"main/";

class API {

	

	getUserList(){
		const  role_id =window.jsp_config.role_id;
		return Promise.resolve($.get(URL+"getFineUserList",{role_id,user_id}));
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
		const  role_id =window.jsp_config.role_id;
		return Promise.resolve($.get(URL+"getRoleList",{role_id,user_id}));
	}
	
	getOrgList(){
			const  role_id =window.jsp_config.role_id;
		return Promise.resolve($.get(URL+"getOrgList",{user_id,role_id}));
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
	addOrg(obj){
			return Promise.resolve(
				$.ajax({
					method:"post",
					url:URL+"addOrg",
					contentType:"application/json",
					data:JSON.stringify(obj),
				})
			);
	}
	updataOrg(obj){
			return Promise.resolve(
				$.ajax({
					method:"post",
					url:URL+"updataOrg",
					contentType:"application/json",
					data:JSON.stringify(obj),
				})
			);
	}
	delOrg(ids){
			return Promise.resolve(
				$.ajax({
					method:"post",
					url:URL+"delOrg",
					data:{ids},
				})
			);
	}
}  


const api = new API();
export {api};
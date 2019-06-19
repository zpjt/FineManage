import {Calendar,SCombobox,Tree} from "js/common/Unit.js";
import {api} from "api/userManage.js";



class AddModal{

	static type = "add";
	constructor(config){

		const {unit,modal,reloadPage} = config;
		this.unit = unit ;
		this.modal = modal ;

	  this.$addMView = $("#add-MView");


	  this.reloadPage = reloadPage ;
	  this.roleComboBox = null ;
	  this.orgComboBox = null ;
		this.handle();
		this.init();
	}

	init(){

			api.getRoleList().then(res=>{

					if(res && res.data){
	 					this.roleComboBox = new SCombobox($("#character"),{
					 		data:res.data,
					 		textField:"name",
					 		width:300,
					 		multiply:false,
					 	
					 	})
					}else{
						this.unit.tipToast("获取不到角色列表！","0");
					}
			});

			api.getOrgList().then(res=>{

					if(res && res.data){
						const _self = this;
	 					this.orgComboBox = new SCombobox($("#org"),{
					 		data:res.data,
					 		textField:"name",
					 		width:300,
					 		ableCustom:true,
				 			addFn:function(text){
					 			return	api.addOrg({name:text}).then(res=>{

					 				if(res.code==200){

					 					_self.unit.tipToast("新增科室成功！","1");
					 					return res.data.id;
					 				}else{

					 					_self.unit.tipToast(res.message,"2");

					 					return "";
					 				}


					 			})	
					 		},
					 		delFn:function(id){
					 			return	api.delOrg(id).then(res=>{

					 					if(res.code==200){

					 						_self.unit.tipToast("删除科室成功！",1);

					 						return true ;
					 					}else{

					 						_self.unit.tipToast("删除科室失败！",0);
					 						return false;
					 					}	


					 			})	
					 		},
					 		updateFn:function(name,id){
					 				return api.updataOrg({name,id}).then(res=>{

					 				if(res.code==200){

					 					_self.unit.tipToast("修改科室成功",1);
					 					return res.data.name;
					 				}else{

					 					_self.unit.tipToast(res.message,2);

					 					return "";
					 				}


					 			})	
					 		}
					 	})
					}else{
						this.unit.tipToast("获取不到科室列表！","0");
					}
			})
		

	}


	initMD(type,obj){
		const $box = $(".g-addpasswordInp");
 		$box.hide();
		if(type=="edit"){
			$("#addTit").html("修改密码");
			AddModal.type = "edit";
			$box.eq(1).show();
			const {email,phone,user_id} = obj ;
			$box.eq(1).attr("data-id",user_id);
			$("#email").removeClass("no-fill").val(email)	;
			$("#phone").removeClass("no-fill").val(phone)	;
			$("#pwd_old").addClass("no-fill").val("")	;
			$("#pwd_new").addClass("no-fill").val("")	;


		
		}else{
		  	AddModal.type = "add"
				$("#addTit").html("添加用户")
			 	$box.eq(0).show();
  			$(".userInfo").addClass("no-fill").val(null);
		}
		this.modal.show(this.$addMView);
	}
		
	editUser(obj){
		api.checkPwd({user_id:obj.id,pwd:obj.pwd})
		.then(res=>{
				return res.code=="200" ? api.upUser(obj) : false ;
		})
		.then(res=>{

			if(!res){
				this.unit.tipToast("原密码不对！",2);
				$("#pwd_old").addClass("no-fill");
				return ;
			}

			if(res && res.code == "200"){ //true
			  this.modal.close(this.$addMView);
				this.unit.tipToast(res.data,1);
				 this.reloadPage();

			}else{
				this.unit.tipToast("更新失败！",0);
			}

		})
	}
	addUser(obj){

		api.checkName({name:obj.username})
		.then(res=>{
				return res.data!="用户已存在" ? api.addUser(obj) : "重名" ;
		})
		.then(res=>{

			if(res === "重名"){
				this.unit.tipToast("用户名重名，换一个名称！",2);
				return ;
			}

			if(res && res.data == "添加成功"){ //true
			  this.modal.close(this.$addMView);
				this.unit.tipToast("新增成功！",1);
				 this.reloadPage();

			}else{
				this.unit.tipToast("新增失败！",0);
			}

		})
  }
    
	handle(){

		const _self = this ;


	  // 点击模态框空白处收缩下拉框
	  this.$addMView.on("click", ".combo-inp" ,function(e) {
			e.stopPropagation();
		});

	  this.$addMView.on("click",function() {
	  	const  $addMView = $(this);
			requestAnimationFrame(function(){
				 const drop =  $addMView.find(".combo-drop ");
				 drop.parent().removeClass("active");
				 drop.hide();
		    });
		});

		//模态框确定按钮
		$("#addMBtn").click(function(){



			 if( _self.$addMView.find(".no-fill:visible").length){
					_self.unit.tipToast("请填写完整或检查是否有输入错误！",2);
					return ;
			 };

			 if(AddModal.type=="edit"){
			 		const obj = {
			 			id:$(".g-addpasswordInp").eq(1).attr("data-id"),
			 		};
				 $.map($(".userInfo:visible"),function(el){
				 		obj[el.name] = el.value.trim();
				 });

				 _self.editUser(obj);

			 }else{

					 const obj = {
					 		roleIds:_self.roleComboBox.getValue().split(","),
					 		orgId:_self.orgComboBox.getValue(),
					 }

					 $.map($(".userInfo:visible"),function(el){
					 		obj[el.name] = el.value.trim();
					 });

				
					 _self.addUser(obj);
			 }

			 
		
		});
	
	}

}

export {AddModal};
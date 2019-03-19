import {Calendar,SCombobox,Tree} from "js/common/Unit.js";
import {api} from "api/userManage.js";



class AddModal{


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
					 		multiply:true,
					 	})
					}else{
						this.unit.tipToast("获取不到角色列表！","0");
					}
			});

			api.getOrgList().then(res=>{

					if(res && res.data){
	 					this.orgComboBox = new SCombobox($("#org"),{
					 		data:res.data,
					 		textField:"name",
					 		width:300,
					 	})
					}else{
						this.unit.tipToast("获取不到科室列表！","0");
					}
			})
		

	}


	initMD(){
    
    $(".userInfo").addClass("no-fill").val(null);
		this.modal.show(this.$addMView);

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



			 if( _self.$addMView.find(".no-fill").length){
					_self.unit.tipToast("请填写完整！",2);
					return ;
			 };

			 const obj = {
			 		roleIds:_self.roleComboBox.getValue().split(","),
			 		orgId:_self.orgComboBox.getValue(),
			 }

			 $.map($(".userInfo"),function(el){
			 		obj[el.name] = el.value.trim();
			 });

		
			 _self.addUser(obj);
		
		});
	
	}

}

export {AddModal};
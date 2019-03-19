import "css/userManage.scss";
import "css/common/dropMenu.scss";

import {Unit,SModal,SInp,Search} from "js/common/Unit.js";
import {api} from "api/userManage.js";
import {DelModal} from "./DelModal.js";
import {AddModal} from "./AddModal.js";
import {TableStyle} from "./Table.js";


const {resourse} = window.jsp_config;


//初始化页面类
class Page  {


	constructor(){

		this.handle();
		this.init();
	}
	
	
  init(){

    	const _self = this ;

			this.modal = new SModal();
			this.unit = new Unit();
			this.inp = new SInp();

			

			this.table = new TableStyle();
			const CommonMethod = {
						modal:this.modal,
						unit:this.unit,
						reloadPage:function(){
								_self.getUserList();
						}
			};

			this.addModal = new AddModal(CommonMethod);
		
			this.delModal = new DelModal(CommonMethod);

			this.search = new Search($("#u-search"),{
				serachCallback:(result)=>{
					this.table.loadTab(result);
				},

				closeCallback:(res)=>{
						this.table.loadTab(res);
				},
				keyField:"user_name",
				is_Arr:true,

			});


			this.getUserList();


 	}

 		getUserList(){
 			this.unit.openLoading();
 			api.getUserList().then(res=>{

 				if(res && res.data){
					const copy_data= JSON.parse(JSON.stringify(res.data));
					this.search.data = copy_data ;
					this.table.loadTab(res.data);
 				}else{
 					this.unit.tipToast("获取不到用户列表！","0");
 				}
				this.unit.closeLoading();
 				

 			})
 		}


    handle(){
			const _self = this ;

			//操作按钮
			$("#tabBox").on("click",".tab-opt",function(e){

				const dataIndex = $(this).closest(".tabBtnBox").attr("echo-data");
				const {user_id,user_name} = _self.table.$tab.datagrid("getData").rows[dataIndex];
				const type = $(this).attr("node-sign");

				switch(type){

					case "edit":{
						
						break;
					}
					case "del":{

							_self.delModal.delHandle([{id:user_id,name:user_name}])

							break;
						}
				}
			});
		
		  $("#btnBox").on("click",".s-btn",function(){

				const $this = $(this);
				const sign = $this.attr("sign");

				switch(sign){
					
					case"addUser":{
						_self.addModal.initMD();
						break;
					}
					case"delUser":{

						let selArr =  $.map(_self.table.$tabContainer.find(".checkSingle:checked"),function(val){
															const dataIndex = $(val).closest("tr.datagrid-row").attr("datagrid-row-index");
															const {user_id,user_name} = _self.table.$tab.datagrid("getData").rows[dataIndex];
														return {id:user_id,name:user_name};
											  
						   });

							_self.delModal.delHandle(selArr);
							break;
					}
					default:
					break;
				}
			});

    }
}


const page = new Page();

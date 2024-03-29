import "css/common/EasyTab.scss";
import {api} from "api/permissionManage.js";
/**
 * 预警指标表格组件
 */
class Table {

	constructor(config)	{

       this.$tableBox = $("#tabBox");
       this.$table = $("#tab");
       this.unit = config.unit ;
       this.handle();
    }
   	setFileRole(obj,status=0,is_single=false){

   			const userEl = $("#userList .user-item.active")[0]
   			if(!userEl){

   				this.unit.tipToast(`没有选择用户！`,2);
							return ;
					}

				const user_id = userEl.dataset.user_id;	
   			api.setFileRole({"files":obj,user_id,status}).then(res=>{

   					if(res ){
   							const str =status==-1 && "删去" || "新增" ;
								res.data ? this.unit.tipToast(`${str+res.data}条权限成功！`,1) : this.unit.tipToast(`清除所有设置！`,1);
   					
   					}else{

								this.unit.tipToast("设置权限失败！",0);
   					}


   			});
   	}
    loadTab(data,callback){
    	 const _self = this ;
				this.$table.treegrid({
					animate: false,
					data: data,
					fitColumns: true,
					scrollbarSize: 0,
					rownumbers: false,
					lines:true,
					checkbox:true,
					idField: 'id',
					treeField: 'name',
					columns: [
						[{
							"field": "name",
							"title": "目录名称",
							"align": "left",
							"width": "85%",
						},{
							field: 'optBtn',
							title: '操作',
							align:"left",
							width: "10%",
							formatter: function(val,rowData) {

								return rowData.type !=0 ? `
										<div class="tabBtnBox" echo-data='${rowData.id}' >
												<div class="tab-opt" node-sign="permission"><i class="fa fa-cogs fa-lg">&nbsp;</i><span>权限设置</span></div>	</div>
									`:"";
							}
						}]
					],
					onLoadSuccess:function(){
							

							callback && callback();

					}
			});
				_self.unit.closeLoading();
    }

    handle(){
    	const _self = this ;
    	const $tableBox = this.$tableBox;
		
		$tableBox.on("click",".tab-opt",function(){

			const type =  $(this).attr("node-sign");
			const par = $(this).parent(),
				    id = par.attr("echo-data");

			
			switch(type){
				case "permission":{

					const node = _self.$table.treegrid("find",id);
					if(!node){
							return ;
					}
					const {name,path,type} = node ;
					const status = node.checked ? 0 : -1 ;
					_self.setFileRole([{name,path,type}],status,true);
					break;
				}
				default:
					break;
			}
		});
    }
}

export {Table} ;
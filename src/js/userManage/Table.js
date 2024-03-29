import { EasyUITab } from "js/common/EasyUITab.js";


class TableStyle extends EasyUITab{

	constructor(){

       super();
       this.$tab = $("#tab");
       this.$tabContainer = $("#tabBox");

       this.setPageHeight($("#section"),100);
       this.handle();
    }

		tabConfig(idField){
			const {user_id} = window.jsp_config;
			return {
				idField:idField,
				tabId:"#tabBox",
				frozenColumns: this.frozenColumns(idField,{
					checkbox: true ,
					disableCheck:function(rowData){

							return rowData.user_id == user_id;

					}
				}),
				columns: [
					[{
						field: 'user_name',
						title: '用户名',
						width: "10%",
					}, 
					{
						field: 'true_name',
						title: '真实姓名',
						width: "10%",
					}, 
					
					{
						field: 'org_name',
						title: '科室',
						width: "10%",
					},
					{
						field: 'role',
						title: '角色',
						width: "24%",
						formatter: function(val,rowData,index) {

							return  val.map(val=>val.name).join(" , ");
						}
					},
					
					 {
						field: 'phone',
						title: '电话',
						width: "12%",
					},
					{
						field: 'email',
						title: '邮箱',
						width: "12%",
					},
					{
						field: 'optBtn',
						title: '操作',
						align:"left",
						width: "16%",
						formatter: function(val, rowData,index) {
							
							const isSelf = rowData.user_id == user_id;	

							return `
									<div class="tabBtnBox" echo-data='${index}' >
											<div class="tab-opt s-btn ${isSelf ? "disabled" :"s-Naira"} " node-sign="del">
													${!isSelf ? '<i class="fa fa-trash"></i>'	:""}
													<span>删除</span>
											</div>
											<div class="tab-opt s-btn s-Naira " node-sign="password">
													<i class="fa fa-key"></i>	
													<span>密码修改</span>
											</div>
									</div>
								`;
						}
					}]
				],
			};
    }

    loadTab(data){
			this.creatTab(data,this.$tab,this.tabConfig("user_id"));
    }


    handle(){
    	const _self = this ;
    	const $tabContainer = this.$tabContainer ;

			//复选框事件
			$tabContainer.on("click",".checkSingle",function(){
				_self.checkSingleHandle($tabContainer);
			});
    }

}
export {TableStyle};
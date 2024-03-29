import "css/permissionManage.scss";
import {api} from "api/permissionManage.js";
import {EasyUITab} from "js/common/EasyUITab.js";
import {Unit,Search} from "js/common/Unit.js";
import {Table} from "./Table.js";


/**
 * 页面类
 */
class Page{

	static selUserId = "";
	constructor(){

		this.btnBox = $("#btnBox");
		
		this.handle();
		this.init();
		this.hasData = false ;
	}

	

	init(){

		this.unit = new Unit();
		this.table = new Table({
			unit:this.unit,
		});	


		//搜索
		this.search = new Search($("#u-search"),{
			serachCallback:(result)=>{

				$("#tab").treegrid("clearChecked");
				const userId = Page.selUserId;
				api.getFineDireByUser(userId).then(res=>{
						if(res.data){
								const selData = res.data ;
								$("#optBtn").hide();
								this.selDefault(result,selData);
								this.table.loadTab(result,function(){
										$("#tab").treegrid("expandAll");
								});
						}
				})

			


			},
			closeCallback:(res)=>{
				const userId = Page.selUserId;
				$("#optBtn").show();
				this.getUserSelArr(userId);
					
			},
			keyField:"name",
			judgeRelation:(val)=>{
					return val["type"] == 0 ;
			},
			is_Arr:false,

		});

		
		this.getData();
	}

	

	renderUserList(data){

		const str = data.map((val,index)=>{

				const {id,name} = val ;
				return `<div class="user-item ${id == Page.selUserId ? "active" :""}" data-user_id="${id}"><i class="fa fa-user">&nbsp;</i><span>${name}</span></div>` ;
		});

		$("#userList").html(str.join(""));

	}

	searchUser(key){


			const result = this.userListdata.filter(val=>{

				return val.name.includes(key);
			});


			this.renderUserList(result);


	}

	selDefault(arr,selData){

		const child = arr.children;

		arr.forEach(value=>{


			 const oIndex =  selData.indexOf(value.id);
			 const child = value.children;
				if(oIndex>-1){
						selData.splice(oIndex,1);
						value.checkState = "checkState";
            value.checked = true;
				}

			if(child.length){

				this.selDefault(child,selData);
			}


		})

		


	}

	getUserSelArr(userId){

		const $easyUITab = $("#tab");
		if(!this.hasData){
			return ;
		}
		
		this.unit.openLoading();
		api.getFineDireByUser(userId).then(res=>{
			if(res.data){
					const selData = res.data ;
					$easyUITab.treegrid("clearChecked");
					const treeData = JSON.parse(JSON.stringify(this.search.data),function(key,value){

							if(value && (value.toString() == "[object Object]")){
								 
								 const oIndex =  selData.indexOf(value.id);

								if(oIndex>-1){
										selData.splice(oIndex,1);
											value.checkState = "checked";
                      value.checked = true;
                      value._checked = true ;
								}else{
											value.checkState = "uncheck";
								}

									
							}
							return value ;
					});

					this.table.loadTab(treeData);
			}
			this.unit.closeLoading();
		})
	}


	 getData(){
   	this.unit.openLoading();

		Promise.all([api.getFineDire(),api.getUserList()]).then(res=>{

				const [fineDire,userList] = res ; 
				
				if(!fineDire || !fineDire.data){
						this.unit.tipToast("该用户下没有分配目录！",0);
						this.unit.closeLoading();
				}else{
								fineDire.data.children.forEach(function(val){
										if(val.type==0){
											val.state="closed";

										}	
								});

							const copy_data= JSON.parse(JSON.stringify(fineDire.data));
							this.search.data = [copy_data];
							this.table.loadTab([fineDire.data]);

							this.hasData=true;
				};

				if(!userList || !userList.data){
					
					this.unit.tipToast("获取用户列表失败！",0);

					return ;
			
				}else{
						const firstUserId = window.jsp_config.user_id;
						Page.selUserId = firstUserId ;
						this.userListdata = userList.data ;
						this.renderUserList(userList.data);
				};


				if(fineDire.data && userList.data){
						

						this.getUserSelArr(Page.selUserId);

				}


		});
	

	}


 

	handle(){
		const _self = this ;

		const $tableBox = $("#tabBox");

		_self.btnBox.on("click",".s-btn",function(){

			const $this = $(this);
			const sign = $this.attr("sign");

			switch(sign){
				
				case"add":{
					_self.addModal.initRender();
					break;
				}
				case"del":{
						const ids =$.map($tableBox.find(".checkSingle:checked"),function(val){
								return {id:val.value};
						}) ;

						if(!ids.length){
							_self.unit.tipToast("选择要删除的！",2);
							return ;
						}
						DelModal.delArr = ids ;
						_self.modal.show(_self.delModal.confirmMd);
					break;
				}
				default:
				break;
			}
		});

		$("#userList").on("click",".user-item",function(){

				$("#userList .user-item.active").removeClass("active");
				$(this).addClass("active");
				$("#u-search").removeClass("active-search");
				Page.selUserId = this.dataset.user_id ;
				_self.getUserSelArr(Page.selUserId);

		});

		$("#optBtn").on("click",".s-btn",function(){

			const $this = $(this);
			const type = $this.attr("sign");

			switch(type){

				case"permission":{

					if(!_self.hasData){
						return ;
					}
						
						const fileArr = [...$("#tabBox").find(".tree-checkbox1")].reduce((total,cur)=>{

											const id = $(cur).closest(".datagrid-row").attr("node-id");
											const node = $("#tab").treegrid("find",id);
											if(node && node.type == 1 ){
													const  {name,path,type} = node ;
													total.push({name,path,type});
											}
										return total ;
						},[]);

						var status = fileArr.length === 0 ? -1 : 0 ;

						_self.table.setFileRole(fileArr,status);

					break;
				}
			}



		});

		$("#j-search-user").click(function(){



			var key = $(this).siblings(".s-inp").val().trim();

			if(!key){
				return ;
			}

			$(".close-search").show();

			_self.searchUser(key);


		});

		$(".close-search").click(function(){

			$(this).siblings(".s-inp").val(null);
				_self.renderUserList(_self.userListdata);
					$(this).hide();

		});

	}
}

const page = new Page();
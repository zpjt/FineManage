import "css/main.scss";
import "css/common/button.scss";
import {api} from "api/main.js";
import {RippleBtn,Unit,SModal} from "js/common/Unit.js";
import {Menu} from "js/main/Menu.js";



const {baseUrl,base} = window.jsp_config;


class Page{


	constructor(){
		this.iframe = $("#router");
		this.unit = new Unit();
		this.modal = new SModal();
		this.handle();
		this.init();
		
	}

	init(){

		/*水波按钮*/
		new RippleBtn();

		this.menu = new Menu();
		this.renderMenu(0);
		this.renderRoleChange();
		
	}
	openFirstFolder(){

		const $menu = this.menu.box;

		const firstFolder = $menu.children("li.par_li_1").eq(0);

		if(firstFolder.length){

			firstFolder.children(".par-menu").show();
			

			firstFolder.children(".par-item").find(".slide-icon .fa").removeClass("fa-chevron-down").addClass("fa-chevron-up");

		}

	}
	renderRoleChange(){
			const {roleIdArr,roleNameArr,role_id} = window.jsp_config;

			let curRoleName = "";

			const str = roleIdArr.map((val,index)=>{

				const active = role_id == val ? "active-role" :"" ;

				role_id == val && (curRoleName = roleNameArr[index] )

				return `<li data-id="${val}" class="${active}"><i class="fa fa-user">&nbsp;&nbsp;</i><span class="role_txt">${roleNameArr[index]}</span></li>`
			})
			$("#roleOpt").html(str.join(""));
			const _this = this;
			
			$("#role").html("当前角色状态:&nbsp;"+curRoleName);

	}

	findFistMenuID(res){
		
		let flag = res[0];

		let is_par = flag.children.length != 0 ; 

		let id = flag.id;

		while(is_par){

			flag = flag.children[0];
			is_par = flag.children.length != 0 ; 
			id = flag.id;

		}

		return id ;
	}

	throttle(fn){

			let first = true;
			let timer = null ;
			return function(e){
						if(first){
								fn.call(this,e);
								first = false ;
								return ;
							}
							const _self = this ;
							if(timer){
									return ;
							};

							timer = setTimeout(function(){
									timer = null ;
									fn.call(_self,e);
							},800);
			}
	}

	renderMenu(flag){
		const role_id = window.jsp_config.role_id;
		return api.getLeftMenu(role_id,flag).then(res=>{

			$("#routerConter").html(`<iframe frameborder="0" id="router" name="myFrameName"></iframe>`);
			if(res && res.data.length){
				const data = res.data;
				const ElArr = this.menu.mapMenuJson(data,0);

				this.menu.box.data("data",data);


				const searchStr = flag==0 ? `<li id="menuSearch">
								<div class="tree-search">
									<label>
											<input type="text" class="s-inp" placeholder="搜索...">
											<span class="search-close">
												<i class="fa fa-times"></i> 
											</span>
										</label>
										<button class="s-btn j-search"><i class="fa fa-search-plus"></i></button>
									</div></li>` : "";
				this.menu.box.html(searchStr+ElArr.join(""));
					
				const id_first = this.findFistMenuID(data);
				$(`.menuItem[echo-id=${id_first}]`).eq(0).click();

				this.openFirstFolder();

			}else{
				this.unit.tipToast("菜单为空",2);
				this.menu.box.html("");
				
			}
			
		});
	}

	seachTree(key){


		function filterJson(arr){

			return arr.filter(val=>{

					const {children:child,name} = val ;
					const is_key = name.includes(key);

					if(child.length){

						if(!is_key){
						
							const result = filterJson(child) ;
							val.children = result ;
							return result.length ;
						
						}else{

							return true;
						}
					
				
					}else{
						return is_key;
					}

			})

		}

		const data = this.menu.box.data("data");
		const copy_data = JSON.parse(JSON.stringify(data));
		
		return filterJson(copy_data);

	}	

	handle(){

		const _self = this;

		const closeFun = (function (){
			let count  =  0 ;
			const $slide =$("#slide");
			return function(){
				count ++ ;
				if(count%2){
					$slide.animate({"width":45},500,function(){
						$slide.addClass("collapsed");
						$(".par-menu").removeAttr("style");
					});
				}else{
					$(".slide-icon").html('<i class="fa fa-chevron-down"></i>');
					$slide.animate({"width":300},500,function(){
						$slide.removeClass("collapsed");
					});
				}
			}
		})();

		/*搜索*/

		$("#menu").on("click",".j-search",function(){	

			const par = $(this).parent()

			const key = par.find(".s-inp").val().trim();
			if(!key){
					return ;
			}
			par.find(".search-close").show();

			const data = _self.seachTree(key);
			const ElArr = _self.menu.mapMenuJson(data,0);

			$("#menuSearch").nextAll().remove();
			$("#menu").append(ElArr.join(""));

			_self.menu.box.find(".fa-chevron-down").addClass("fa-chevron-up").removeClass("fa-chevron-down");
			_self.menu.box.find(".par-menu").show();




		});

		$("#menu").on("click",".search-close",function(){

				const data = _self.menu.box.data("data");
				const ElArr = _self.menu.mapMenuJson(data,0);

				$("#menuSearch").nextAll().remove();
				$("#menu").append(ElArr.join(""));

				

				$(this).hide();
				const key = $(this).siblings(".s-inp").val("");

					_self.openFirstFolder();

		});
		


		/*收缩菜单*/
		$("#slideFoot").click(function(){
			closeFun();
		});
		//修改角色	
		$("#roleOpt").on("click","li",function(){
        const $this =$(this);
        const id =$this.attr("data-id");

        $this.addClass("active-role").siblings().removeClass("active-role");

        const {roleNameArr} = window.jsp_config;
       window.jsp_config.role_id = id ;

				const status =		Menu.status == "view" ? 0 : 1;
       	_self.renderMenu(status);

       	const curRoleName = $this.find(".role_txt").html();


       	$("#role").html("当前角色状态:&nbsp;"+curRoleName);


			});
		/*系统操作*/
		$("#userOpt").on("click","li",function(){

			const key = $(this).attr("key");

			switch(key){
				
				case "power": //退出登录

					if(window.jsp_config.resourse){
						window.location.href=baseUrl+"login/logOut";
					}else{
						window.location.href="login.html";
					}
				
				break;
			}
		});

		/*切换界面,防止快速的连续点击，加了函数防抖*/
		$("#cogs").on("click","li",function(){
		 	const $this = $(this);

		 	if($this.hasClass("active-role")){
		 			return ;
		 	}

		 	$("#viewSys").html($this.html())

		 	$this.addClass("active-role").siblings().removeClass("active-role");
		 	if($this.attr("key")=="view"){
		
						_self.renderMenu(0);
						$this.removeClass("active-view");
						Menu.status = "view";
		 	}else{

						_self.renderMenu(1);
						$(this).addClass("active-view");
						Menu.status = "menu";
		 	}
		 });

	

	}

}

const page = new Page();

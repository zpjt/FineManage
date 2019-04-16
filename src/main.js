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
	renderRoleChange(){
			const {roleIdArr,roleNameArr,role_id} = window.jsp_config;

			const str = roleIdArr.map((val,index)=>{

				const active = role_id == val ? "active-role" :"" ;

				return `<li data-id="${val}" class="${active}"><i class="fa fa-user">&nbsp;&nbsp;</i>${roleNameArr[index]}</li>`
			})
			$("#roleOpt").html(str.join(""));
			const _this = this;
			$("#roleOpt").on("click","li",function(){
        const $this =$(this);
        const id =$this.attr("data-id");

        $this.addClass("active-role").siblings().removeClass("active-role");

       window.jsp_config.role_id = id ;

       	_this.renderMenu(1);


			});


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
				this.menu.box.html(ElArr.join(""));
					
				const id_first = this.findFistMenuID(data);
				$(`.menuItem[echo-id=${id_first}]`).eq(0).click();

			}else{
				this.unit.tipToast("菜单为空",2);
				this.menu.box.html("");
				
			}
			
		});
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

		/*收缩菜单*/
		$("#slideFoot").click(function(){
			closeFun();
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
		$("#changBox").click(
		 _self.throttle(function(){
		 	const $this = $(this);
		 	if($this.hasClass("active-view")){
		 				$("#content").addClass("no-head");
						_self.renderMenu(0);
						$this.removeClass("active-view");
						Menu.status = "view";
		 	}else{
		 			$("#content").removeClass("no-head");
						_self.renderMenu(1);
						$(this).addClass("active-view");
						Menu.status = "menu";
		 	}
		 })
		);

	

	}

}

const page = new Page();

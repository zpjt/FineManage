/*渲染菜单*/
class Menu{
	static status = "view";

	constructor(){
		this.init();
		this.handle();
	}

	init(){
		this.box = $("#menu");
	}
	
	mapMenuJson(arr,_lev){

		let lev = _lev;
		lev++;
		return arr.map((val,index)=>{
			
			const {children,name,id,par_id,url,des} = val;

			let data = {
				url,
				par_id,
				id,
				lev,
				icon:des
			}

			if(par_id == -2){

 
				let  childrenEl = this.mapMenuJson(children,lev);

				return this.parentComponent(childrenEl,name,data);

			}else{

				const item = this.childComponent(name,data);
			
				return 	item;					
			
			}
		})

	}

	parentComponent(child,name,data){

		let {url,lev,par_id,id,icon}= data;

		const  indent =new Array(lev).fill(`<span class="indent"></span>`).join("");
		return (`
			<li class="par_li_${lev} par_li" >
				<div class="menuItem par-item " data-url=${url} lev="${lev}" echo-id="${id}">
					${indent}<i class="fa ${icon}"></i><span class="icon-wrap"><span class="menu-name">&nbsp;${name}</span><span class="slide-icon"><i class="fa fa-chevron-down  "></i></span></span>
				</div>
				<ul class="par-menu">${child.join("")}</ul>
		</li>
		`);

	}

	childComponent(name,data){
		const  indent =new Array(+data.lev).fill(`<span class="indent"></span>`).join("");
		let {icon,url,id}= data;
		return (`
			<li class="child_li child_li_${data.lev}">
				<div class="menuItem child-item " data-url=${url} echo-id="${id}">
				${indent}<i class="fa ${icon} ">&nbsp;</i><span class="icon-wrap"><span class="menu-name">${name}</span></span>
				</div>
			</li>
		`);		
	}

	getIframeUrl(){
		
		if(!window.jsp_config.resourse){
			return function(url){

					return url.split("/")[2]+".html";
			}
		
		}else{
			return function(url){
				return url;
			};
		}
	}

	handle(){

		const _self = this ;

		const getUrlMethod = this.getIframeUrl();

		/*收缩目录*/
		this.box.on("click",".slide-icon",function(e){
			e.stopPropagation();
			const $this = $(this);
			const $icon = $this.children(".fa");
			const $childEl = $this.parent().parent().siblings(".par-menu");
			const is_down = $icon.hasClass("fa-chevron-down");

			if(is_down){
				$icon.removeClass("fa-chevron-down").addClass("fa-chevron-up");
				$childEl.slideUp();
			}else{

				$icon.removeClass("fa-chevron-up").addClass("fa-chevron-down");
				$childEl.slideDown();
			}
		});

		/*切换菜单*/
		this.box.on("click",".menuItem",function(events){

			const $this = $(this);

			if($this.hasClass("par-item")){
				return;
			}

			$(".active").removeClass("active");
			$(".active-par").removeClass("active-par");

			const  par_item =  $this.closest(".par-menu").siblings(".menuItem");
			par_item.addClass("active-par");
			$this.addClass("active");

			const layout_id = $this.attr("echo-id"),
				  layout_name = $this.find(".menu-name").html();

			const url=$this.attr("data-url");

			const iframeUrl = getUrlMethod(url);

			

			if(Menu.status === "menu"){ //后台页面
				const src = iframeUrl;
				$("#routerConter").html(`<iframe frameborder="0" id="router" name="myFrameName" src="${src}"></iframe>`);
			
			}else{//前台页面

				const src = iframeUrl;
				$("#routerConter").html(`<iframe frameborder="0" id="router" name="myFrameName" src="${url}"></iframe>`);
			}

		});
	}
}

export {Menu} ;
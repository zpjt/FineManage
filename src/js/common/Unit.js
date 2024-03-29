import "css/common/input.scss";
import "css/common/modal.scss";
import "css/common/common.scss";
import "css/common/button.scss";

import { Calendar } from "js/common/calendar.js";



class Unit {

	constructor(){
		this.tipInit();
	}
	JsonTofind(obj,value){

		const defaultConfig = {
			childField:"children",
			keyField:"id",
			data:[],
			
		}

		const config = Object.assign({},defaultConfig,obj);

		const {childField,keyField,data} = config;
		
		let result = null ;

		function findJson(_arr){

			return _arr.find(val=>{

				const child = val[childField] ;

				const is_key = val[keyField] === value;

				if(is_key){
					result = val ;
					return true ;
				}

				if(child.length){
					return findJson(child);
				}
			})
		}

		findJson(data);
		
		return result ;

	}
	tipToast(txt,status=1){

		const iconArr = ["sicon-error","sicon-detail","sicon-warn"];
		const iconArrTxt = ["错误提示","成功提示","警告提示"];


		const itemStr = `<div class="tip-item tip1">
							<p class="tip-close">
								<span><i class="sicon ${iconArr[+status]}"></i><span class="tip-type">&nbsp;${iconArrTxt[+status]}</span></span>
								<span class="j-close"><i class="fa fa-times"></i></span>
							</p>
							<p class="tip-txt"><span>${txt}</span></p>
							<div class="tip-progress"></div>
						</div>`;
	  this.$tipBox.append(itemStr);

	  const $tip  = $(".tip-item:last-child");

	  setTimeout(function(){
		$tip.remove();
	  },6000);
	}

	tipInit(){
		this.$tipBox = $("#tipToast");
		this.$tipBox.on("click",".j-close",function(){
			 $(this).closest(".tip-item").remove();
		});
	}

	openLoading(){
				$("body").append(`<div class="loading">

								<div style="width:80px;height:80px">
									<svg class="lds-spinner" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><g transform="rotate(0 50 50)">
										  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#000">
										    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
										  </rect>
										</g><g transform="rotate(30 50 50)">
										  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#000">
										    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
										  </rect>
										</g><g transform="rotate(60 50 50)">
										  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#000">
										    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
										  </rect>
										</g><g transform="rotate(90 50 50)">
										  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#000">
										    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
										  </rect>
										</g><g transform="rotate(120 50 50)">
										  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#000">
										    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
										  </rect>
										</g><g transform="rotate(150 50 50)">
										  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#000">
										    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
										  </rect>
										</g><g transform="rotate(180 50 50)">
										  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#000">
										    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
										  </rect>
										</g><g transform="rotate(210 50 50)">
										  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#000">
										    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
										  </rect>
										</g><g transform="rotate(240 50 50)">
										  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#000">
										    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
										  </rect>
										</g><g transform="rotate(270 50 50)">
										  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#000">
										    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
										  </rect>
										</g><g transform="rotate(300 50 50)">
										  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#000">
										    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
										  </rect>
										</g><g transform="rotate(330 50 50)">
										  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#000">
										    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
										  </rect>
										</g></svg>
								</div>

					</div>`);

	}	

	closeLoading(){
		$(".loading").remove();
	}
}

/*搜索框组件*/
class Search{
	constructor(el,obj){

		const defaultConfig ={
			serachCallback:function(){},
			closeCallback:function(){},
			childrenField:"children",
			keyField:"id",
			judgeRelation:function(){return false},
			is_Arr:true,
		};

		this.config =  Object.assign({},defaultConfig,obj);
		this.box = el;
		this.data = [];
		this.renderSearch();
		this.handle();
	}
	seachTree(key){

		const {childrenField,keyField,judgeRelation} = this.config ;
		const data = this.data;

		function filterJson(arr){

			return arr.filter(val=>{
				const child = val[childrenField];
				const type = judgeRelation(val);
				const text = val[keyField];

				if(type){

					if(child.length){

						const result = filterJson(child) ;

						val[childrenField] = result ;
						
						return result.length;
			
					}else{
						return false ;
					}

				}else{

					const is_key = val[keyField].includes(key);

					if(child.length){
						const result = filterJson(child) ;
							val[childrenField] = result ;
						return result.length || is_key;
					}else{
						return is_key;
					}
				}
			})

		}
		const copy_data = JSON.parse(JSON.stringify(data));
		
		return filterJson(copy_data);

	}	

	serachArr(keywords){

		const {keyField} = this.config ;
		const data = this.data;

		return data.filter(val=>{

			return val[keyField].includes(keywords);
		});

	}

	renderSearch(){

		const str = `
					<div class="input-box">
						<input type="text" class="s-inp search-inp"  autocomplete="new-password" placeholder="搜索关键字....">
						<button class="s-btn search-btn" id="searchBtn">
							<span class="search-icon"></span>
						</button>
					</div>
					<span class="search-close" id="searchClose">
						<i class="fa fa-times fa-lg"></i>
					</span> `;


		this.box.html(str) ;
	}

	search(){
		
		return this.config.is_Arr ? this.serachArr : this.seachTree;
	}

	handle(){

		// 搜索
		const _self = this ;
		const {box,config:{serachCallback,closeCallback}} = _self ;
		const inp = box.find(".search-inp");

		const searchMethod = this.search();


		box.on("click",".search-btn",function(){
			const state = box.hasClass("active-search");
			
			!state && box.addClass("active-search");


			const keywords = inp.val().trim();
			if(!keywords){return };

			const result = searchMethod.call(_self, keywords);
			serachCallback(result);

		});
		// 搜索按钮关闭
		box.on("click",".search-close",function(){

			box.removeClass("active-search");

			inp.val("");
			Promise.resolve().then(()=>{

						closeCallback(_self.data);

			}) 
		
		});
	}


}


/*水波按钮*/
class RippleBtn{
	
	constructor(option){

		const defaultOption = {
			opacity:.5,
			speed:.6,
			bgColor:"#fff",

		};

		this.config = Object.assign({},defaultOption,option);
		this.els = $(".m-rippleBtn");
		this.handle();
	}

	init(el){


	}

	renderRipple($this,e){

		const rect = this.getPosition($this[0],e);
		this.createRipple($this,rect);

	}

	getPosition(el,e){

		const {width,height,x,y} = el.getBoundingClientRect();

		const radiusRange = Math.max(width,height);
		const left = e.clientX - x - radiusRange / 2  ;
		const top =  e.clientY - y - radiusRange / 2 ;
		return {
			radiusRange,
			top,
			left
		};
	}

	createRipple($el,rect){

		const {radiusRange, top, left} = rect ;

		const {opacity,speed,bgColor} = this.config ;

		const str = `<span class="u-ripple" style="opacity:${opacity};background:${bgColor};animation-duration:${speed}s;width:${radiusRange}px;height:${radiusRange}px;top:${top}px;left:${left}px"></span>`;

		$el.append(str);

	}

	handle(){

		const _self = this ;
		this.els.on("click",function(e){

			const $this = $(this) ;
			_self.renderRipple($this,e);


		});

		this.els.on("animationend",".u-ripple",function(e){
			const $this = $(this) ;
			$this.remove();
		});
	}

}


class DropMenu{
	constructor($el, obj) {

		const defaultConfig = {
			data: [],
			buttonIcon: 'fa fa-plus',
			dropIcon: 'fa fa-chevron-down',
			buttonTxt:"新增",
			itemH:30,
			itemCallback:function(){
				
			},
			slideCallBack:function(){

			}
		};

		this.config = Object.assign({}, defaultConfig, obj);
		this.box = $el;

		this.init();
		this.handle();

	}
	init() {
		
		const buttonStr = this.renderButtons();
		const dropStr =`<ul class="menu-box">${this.renderDrop().join('')}</ul>`;

		this.box.html(buttonStr + dropStr);
	}

	renderDrop() {
		const {
			data,itemH
		} = this.config;

		return data.map((val,index) => {
			const {
				icon,
				text,
				id
			} = val;
			return `<li class="menu-item" echo-data = '${id}' style="top:${index*itemH}px">
  					<span class="drop-icon">
  						<i class='${icon}'></i>
  					</span>
  					<span class="drop-text">
  						${text}
  					</span>
				</li>`

		});
	}

	renderButtons() {

		const {
			dropIcon,buttonIcon,buttonTxt
		} = this.config ;

		return `<div class="menu-btn">
					<span>
					  <i class="${buttonIcon}"></i>
						${buttonTxt}
					</span>
					<span class="s-Divider"></span>
					<span class="dropmenu-icon">
						<i class="${dropIcon}"></i>
					</span>
				</div>`;
	}
	reload(data){
		this.config.data = data ;
		const str = this.renderDrop().join("");
		this.box.find(".menu-box").html(str);
	}
	handle() {
      const _self = this ;
		/**
		 * [下拉菜单展开]
		 * @param  {[type]} ){                   	  const $this [description]
		 * @return {[type]}     [description]
		 */
      this.box.on('click','.menu-btn',function(){

      	  const $this = $(this);
      	  const $par = $this.parent('.drop-menu');
      	  const $drop = $this.siblings('.menu-box');

      	  if($par.hasClass('active')){
			$par.removeClass('active');
      	  	window.requestAnimationFrame(function(){
				$drop.hide();
			});
      	  }else{
      	  	$drop.show();
      	  	_self.config.slideCallBack();
      	  	window.requestAnimationFrame(function(){
      	  		$par.addClass('active');
      	  	})
      	  }


      });

      this.box.on('click','.menu-item',function(){

			const $this= $(this);

			_self.config.itemCallback($this);
		    _self.box.removeClass("active");
		    _self.box.children(".menu-box").hide();


      })
	}
	

}

/*
 下拉框类
 @data:数组
 @multiply:true 多选,
 @dropFormatter:自定义返回的内容，但是主要显示的文字一定要用 item-txt包住
*/

class SInp{
	constructor(){
		this.init();
	}

	init(){
		this.handle();
	}

	handle(){
		$(".s-inp-box .s-inp.s-valid" ).on("blur",function(){

			const val = this.value.trim();
			!val && $(this).addClass("no-fill") || $(this).removeClass("no-fill");
		

		});

		$(".num-valid").on("blur",function(){

			var state=this.validity;
		    !state.valid?$(this).addClass("no-fill"): $(this).removeClass("no-fill");

		});
	}
}

class SCombobox {

	constructor($el,config){

		const defaultConfig = {
			"prompt":"请选择...",
			"slideIcon":"fa fa-chevron-down",
			"data":[],
			"dropIcon":"fa fa-circle",
			"textField":"text",
			"idField":"id",
			"validCombo":true,
			"dropFormatter":null,
			"multiply":false,
			"defaultVal":[],
			 clickCallback:function(){},
			 width:260,
			 textarea:false,
			 ableCustom:false,//能自定义数据的增加和删除
		}

	

		this.config = Object.assign({},defaultConfig,config);
		this.box = $el ;

			if(!Array.isArray(this.config.defaultVal)){

				alert("不是array");
			}



		this.selValue =  this.config.defaultVal;
		this.init();
 		this.handle();
	}

	init(){
		const {width} = this.config;
		this.box.css({"width":width});
		this.box.html(this.initRender());
	  this.selValue.length　&& this.setValue(this.selValue);
	}

	loadData(data,$el=this.box){



		this.config.data = data;
		const str = this.renderDrop(this.selValue).join("");
		const $drop = $el.children(".combo-drop");
		$drop.html(`<ul class="drop-ul">${str}</ul>`);

	//	this.setValue(this.selValue,$el);


		!this.selValue.length &&  this.config.validCombo && $el.children(".combo-inp").addClass("no-fill");

	}
	

	initRender(){

		const {validCombo,ableCustom} = this.config;

		const is_valid = validCombo && "no-fill" || "" ;

		const ableCustomStr = ableCustom ? `<div class="combo-edit">
																<label >

																	<button class="s-btn j-add j-optBtn" name="add">添加</button><input type="text" class="addItem-inp s-inp" autocomplete="new-password" placeholder="输入新增名称..." />
															  
																</label>
																<button class="s-btn j-edit j-optBtn" name="edit"></button>
															</div>` :"" ;

		return `
				<div class="combo-inp ${is_valid}" >
					${this.renderInpBox()}
				</div>
				<div class="combo-drop ">
					${ableCustomStr}
					<ul class="drop-ul">
						${this.renderDrop().join("")}
					</ul>
				</div>
				`
	}

	setValue(values,$el=this.box){

		$el.find(".drop-ul").removeClass("g-edit");

		$el.find(".drop-ul").find(".update-inp").remove();

	   const $drop = $el.children(".combo-drop").children("ul");

	   const {data,idField,textField,multiply} = this.config;
	   let txts = null ;
	   if(multiply){
	   	 	$drop.html(this.renderDrop(values));
	   	 	this.selValue = values;
	   	 	txts = values.map(val=>{
					const node =	data.find(item=>val==item[idField]);
					return node ? node[textField] : val;
			});

	   }else{
		 	$drop.children(`li[echo-id=${values}]`).addClass("active").siblings().removeClass("active");
		 		this.selValue = [values];
		 		const node = data.find(val=>val[idField]==values);
		 		txts = node ? [node[textField]] : val;
	   }

	   this.updateInpValue($drop,txts);

	}

	getValue($el=this.box,node="id"){

		const selIds =  $el.find(".combo-value").val();

		if(node=="id"){
			return selIds;
		}else{

			const {data,idField,textField} = this.config;
			return this.config.data.filter(val=>{


				return selIds.includes(val[idField]);

			})
		}
		
	}
	clearValue($el=this.box){

		const $inp = $el.find(".combo-value");
		this.selValue = [] ;
		$inp.val(null);
		$inp.siblings(".combo-text").val(null);
		this.config.validCombo && $inp.parent().addClass("no-fill");
		$el.find(".active").removeClass("active");
			
	}
	updateInpValue($drop,txt){
		
		const inpBox = $drop.parent().siblings();
    const comboText = inpBox.children(".combo-text"),
	 				comboValue = inpBox.children(".combo-value");
		const vals = this.selValue;


		comboText.val(txt.join(","));
		comboValue.val(vals.join(","));

		if(this.config.validCombo){
			!vals.join(",") ? inpBox.addClass("no-fill") :inpBox.removeClass("no-fill");
		}
	}

	updateInpBox($drop,node,status){
		
    const {data,idField,textField,multiply} = this.config;
    const ids = this.selValue ;

		let txts = null ;

		if(multiply){



			txts = ids.map(val=>{
					const node =	data.find(item=>val==item[idField]);
					return node ? node[textField] : val;
			});

			if(status){ //增加
				this.selValue.push(node[idField]);
				txts.push(node[textField]);
			}else{//移除
				const oIndex = this.selValue.findIndex(val=>val==node[idField]);
				this.selValue.splice(oIndex,1);
				txts.splice(oIndex,1);
			}

		}else{
			this.selValue = [node[idField]];
			txts= [node[textField]];
		}

		this.updateInpValue($drop,txts);

	}

  renderInpBox(){

    	const {textarea , multiply ,prompt,slideIcon} = this.config;
    	const selValue = this.selValue;

    	const value = Array.isArray(selValue) ? selValue.join(","): selValue;

		  const htmlType = (textarea || multiply) && `<textarea  class="s-textarea combo-text" autocomplete="new-password" placeholder="${prompt}" readOnly="readOnly"></textarea>` || `<input type="text" autocomplete="new-password" class="s-inp combo-text" placeholder="${prompt}" readOnly="readOnly"/>`;

    	return `
					${htmlType}
					<input type="hidden" class="s-inp combo-value"  value="${value}"/>
					<span class="slide-icon ${slideIcon}">
					</span>
				`
  }

	renderDrop(values=this.selValue){

		const {data,dropIcon,textField,idField,dropFormatter,ableCustom} = this.config;

		const optBtnStr = ableCustom ? `<span class="item-opt"><button class="j-optBtn s-btn" name="del"><i class="fa fa-times"></i></button></span>` :"";
		return data.map((val,index)=>{

			const id = val[idField];
			const active = values.includes(id) && "active" || "" ;

			return `<li class="drop-item ${active}" echo-id="${id}">
						<span class="txt-wrap"><span class="${dropIcon}">&nbsp;</span><b class="item-txt">${ dropFormatter && dropFormatter(val) || val[textField] }</b></span>
						${optBtnStr}
					</li>`

		});
	}

	updateItem(val,$this){

					const {idField,textField,updateFn,data} = this.config;
					if(updateFn){

								const par = $this.closest(".drop-item");
								const id = par.attr("echo-id");


							
								updateFn(val,id).then(res=>{

										if(res){
												par.find(".item-txt").html(val)
												par.find(".update-inp").remove();
												const selecteId = this.box.find(".combo-value").val() ;

												const node = data.find(val=>val[idField]==id);

												node[textField] = val ;

												if(selecteId == id){

														this.box.find(".combo-text").val(val);

												}
										}

								});

					}

					
	}

	handle(){

		const self = this ;
		
		//选择item
		this.box.on("click",".drop-item",function(e){


			e.stopPropagation();
			const $this= $(this);

			if(self.box.find(".drop-ul").hasClass("g-edit")  ){

					const item = $this;
				
				if(!item.find(".update-inp").length){
						self.box.find(".update-inp").remove();
					const text = item.find(".item-txt").text();
					item.append(`<input type="text" class="s-inp update-inp" value="${text}" />`)
				

				}

				return ;

			}

		
			let status = null ; // true 增加，false移除
			const is_self = $this.hasClass("active");

			if(self.config.multiply){
				 is_self &&  $this.removeClass("active") || $this.addClass("active");
				 status	= !is_self; 
			}else{
				
				if(is_self){ //单选的时候，又点击到自己什么都不做！
						return ;
				 }

				status = self.getValue();
				$this.addClass("active").siblings().removeClass("active");
				
			};

			//获取node数据
			const id = $this.attr("echo-id");
			const node = self.config.data.find(val=>{
				return val[self.config.idField] == id ;
			});

			// 更新inp里所选择的值
			const par = $this.parent();
			self.updateInpBox(par,node,status);

			//单选时，关闭下拉框
			!self.config.multiply && self.hideUp(self.box);

			//回调函数
			self.config.clickCallback(node,self,status);

		});

		this.box.on("click",".combo-inp",function(e){

		//	e.stopPropagation();

			const $this= $(this);
			const par = $this.parent();
			const is_active = par.hasClass("active");

			!is_active ? self.showDown(par) : self.hideUp(par);

		});

		this.box.on("click",".combo-edit",function(e){
			e.stopPropagation();
		});

		this.box.on("click",".item-opt",function(e){
			e.stopPropagation();
		});

		

		this.box.on("click",".update-inp",function(e){

			e.stopPropagation();

			

		});
			this.box.on("keydown",".update-inp",function(e){

				if(e.keyCode == 13){
					var $this= $(this);
					const val = $this.val().trim();

					if(!val){
						return ;
					}
					self.updateItem(val,$this);
				}

			

			

		});

		this.box.on("click",".j-optBtn",function(e){

			const $this =  $(this);

				const type =this.name;

				switch(type){

					case "add":

						const addText = $this.siblings(".s-inp").val().trim();

						if(!addText){
							return ;
						}

						if(self.config.addFn){

							 self.config.addFn(addText).then(res=>{

							 		if(res){

							 			const itemStr = `<li class="drop-item " echo-id="${res}">
																				<span class="txt-wrap"><span class="${self.config.dropIcon}">&nbsp;</span><b class="item-txt">${addText}</b></span>
																				<span class="item-opt"><button class="j-optBtn s-btn" name="del"><i class="fa fa-times"></i></button></span>
																			</li>`
							 				self.box.find(".drop-ul").append(itemStr);

							 				const {idField,textField} = self.config;

							 				self.config.data.push({[idField]:res,[textField]:addText});

							 				self.box.find(".addItem-inp").val("");

							 		}


							 })	

						}

						 	

						break;
					case "edit":

						self.box.find(".drop-ul").toggleClass("g-edit");
						self.box.find(".update-inp").remove();

						$this.toggleClass("m-edit-txt");

						break;

					case "del":

						

						if(self.config.delFn){

							const par = $this.closest(".drop-item");
							const id = par.attr("echo-id");

								self.config.delFn(id,function(res){


								
											if(res){
												par.remove();
												const selecteId = self.box.find(".combo-value").val() ;

												if(selecteId == id){

														self.clearValue();

												}
											}


								})

								

						}

						break;

					

				}

			

		});



	}




	showDown(par,callback){
	
		par.children(".combo-drop").show();
		requestAnimationFrame(function(){
           par.addClass("active");
        });

        
	}

	hideUp(par){
		 par.removeClass("active");
		 const $drop = par.children(".combo-drop");
       	 $drop.hide();

    
	}

	
}

/*
  模态框类
*/
class SModal{

	constructor(){
		this.handle();
	}

	init(){
		
	}

	close($el,className="m-show"){
		$el.removeClass(className);
		requestAnimationFrame(function(){
			$el.hide();
		});
	}

	show($el,className="m-show"){
		$el.show();
		requestAnimationFrame(function(){
			$el.addClass(className);
		});
	}

	handle(){
		const self = this;
		$(".m-close").click(function(e){
			const Modal = $(this).closest(".s-modal");
			self.close(Modal);
		});

	
		/**
		 * [按住模态框标题移动模态框]
		 * @return {[type]}  [description]
		 */
		$(".m-title").mousedown(function(e){

			const target = e.target || e.srcElement;

			const maxH = $(window).height() - 50 ;
			const maxW = $(window).width() - 50 ;



			if(target.classList.contains("m-title")){
		
			  const moveTarget = $(this).closest(".s-modal");
	     	const curx = e.offsetX,
	     				cury = e.offsetY;

	     		$(window).on("mousemove",function(e){
							const event = e || window.events;
							let x = e.clientX  - curx;
							let y = e.clientY - cury;

							x = x < 0 ? 0 : x > maxW  ? maxW : x ;
							y = y < 0 ? 0 : y > maxH ? maxH : y ;


							moveTarget[0].style.transform = `translate(${x}px,${y}px)`;
							moveTarget[0].style.top = 0;
							moveTarget[0].style.left = 0;
					}).one("mouseup",function(){
							$(window).off("mousemove");
					});

			}
		});
	}
}

/*
  tree结构类
  judgeRelation:true：目录 ,false:文件
*/

class Tree{

	constructor($el,config){

		const defaultConfig = {
			"data":[],
			"textField":"text",
			"search":true,
			"idField":"id",
			"childIcon":"fa fa-user-circle-o",
			"parIcon":"fa fa-folder-open-o",
			"slideIcon":"fa fa-minus-square-o",
			"checkbox":false,
			"formatter":null,
			"parClick":false,
			 "clickCallback":function(){
			 },
			 "checkCallback":function(){
			 },
			 "clickAndCheck":true,
			 "childrenField":"children",
			 "judgeRelation":(val)=>{//自定义判断是目录还是文件的函数

					return val[defaultConfig.childrenField].length > 0 ;

			 }
		}

		this.config = Object.assign({},defaultConfig,config);
		this.box = $el ;
		this.selArr = null;
		this.searchStatus = null ;
		this.init();
		this.handle();

	}

	init(){

		this.selArr = [];
		this.searchStatus = false ;

		const {data,search} = this.config;
		const str = this.renderOrgJson(data,0);
		const searchStr = search  ? `<div class="tree-search">
									<label >
											<input type="text" class="s-inp" autocomplete="new-password" placeholder="搜索..." />
											<span class="search-close">
												<i class="fa fa-times"></i> 
											</span>
										</label>
										<button class="s-btn j-search"><i class="fa fa-search-plus"></i></button>
									</div>` : "";
		this.box.html(`${searchStr}<ul class="s-tree">${str.join("")}</ul>`);
	
	}

	changeType(checkbox){
		
		this.config.checkbox = checkbox;
		this.box.unbind();
		this.init();
		this.handle();

	}

	seachTree(key){
			
		const {data,childrenField,textField,judgeRelation} = this.config ;


		function filterJson(arr){

			return arr.filter(val=>{
				const child = val[childrenField];
				const type = judgeRelation(val);
				const text = val[textField];

				if(type){

					if(child.length){

						const result = filterJson(child) ;

						val[childrenField] = result ;
						
						return result.length;
			
					}else{
						return false ;
					}

				}else{

					const is_key = val[textField].includes(key);


					if(child.length){

						const result = filterJson(child) ;
							val[childrenField] = result ;
						
						return result.length || is_key;
			
					}else{


						return is_key;
					}
				}
			})

		}
		const copy_data = JSON.parse(JSON.stringify(data));
		
		return filterJson(copy_data);

	}

  renderOrgJson(arr,_lev){

    	let lev = _lev ;
    		lev ++ ;

    		const {idField,textField,childrenField,judgeRelation,childIcon,parIcon,formatter} = this.config ;

			return arr.map((val,index)=>{
				const id = val[idField],
					  name =!formatter && val[textField] || formatter(val),
					  children = val[childrenField],
					  par_id = val["par_id"];


			    const type = judgeRelation(val);
				let data = {id,name,lev,par_id} ;

				if(type){

	 				data.parIcon=parIcon;
					let  childrenEl = this.renderOrgJson(children,lev);
					return this.parentComponent(childrenEl,data);
				}else{
					data.childIcon=childIcon;
					const item = this.childComponent(data);
					return 	item;					
				}
			});

	}

	async reload(key=""){

		let data = key ? this.seachTree(key) : this.config.data ;

		const str = this.renderOrgJson(data,0);

		if(str.length==0){
			str[0]=`<li><div class="search-res"><span>无任何匹配内容！</span></div></li>`;
		}

		this.box.find(".s-tree").html(str.join(""));

		const idField = this.config.idField ;
		const ids = this.selArr.map(val=>val[idField]);
		this.setValue(ids,false);
	}
	
	parentComponent(child,data){

		let {name,id,lev,par_id}= data;
		const {parIcon,checkbox,slideIcon} = this.config;

		const  indent =new Array(lev).fill(`<span class="indent"></span>`).join("");

		const checkboxStr =checkbox &&  `<span class="s-checkbox">
						<input type="checkbox" class="par-checkinp tree-inp" value="${id}"  /><label class="fa fa-square-o" ></label>
				</span>` || "";

		return (`
			<li  lev="${lev}" class="tree-li">
				<div class="menuItem par-item" echo-id="${id}">
					${indent + checkboxStr}
					<i class="${parIcon}"></i>
					<span class="item-txt">${name}</span><span class="tree-slide-icon"><i class="${slideIcon}"></i></span>
				</div>
				<ul class="par-menu">${child.join("")}</ul>
			</li>
		`);

	}

	childComponent(data){

		let {name,id,lev}= data;
		const {childIcon,checkbox} = this.config;

		const checkboxStr =checkbox &&  `<span class="s-checkbox">
						<input type="checkbox" class="child-checkinp tree-inp" value="${id}"  /><label class="fa fa-square-o" ></label>
				</span>` || "";


		const  indent =new Array(lev).fill(`<span class="indent"></span>`).join("");
	
		return (`
			<li lev="${lev}" class="tree-li">
				<div class="menuItem child-item" echo-id="${id}">
				${indent + checkboxStr }
				<i class="${childIcon}">&nbsp;</i>
				<span class="item-txt">${name}</span>
				</div>
			</li>
		`);		
	}
	
	/**
	 * [复选框的级联事件，可以当作是事件冒泡那样，得一级一级往上找]
	 * <ul class="par-menu">
			<li lev="3" class="tree-li">
				<div class="menuItem par-item" echo-id="206">
					<span class="indent"></span><span class="indent"></span><span class="indent"></span>
					<span class="s-checkbox">
						<input type="checkbox" class="par-checkinp tree-inp" value="206"><label class="fa fa-square-o"></label>
					</span>
					<i class="fa fa-folder-open-o"></i>
					<span class="item-txt">耳鼻咽喉科</span><span class="tree-slide-icon"><i class="fa fa-minus-square-o"></i></span>
				</div>
				<ul class="par-menu">
					...
				</ul>
			<li>
		</ul>
	 * @return {[type]} [description]
	 */
	cascadeTreeInp($this,is_par,status){


		let up_par_li =  $this.closest(".tree-li");
		let lev = up_par_li.attr("lev");

		if(is_par){
			up_par_li.find(".has-chec").removeClass("has-chec");
			up_par_li.find(".tree-inp").prop("checked",status);
		}

		while (lev > 1 ){
			  up_par_li = up_par_li.parent().parent();
			  lev = +up_par_li.attr("lev");

			  const checkEl = up_par_li.children(".menuItem").find(".tree-inp");
			  const ul_par =  up_par_li.children(".par-menu") ;
			  const ul_par_leg = ul_par.children("li").length;
			  const check_leg = ul_par.children("li").children(".menuItem").find(".tree-inp:checked").length;

			 if(check_leg === 0 ){ //一个没选
			 	checkEl.siblings("label").removeClass("has-chec");
			 	checkEl.prop("checked",false);
				
			 }else if( check_leg < ul_par_leg ){
				checkEl.prop("checked",false);
				checkEl.siblings("label").addClass("has-chec");
			 }else{// 全选 

			 	checkEl.siblings("label").removeClass("has-chec");
			 	checkEl.prop("checked",false);

			 	checkEl.prop("checked",true);
				checkEl.siblings("label").removeClass("has-chec");
			 }

			  const is_has_chec = up_par_li.find(".has-chec").length;

			 if(check_leg == 0 &&  is_has_chec){
			 	checkEl.prop("checked",false);
				checkEl.siblings("label").addClass("has-chec");
			 }

		}


		return this.findNode($this.val());

	}

	upDataSelArr(node,$this,type,status){

		const idField = this.config.idField;

		if(!type){//文件

				if(status){
					this.selArr.push(node);
				}else{
					const delIndex = this.selArr.findIndex(val=>val[idField] == node[idField])
					this.selArr.splice(delIndex,1);
				}
		}else{// 目录

				

				if(!this.searchStatus){//不是搜索状态的树

					const _selArr = $.map(this.box.find(".child-checkinp:checked"),val=>{
							const id = val.value ;	
							return this.findNode(id);
					});
					this.selArr = _selArr ;

				}else{

					const idField = this.config.idField;

					const _selArr = $.map($this.parent().parent().siblings(".par-menu").find(".child-checkinp"),val=>{
							const id = val.value ;	
							return this.findNode(id);
					});

					_selArr.map(val=>{

						const is_exit = this.selArr.findIndex(node=>node[idField] == val[idField]);	
						
						

						if(status){

							is_exit == -1 &&  this.selArr.push(val);
						
						}else{
							
							is_exit > -1 && this.selArr.splice(is_exit,1);

						}
							
					});
				}

		}

	}

	handle(){

		const {clickCallback,clickAndCheck,checkbox,checkCallback,parClick} = this.config;
		const self = this;
		/**
		 * [折叠收缩,通过class tree-active 类名来来控制收缩图标的样式，用jq的slideToggle来控制具体的收缩]
		 * @return {[type]}           [description]
		 */
		this.box.on("click",".tree-slide-icon",function(e){
			
		    e.stopPropagation();
			const parLi = $(this).closest(".tree-li");
			const $parDiv = $(this).parent();

			$parDiv.hasClass("tree-active") && $parDiv.removeClass("tree-active") || $parDiv.addClass("tree-active");

			const parMenu =parLi.children(".par-menu"); 
    		parMenu.slideToggle();

    	});

    	this.box.on("click",function(e){
			e.stopPropagation();
    	});

    	this.box.on("click",".child-item",function(e){

			const $this = $(this);
			const node = self.findNode( +$this.attr("echo-id"));
		
		
			
			if(checkbox){
			
				clickAndCheck && $this.find(".tree-inp").click();
			
			}else{
				//關閉下拉框
				$this.closest(".s-tree").find(".active").removeClass("active");
				$this.addClass("active");
				self.selArr = [node];
			}

			clickCallback(node,$this,self.selArr);

    	});
		/**
		 * [树收索]
		 * @param  {[type]} ){			const $this         [description]
		 * @return {[type]}             [description]
		 */
    	this.box.on("click",".search-close",function(){
			const $this = $(this);
			$this.siblings(".s-inp").val(null);
			$this.hide();

			self.searchStatus = false ;
			self.reload();
		
    	});

    	this.box.on("click",".j-search",function(){
				const $this = $(this);
				const $close = $this.siblings("label").children(".search-close");
				$close.show();
				const key = $close.siblings(".s-inp").val().trim();
				if(!key){
					return ;
				}
				self.searchStatus = true ;
			  self.reload(key);
			
    	});


    	this.box.on("click",".par-item",function(){
			const $this = $(this);
			const node = self.findNode( +$this.attr("echo-id"));
		
			checkbox && clickAndCheck && $this.find(".tree-inp").click();

			checkbox && clickCallback(node,$this);

			if(!checkbox && parClick){
				
				
				
				$this.closest(".s-tree").find(".active").removeClass("active");
				$this.addClass("active");

				self.selArr = [node];

				clickCallback(node,$this,self.selArr);
		
			}

    	});
		/**
		 * [复选框时间]
		 * @return {[type]}                                     [description]
		 */
    	this.box.on("click",".tree-inp",function(e){

			e.stopPropagation(); // 防止点击 li 时触发 checkbox

			const $this= $(this);
    		const status = $this.prop("checked");
    		const type =  $this.hasClass("par-checkinp");

			const node = self.cascadeTreeInp($this,type,status);

			self.upDataSelArr(node,$this,type,status);
			
			checkCallback(node,$this,self.selArr);

    	});

	}
	setValue(ids,reSet = true){

		const $el = this.box;

	 	

		if(this.config.checkbox){

			if(reSet){
				this.selArr = ids.map(val=>this.findNode(val));
		 	}
		
			$el.find(".tree-inp").prop("checked",false).removeClass("has-chec");
			$el.find(".has-chec").removeClass("has-chec");
			ids.map(val=>{
				
				const checkEl = $el.find(`.child-checkinp[value=${val}]`).prop("checked",true);
				this.cascadeTreeInp(checkEl,false,true);
					
			});

			this.config.checkCallback(null,null,this.selArr);
	
		}else{
			this.setSingleValue(ids);
		}
	
	}

	setSingleValue(id,$el=this.box){
		$el.find(`.menuItem[echo-id=${id}]`).click();
	}

	getValue(fieldCount,$el=this.box){
		
		if(this.config.checkbox){
			return $.map(this.box.find(".child-checkinp:checked"),val=>{
			 	  const id = val.value ;
					return fieldCount === "id" && id || this.findNode(id);
			});

		}else{

			const id = this.box.find(".active").attr("echo-id");

			const flag = fieldCount === "id" && id || this.findNode(id);

			return [flag] ;

		}
		
	}

	clearValue($el=this.box){


			if(this.config.checkbox){
					$el.find(".tree-inp").prop("checked",false);
					$el.find(".has-chec").removeClass("has-chec");

			}else{
				$el.find(".active").removeClass("active");
			}
			this.selArr = []; 
	}

	findNode(id){

		let node = null ;
		
		const {childrenField,idField,data}  = this.config ;

		findFn(data);

		function findFn(arr){
			return arr.find(val=>{
				const status = val[idField] == id ;
				if(status){
					node = val ;
				}

				if(val[childrenField].length){
				
					return !status && findFn(val[childrenField]) || status;
				
				}else{
					return status;
				}

			});
		}
		
		return node;
	}
}


/*
 下拉框类
 data:数组
 multiply:true 多选,
 dropFormatter:自定义返回的内容，但是主要显示的文字一定要用 item-txt包住
*/
class SComboTree {

	constructor($el,config){

		const defaultConfig = {
			"prompt":"请选择...",
			"slideIcon":"fa fa-chevron-down",
			"defaultVal":"",
			 validCombo:true,
			 width:300,
			 textarea:false,
		}

		this.config = Object.assign({},defaultConfig,config);
		this.box = $el ;
		this.init();

	}

	init(){
		const {width} = this.config;
		this.box.css({"width":width});
		this.box.html(this.initRender());
		this.renderDrop();
	    this.handle();
	}

	initRender(){

		const checkbox = !!this.config.treeConfig.checkbox  ;

		const noFill = this.config.validCombo &&　"no-fill" || "" ;

		const inpStr = this.renderInpBox(checkbox);

		return `
				<div class="combo-inp ${noFill}">
					${inpStr}
				</div>
				<div class="combo-drop ">
					<ul class="s-tree"></ul>
				</div>
				`
	}

	// 参数values 必须是数组

	setValue(values,$el = this.box){
		
	  this.tree.setValue(values);

	}

	getValue(){
			
		return this.tree.getValue("all");
		
	}
	clearValue($el=this.box){

		const $inp = $el.find(".combo-value");
		$inp.val(null);
		$inp.siblings(".combo-text").val(null);
		
		this.config.validCombo && $inp.parent().addClass("no-fill");
		
		// this.config.treeConfig.checkbox && $el.find(".tree-inp").prop("checked",false).removeClass("has-chec") || $el.find(".active").removeClass("active");
		this.tree.clearValue($el);
	}
	updateInpBox(node){

		const {idField,textField,checkbox} = this.tree.config;

		const inpBox = this.box.find(".combo-inp");
        const comboText = inpBox.children(".combo-text"),
        	  comboValue=inpBox.children(".combo-value");

		let txts = [],
		    ids = [];

		if(checkbox){

			txts = this.tree.selArr.map(val=>{
					ids.push(val[idField]);
					return val[textField] ;

			});
		
		}else{
			txts[0] = node[textField];
			ids[0] = node[idField];
		}

		comboText.val(txts.join(","));
		comboValue.val(ids.join(","));

		if(this.config.validCombo){
			ids.length === 0 ? inpBox.addClass("no-fill") :inpBox.removeClass("no-fill");
		}
	}

	renderDrop(){

		const treeBox = this.box.children(".combo-drop");

		const {clickCallback:clickHandle,checkCallback:checkHandle} = this.config.treeConfig;
	
		// 点击li
		const clickCallback = (node,$dom)=>{

				this.updateInpBox(node);
				!this.tree.config.checkbox && this.hideUp(this.box);
				clickHandle && clickHandle(node);
		}
		//点击复选框事件
		const checkCallback = (node,$dom)=>{

				this.updateInpBox();
				checkHandle && checkHandle(node);
		}

			
		const treeConfig =Object.assign({},this.config.treeConfig,{clickCallback,checkCallback});
		
		this.tree = new Tree(treeBox,treeConfig);
	}

	changeType(checkbox,value=null,$el=this.box){

		this.tree.changeType(checkbox);
		$el.find(".combo-inp").html(this.renderInpBox(checkbox));
		this.config.validCombo && $el.children(".combo-inp").addClass("no-fill");

		if(value){
			this.setValue(value);
		}
	
	}

	renderInpBox(checkbox){

		const {prompt,slideIcon,textarea} = this.config;

		const inpStr = (textarea || checkbox) && `<textarea type="text" autocomplete="off" class="s-textarea combo-text" placeholder="${prompt}" readOnly="readOnly"/></textarea>` ||  `<input type="text" autocomplete="off" class="s-inp combo-text" placeholder="${prompt}" readOnly="readOnly"/>`;

		return `
					${inpStr}
					<input type="hidden" class="s-inp combo-value"  value=""/>
					<span class="slide-icon ${slideIcon}">
					</span>
				`
	}

	handle(){

		const self = this ;
		
		this.box.on("click",".combo-inp",function(e){
		//	e.stopPropagation();

			const $this= $(this);
			const par = $this.parent();
			const is_active = par.hasClass("active");

			!is_active ? self.showDown(par) : self.hideUp(par);

		});
	}

	showDown(par){

		par.children(".combo-drop").show();
		requestAnimationFrame(function(){
           par.addClass("active");
        });

      
	}

	hideUp(par){
		 par.removeClass("active");
         par.children(".combo-drop").hide();
	}

}

export {Unit,SCombobox,SModal,Calendar,Tree,SComboTree,SInp,DropMenu ,RippleBtn , Search};
import "css/common/calendar.scss";


class View{

	constructor(container,config){

		const {selTime,CurTime,updateShowSel,time,timeWatch,rotate} = config;

		
		this.updateShowSel = updateShowSel ;
		this.time = time;
		this.rotate = rotate; // 1:year,2:seraon,3:mons,4:day
		this.CurTime = CurTime;
		this.showTime= Object.assign({},selTime);
		this.selTime = selTime;
		this.viewBox = container;
		this.index = this.viewBox.index();
		this.searsonFormatter = ["一季度","二季度","三季度","四季度"];
		this.monFormatter = ["一","二","三","四","五","六","七","八","九","十","十一","十二"];
		this.timeWatch = timeWatch;
		this.init();
		this.handle();

	}

	init(){
		const htmlStr =`<div class="s-calendar-time">${this.renderTimeShow()}</div>` + this.renderView();
		this.viewBox.html(htmlStr);
		this.calendarItems = this.viewBox.find(".calendar-item");
		this.timeBox = this.viewBox.find(".s-calendar-time");
	}
	getMonDays(year,mon){
		const day = new Date(year,mon,0);
		return day.getDate();
	}
	dayToWeek(year,mon,day){
		const time = new Date(year,mon-1,day);
		return time.getDay();
	}	
	
	renderView(){
	
		const days = this.renderDays().join("");
		const mons = this.renderMon().join("");
		const searsons = this.renderSeason().join("");
		const years = this.renderYear(this.showTime.year).join("");

		const activeArr = new Array(4).fill("");

		const has_watchTime = this.time && "has-watchTime" || "";

			   activeArr[this.rotate-1]="calendar-active";

		return `
					<ul class="s-calendar-content">
						<li class="calendar-item ${activeArr[0]}">
							${years}
						</li>
						<li class="calendar-item ${activeArr[1]}">
							${searsons}
						</li>
						<li class="calendar-item ${activeArr[2]}">
							${mons}
						</li>
						<li class="calendar-item ${activeArr[3]} ${has_watchTime}" >
							
							${days }
						</li>
					</ul>
			   `
	}
	renderTimeShow(rotate=this.rotate){


		const {year,mon,searson} = this.showTime;

		const controlStr = `
							<div class="calendar-control">
								<button class="s-btn day-btn" sign="${rotate}"><i class="fa fa-backward"></i></button>
								<button class="s-btn day-btn" sign="${rotate}"><i class="fa fa-forward"></i></button>
							</div>
							`;
		let str = "" ;
		switch(this.rotate){
			case 1:
				str = "" ;
				break;
			case 2 :
			case 3 :
				str = `<i class="fa fa-calendar">&nbsp;</i><span class="timeType" sign="1">${year}年</span>` ;
				break;
			case 4:
				str = `<i class="fa fa-calendar">&nbsp;</i><span class="timeType" sign="1">${year}年</span><span>/</span><span class="timeType" sign="3">${mon}月</span>` ;
				break;
		}


		return ` <div class="time-box">
									${str}
					</div>
					${ (rotate=== 4 || rotate===1) && controlStr || ""} `;
	}

	renderDays(){

		const {year,mon} = this.showTime;

		const days =this.getMonDays(year,mon);

		const MonFirstDayToWeek = this.dayToWeek(year,mon,1);
		
		const dayArrleg=Math.ceil((days+MonFirstDayToWeek)/7);

		let startTime="";

		const daysArr = new Array(dayArrleg).fill("1").map((val,index)=>{

			switch(index){

				case 0 : 
					const preMonDays = this.getMonDays(year,mon-1);
					
					const preMonDayArr = new Array(MonFirstDayToWeek).fill("1").map((val,item)=>{
							const day = preMonDays-MonFirstDayToWeek+item+1 ; 
							return this.dayComponent(day,"disabled");
					});

					const firstArr = new Array(7-MonFirstDayToWeek).fill("1").map((val,item)=>{
							const day = item +1; 
							return this.dayComponent(day);
					});

					return `<ul class="data-group">${preMonDayArr.concat(firstArr).join("")}</ul>`;
				case  dayArrleg-1: 

					 startTime = 7*index+1 - MonFirstDayToWeek ;

					 const count = (days+MonFirstDayToWeek)%7 || 7;

					const lastArr = new Array(count).fill("1").map((val,item)=>{
							const day = item +startTime; 
							return this.dayComponent(day);
					 });

					 const lastMonDays = new Array(7-count).fill("1").map((val,item)=>{
							const day = item +1; 
							return this.dayComponent(day,"disabled");
					 });
					
					return `<ul class="data-group">${lastArr.concat(lastMonDays).join("")}</ul>`;


					

				default :

 					 startTime = 7*index+1 - MonFirstDayToWeek ;

					const MonDayArr =new Array(7).fill("1").map((val,item)=>{
							const day = item +startTime; 
							return this.dayComponent(day);
					});


					return `<ul class="data-group">${MonDayArr.join("")}</ul>`;
					
			}

		});

		const titleStr = `<ul class="week-group">
							<li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li>
						 </ul>`;
		this.time && daysArr.push(this.renderTimeBox()) ;	

		 return  [titleStr,...daysArr];
	}
	renderMon(){

		const {year,mon} = this.showTime;
		

		const mon_today = this.CurTime.year === year ;
		const mon_sel = this.selTime.year === year ;

		return new Array(4).fill("1").map((val,index)=>{
				
				const arr =  new  Array(3).fill("1").map((val,item)=>{

					const value = index*3 + item +1 ;

					const monToday = mon_today && this.CurTime.mon === value && "calendar-today" || "" ;
					const monSel = mon_sel && this.selTime.mon === value && "calendar-sel" || "" ;

					return `
							<li echo-text="${value}" class=" view-item ${monToday + " "+monSel }" >
								<span class="mon-span">${this.monFormatter[value-1]}月</span>
							</li>

							`

				});

				return 	`	
							<ul class="mon-group">
								${arr.join("")}
							</ul>
						`
			
		})
	}
	renderSeason(){

		const {year,searson} =this.showTime;

		const searson_today = this.CurTime.year === year;
		const searson_sel = this.selTime.year === year;



		return new Array(2).fill("1").map((val,index)=>{

			const startTime = index*2 +1;

			const searsonToday_1 = searson_today && (startTime === this.CurTime.searson) && "calendar-today" || "" ;
			const searsonSel_1 = searson_sel && this.selTime.searson === startTime && "calendar-sel" || "" ;

			const searsonToday_2 = searson_today && (startTime +1 === this.CurTime.searson) && "calendar-today" || "" ;
			const searsonSel_2 = searson_sel && this.selTime.searson  === startTime+1 && "calendar-sel" || "" ;
		
			return `
					<ul class="searson-group">
						<li echo-text="${startTime}" class=" view-item ${searsonToday_1 + " " + searsonSel_1}">
							<span class="sea-span">${this.searsonFormatter[startTime-1]}</span>
						</li>
						<li echo-text="${startTime+1}" class=" view-item ${searsonToday_2 + " " + searsonSel_2}" >
							<span class="sea-span">${this.searsonFormatter[startTime]}</span>
						</li>
					</ul>
					`
		})
	}
	renderYear(year){

		let index = year % 10 ;
			index = index ===0 ? 10 : index ;
		
		const startTime = year - index  + 1;
		this.lastYear = startTime+9 ;

		const arr = new Array(9).fill("1").map((val,index)=>{

			const value = startTime+index;

			const yearToday = this.CurTime.year === value && "calendar-today" || "" ;
			const yearsel = this.selTime.year === value && "calendar-sel" || "" ;

			return `
					<li echo-text="${value}" class=" view-item  ${ yearToday + " " + yearsel }">
						<span class="year-span">${value}</span>
					</li>

					`;
		});

		const yearToday = this.CurTime.year === this.lastYear && "calendar-today" || "" ;
		const yearsel = this.selTime.year === this.lastYear && "calendar-sel" || "" ;
		const last = `
						<div echo-text="${this.lastYear}" class="last-year view-item  ${ yearToday + " " + yearsel }">
							<span class="year-span">${this.lastYear}</span>
						</div>
					 `;
		
		const data = new Array(3).fill("1").map((val,index)=>{

					return `
						<ul class="year-group">
							${arr.splice(0,3).join("")}
						</ul>

					`;
		});
		data.push(last);

		return data ;
	}
	
	dayComponent(_day,type="abled"){
		
		const {year,mon} =this.showTime;

		const {year:sel_year,mon:sel_mon,searson:sel_searson,day:sel_day} = this.selTime;

		const is_able = type==="abled" ? " view-item " :"day-disabled" ;

		const is_Today = type==="abled" && year === this.CurTime.year && mon === this.CurTime.mon && this.CurTime.day === _day && "calendar-today" || "";

		const is_sel =type==="abled" &&  year === sel_year && mon === sel_mon && _day === sel_day && "calendar-sel" || "";

		return 	`
						<li class="${is_able+" " + is_Today + " " + is_sel }"  echo-text="${_day}">
							<span class="day-span">${_day}</span>
						</li>
				`
	}

	updateDays(type){

		const {year,mon} = this.showTime;
		let updata_mon,
			updata_searson,
			updata_year;

		switch(type){
			case 0://pre
				updata_mon = mon -1 == 0 ? 12 : mon-1;
				updata_year = mon -1 == 0 ? year - 1  : year;
				break;
			case 1://next
				updata_mon = mon + 1 == 13 ?  1 : mon +1;
				updata_year = mon + 1 == 13 ? year +1   : year ;
				break;
		}
				
		this.showTime.mon = updata_mon ;
		this.showTime.searson = Math.ceil( updata_mon / 3);
		this.showTime.year = updata_year;
		const str = this.renderDays().join("");
		this.timeBox.html(this.renderTimeShow());
		this.calendarItems.eq(3).html(str);

	}

	updateYears(type){

		const yearRange = type ===0 ? this.lastYear-10 : this.lastYear + 1; 

		const str = this.renderYear(yearRange).join("");
		this.calendarItems.eq(0).html(str);
	}

	updateCalendar(rotate=this.rotate){

		this.timeBox.html(this.renderTimeShow(rotate));

		const year = this.showTime.year;
		const index =rotate-1;

		let  str = "";
			switch(rotate){
				case 1:
					str = this.renderYear(year).join("");
					break;
				case 2:
					str = this.renderSeason().join("");
					break;
				case 3:
					str = this.renderMon().join("");
					break;
				case 4:
					str = this.renderDays().join("");
					break;
			}

		this.calendarItems.eq(index).html(str);
		this.calendarItems.eq(index).addClass("calendar-active").siblings().removeClass("calendar-active");	
	}

	updateSel($el){
		$el.closest(".calendar-item").find(".calendar-sel").removeClass("calendar-sel");
		$el.addClass("calendar-sel");
	}

	renderTimeBox(){

		const value = this.timeWatch ;

		return `<div class="m-time">
					<div>
						<b>时间：&nbsp;</b>
						<input type="number" class="wacth-time" max="24" min="0" value="${value[0]}" echo-index="0" />	
					</div>
					<div>
						<b>&nbsp;&nbsp;:&nbsp;</b>
						<input type="number" class="wacth-time" max="60" echo-index="1" min="0" value="${value[1]}" />
					</div>
				</div>`;
	}

	handle(){

		const self = this ;
		// 前进-后退
		this.viewBox.on("click",".day-btn",function(){
			const index = $(this).index();
			const type = +$(this).attr("sign");
			type===4 ? self.updateDays(index) : self.updateYears(index);
		});

		this.viewBox.on("blur",".wacth-time",function(){
			const $this = $(this);
			const index = +$this.attr("echo-index");
			self.timeWatch[index] = $this.val().padStart(2,"0");
			self.updateShowSel();
		});
		
		this.viewBox.on("click",".view-item",function(){
			const data = +$(this).attr("echo-text");
			const rotate =self.rotate ;
			const rotateArr = ["year","searson","mon","day"];


			const cur_calendarView = Array.from(self.calendarItems).findIndex(function(val){
					return val.classList.value.includes("calendar-active");
			});
			
			//更新选择的时间和显示的面板时间
			//故意让viewl类的selTime的内存地址与Calendar类的selTime里所对应的字数组的内存地址一样。
			//这样view改变calendar也改变

			self.showTime[rotateArr[cur_calendarView]] = data;
			const {year,searson,mon,day} = self.showTime;
			self.selTime.year=year;
			self.selTime.searson=searson;
			self.selTime.mon=mon;
			self.selTime.day=day;
			
			
			self.updateShowSel();
			rotate === cur_calendarView+1 && self.updateSel($(this)) || self.updateCalendar() ;

		});


	
		
		//切换时间类型
		this.viewBox.on("click",".timeType",function(){
			const type = +$(this).attr("sign");
			self.updateCalendar(type);	
		
		});

	}
}


class Calendar{

	constructor($el,$inp,obj){

		const defaultConfig = {
			rotate:3,
			style:1,
			time:false,
			hasInp:true,
			callback:function(){},
		};

		const config = Object.assign({},defaultConfig,obj);


		const {rotate,style,time,hasInp,callback} = config ;
		this.rotate = rotate ; // 1:year,2:seraon,3:mons,4:day
		this.style = style; // 1:单选 2:多选
		this.time = time; // 1:单选 2:多选
		this.hasInp = hasInp; // 1:单选 2:多选
		this.CurTime=this.getCurTime();
		this.selTime=this.initSelTime();
		this.typeChange = [{rotate:"年"},{rotate:"季"},{rotate:"月"},{rotate:"日"}];
		this.timeWatchArr = [[10,30],[12,50]];
		this.container = $el;
		this.inp=$inp;
		this.callback = callback;
		this.value = "" ;
		this.init();
		this.Handle();

	}

	changeStyle(style,value){
		this.style = style; 
		this.selTime = this.initSelTime();
		this.showSelBox.html(this.renderTimeStr().join(""));
		this.initViewsContent();
		
		if(value){
			this.setTime(value);
		}
	}

	
	init(){
	
		const str =`${this.initHead()} <div class="calendar-container"> </div> `;
		this.container.html(str);

		this.calendarViewBox = this.container.children(".calendar-container");
		this.showSelBox =this.container.find(".showSel-box"); 
		this.frequemcy=this.container.find(".calendar-frequemcy");
		this.rotateShow=this.container.find(".calendar-rotate");
		this.initViewsContent();
		
	}
	getCurTime(){
		const time = new Date();
		const year = time.getFullYear();
		const mon = time.getMonth()+1;
		const day = time.getDate();
		const searson =Math.ceil(mon / 3);
		const middleYear = year - (year%10) +1 ;
		return {year,mon,day,searson}
	}
	
	initHead(){

		const {year,mon,searson,day} =this.CurTime;

		 const activeArr =this.typeChange;

		 const rotateStrArr = activeArr.map((val,index)=>{
		 		const {rotate} = val ;
		 		const active = index === this.rotate-1 && "frequemcy-active" || "";
				return `
						<li class="frequemcy-item ${active}">
							<span class="fa fa-calendar-plus-o">&nbsp;${rotate}</span>
						</li>
						`;

		 });


		return 	`
				<div class="s-calendar-title">
					<div class="frequemcy-box">
						<button class="frequemcy-sel s-btn">
							<span class="fa fa-calendar-check-o"></span>
							<b class="calendar-rotate">${activeArr[this.rotate-1].rotate}</b>
						</button>
						<ul class="calendar-frequemcy">
							${rotateStrArr.join("")} 
						</ul>
					</div>
					<div class="showSel-box">
						${this.renderTimeStr().join("")}
					</div>
					${this.hasInp?`<div> <button class="s-btn calendar-opt">确定</button></div>`:""}
					
				</div>

				`
	}

	initViewsContent(){
	
		const viewStr =  new Array(this.style).fill("").map(val=>{
			   return `<div class="calendar-view"></div>`;
		});

		this.calendarViewBox.html(viewStr.join(""));
		
		const views =Array.from(this.calendarViewBox.children(".calendar-view"));
		
		const selTime=this.CurTime,
			  CurTime=this.CurTime,
			  time=this.time,
			  timeWatchArr = this.timeWatchArr,
			  rotate=this.rotate;

		let config= {CurTime,rotate,time,updateShowSel:()=>{
			 this.updateShowSel();
		}};

		if(this.view_2){
			this.view_2.viewBox.unbind();
			this.view_2 = null;
		}

		const {year,mon,searson,day} = CurTime;
		views.map((val,index)=>{
		//	config.selTime =Object.assign({},this.selTime[index]);
			config.selTime = this.selTime[index]; // 共享地址
			config.timeWatch = this.timeWatchArr[index]; // 共享地址
			
			this["view_"+index] = new View($(val),config);

		});

		this.upInp();

	}
	renderTimeStr(){

		const formatter=" - ";

		const value = [];



		 const str = new Array(this.style).fill("").map((val,index)=>{

		 	   let {year,searson,mon,day} = this.selTime[index];

		 	   const timeWatch = this.timeWatchArr[index];

		 	   mon = (mon+"").padStart(2,"0");
		 	   day = (day+"").padStart(2,"0");

				let showStr ="";
		 	   switch(this.rotate){
					case 1:
						showStr="";
						value[index]=[year];
						break;
					case 2:
						showStr=`${formatter+searson}`;
						value[index]=[year,"S"+searson];
						break;
					case 3:
						showStr=`${formatter+mon}`;
						value[index]=[year,mon];
						break;
					case 4:
						showStr=`${formatter+mon}${formatter+day}`;
						value[index]=[year,mon,day];
						break;	

		 	   }
 				
 			  const watchTime = this.time && this.rotate === 4 && "&nbsp;&nbsp;"+timeWatch.join(" : ") || "";
		 	  
			//	return ` ${index===1 ? "<span >&nbsp;-&nbsp;&nbsp;</span>" :""}<span class="sel-time-inp">${year+showStr+watchTime}</span> `;

						return ` <span class="sel-time-inp">${year+showStr+watchTime}</span> `;

		 });
		 this.value = value;

		 return str ;
	}
	initSelTime(){
		const {year,mon,searson,day} =this.CurTime;
		const rotate = this.rotate;
		return new Array(this.style).fill("").map((val,index)=>{
				switch(rotate){
					case 4://日
						return {
							year:year,
							searson:searson,
							mon:mon,
							day:day,
						}
					case 2://季度
						return {
							year:year,
							searson:searson,
							mon:mon,
							day:day,
						}
					case 3://月

						return {
								year:year,
								searson:searson,
								mon:mon,
								day:day,
							}
						break;
					case 1://年
						return {
							year:year,
							searson:searson,
							mon:mon,
							day:day,
						}
				}
		});
	}
	updateShowSel($box){
		
		const arr = new Array(this.style).fill("").map((val,index)=>{
			return this["view_"+index].selTime ;
		});
		this.selTime = arr ;
		this.showSelBox.html(this.renderTimeStr().join(""));
			
	}
	updateRotate(){
		const index = this.rotate-1;
		this.rotateShow.html(this.typeChange[index].rotate);
		this.frequemcy.children().eq(index).addClass("frequemcy-active").siblings().removeClass("frequemcy-active");
	}
	upInp(){

		

		if(!this.hasInp){
			return ;
		}

		const val = this.value.map((val,index)=>{

			const watchTime = this.time && this.rotate === 4 && "  "+this.timeWatchArr[index].join(" : ") ||　"";
			return val.join(" - ") + watchTime;
		});
		this.inp.val(val.join(" 至 "));
	}
	setTime(time){

		if(!Array.isArray(time)){
			return ;
		}
		
		const timeFormatter = time[0] + "";

		if(timeFormatter.length === 4){ //年
			this.rotate = 1;
			new Array(this.style).fill("").map((val,index)=>{
					this.selTime[index].year = +time[index].substr(0,4);
					
					const view = this["view_"+index];
					view.rotate = this.rotate ;
						view.showTime = Object.assign({},this.selTime[index]);
					view.updateCalendar();
			});
		}else if(timeFormatter.includes("S")){ //季度
			this.rotate = 2;
			new Array(this.style).fill("").map((val,index)=>{
					this.selTime[index].year = +time[index].substr(0,4);
					this.selTime[index].searson = +time[index].substr(5,1);
						
					const view = this["view_"+index];
					view.rotate = this.rotate ;
					view.showTime = Object.assign({},this.selTime[index]);
					view.updateCalendar();
			});
		}else if(timeFormatter.length === 6){//月
			this.rotate = 3;
			new Array(this.style).fill("").map((val,index)=>{
					this.selTime[index].year = +time[index].substr(0,4);
				this.selTime[index].mon = parseInt(time[index].substr(4,2));
					
					const view = this["view_"+index];
					view.rotate = this.rotate ;
					view.showTime = Object.assign({},this.selTime[index]);
					view.updateCalendar();
			});

		}else{

			
			this.rotate = 4;
			new Array(this.style).fill("").map((val,index)=>{
					
					this.selTime[index].year = +time[index].substr(0,4);
					this.selTime[index].mon = parseInt(time[index].substr(4,2));
					this.selTime[index].day = parseInt(time[index].substr(6,2));
				
					const view = this["view_"+index];
					view.rotate = this.rotate ;
					view.showTime = Object.assign({},this.selTime[index]);
				
					if(this.time){

						this.timeWatchArr[index] = time[index].split("@")[1].split(":");
						view.timeWatch = this.timeWatchArr[index];
					}

					view.updateCalendar();
		

			});
		
			

		}
		this.updateShowSel();
		this.upInp();
		this.updateRotate();
			
	}

	Handle(){

		const self = this ;
		const hasInp = this.hasInp;
		//频率选择
		this.container.on("click",".frequemcy-item",function(){
			
			const index = $(this).index();
			//	$(this).addClass("frequemcy-active").siblings().removeClass("frequemcy-active");
			self.frequemcy.slideToggle("fast",function(){
				self.rotate = index+1;
				self.updateRotate();
				self.updateShowSel();
				new Array(self.style).fill("").map((val,index)=>{
						const view = self["view_"+index];
						view.rotate = self.rotate ;
						view.updateCalendar();
				});
			});
		});
		//日历显隐
	 	this.container.on("click",function(e){
	 		e.stopPropagation();
		});
		//日历显隐
		if(hasInp){
			this.inp.click(function(e){
				 e.stopPropagation();
				self.container.is(":visible") ? self.container.hide() :self.container.show() ;
			});
		}

		//频率触发
		this.container.on("click",".frequemcy-sel",function(){
				self.frequemcy.slideToggle();
		});
		
		//日历确定
		this.container.on("click",".calendar-opt",function(){
				const index = $(this).index();
				if(index===0){

					if(self.style === 2){

						let time_stamp_1 = self.value[0].join("/");
						 	  time_stamp_1 = self.rotate===2 &&  time_stamp_1.replace("S","") || time_stamp_1;
						 	  time_stamp_1 = (self.rotate === 2 || self.rotate === 3 ) && time_stamp_1 + "/01" || time_stamp_1 ;
						 	  time_stamp_1 = new Date(time_stamp_1).getTime();

					 	let time_stamp_2 = self.value[1].join("/");
					 	    time_stamp_2 = self.rotate===2 &&  time_stamp_2.replace("S","") || time_stamp_2;
					 	    time_stamp_2 = (self.rotate === 2 || self.rotate === 3 ) && time_stamp_2 + "/01" || time_stamp_2 ;
					 		  time_stamp_2 = new Date(time_stamp_2).getTime();

						if(time_stamp_1>time_stamp_2){
							alert("结束时间要大于开始时间！");
							return ;
						}
					}
					self.callback();
					self.upInp();
				}
				self.container.hide();
		});
		
		
	}
}

export {Calendar};
import "css/login.scss";
import Particles from "js/common/particles.js" ;
import {Remind} from "js/login/Remind.js" ;

const {baseUrl} = window.jsp_config;



class Login{

	constructor(config){
    this.remindSet = config.remindSet;
		this.init();
		this.handle();
	}

	init(){

        this.subBtn = $("#j-login");
        this.user = $("#user"),
        this.warn = $("#warn"),
        this.pwd = $("#pwd");
	}

    login(obj){

       return  Promise.resolve(
            $.ajax({
                url:baseUrl+"login/logVal",
                contentType:"application/json",
                type:"post",
                asyncBoolean:false,
                data:JSON.stringify(obj)
            })
        );
    }

    getvalue(){
        const name = this.user.val().trim();
        let pwd = this.pwd.val().trim();
        const originPwd = pwd;
    
    
        pwd=hex_md5(hex_md5(pwd));

        return {
            name,
            pwd,
            originPwd,
        }
    }

	handle(){

        const _self = this ;

		$(".inp-field").blur(function(){
			const $this = $(this);
			const val = $this.val().trim();
			const $par = $this.parent();

			if(val){
				$par.addClass("s-filled");
			}else{
				$par.removeClass('s-filled');
			}
		});

        this.subBtn.on("click",function(){

             $("#login-status").show();
             const {originPwd ,...obj} = _self.getvalue();
              _self.warn.html("")
        
            const login = _self.login(obj).then(data=>{
                
                $("#login-status").hide();
                if(data.url=="null") {
                      _self.warn.html('<span id="warnContent"><i class="fa fa-exclamation-triangle"></i>用户名或密码错误！</span>');
                }else if(data.url == "0"){
                      _self.warn.html('<span class="warnContent" ><i class="fa fa-exclamation-triangle"></i>该账户已被禁用</span></p>');
                }else if(data.url ==="/index") {

                     _self.remindSet(originPwd,obj.name);
                  
                     if(window.jsp_config.resourse){

                         $.ajax({
                            url:data.fineUrl,
                            data:data.finedata[0],
                            dataType: 'jsonp', 
                            callback: 'callback',
                            success:function(){
                                console.log("登录成功！");
                                window.location.href= window.jsp_config.resourse + data.url;
                            }
                         });

                     }else{
                        window.location.href= data.url; 
                     }
                }
             
            });
        });
	}
}




class Page{

    constructor(){
        this.login = new Login({
          remindSet:(originPwd,obj)=>{
            this.remindSet(originPwd,obj);
          }
        });
        this.remind = new Remind(this.login.user,this.login.pwd);
    }

    remindSet(originPwd,user_name){

        this.remind.reminCheck.prop("checked") ? this.remind.setRemind({originPwd,user_name}) : this.remind.removeRemind();

    }
}

const page = new Page();



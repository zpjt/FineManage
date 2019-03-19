
import {api} from "api/userManage.js";

class DelModal{

	constructor(config){

		const {unit,modal,reloadPage} = config;

		this.unit = unit ;
		this.modal = modal ;
		this.reloadPage = reloadPage;
		this.$confirmBtn =$("#confirmBtn");
		this.$confirmMView=$("#confirm-MView");
		this.handle();
	}

	delHandle(selArr){
			
			if(!selArr.length){
				this.unit.tipToast("选择要删去的！",2);
				return ;
			}
			this.modal.show(this.$confirmMView);
			this.$confirmBtn.data("delArr",selArr);
	}

	async del(arr){

		try{
				for (let i = 0, leg = arr.length ; i < leg; i++) {
						const obj = arr[i];
					  await api.delUser(obj);
				}
			this.unit.tipToast("删除成功！",1);
			this.reloadPage();
		}catch(err){
				this.unit.tipToast("删除失败！",0);
		}

	
		this.modal.close(this.$confirmMView);
	}


	handle(){
		
		const _self = this;
		// 删除模态框确认按钮
		this.$confirmBtn.click(function(){
			const idArr = $(this).data("delArr");
			_self.del(idArr);
		});
	
	}
}
export {DelModal}
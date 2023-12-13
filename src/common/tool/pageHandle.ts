import Taro from "@tarojs/taro";

export function goBack(){
    if (Taro.getCurrentPages().length>1){
        Taro.navigateBack()
    }else {
        Taro.switchTab({
            url:'/pages/resetIndex/index'
        })
    }
}

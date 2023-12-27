import {makeAutoObservable} from "mobx"
import Taro from "@tarojs/taro";

export class PageStore {

    constructor() {
        makeAutoObservable(this,{
            boundingInfo:false,
            navBarHeight:false
        })
    }

    /**
     * 胶囊体信息
     */
    boundingInfo = Taro.getMenuButtonBoundingClientRect()//胶囊体信息

    /**
     * navBar高度
     * 默认高度为手机顶部到胶囊体底部的距离 +12
     */
    navBarHeight:number =
        this.boundingInfo.height + this.boundingInfo.top + 10 ;

}

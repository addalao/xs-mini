import {makeAutoObservable} from "mobx";
import {AppletLoginRes, AppletUserItem} from "@/api/ts/weChartComponents";
import Taro from "@tarojs/taro";
import {Global} from "@/global";

/**
 * 本地持久化数据
 */
export enum AuthName {

    userInfo = 'userInfo',
    information = 'information'
}

/// 用户个人权限数据
export class Auth {
    constructor() {
        this.setInformation = this.setInformation.bind(this)
        makeAutoObservable(this)

    }

    get token ():string | undefined {
        return this.userInfo?.token
    }

    /**
     * 服务器返回的用户认证数据
     */
    userInfo?:AppletLoginRes = Taro.getStorageSync(AuthName.userInfo)? JSON.parse(Taro.getStorageSync(AuthName.userInfo)):undefined

    setUserInfo(v:AppletLoginRes){
        Taro.setStorageSync(AuthName.userInfo,JSON.stringify(v))

        this.userInfo = v;
    }

    /**
     * 用户详情信息
     */
    information?:AppletUserItem = Taro.getStorageSync(AuthName.information)? JSON.parse(Taro.getStorageSync(AuthName.information)):undefined

    async setInformation(){
        
    }

    /**
     * 是否登录，未登录提示跳转登录界面
     */
    static isAuth(){
        if(Global.auth.token === undefined || Global.auth.token === null || Global.auth.token === ''){
            Taro.showModal({
                content:'请先登录以继续',
                success:(res)=>{
                    if(res.confirm){
                        Taro.navigateTo({
                            url:'/pages/login/index'
                        })
                    }
                }
            })
            return
        }
    }

}

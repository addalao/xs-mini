import {Requset} from "@/request/request";
import {AppletLoginReq, AppletLoginRes, AppletUserItem} from "@/api/ts/weChartComponents";

/**
 * 登录
 */
export const appletLogin = (data:AppletLoginReq)=>{
    return Requset.v1<AppletLoginRes>({
        url:'/weChart/api/users/appletLogin',
        method:'POST',
        data
    })
}

/**
 * 获取个人详细信息
 */
export const getUserInformation = ()=>{
    return Requset.v1<AppletUserItem>({
        url:'/weChart/api/users/Information'
    })
}

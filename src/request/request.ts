import Taro from "@tarojs/taro";
import {containsChinese} from "@/common/tool";
import {Global} from "@/global";

/**
 * 请求对象 149
 */
export class Requset {
    static v1 = request
}

interface requestProps<T> {
    url:string
    method?: keyof Taro.request.Method,
    data?:T,
    versions?:string
}

function request<D,T = any>({
    url,
    method = "POST",
    data,
    // versions
}:requestProps<T>){

    return new Promise<D>((resolve, reject)=>{

        const header: TaroGeneral.IAnyObject = {}

        const token =Global.auth.token

        if(token !== null && token !== undefined && token !== ''){
            header.authorization = token
        }

        try {
            Taro.request({
                url:`${process.env.TARO_APP_API}${url}`,
                method,
                data,
                header,
                success(res){
                    resolve(res.data as D)
                },
                fail(err){
                    if(containsChinese(err.errMsg)){
                        Taro.showToast({
                            icon:'none',
                            title:err.errMsg
                        })
                    }
                    reject(err);
                }
            })
        }catch (e) {
            if(containsChinese(e)){
                Taro.showToast({
                    icon:'none',
                    title:e
                })
            }
        }

    })

}

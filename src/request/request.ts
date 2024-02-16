import Taro from "@tarojs/taro";
import {containsChinese} from "@/common/tool";
import {Global} from "@/global";

interface RequestProps<T> {
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
}:RequestProps<T>){

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


/**
 * 请求方法封装，需要使用未封装的方法请自己添加
 */
class VersionsRequset {
    constructor(public versions:string){
        
    }

    async post<D,T = any>({
        data,
        url
    }:BaseRequsetProps<T>){
        return await request<D,T>({
            url,
            data,
            method:'POST',
            versions:this.versions
        })
    }

    async get<D,T = any>({
        data,
        url
    }:BaseRequsetProps<T>){
        return await request<D,T>({
            url,
            data,
            method:'GET',
            versions:this.versions
        })
    }

    async delete<D,T = any>({
        data,
        url,
        id
    }:IdRequsetProps<T>){

        let deleteUrl = url;

        if(url !== undefined){
            deleteUrl = url + '/' + id
        }

        return await request<D,T>({
            url:deleteUrl,
            data,
            method:'DELETE',
            versions:this.versions
        })
    }

    async patch<D,T = any>({
        data,
        url,
        id
    }:IdRequsetProps<T>){

        let patchUrl = url;

        if(url !== undefined){
            patchUrl = url + '/' + id
        }

        return await request<D,T>({
            url:patchUrl,
            data,
            method:'PATCH',
            versions:this.versions
        })
    }

    async put<D,T = any>({
        data,
        url,
        id
    }:IdRequsetProps<T>){

        let puthUrl = url;

        if(url !== undefined){
            puthUrl = url + '/' + id
        }

        return await request<D,T>({
            url:puthUrl,
            data,
            method:'PUT',
            versions:this.versions
        })
    }
   
}
interface BaseRequsetProps<T> {
    data?:T,
    url:string
}

interface IdRequsetProps<T> extends BaseRequsetProps<T> {
    id?:string
}

/**
 * 请求对象
 */
export class Requset {
    static v1 = new VersionsRequset('v1');
}


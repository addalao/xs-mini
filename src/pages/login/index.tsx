import CustomPage from "@/component/CustomPage";
import {View} from "@tarojs/components";
import s from './index.module.scss'
import Taro from "@tarojs/taro";
import {Global} from "@/global";

export default function Login(){

    /**
     * 立即登录
     */
    const signInNow = async ()=>{
        // try {
        //     Taro.showLoading({
        //         title:'登录中'
        //     })

        //     const loginIngo = await Taro.login()

        //     const res = await appletLogin({
        //         code:loginIngo.code
        //     })

        //     Global.auth.setUserInfo(res)
        //     await Global.auth.setInformation()

        //     Taro.switchTab({
        //         url:'/pages/index/index'
        //     })

        // }finally {
        //     Taro.hideLoading()
        // }

    }


    return (
        <CustomPage optin={{
            fixed:true,
            title:'登录',

        }}>
            <View className={s.loginPage}>
                <View onClick={signInNow}>
                    登录
                </View>
            </View>
        </CustomPage>
    )
}

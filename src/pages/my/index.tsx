import {Image, Text, View} from "@tarojs/components";
import {Global} from "@/global";
import s from './index.module.scss'
import {OpacityImg} from "@/component/OpacityImg";
import CustomPage from "@/component/CustomPage";
import {PageScrollView} from "@/component/PageScrollView";
import React from "react";
import {CustomFunProps} from "@/component/CustomNavBar";
import MyIcon from "@/component/MyIcon";
import Taro from "@tarojs/taro";
import {Observer} from "mobx-react-lite";
import bk from '../../assets/svg/my_bk.svg'

interface OptionsItem {
    name:string,
    icon:'iconfont-weixin',
    onClick:()=>void
}

interface OrderItem {
    name:string
    icon:string
    onClick:()=>void
}

export default function My() {
    const pageStore = Global.pageStore

    const options:OptionsItem[] = [
        {
            name:'联系客服',
            icon:'iconfont-weixin',
            onClick(){
                Taro.makePhoneCall({
                    phoneNumber:'4007778728'
                })
            }
        },
        {
            name:'会员权益',
            icon:'iconfont-weixin',
            onClick(){
                Taro.navigateTo({
                    url:''
                })
            }
        },
        {
            name:'退出登录',
            icon:'iconfont-weixin',
            onClick(){
                Taro.showModal({
                    content:'确定退出登录吗?',
                    success:(res)=>{
                        if(res.confirm){
                            console.error('退出登录')
                        }
                    }
                })
            }
        },
    ]

    const orderItemList:OrderItem[] = [
        {
            name:'我的订单',
            icon:'iconfont-weixin',
            onClick(){
                Taro.navigateTo({
                    url:''
                })
            }
        },
        {
            name:'积分查询',
            icon:'iconfont-weixin',
            onClick(){
                Taro.navigateTo({
                    url:''
                })
            }
        },
    ]

    return (
        <CustomPage noPadding optin={{
            fixed:true,
            color:'rgba(0,0,0,0)',
            isReturnArrow:false,
            CustomFun:MyCustomFun
        }}>

            <PageScrollView refresherEnabled={false} >

                <Image mode='aspectFill' className={s.backgroundBox}  src={bk} svg />

                <View className={s.myPage} style={{
                    paddingTop:pageStore.navBarHeight
                }}>

                    <View className={s.userBox}>
                        <Observer>
                            {()=>{
                                const information = Global.auth.information
                                return (
                                    <View className={s.userInfoBox}>

                                        <OpacityImg className={s.userIcon} src='https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg' />
                                        {
                                            information?
                                                <>

                                                    <View className={s.nameBox}>
                                                        <Text className={s.name}>
                                                            {information.nickname}
                                                        </Text>
                                                        <View className={s.integralBox}>
                                                            <View>等级{information.grade}</View>
                                                            <Text className={s.integralTips}>积分:</Text>
                                                            <Text className={s.integralCount}>{information.points}</Text>
                                                        </View>
                                                    </View>
                                                </>
                                                :
                                                <View className={s.notLogIn}>登录</View>
                                        }
                                    </View>
                                )
                            }}
                        </Observer>
                    </View>

                    <View className={s.orderPage}>
                        <Observer>
                            {()=>(
                                Global.auth.information?
                                <View className={s.orderBox}>
                                    {
                                        orderItemList.map((item)=>(
                                            <View className={s.orderItem} key={item.name}>
                                                <View className={s.orderIconBox}>
                                                    <MyIcon iconName={item.icon} className={s.orderIcon} />
                                                </View>
                                                <Text className={s.orderName}>
                                                    {item.name}
                                                </Text>
                                            </View>
                                        ))
                                    }
                                </View>:<></>
                            )}
                        </Observer>
                        <View className={s.optionBox}>
                            {
                                options.map((item)=>(
                                    <View className={s.optionItem} onClick={item.onClick} key={item.name}>
                                        <View className={s.infoItem}>
                                            <MyIcon iconName={item.icon} className={s.leftIcon} />
                                            <Text className={s.itemName}> {item.name} </Text>
                                        </View>
                                        <MyIcon iconName='iconfont-chevron-right' className={s.jumpIcon} />
                                    </View>
                                ))
                            }
                        </View>
                    </View>

                </View>

            </PageScrollView>
        </CustomPage>

    )
}


interface MyCustomFunProps extends CustomFunProps{

}

const MyCustomFun:React.FC<MyCustomFunProps> = ({
    // rightDistance
})=>{
    return (
        <View className={s.myCustomFun}>
            个人中心
        </View>
    )
}

import CustomPage from "@/component/CustomPage";
import {Text, View} from '@tarojs/components'
import s from './index.module.scss'
import React, {useEffect} from "react";
import {CustomFunProps} from "@/component/CustomNavBar";
import {PageScrollView} from "@/component/PageScrollView";
import {Global} from "@/global";
import MyIcon from "@/component/MyIcon";
import Taro from "@tarojs/taro";
import {CommodityList} from "src/component/CommodityList";
import { RequestGetItem } from "@/component/RequestItem/RequestItem";

/**
 * 首页
 */
export default function Index() {

    const listMobx = new RequestGetItem('');


    useEffect(()=>{
        listMobx.getItems().then()
    },[])
    return (
        <CustomPage
            optin={{
                fixed:true,
                CustomFun:IndexCustomFun,
                color:'white'
            }}

        >
            <View className={s.searchBox} onClick={()=>{
                Taro.navigateTo({
                    url:'/pages/search/index'
                })
            }} style={{
                top:Global.pageStore.navBarHeight - 1
            }}>

                <View className={s.search}>
                    <MyIcon iconName='iconfont-weixin' className={s.searchIcon} />
                    <Text>
                        搜索
                    </Text>
                </View>

            </View>
            <PageScrollView
                paddingTop={40}
            >
                {/* <CommodityList commodityMobx={mobx} /> */}
            </PageScrollView>
        </CustomPage>
    )
}

const IndexCustomFun:React.FC<CustomFunProps> = ({
    // rightDistance
})=>{
    return (
        <View className={s.indexCustomFun} style={{
            // paddingRight:rightDistance
        }}>
            首页
        </View>
    )
}



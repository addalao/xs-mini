import CustomPage from "@/component/CustomPage";
import React, {useEffect} from "react";
import {CustomFunProps} from "@/component/CustomNavBar";
import {Input, View} from "@tarojs/components";
import  s from './index.module.scss'
import {PageScrollView} from "@/component/PageScrollView";
import {debounce} from "@/common/tool";
import {runInAction} from "mobx";
import {CommodityList} from "src/component/CommodityList";
import {CommodityListMobx} from "@/component/CommodityList/CommodityListMobx";
import {BackIcon} from "@/component/BackIcon";

interface SearchCustomFunProps extends CustomFunProps {

}

/**
 * 搜索页面
 * @constructor
 */
export default function Search(){

    const mobx = new CommodityListMobx();

    let search = debounce({
        fn:async (v:string)=>{
            if(v.trim().length == 0){
                runInAction(()=>{
                    mobx.items = []
                    mobx.filter = ''
                })
                return;
            }
            await mobx.search(v);
        },
        isFirstTime:false,
        time:300
    })

    const SearchCustomFun:React.FC<SearchCustomFunProps> = ({
        rightDistance
    })=>{
        return (
            <View className={s.searchBox} style={{
                paddingRight:rightDistance + 20
            }}>
                <View className={s.backBox}>
                    <BackIcon />

                </View>
                <View className={s.search}>
                    <Input onInput={(e)=>{
                        search && search(e.detail.value)
                    }} placeholder='输入关键词搜索' className={s.searchInput} />
                </View>

            </View>
        )
    }


    useEffect(()=>{

       return ()=>{
           search = undefined;
       }
    },[])

    return (
        <CustomPage

            optin={{
                fixed:true,
                CustomFun:SearchCustomFun,
                color:'white'
            }}
        >
            <PageScrollView>
                <CommodityList orderMobx={mobx} />
            </PageScrollView>
        </CustomPage>
    )
}

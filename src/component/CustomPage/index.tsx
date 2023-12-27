
import { View } from "@tarojs/components"

import {ReactNode} from "react"
import CustomNavBar, {CustomNavBarOptin} from '../CustomNavBar'
import s from './index.module.scss'
import {Global} from "@/global";

/**
 * padding-bottom: constant(safe-area-inset-bottom);
 * padding-bottom: env(safe-area-inset-bottom);
 * 搭配 PageScrollView 可以实现自动完成触底和下拉刷新
 *
 * navBar填充高度 默认高度为手机顶部到胶囊体底部的距离 +12
 * @param props 通过穿入自定义navBar的配置和child实现fixed布局，如果不需要fixed
 */
export default function CustomPage(props:CustomPageProps) {

    const pageStore = Global.pageStore

    return (
        <View
            className={s.customPage}
            style={{
                paddingTop:`${props.noPadding?0: pageStore.navBarHeight + (props.paddingTop ?? 0)}px`,
                background:props.background
            }}
        >
            <CustomNavBar
                {...props.optin}
            ></CustomNavBar>
            {
                props.pageTop
            }
            <View
                className={s.refresherEnabled}
            >
                {
                    props.children
                }
            </View>

        </View>
    )

}


export interface onScrollToLowerProps {
    page:number
    pageSize:number
    total:number
}

interface CustomPageProps {
    background?: string;
    paddingTop?:number
    children:ReactNode,
    /**
     * 页面底部填充一般用来适配tabbar
     */
    paddingBottom?:number
    /**
     * CustomNavBar的配置
     */
    optin:CustomNavBarOptin,
    /**
     * 头部不需要滑动的组件
     */
    pageTop?:JSX.Element
    /**
     * 是否不需要头部CustomNavBar高度的Padding
     */
    noPadding?:boolean
    /**
     * 头部额外的padding高度-会被自动转换为rpx
     */
    navBarExtra?:number

}

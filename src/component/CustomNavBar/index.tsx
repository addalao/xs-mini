import { View ,Image,Text} from "@tarojs/components";
import Taro from '@tarojs/taro'
import {GlobalStore} from "@/global";
import {goBack} from "@/common/tool/pageHandle";
import React, {useRef } from 'react'
import chevronLeft from '../../assets/image/svg/chevronLeft.svg'
import whiteChevronLeft from '../../assets/img/login/chevronLeftwhite.svg'
import s from './index.module.scss'
/**
 * 自定义navBar
 * navBar 高度固定为 GlobalStore.PageStore.navBarHeight
 * @param optin 自定义选项
 * @returns
 */
export default React.memo(
    function CustomNavBar (optin:CustomNavBarOptin){
        const pageStore = GlobalStore.pageStore
        const BoundingInfo = Taro.getMenuButtonBoundingClientRect() //胶囊体信息
        const navBar = useRef()

        const back = ()=>{ //返回按钮
            if (optin.customBack !== undefined){
                optin.customBack()
            }else {
                goBack()
            }
        }

        return (
            <View
                ref={navBar}
                id={optin.id}
                className={s.customNavBar}
                style={{
                    paddingTop:`${BoundingInfo.top}px`,
                    height:`${pageStore.navBarHeight}px`,
                    position:`${optin.fixed?'fixed':'relative'}`,
                    background:`${optin.color ?? process.env.MAIN_BACKGROUND_COLOR}`,
                    zIndex:`${optin.fixed?'20':'10'}`
                }}
            >
                <View
                    className={s.LoyaBox}
                    style={{
                        height:`${BoundingInfo.height}px`,
                    }}
                >
                    {
                        (optin.isReturnArrow == undefined &&optin.CustomFun == undefined ) &&
                        (
                            optin.whiteText == undefined?
                            <Image style={{
                                color:optin.titleColor?optin.titleColor:'black'
                             }} onClick={back} className={s.chevronLeft} src={chevronLeft} />:
                             <Image style={{
                                color:optin.titleColor?optin.titleColor:'black'
                             }} onClick={back} className={s.chevronLeft} src={whiteChevronLeft} />
                        )
                    }
                    {
                        (optin.title != undefined  && optin.CustomFun == undefined) &&
                        <View className={s.title}>
                            <Text style={{
                                color:optin.titleColor?optin.titleColor:'black'
                            }}>{optin.title}</Text>
                        </View>
                    }
                    {

                        optin.CustomFun  &&  <optin.CustomFun rightDistance={Taro.getSystemInfoSync().windowWidth - BoundingInfo.left}></optin.CustomFun>
                    }
                </View>
            </View>
        )
    }
)

export interface CustomFunProps {
    rightDistance:number,
}

export interface CustomNavBarOptin {
    /**
     * 自定义组件
     *
     * @param rightDistance 胶囊体右边的距离
     */
    CustomFun?: React.FC<CustomFunProps>
    /**
     * 背景颜色 默认为配置文件里的主要背景颜色
     */
    color?: string
    /**
     * 自定义返回事件
     */
    customBack?: (...argument) => void
    /**
     * 是否需要固定定位
     */
    fixed?: boolean
    /**
     * 最外层元素的id
     */
    id?: string
    /**
     * 是否需要返回箭头
     */
    isReturnArrow?: boolean

    /**
     * 标题，不传不会渲染
     */
    title?: string
    /**
     * 标题颜色
     */
    titleColor?: string
    /**
     * 返回箭头是否需要白色
     */
    whiteText?: boolean
}

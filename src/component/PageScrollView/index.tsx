import React, {ReactNode, useMemo} from "react";
import {PageScrollViewMobx} from "@/component/PageScrollView/PageScrollViewMobx";
import {Observer} from "mobx-react-lite";
import {ScrollView, ScrollViewProps} from "@tarojs/components";
import {BaseEventOrig, BaseEventOrigFunction, CommonEventFunction} from "@tarojs/components/types/common";
import s from './index.module.scss'


type awaitFunction = (event: BaseEventOrig)=>Promise<any>

interface PageScrollViewProps {
    mobx?:PageScrollViewMobx,
    children?:ReactNode,
    /**
     * 刷新区域背景颜色
     */
    refresherBackground?:string
    /**
     * 触顶
     */
    onScrollToUpper?:()=>any

    onScroll?: BaseEventOrigFunction<ScrollViewProps.onScrollDetail>

    /**
     * 是否开启下拉刷新,默认开启
     */
    refresherEnabled?:boolean

    /**
     * 下拉刷新被复位
     */
    onRefresherRestore?: CommonEventFunction
    /**
     * 下拉刷新被终止
     */
    onRefresherAbort?: CommonEventFunction
    /**
     * 下拉刷新被触发
     */
    onRefresherRefresh?: awaitFunction
    /**
     * 触底
     */
    onScrollToLower?: CommonEventFunction
    /**
     * 纵向滚动，默认为true
     */
    scrollY?:boolean

    paddingBottom?:number

    paddingTop?:number

    id?:string
}

export const PageScrollView:React.FC<PageScrollViewProps> = React.memo(({
    mobx,
    children,
    onScrollToUpper,
    onScroll,
    refresherBackground= process.env.TARO_APP_MAIN_BACKGROUND_COLOR,
    refresherEnabled= true,
    onRefresherRestore,
    onRefresherAbort,
    onRefresherRefresh,
    onScrollToLower,
    scrollY = true,
    paddingBottom=0,
    paddingTop = 0,
    id
})=>{

    const pageMobx = useMemo(()=>mobx ?? new PageScrollViewMobx(),[])

    /**
     * 触顶
     */
    const customOnScrollToUpper = ()=>{
        onScrollToUpper && onScrollToUpper()
    }

    /**
     * 下拉刷新复位
     */
    const customRefresherRestore:CommonEventFunction = (event)=>{
        pageMobx.setRefresh(false)
        onRefresherRestore && onRefresherRestore(event)
    }
    /**
     * 下拉刷新触发
     */
    const customRefresherRefresh:CommonEventFunction = async (event)=>{

        pageMobx.setRefresh(true)
        try {
            onRefresherRefresh && await onRefresherRefresh(event)
        }finally {
            setTimeout(()=>{
                pageMobx.setRefresh(false)
            },100)
        }

    }

    /**
     * 下拉刷新被终止
     */
    const customRefresherAbort:CommonEventFunction = (event)=>{
        pageMobx.setRefresh(false)
        onRefresherAbort && onRefresherAbort(event)
    }

    return (
        <Observer>
            {()=>{
                return (
                    <ScrollView
                        // enablePassive
                        scrollTop={pageMobx.scrollTop}
                        onScrollToUpper={customOnScrollToUpper}
                        onScroll={onScroll}
                        enhanced
                        showScrollbar={false}
                        lowerThreshold={150}
                        refresherBackground={refresherBackground}
                        refresherEnabled={refresherEnabled}
                        refresherTriggered={pageMobx.refresh} //当前下拉刷新状态
                        onRefresherRestore={customRefresherRestore}
                        onRefresherAbort={customRefresherAbort}
                        onRefresherRefresh={customRefresherRefresh}
                        onScrollToLower={onScrollToLower}//触底
                        scrollY={scrollY}
                        style={{
                            paddingTop:`${paddingTop}px`,
                            paddingBottom:`${paddingBottom}px`,
                            background:refresherBackground
                        }}
                        className={s.pageScrollView}
                        id={id}
                    >
                        {
                            children
                        }
                    </ScrollView>
                )
            }}
        </Observer>
    )
},()=>true)

import React from "react";
import MyIcon from "@/component/MyIcon";
import s from './index.module.scss'
import {goBack} from "@/common/tool/pageHandle";


interface BackIconProps {
    /**
     * 返回前执行
     */
    onBack?:()=>void
}
export const BackIcon:React.FC<BackIconProps> = ({
    onBack
})=>{
    return (
        <MyIcon onClick={()=>{
            onBack && onBack()
            goBack()
        }} className={s.backIcon} iconName='iconfont-chevron-left' />
    )
}

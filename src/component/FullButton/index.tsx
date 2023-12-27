import React from "react";
import {View} from "@tarojs/components";
import s from './index.module.scss'
import {ITouchEvent} from "@tarojs/components/types/common";

interface FullButtonProps {
    text:string,
    onClick?: (event: ITouchEvent) => void
}

interface  FullButtonAllProps {
    option:FullButtonProps
    /**
     * 是否带一个外壳（自动计算底部安全距离），并且固定定位在底部
     */
    isCabinet:boolean
}

export const FullButtonAll:React.FC<FullButtonAllProps> = ({
    option,
    isCabinet
})=>{
    if(isCabinet){
        return <View className={s.bottomBox}>
            <FullButtonItself {...option} />
        </View>
    }

    return <FullButtonItself {...option} />
}


const FullButtonItself:React.FC<FullButtonProps> = ({
    text,
    onClick
})=>{

    return (
        <View onClick={onClick} className={s.btn}>
            {text}
        </View>
    )
}

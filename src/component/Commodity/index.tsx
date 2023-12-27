import React from "react";
import {Text, View} from "@tarojs/components";
import s from './index.module.scss'
import {OpacityImg} from "@/component/OpacityImg";
import {ITouchEvent} from "@tarojs/components/types/common";

interface CommodityProps {
    src:string,
    title:string,
    integral:number,
    onClick?: (event: ITouchEvent) => void
}

export const Commodity:React.FC<CommodityProps> = ({
    src,
    title,
    integral,
    onClick
})=>{

    return (
        <View className={s.itemBox} onClick={onClick} >
            <OpacityImg className={s.cover} src={src} />
            <Text className={s.title}>{title}</Text>
            <View className={s.priceBox}>
                <Text className={s.tips}>
                    兑换所需
                </Text>
                <Text className={s.integral}>
                    {integral}
                </Text>
                <Text>
                    积分
                </Text>
            </View>
        </View>
    )
}

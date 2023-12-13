import { ITouchEvent, View } from "@tarojs/components";
import { CSSProperties } from "react";

/**
 * 调整大小请设置className 更改font-size
 *
 * @param props
 * @returns
 */
export default function MyIcon(props:Props){
    return (
        <View
            style={props.style}
            id={props.id}
            onClick={props.onClick}
            className={`iconfont ${props.iconName} ${props.className}`}
        >

        </View>
    )
}
interface Props {
    id?:string
    iconName:string
    className?:string
    onClick?:(e:ITouchEvent)=>any
    style?: string | CSSProperties
}

import {CSSProperties, useState} from "react";
import {Image, ImageProps} from "@tarojs/components";
import {ITouchEvent} from "@tarojs/components/types/common";

/**
 * 渐变效果的 cover image
 */
export const OpacityImg:React.FC<OpacityImgProps> = ({
    src,
    className,
    mode= 'aspectFill',
    onClick,
    style,
    svg
})=>{
    // console.log(assetKey)
    const [show,setShow] = useState(false)
    return  (
        <Image
            svg={svg}
            onClick={onClick}
            src={src}
            mode={mode}
            onLoad={()=>{
                setShow(true)
            }}
            style={{
                ...style,
                opacity:show?1:0,
                transition:'0.3s'
            }}
            className={className}
        />
    )
}

interface OpacityImgProps {
    src:string
    className?:string,
    onClick?: (event: ITouchEvent) => void
    mode?: keyof ImageProps.Mode
    style?: CSSProperties
    svg?:boolean
}

import React from "react";
import {Image, View} from "@tarojs/components";
import em from '../../assets/svg/empty.svg'
import CustomPage from "@/component/CustomPage";

/**
 * 空占位
 * @constructor
 */
const Empty:React.FC = ()=>{
    return (
        <Image svg src={em} mode='widthFix' style={{
            width:'100%',
        }} />
    )
}

interface EmptyPageProps {
    /**
     * 是否作为页面显示（有返回按钮）,默认为 true
     */
    isPage?:boolean
}
export const EmptyPage:React.FC<EmptyPageProps> = ({
    isPage= true
})=>{
    if(isPage){
        return (
            <CustomPage optin={{
                fixed:true,
                title:'页面不在了'
            }}>
                <View style={{
                    width:'100vw',
                    height:'70vh',
                    display:'flex',
                    alignItems:'center',

                }}>
                    <Empty />
                </View>
            </CustomPage>
        )
    }
    return   <Empty />
}

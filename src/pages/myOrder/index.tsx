import CustomPage from "@/component/CustomPage";
import React, {useState} from "react";
import {Text, View} from "@tarojs/components";
import s from './index.module.scss'
import {PageScrollView} from "@/component/PageScrollView";
import {OrderStatus} from "@/component/OrderList/OrderListMobx";

export default function myOrder(){

    const topBarChange = (item:TopBarItem)=>{
        console.log(item)
    }

    return (
        <CustomPage optin={{
            fixed:true,
            title:'我的订单'
        }}>
            <TopBar onChang={topBarChange} />
            <PageScrollView>

            </PageScrollView>
        </CustomPage>
    )
}


interface TopBarProps {
    onChang:(item:TopBarItem)=>void
}
interface TopBarItem {
    name:string
    status:OrderStatus
}

/**
 * 顶部切换
 */
const TopBar:React.FC<TopBarProps> = ({
    onChang
})=> {

    const [current,setCurrent] = useState(0)

    const items:TopBarItem[] = [
        {
            name:'全部',
            status:OrderStatus.all
        },
        {
            name:'待发货',
            status:OrderStatus.await
        },
        {
            name:'待收货',
            status:OrderStatus.collect
        },
    ];

    return (
        <View className={s.topBar}>
            {
                items.map((item,i)=>(
                    <View
                        onClick={()=>{
                            setCurrent(i)
                            onChang(items[i])
                        }}
                        key={item.status}
                        className={s.barItem}
                    >
                        <Text className={`
                            ${s.name}
                            ${items[current].status == item.status? s.activeName:''}
                        `}>
                            {item.name}
                        </Text>

                        <View className={`
                            ${s.bar}
                            ${items[current].status == item.status? s.activeBar:''}
                        `} />
                    </View>
                ))
            }
        </View>
    )
}






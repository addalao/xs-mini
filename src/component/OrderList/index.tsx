import React from "react";
import {Text, View} from "@tarojs/components";
import s from "@/pages/myOrder/index.module.scss";


interface OrderListProps {

}

/**
 * 订单列表
 */
export const OrderList:React.FC<OrderListProps> = ({

})=>{
    return <>
        <OrderItem time=''  orderId='' />
    </>
}

interface OrderItemProps {
    time:string,
    orderId:string
}

const OrderItem:React.FC<OrderItemProps> = ({
    time
})=>{
    return (
        <View className={s.orderItemBox}>
            <View className={s.orderIdBox}>
                <View className={s.idBox}>
                    <Text className={s.time}>{time}</Text>
                    <View className={s.orderId}>
                        <Text>订单号：</Text><Text>{time}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

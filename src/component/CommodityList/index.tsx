import React, {useMemo} from "react";
import s from "@/pages/index/index.module.scss";
import {Observer} from "mobx-react-lite";
import {Commodity} from "@/component/Commodity";
import {View} from "@tarojs/components";
import {CommodityListMobx} from "@/component/CommodityList/CommodityListMobx";
import Taro from "@tarojs/taro";

interface OrderListProps {
    commodityMobx?:CommodityListMobx
}

/**
 * 商品列表
 */
export const CommodityList:React.FC<OrderListProps> = ({
    commodityMobx
})=>{

    const mobx = useMemo(()=>commodityMobx ?? new CommodityListMobx() ,[])

    return (
        <View className={s.indexPage}>

            <Observer>
                {()=>(<>
                    {
                        mobx.items.map((item)=>(
                            <Commodity
                                onClick={()=>{
                                    Taro.preload(item)
                                    Taro.navigateTo({
                                        url:'/pages/commodityDetails/index'
                                    });
                                }}
                                key={item.id}
                                title={item.desc}
                                src='https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg'
                                integral={item.price}
                            />
                        ))
                    }</>)}
            </Observer>

        </View>
    )
}

import React, {useMemo} from "react";
import Taro from "@tarojs/taro";
import {GoodsItem} from "@/api/ts/weChartComponents";
import { EmptyPage} from "@/component/Empty";
import CustomPage from "@/component/CustomPage";
import {CommodityDetailsMobx} from "@/pages/commodityDetails/commodityDetailsMobx";
import {PageScrollView} from "@/component/PageScrollView";
import {Global} from "@/global";
import {Image, Swiper, SwiperItem, Text, View} from "@tarojs/components";
import s from './index.module.scss'
import {Observer} from "mobx-react-lite";
import bk from '../../assets/svg/my_bk.svg'
import {FullButtonAll} from "@/component/FullButton";

/**
 * 商品详情页
 * @constructor
 */
export default function CommodityDetails(){

    const item:GoodsItem | undefined = useMemo(()=>Taro.getCurrentInstance().preloadData as GoodsItem,[])

    if(item == undefined){
        return (
            <EmptyPage isPage />
        )
    }

    return <CommodityDetailsPage item={item} />
}

interface CommodityDetailsPageProps {
    item:GoodsItem
}

const CommodityDetailsPage:React.FC<CommodityDetailsPageProps> = ({
    item
})=>{

    /**
     * 立即兑换
     */
    const convert = ()=>{

    }

    const mobx = new CommodityDetailsMobx(item);

    console.error(`功能未完成--${mobx}`)

    return (
        <CustomPage
            noPadding
            optin={{
                color:'rgba(0,0,0,0)',
                fixed:true,
                title:'商品详情'
            }}

        >

            <PageScrollView
                refresherBackground='white'
                refresherEnabled={false}
                // paddingTop={Global.pageStore.navBarHeight + 15}
            >
                <Image src={bk} className={s.bk} svg mode='aspectFill' />
                <View className={s.hierarchy}>

                    <View className={s.cost} style={{
                        paddingTop:Global.pageStore.navBarHeight + 15
                    }}>

                        <View className={s.pointsBox}>
                            <Text className={s.costTips}>
                                可用积分：
                            </Text>
                            <Observer>
                                {()=>(
                                    Global.auth.information?
                                    <Text className={s.points}>
                                        {Global.auth.information.points}
                                    </Text>:<></>
                                )}
                            </Observer>
                        </View>

                    </View>

                    <Swiper
                        className={s.productView}
                        circular
                        autoplay
                    >
                        {
                            [2].map((v)=>(
                                <SwiperItem key={v}>
                                    <View className={s.imageBox} >
                                        <Image mode='aspectFill' className={s.productImage} src='https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg' />
                                    </View>
                                </SwiperItem>
                            ))
                        }
                    </Swiper>

                    <View className={s.strip} />

                    <View className={s.introduceTextBox}>

                        <View className={s.title}>
                            自行车
                        </View>

                        <View className={s.priceBox}>
                            <Text className={s.priceTips}>
                                兑换所需
                            </Text>
                            <Text className={s.price}>
                                333
                            </Text>
                            <Text className={s.unit}>
                                积分
                            </Text>
                        </View>

                        <View className={s.contentTitle}>
                            商品详情
                        </View>
                        <View className={s.contentBox}>
                            <Text>
                                asdsaasdsaas
                            </Text>
                        </View>
                    </View>
                </View>
            </PageScrollView>
            <FullButtonAll isCabinet option={{
                text:'立即兑换',
                onClick:convert
            }} />
        </CustomPage>
    )
}

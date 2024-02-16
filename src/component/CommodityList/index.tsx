import s from "@/pages/index/index.module.scss";
import { View } from "@tarojs/components";

interface OrderListProps<T> {
    items: T[]
}

/**
 * 商品列表
 */
export const CommodityList: React.FC = <T,>({
    items
}: OrderListProps<T>) => {

    return (
        <View className={s.indexPage}>

            {
                items.map((_,index) => (
                    <View key={index}>
                        {index}
                    </View>
                    // <Commodity
                    //     onClick={() => {
                    //         Taro.preload(item)
                    //         Taro.navigateTo({
                    //             url: '/pages/commodityDetails/index'
                    //         });
                    //     }}
                    //     key={item.id}
                    //     title={item.desc}
                    //     src='https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg'
                    //     integral={item.price}
                    // />
                ))
            }

        </View>
    )
}

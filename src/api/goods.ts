import {Requset} from "@/request/request";
import {GoodsListReq, GoodsListRes} from "@/api/ts/weChartComponents";

/**
 * 货品信息列表
 */
export const goodsList = async (data:GoodsListReq)=>{
    return Requset.v1<GoodsListRes>({
        url:'/weChart/api/goods_list',
        data
    })
}

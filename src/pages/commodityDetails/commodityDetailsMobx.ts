import {makeAutoObservable} from "mobx";
import {GoodsItem} from "@/api/ts/weChartComponents";

export class CommodityDetailsMobx {

    item:GoodsItem

    constructor(item:GoodsItem) {

        this.item = makeAutoObservable(item)

        makeAutoObservable(this)

    }

}

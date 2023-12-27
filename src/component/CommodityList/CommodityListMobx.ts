import {makeAutoObservable,runInAction} from "mobx";
import {goodsList} from "@/api/goods";
import {AllPage} from "@/common/tool/pageItem";
import {GoodsItem} from "@/api/ts/weChartComponents";

export class CommodityListMobx {
    constructor() {
        this.getItem = this.getItem.bind(this)
        this.refresh = this.refresh.bind(this)
        this.search = this.search.bind(this)
        makeAutoObservable(this)
        // this.getItem().then()
    }

    async search(v:string){

        this.allPage.resetPage();
        this.filter = v;
        await this.getItem();
    }

    loadingType

    allPage = new AllPage()

    filter = ''

    total = 0;

    async getItem(){
        const {items,total} = await goodsList({
            page:this.allPage.page,
            pageSize:this.allPage.pageSize,
            filter:this.filter
        })

        runInAction(()=>{

            if(this.allPage.page == 1){
                this.items = items
            }else  {
                this.items.push(...items)
            }

            this.total = total;
        })
    }

    items:GoodsItem[] = []

    refresh(){
        this.allPage.resetPage()

    }

}

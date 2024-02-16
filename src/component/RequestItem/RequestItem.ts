import { Requset } from "@/request/request";
import {makeObservable,action,observable} from "mobx";

/**
 * 请求列表封装
 */
abstract class RequestItemBase<D> {

    items:D[] = [];

    page = 1;

    pageSize = 30;

    total?:number;

    filter = ''

    abstract getItems():Promise<void>;

    /**
     * 是否在加载更多中
     */
    onMoreRequest = false;

    /**
     * 是否还有更多数据
     */
    get hashMore ():boolean{
        if(this.total == undefined) return true;
        return this.total > this.items.length;
    }

    /**
     * 触底加载更多
     */
    async onMore(){
        if(this.onMoreRequest || !this.hashMore) return;
        this.onMoreRequest = true;
        this.page += 1;
        try{
            await this.getItems();
        }finally{
            this.onMoreRequest = false;
        }
        
    }

    /**
     * 刷新
     */
    async refresh(){
        this.page = 1;
        await this.getItems(); 
    }

}

/**
 * get方法请求列表数据
 */
export class RequestGetItem<D> extends RequestItemBase<D> {

    constructor(public url:string){
        super()
        this.getItems  = this.getItems.bind(this);
        this.onMore = this.onMore.bind(this)
        this.refresh = this.refresh.bind(this)
        makeObservable(this,{
            getItems:action  ,
            items:observable
        })
    }

    async getItems() {
         const {items,total} = await Requset.v1.get<{
            items:D[],
            total:number
        }>({
            url:this.url,
            data:{
                page:this.page,
                pageSize:this.pageSize,
                filter:this.filter
            }
        })

        if(this.page == 1){
            this.items = items;
        }else {
            this.items.push(...items)
        }

        this.total = total;
    }
}

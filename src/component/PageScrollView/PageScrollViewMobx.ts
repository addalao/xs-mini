import {makeAutoObservable} from "mobx";

export class PageScrollViewMobx {
    constructor(public refresh = false) {
        this.setRefresh = this.setRefresh.bind(this);
        makeAutoObservable(this)
    }

    scrollTop = 0;
    setScrollTop(v:number){
        this.scrollTop = v;
    }

    setRefresh(v:boolean){
        this.refresh = v;
    }

}

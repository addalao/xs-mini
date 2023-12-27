import {makeAutoObservable} from "mobx";

export class AllPage {
    constructor(public pageSize = 20){
        makeAutoObservable(this)
    }

    page = 1

    addPage = ()=>{
        this.page += 1
    }
    resetPage = ()=>{
        this.page = 1
    }
}

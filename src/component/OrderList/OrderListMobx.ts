import {makeAutoObservable} from "mobx";

export enum OrderStatus {
    all,
    await,
    collect
}

export class OrderListMobx {
    constructor() {
        makeAutoObservable(this)
    }

}

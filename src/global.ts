import {PageStore} from "@/globalMobx/PageStore";
import {Auth} from "@/globalStore/auth";


/**
 * 全局状态
 */
export class Global {

    static pageStore = new PageStore()

    static auth = new Auth()
}

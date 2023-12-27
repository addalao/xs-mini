import Taro from '@tarojs/taro'


/**
 * 付钱方式
 */
export function getCostMethod(type:number):string{
    let str = ''
    switch (type) {
        case 1:
            str = "我出钱";
            break;
        case 2:
            str = "你请客";
            break;
        case 3:
            str = "AA制";
            break;
        case 4:
            str = "女士免费";
            break;
        case 5:
            str = "男士免费";
    }
    return  str
}

/**
 * 返回用户是否同意了隐私授权
 * 如果编译器提示Taro.getPrivacySetting 不存在，请忽略
 */
// export function getPrivacySetting(){
//     return new Promise<boolean>((resolve,reject)=>{
//         // getPrivacySetting
//         Taro.getPrivacySetting({
//             success:(e)=>{
//                 resolve(!e.needAuthorization)
//             },
//             fail:(e)=>{
//                 reject(e)
//             }
//         })
//     })
// }
//
// /**
//  * 弹出隐私协议弹窗，返回用户是否同意
//  * 如果编译器提示 Taro.requirePrivacyAuthorize 不存在，请忽略
//  */
// export function requirePrivacyAuthorize(){
//     return new Promise<boolean>((resolve, reject)=>{
//         Taro.requirePrivacyAuthorize({
//             success:()=>{
//                 resolve(true)
//             },
//             fail:(e)=>{
//                 reject(e)
//             }
//         })
//     })
//
// }

export function getRandomNumber() {
    // 生成一个介于0和1之间的随机小数
    var randomDecimal = Math.random();

    // 将随机小数映射到-30到30之间
    return randomDecimal * 60 - 30;
}

const provinceCodes = {
    '11': '北京',
    '12': '天津',
    '13': '河北',
    '14': '山西',
    '15': '内蒙古',
    '21': '辽宁',
    '22': '吉林',
    '23': '黑龙江',
    '31': '上海',
    '32': '江苏',
    '33': '浙江',
    '34': '安徽',
    '35': '福建',
    '36': '江西',
    '37': '山东',
    '41': '河南',
    '42': '湖北',
    '43': '湖南',
    '44': '广东',
    '45': '广西',
    '46': '海南',
    '50': '重庆',
    '51': '四川',
    '52': '贵州',
    '53': '云南',
    '54': '西藏',
    '61': '陕西',
    '62': '甘肃',
    '63': '青海',
    '64': '宁夏',
    '65': '新疆',
    '71': '台湾',
    '81': '香港',
    '82': '澳门'
};
function calculateYearDifference(date1: string, date2: string): number {
    const year1 = parseInt(date1.substring(0, 4));
    const month1 = parseInt(date1.substring(4, 6));
    const day1 = parseInt(date1.substring(6, 8));

    const year2 = parseInt(date2.substring(0, 4));
    const month2 = parseInt(date2.substring(4, 6));
    const day2 = parseInt(date2.substring(6, 8));

    let yearDifference = year1 - year2;

    // 如果月份小于前一个日期的月份，年份差距需要减一
    if (month1 < month2 || (month1 === month2 && day1 < day2)) {
      yearDifference--;
    }

    return yearDifference;
}
export function validateIdCardNumber(idCardNumber: string): ValidateIdCardNumberRea {
    if (idCardNumber.length !== 18) return {
        isAdult:true,
        isPass:false
    };
    const provinceCode: string = idCardNumber.substring(0, 2);
    const provinceCodeValid: boolean = Object.keys(provinceCodes).includes(provinceCode);
    if (!provinceCodeValid) return {
        isAdult:true,
        isPass:false
    };
    const birthCode: string = idCardNumber.substring(6, 14);
    const now: Date = new Date();
    const yearMonth: string = now.toISOString().substring(0, 10).replace(/-/g, "");

    const birthCodeNumber: number = parseInt(birthCode);
    const cNum = parseInt(yearMonth)
    const age = calculateYearDifference(`${cNum}`,`${birthCodeNumber}`)
    if(age < 18){
        return {
            isAdult:false,
            isPass:false
        }
    }
    if((cNum - birthCodeNumber) < 18){
        return {
            isAdult:true,
            isPass:false
        }
    }
    const birthCodeValid: boolean =
        !Number.isNaN(birthCodeNumber) &&
        birthCodeNumber >= 19000101 &&
        birthCodeNumber <= cNum;

    if (!birthCodeValid) return {
        isAdult:true,
        isPass:false
    };

    const checkCode: string = idCardNumber.substring(17);
    const checkCodeValid: boolean = getCheckCode(idCardNumber) === checkCode;
    if (!checkCodeValid) return {
        isAdult:true,
        isPass:false
    };

    return {
        isAdult:true,
        isPass:true
    };
}
interface ValidateIdCardNumberRea {
    isPass:boolean,
    /**
     * 是否成年
     */
    isAdult:boolean
}
function getCheckCode(idCardNum: string): string {
    const factor: number[] = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const codes: string[] = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

    let sum = 0;
    for (let i = 0; i < 17; i++) {
        sum += parseInt(idCardNum[i]) * factor[i];
    }
    return codes[sum % 11];
}



/**
 * 检测名字
 */
export function validateChineseName(name: string): boolean {
    if (name.length < 2 || name.length > 10) return false;

    for (let i = 0; i < name.length; i++) {
      const codePoint = name.charCodeAt(i);
      if (!(codePoint >= 0x4E00 && codePoint <= 0x9FFF)) {
        if (i !== 1 || codePoint !== 0x20) return false;
      }
    }

    return name.charCodeAt(0) !== 0x20;


}

/**
 * 快速查找下标的map表
 */
export class FastSearch<T> {
    constructor({
        items,
        idKey
    }:FastSearchProps<T>) {
        this.indexMap = {};
        for (let i = 0; i < items.length; i++) {
            const id = items[i][idKey] as string;
            if (id !== undefined) {
                this.indexMap[id] = i;
            }
        }
    }


    private indexMap:IndexMap
    findIndexById = (id:string):number | undefined =>{
        return this.indexMap[id];
    }
}
interface IndexMap {
    [name:string]:any
}

interface FastSearchProps <T>{
    items:T[],
    idKey:keyof T
}

export class SystemConfig {
    windowInfo = Taro.getWindowInfo()
    btnInfo =  Taro.getMenuButtonBoundingClientRect() //胶囊体信息
    systemInfo = Taro.getSystemInfoSync()
    redundancy = 10
    get height (){
        return this.btnInfo.bottom + this.redundancy
    }
    get paddingRight(){
        return this.systemInfo.windowWidth - this.btnInfo.left
    }
}

/**
 * 输出年月日 时分秒
 */
export function formatAllTime(date:string,noMini?:boolean) {
    try {
        const inputTime = formatDate(date)
        const parsedDate = new Date(inputTime);
        const year = parsedDate.getFullYear();
        const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，所以要 +1
        const day = String(parsedDate.getDate()).padStart(2, '0');
        const hours = String(parsedDate.getHours()).padStart(2, '0');
        const minutes = String(parsedDate.getMinutes()).padStart(2, '0');
        const minTime = noMini?'':`${hours}:${minutes}`
        return `${year}年${month}月${day}日 ${minTime}`;
    }catch {
        return ""
    }
}

function formatDate(inputDate: string): string {
    const dateParts = inputDate.split(' ');
    if (dateParts.length !== 2) {
        return '';
    }

    const [datePart, timePart] = dateParts;
    const [year, month, day] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');

    return `${year}/${month}/${day} ${hours}:${minutes}:00`;
}
/**
 * 检测是否是微信
 * 空值回返回 true
 */
export function isValidWeChatID(wechatID:string) {
    if(wechatID == '') return true

    const wechatIDRegex = /^[a-zA-Z0-9_]{6,20}$/;
    return wechatIDRegex.test(wechatID);
}
/**
 * 检测是否是qq
 * 空值回返回 true
 */
export function isValidQQ(qq:string) {
    if(qq == '') return true

    const qqRegex = /^[1-9][0-9]{5,10}$/;
    return qqRegex.test(qq);
}

/**
 * 深拷贝
 */
export function deepClone<T>(obj: T): T {
    if (obj === null) {
      return obj;
    }

    if (obj instanceof Date) {
      return new Date(obj.getTime()) as any;
    }

    if (obj instanceof Array) {
      return obj.reduce((arr, item) => {
        arr.push(deepClone(item));
        return arr;
      }, []) as any;
    }

    if (typeof obj === 'object') {
      return Object.keys(obj).reduce((newObj, key) => {
        newObj[key] = deepClone(obj[key]);
        return newObj;
      }, {}) as T;
    }

    return obj;
  }


/**
 * 是否只有中文
 */
export function isChines(inputString: string): boolean {
    const pattern = /^[\u4e00-\u9fa5]+$/; // 匹配汉字的 Unicode 范围
    return pattern.test(inputString);
  }

/**
 * 验证身份证号
 */
export function CheckIdNumber(code:string) {

    var format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
    //号码规则校验
    if (!format.test(code)) {
        return false;
    }
    //区位码校验
    //出生年月日校验   前正则限制起始年份为1900;
    const year = code.substring(6, 4),//身份证年
        month = code.substring(10, 2),//身份证月
        date = code.substring(12, 2),//身份证日
        time = Date.parse(month + '-' + date + '-' + year),//身份证日期时间戳date
        now_time = Date.parse(new Date().toString()),//当前时间戳
        dates = (new Date(parseInt(year), parseInt(month), 0)).getDate();//身份证当月天数
    if (time > now_time || parseInt(date) > dates) {
        return false;
    }
    //校验码判断
    const cArr = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];   //系数
    const b = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];  //校验码对照表
    const id_array = code.split("");
    let sum = 0;
    for (let k = 0; k < 17; k++) {
        sum += parseInt(id_array[k]) * cArr[k];
    }
    return id_array[17].toUpperCase() == b[sum % 11].toUpperCase();

}

/**
 *
 * @param inputString
 * @returns 是否是六位数字字符串
 */
export function isSixNumber(inputString:string) {
    // 使用正则表达式判断是否是六位数字字符串
    const pattern = /^\d{6}$/;
    return pattern.test(inputString);
  }

/**
 * 金额
 */
export function formatNumber(numberOrString: number | string): FormatNumber | void {

    if(numberOrString === "") return

    if (Number.isNaN(Number(numberOrString))) return

    if (typeof numberOrString === "number") {
        numberOrString = numberOrString.toFixed(2);
    }
    const [integerPart, decimalPart] = `${numberOrString}`.split(".");
    return {
        maxText:integerPart,
        minText:decimalPart
    }
}
export interface FormatNumber {
    maxText:string,
    minText:string
}


/**
 * 返回是否包含中文汉字
 */
export function containsChinese(text:string) {
    const regex = /[\u4e00-\u9fa5]/; // 匹配汉字的正则表达式
    return regex.test(text);
}


/**
 * @default num=3
 * 将数组按照指定长度拆分
 * @param array 需要拆分的数组
 * @param num 拆分的长度
 */
export function splitArrayGroups<T>(
    {
        array,
        num=3
    }:
    {
        array:T[],
        num:number
    }
) {
    const newList = [...array]
    const result:T[][] = [];
    while (newList.length > 0) {
        result.push(newList.splice(0, num));
    }
    return result;
}

export class Completer<T> {
    resolve: (value: T | undefined) => void
    reject:(value?:any)=>void
    promise:Promise<T | undefined> = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
    });
}

/**
 * 去除对象的空值 null undefined
 */
export function removeNullUndefinedProperties<T extends {}>(obj: T): T {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] === null || obj[key] === undefined) {
                delete obj[key];
            }
        }
    }
    return obj;
}

/**
 *
 * 获取订单状态
 *  //  pendingPay 待付款,
    //  complete 已完成,
    //  refundCompleted 已退款,
    //  refundRejected 拒绝退款,
    //  pendingRefund 退款申请中,
    //  started 服务已开始,
    //  serveCompleted 服务已结束,
    //  pendingServe 待服务
*
*/
export function getOrderState(state:string){

    switch (state){
        case 'pendingPay':
            return '待付款'

        case 'complete':
            return '已完成'

        case 'refundCompleted':
            return '已退款'

        case 'refundRejected':
            return '拒绝退款'

        case 'pendingRefund':
            return '退款申请中'

        case 'serveCompleted':
            return '服务已开始'

        case 'pendingServe':
            return '待服务'
    }
}


/**
 * 设置通知栏颜色
 * @param isWhite 是否设置为白色
 */
export function setColor(isWhite?:boolean){
    if(isWhite){
        Taro.setNavigationBarColor({ //字体颜色设为白色
            backgroundColor:'#00000000',
            frontColor:'#ffffff',
            animation:{
                duration:0.3
            }
        })
    }else {
        Taro.setNavigationBarColor({
            backgroundColor:'#ffffff00',
            frontColor:'#000000',
            animation:{
                duration:0.3
            }
        })
    }
}

/**
 * @param phone 手机号
 * @returns 手机号是否合格
 */
export function isPhone(phone:string):boolean{
    return /^1[3-9]\d{9}$/.test(phone)
}

/**
 *
 * @returns 获取安全区域信息
 */
export function  getDefaultSafeArea () {
    const res =  Taro.getSystemInfoSync();
    return res.safeArea
}
interface DebounceArgument<T extends Function>{
	fn:T
	time:number
	isFirstTime?:boolean
}
/**
 * 防抖函数 --这是一个闭包
 * @returns  返回能够防抖的执行函数
 * @param argument
 */
export const debounce = <T extends Function >(argument:DebounceArgument<T>):T | undefined=>{ //防抖
    let timeOut:any ;

    const noFirstTimeFn = (...args: any[])=>{
        if(timeOut){
            clearTimeout(timeOut)
        }
        timeOut = setTimeout(()=>{
            argument.fn(...args)
        },argument.time)
        return

    }
    const FirstTimeFn = (...args: any[])=>{

        if(!timeOut){
            argument.fn(...args);
        }else{
            clearTimeout(timeOut)
        }
        timeOut = setTimeout(()=>{
            clearTimeout(timeOut)
            timeOut = false
        },argument.time)
    }

    return argument.isFirstTime? FirstTimeFn as unknown as T : noFirstTimeFn as unknown as T
}

type ThrottleOptions = {
    leading?: boolean; // 是否在第一次触发时执行，默认为 true
    trailing?: boolean; // 是否在最后一次触发后执行，默认为 true
};

type ThrottleFunction<T extends (...args: any[]) => any> = T & {
    cancel: () => void; // 取消节流
    destroy:()=>void // 消除闭包
};

type ThrottleArgument<T extends (...args: any[]) => any> = {
    fn: T;
    time: number;
    options?: ThrottleOptions;
};

/**
 * 节流 函数--不适用于有返回值的函数
 */
export const throttle = <T extends (...args: any[]) => any>(
    argument: ThrottleArgument<T>
): ThrottleFunction<T> => {
    let lastExecTime: number | null = null;
    let timer: NodeJS.Timeout | null = null;

    const throttledFunction =  async (...args: Parameters<T>) => {
        const currentTime = Date.now();

        const clearTimer = () => {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
        };

        const execute = () => {
            clearTimer();
            argument.fn(...args);
            lastExecTime = currentTime;
        };

        if (lastExecTime === null && argument.options?.leading) {
            // 在第一次触发时执行
            execute();
        } else {
            if (currentTime - (lastExecTime || 0) >= argument.time) {
                // 超过节流时间，执行
                execute();
            } else if (argument.options?.trailing) {
                // 其他情况使用节流逻辑
                clearTimer();
                timer = setTimeout(() => {
                    execute();
                }, argument.time);
            }
        }
    };

    // 添加取消节流的方法
    throttledFunction.cancel = () => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    };
    // 添加取消并释放闭包引用的方法
    throttledFunction.destroy = () => {
        throttledFunction.cancel();
        lastExecTime = null;
    };

    return throttledFunction as ThrottleFunction<T>;
};


// /**
//  * 节流，执行函数参数只能传入对象才能正确判断
//  */
// export const throttle = <T extends (...args: any[]) => any>(
//     argument: Throttle<T>
//   ): undefined | ((...args: Parameters<T>) => (ReturnType<T> | undefined ))=> {
//     let timeOut: any;
//
//     return (...args: Parameters<T>): ReturnType<T> | undefined => {
//       if (timeOut) return;
//       timeOut = setTimeout(() => {
//         clearTimeout(timeOut);
//         timeOut = false;
//       }, argument.time);
//       return argument.fn(...args);
//     };
//   };

// interface Throttle<T> {
//     fn:T ,
//     time:number
// }
 /**
  * 把时间戳转化为YYYY-MM-DD hh:mm 格式
  * @param timestamp 时间戳
  * @param isnull
  * @returns
  */
export function formatTimestamp(timestamp: number,isnull?:boolean): string {
    const date = new Date(timestamp);
    const year: number = date.getFullYear();
    const month: string = String(date.getMonth() + 1).padStart(2, '0');
    const day: string = String(date.getDate()).padStart(2, '0');
    const hours: string = String(date.getHours()).padStart(2, '0');
    const minutes: string = String(date.getMinutes()).padStart(2, '0');
    const v =`${hours}:${minutes}`
     return `${year}-${month}-${day} ${isnull == undefined ? v : ''}`;
}
/**
 *
 * @param dateString 将时间格式为"YYYY-MM-DD hh:mm" 或 "YYYY-MM-DD"的日期转换为时间戳
 * @returns
 */
export function parseTimestamp(dateString: string): number {
    const [datePart, timePart] = dateString.split(' ');
    const [year, month, day] = datePart.split('-');

    let hours = '00';
    let minutes = '00';

    if (timePart) {
        [hours, minutes] = timePart.split(':');
    }

    return new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes)).getTime();
}

export const unitList = [
    '次',
    '间',
    '场',
    '周',
    '套',
    '斤',
    '份',
    '平米',
    '轮',
    '局',
    '月',
    '个',
    '桌',
    '小时',
    '天',
    '人',
    '课时',
]

/**
 * 把秒数转换为分钟，输出汉字
 * @param seconds
 * @returns
 */
export function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);

    return `${minutes}分${remainingSeconds}秒`;
}

/**
 * 获取定位授权，没有定位授权的话会跳转到设置页面
 * @param props
 */
export const accredit = (props?:{
    success:(res:Taro.getLocation.SuccessCallbackResult)=>any
})=>{ //授权
    return  new Promise<Taro.getLocation.SuccessCallbackResult | Taro.openSetting.SuccessCallbackResult>((resolve,reject)=>{
        Taro.authorize({ //授权
            scope:'scope.userLocation',
            success() {
                Taro.getLocation({//获取位置
                    success: function (res) {
                        props?.success(res)
                        resolve(res)
                    }
                })
            },
            fail() {
                Taro.showModal({
                    title:'定位失败',
                    content:'去设置定位权限',
                    success(res) {
                        const {cancel} = res
                        if(cancel) {
                            reject('取消授权')
                            return
                        }
                        Taro.openSetting({
                            success(res:Taro.openSetting.SuccessCallbackResult) {
                                resolve(res)
                            },
                        })
                    },
                })
            },
        })

    })
}
/**
 *
 * @param str 字符串
 * @returns 返回第一个文字，排除空格
 */
export function getFirstCharacter(str: string): string {
    str = str.trim();

    for (let i = 0; i < str.length; i++) {
      if (str[i] !== ' ') {
        return str[i];
      }
    }

    return '';
}
/**
 *
 * @param obj
 * @returns 去除undefined 和 0 的对象
 */
export function removeUndefinedAndZeroProperties<T extends object>(obj: T): T {
    return Object.entries(obj)
        .filter(([_, value]) => value !== undefined && value !== 0)
        .reduce((acc, [key, value]) => {
        acc[key as keyof T] = value as T[keyof T];
        return acc;
    }, {} as T);
}
/**
 * 等待固定时间的Promise
 */
export function awaitTime(time:number){
    return new Promise<boolean>((resolve)=>{
        setTimeout(()=>{
            resolve(true)
        },time)
    })
}
/**
 *
 * @param value
 * @returns 注意！undefined 会返回true
 * 检测是否没有超过小数点后一位
 *
 */
export function isNumericWithTwoDecimalPlaces(value: string|number|undefined,num:number=1): boolean {
    if (value === '') return false;
    if (value === undefined) return true;

    if (typeof value === 'number') {
        const decimalPart = value.toString().split('.')[1];
        return decimalPart === undefined || decimalPart.length <= num;
    } else {
        {
            const parsedValue = parseFloat(value);
            if (!Number.isNaN(parsedValue)) {
                const decimalPart = parsedValue.toString().split('.')[1];
                return decimalPart === undefined || decimalPart.length <= num;
            }
        }
    }
    return false;
}
/**
 *
 * @returns 随机渐变颜色
 */
export function generateRandomColor() {
    // 随机生成 RGB 值
    const red1 = Math.floor(Math.random() * 256);
    const green1 = Math.floor(Math.random() * 256);
    const blue1 = Math.floor(Math.random() * 256);

     // 随机生成 RGB 值
     const red2 = Math.floor(Math.random() * 256);
     const green2 = Math.floor(Math.random() * 256);
     const blue2 = Math.floor(Math.random() * 256);

    // 检查生成的颜色是否为白色，如果是则重新生成
    if (red1 === 255 && green1 === 255 && blue1 === 255) {
        return generateRandomColor();
    }

    const gradientColor2 = `rgb(${red2}, ${green2}, ${blue2})`;
    // 创建渐变效果
    const gradientColor1 = `rgb(${red1}, ${green1}, ${blue1})`;
    const gradient = `linear-gradient(to right, ${gradientColor1}, ${gradientColor2})`;

    return gradient;
}
/**
 * 取出数组前三位，不足三位有几位取几位
 * @param arr
 * @returns
 */
export function getFirstThreeItems<T>(arr: T[]): T[] {
    if (arr.length <= 3) {
        return arr.slice(0);
    } else {
        return arr.slice(0, 3);
    }
}
/**
 * 把一个数组分割成多个数组
 * @param arr 需要分割的数组
 * @param size 分割的大小
 * @returns
 */
export function chunkArray<T>(arr: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
}

/**
 * 将px的数值转换为rpx的数值
 */
export function pxForRpxNumber(num: number): number {

    const  inputString = Taro.pxTransform(num)
    // 使用正则表达式匹配数字部分
    const matches = inputString.match(/(\d+(\.\d+)?)/);
    if(matches == null) return  0;
    const resNum = Number(matches[0])
    const res = Number.isNaN(resNum)
    if(res) return 0;
    return resNum;
}

/**
 * 检测数据在不在区间
 * @param data
 * @returns
 */
export function isInRange(data:{
    /**
     * 被检测的值
     */
    num: number,
    /**
     * 区间最小值
     */
    min: number,
    /**
     * 区间最大值
     */
    max: number
}): boolean {
    return data.num >= data.min && data.num <= data.max;
}
/**
 * 闭包
 * 自定义点击事件，低于间隔时间触发单击回调，高于间隔时间触发双击回调
 * 间隔时间默认200
 *
 * @param opting 自定义click
 * @returns Function
 */
export function customClick<T>({
    doubleCallBack,
    singleCallBack,
    delay=400
}:ClickOpting<T>): ((data?: T) => void) | undefined{
    let timer:NodeJS.Timeout | undefined;
    return function(data:T) {
        if(timer){//双击
            doubleCallBack(data)
            clearTimeout(timer)
            timer = undefined
        }else { //单击
            timer = setTimeout(()=>{
                singleCallBack(data)
                timer = undefined
            },delay)
        }
    };
}
interface ClickOpting<T>{
    /**
     * 双击时的回调
     */
    doubleCallBack:(data:T)=>any
    /**
     * 单击时的回调
     */
    singleCallBack:(data:T)=>any
    /**
     * 间隔时间
     */
    delay?:number
}
function generateUUID(): string {

    // 获取当前时间戳
    const timeStamp = Date.now();

    // 获取时区偏移量
    const offset = new Date().getTimezoneOffset();

    // 生成随机字符串
    const randomString = Math.random().toString(16).substring(2, 8);

    // 拼接全部元素
    return `${timeStamp}-${offset}-${randomString}`;

}
/**
 * 获取ID
 */
export async function getUUID(length: number = 16){

    // 获取随机字节数组
    const randomBytes =  await Taro.getRandomValues({
        length
    });

    // 声明结果变量
    let result = Taro.arrayBufferToBase64(randomBytes.randomValues);
    return `${result}${generateUUID()}` ;

}

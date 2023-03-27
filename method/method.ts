import moment from 'moment';
// 随机数函数
export const radom = (min:number,max:number)=>{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
}

//节流函数
export const throttle = ()=>{
    let pre = 0
    return (fn:any,delay:number=5000,fn2:any)=>{
        let now = new Date().getTime();
        if((now-pre) > delay) {
            fn();
            pre = now
        }else {
            fn2(moment(delay - (now-pre)).format('s'));
        }
    }
}

//判断消息是否来自同一个群
export const isSameGuild = ()=>{
    let oldGuildId:number|string = 0;
    return (guildId:number|string)=>{
        let nowGuildId:number|string = guildId;
        if(oldGuildId !== nowGuildId) {
            oldGuildId = nowGuildId
            return false
        }else {
            return true
        }
    }
}

//判断字符是否存在于字符串数组
export const isInArr = (arr:Array<string>,text:string) => {
    if(Array.isArray(arr) && arr.length > 0) {
        let boolean = false;
        arr.indexOf(text) === -1 ? boolean : boolean = true;
        return boolean
    }else {
        return false
    }
}

//获得当前时间
export const getNow = ()=>{
    return moment().format('HH');
}

//输出时间
export const sendTime = (differenceTime:number)=>{
    const seconds:number = Math.floor(differenceTime / 1000);
    //求出当前时间差对应的分钟数 , 并求出余下的秒数
    const minutes = Math.floor(seconds / 60);
    const remainSec = seconds % 60;//余下的秒数
    //求出当前时间差对应的小时数 , 并求出余下的分钟数
    const hours = Math.floor(minutes / 60);
    const remainMin = minutes % 60;
    const timeString : string = hours == 0 ? remainMin == 0 ? `${remainSec}秒` : `${remainMin}分钟${remainSec}秒` : `${hours}小时${remainMin}分钟${remainSec}秒`
    return timeString
}

//判断文本中是否含有索引文本
export const haveText = (regex:RegExp,text:string)=> {
    if(text.search(regex) === -1) {
        return false
    }else {
        return true
    }
}

//判断消息是否来自同一个群并且进行防抖节流

interface guildObj {
    time : number;
    guildId : string;
}


//判断群是否存在
export class SameGuildThrottle {
    guildArr:Array<guildObj> = []

    isSameGuild(guildId:string,delay:number,fn1:any,fn2?:any){
        //如果这个数组为空

        //获取现在的时间
        const now:number = new Date().getTime();
        if(this.guildArr.length > 0){
            //如果这个群已经存在
            const obj = this.guildArr.find((item:guildObj)=>item.guildId === guildId);
            if(obj){
                //判断消息时间是否超过间隔时间
                if(now-obj.time > delay){
                    fn1();
                    obj.time = now
                }else {
                    if(!fn2){
                        return;
                    }else {
                        fn2(sendTime(delay - (now-obj.time)));
                    }
                }

            }else {
                this.guildArr.push({
                    guildId,
                    time : now
                })
                fn1();
            }
        }else {
            this.guildArr.push({
                guildId,
                time : now
            })
            fn1();
        }
    }
    
    
}




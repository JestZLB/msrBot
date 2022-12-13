import { Context, Selection, Session } from 'koishi'
import {
  ameTextArr,
  xiaxiaTextArr,
  msrTextArr,
  myTextArr,
  helpTextArr
} from './state'
import {
  isInArr,
  isSameGuild,
  throttle,
  haveText,
  SameGuildThrottle
} from '../method/method'

import {
  getAme,
  getXiaXia,
  getMsrImg,
  getMyImg,
  getHelpImg
} from './getImage'

import {
  sendNight,
  sendMorning
} from './getTime'

const isSameGuildFn = isSameGuild();
const throttleFn = throttle();

const ameSameGuildThrottle = new SameGuildThrottle();
const xiaxiaSameGuildThrottle = new SameGuildThrottle();
const msrSameGuildThrottle = new SameGuildThrottle();
const mySameGuildThrottle = new SameGuildThrottle();
const nightSameGuildThrottle = new SameGuildThrottle();
const morningSameGuildThrottle = new SameGuildThrottle();
const helpSameGuildThrottle = new SameGuildThrottle();

//根据文本选择方法
const witchFn = (text:string,session:Session)=>{
      switch (true) {
      case isInArr(ameTextArr,text):
        ameSameGuildThrottle.isSameGuild(session.guildId || '0',5000,async()=>await getAme(session),(value:string)=>session.send(`<at id="${session.userId}"/>音宝图片还有${value}哦`));
      break;
      
      case isInArr(xiaxiaTextArr,text):
        xiaxiaSameGuildThrottle.isSameGuild(session.guildId || '0',60000,async()=>await getXiaXia(session),(value:string)=>session.send(`<at id="${session.userId}"/>虾餐准备完成还有${value}哦`));
      break;

      case isInArr(msrTextArr,text):
        msrSameGuildThrottle.isSameGuild(session.guildId || '0',5000,async()=>await getMsrImg(session),(value:string)=>session.send(`<at id="${session.userId}"/>msr图片还有${value}哦`));
      break;

      case isInArr(myTextArr,text):
        mySameGuildThrottle.isSameGuild(session.guildId || '0',5000,async ()=>await getMyImg(session));
      break;

      case haveText(/晚安/g,text):
        nightSameGuildThrottle.isSameGuild(session.guildId || '0',5000,async()=>await sendNight(session));
      break;

      case haveText(/早安/g,text):
        morningSameGuildThrottle.isSameGuild(session.guildId || '0',5000,async()=>await sendMorning(session))
      break;

      case isInArr(helpTextArr,text):
        helpSameGuildThrottle.isSameGuild(session.guildId || '0',5000,async()=>await getHelpImg(session))
      break

      default:
      return;
      }
}

export const apply = (ctx: Context) => {
  ctx.on('message', async (session) => {
    //判断否为群消息
    if (!session.guildId) {
      if (isInArr(ameTextArr, session.content)) {
      } else {
        return
      }
    }else {
       witchFn(session.content,session)
    }
  })
}
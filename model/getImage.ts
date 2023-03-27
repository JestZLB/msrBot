import { Context,h, Session } from 'koishi'
import fs from 'fs'
import { Random } from 'koishi'
const pathName = './static/image/ame'
const pathName2 = './static/image/msr'
const pathName3 = './static/image/my'
const pathName4 = './static/image/xiaxia'
import { radom } from '../method/method'

export const getAme = (session:Session) => {
    try {
        const files = fs.readdirSync(pathName);
        const file = (`file:///D:/NodePj/msrBot/new_msr/static/image/ame/${files[radom(0,files.length-1)]}`)
        return session.send(
        `
        <>
        <at id="${session.userId}"/>
        <image url="${file}"/>
        </>
        `
        )
    } catch (error) {
        console.log(error,'getAme')
    }
}

export const getXiaXia = (session:Session) => {
    try {
        const files = fs.readdirSync(pathName4);
        const file = (`file:///D:/NodePj/msrBot/new_msr/static/image/xiaxia/${files[radom(0,files.length-1)]}`)
        return session.send(
        `
        <>
        <at id="${session.userId}"/>
        <image url="${file}"/>
        恰虾有益身体健康
        </>
        `
        )
    } catch (error) {
        console.log(error,'getXiaXia')
    }
}

export const getMyImg = (session:Session) => {
    try {
        const files = fs.readdirSync(pathName3);
        const file = (`file:///D:/NodePj/msrBot/new_msr/static/image/my/${files[radom(0,files.length-1)]}`)
        return session.send(
        `
        <>
        <image url="${file}"/>
        </>
        `
        )
    } catch (error) {
        console.log(error,'getMyImg');
    }
}

export const getMsrImg = (session:Session) => {
    try {
        const files = fs.readdirSync(pathName2);
        const file = (`file:///D:/NodePj/msrBot/new_msr/static/image/msr/${files[radom(0,files.length-1)]}`)
        return session.send(
        `
        <>
        <at id="${session.userId}"/>
        <image url="${file}"/>
        </>
        `
        )
    } catch (error) {
        console.log(error,'getMsrImg');
    }
}

export const getHelpImg = (session:Session) => {
    return session.send(`
        <>
        <at id="${session.userId}"/>
        这是茨菇的使用说明图⬇
        <image url="https://i0.hdslb.com/bfs/article/6dba97bb2c928384f5f3a3e263644dde1aa0c63a.png"/>
        详情请见：
        https://www.bilibili.com/read/cv18082802
        </>
    `)
}


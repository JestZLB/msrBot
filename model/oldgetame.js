const {App,Context} = require('koishi')
const onebot = require('@koishijs/plugin-adapter-onebot').default
const fs = require('fs');
const pathName = './static/image/ame'
const pathName2 = './static/image/msr'
const pathName3 = './static/image/my'
const pathName4 = './static/image/xiaxia'
const path = require('path')
const {
    radom,
} = require('../method/method')
// const pathName = require('../static/image')
const arr = [];



const sendameimg = ()=>{
        try {
            const files = fs.readdirSync(pathName);
            const file = (`file:///D:/NodePj/msrBot/node/static/image/ame/${files[radom(0,files.length-1)]}`)
            return file;
        } catch (error) {
            return "出现错误请报告给黄帽子"
        }
}

const sendXiaXia = ()=>{
    try {
        const files = fs.readdirSync(pathName4);
        const file = (`file:///D:/NodePj/msrBot/node/static/image/xiaxia/${files[radom(0,files.length-1)]}`)
        return file;
    } catch (error) {
        return "出现错误请报告给黄帽子"
    }
}

const sendMyImg = ()=>{
    try {
        const files = fs.readdirSync(pathName3);
        const file = (`file:///D:/NodePj/msrBot/node/static/image/my/${files[radom(0,files.length-1)]}`)
        return file;
    } catch (error) {
        return "出现错误请报告给黄帽子"
    }
}

const sendmsrimg = ()=>{
    try {
        const files = fs.readdirSync(pathName2);
        const file = (`file:///D:/NodePj/msrBot/node/static/image/msr/${files[radom(0,files.length-1)]}`)
        return file;
    } catch(error) {
        return "出现错误报告给黄帽子"
    }
}


const getame = {
    sendameimg,
    sendmsrimg,
    sendMyImg,
    sendXiaXia
}

module.exports = getame
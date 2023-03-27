import { Context,Session } from "koishi";
import { ServiceHTTP } from "../service/service";
const serviceHttp = new ServiceHTTP();

interface gaoderes {
    status : string,
    info : string,
    infocode: string,
    lives : Array<{
        province: string,
        city: string,
        adcode: string,
        weather: string,
        temperature: string,
        winddirection: string,
        windpower: string,
        humidity: string,
        reporttime: string
    }>
}

export const getWeather = async(session:Session)=>{
    const key='59b11e04a7a7d6525b00c094fd43755d'//填入你的高德地图天气KEY
    const textArr = session.content.split(' ')
    if(textArr.length>1){
        const city = textArr[1]
        const res:gaoderes = await serviceHttp.getWeather({
            key,
            city
        })
        if(res && res.status == '1'){
            if(res.lives.length > 0) {
                const obj = res.lives[0];
                return session.send(
                    `
                    <>
                    <p>贵安，<at id="${session.userId}"/>さん</p>
                    <p>${obj.city}现在是${obj.weather}天，空气湿度${obj.humidity}%</p>
                    <p>气温是${obj.temperature}℃，${
                    Number(obj.temperature) <= 15 ? 
                    '天气好冷啊注意保暖' 
                    : 
                    Number(obj.temperature) > 15 && Number(obj.temperature) <= 24 ? 
                    '天气凉爽但小心不要感冒哦' : 
                    Number(obj.temperature) > 24 ? 
                    '天气热起来了，要小心中暑哦': 
                    null}
                    </p>
                    <p>现在刮${obj.winddirection}风，风力${obj.windpower}级</p>
                    </>
                    `
                )
            }else {
                return session.send(
                    `
                    <>
                    <at id="${session.userId}"/>ごめん，这个高德的api只支持国内的城市
                    </>
                    `
                )
            }

        }else {
            return session.send(
                `
                <>
                <at id="${session.userId}"/>ごめん，天气接口请求错误 
                </>
                `
            )
        }
    }else {
        return session.send(
            `
            <>
            <at id="${session.userId}"/>ごめん，请输入正确的格式查询天气+空格+查询天气城市 如：查询天气 上海
            </>
            `
        )
    }
}
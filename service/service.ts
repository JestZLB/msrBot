import {Context} from 'koishi'
import {
    weather,
} from './service_d'

export class ServiceHTTP extends Context{
    
    getWeather (payload:weather){
        return this.http('GET',`https://restapi.amap.com/v3/weather/weatherInfo?parameters&key=${payload.key}&city=${payload.city}`)
    }
}

export class CarCard extends Context {
       
    
}



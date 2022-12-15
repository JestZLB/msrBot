import { Context } from 'koishi'
import onebot from '@koishijs/plugin-adapter-onebot'
import * as echo from '@koishijs/plugin-echo'
import {apply} from "./model/ping"
import {ServiceHTTP} from './service/service'
const ctx = new Context({
    port: 5140,
})

// 启用上述插件
ctx.plugin('console')
ctx.plugin('sandbox')
ctx.plugin(echo)
ctx.plugin(onebot,{
    protocol: 'ws',
    selfId: '3412359156',
    endpoint: 'ws://127.0.0.1:6700',
})
ctx.plugin(apply);


// 启动应用
ctx.start()
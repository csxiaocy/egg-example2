/*
* 为每个请求分配一个唯一的 uuid
* create by candychuang on 2019/1/19
*/
const uuidv4 = require('uuid/v4')

module.exports = options => {
    return async function uuid(ctx, next) {
        // 设置uuid
        ctx.tracer = { traceId: uuidv4() }
        await next()
    }
}

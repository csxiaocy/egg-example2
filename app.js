const path = require('path')
module.exports = app => {
    // 插入中间件
    app.config.coreMiddleware.splice(0, 0, 'uuid', 'request', 'response', 'errCatch')

    // 未捕获的promise错误
    process.on('unhandledRejection', reason => {
        app.logger.error(reason)
    })

    // 加载错误码文件
    const errCode = require(path.join(app.config.baseDir, 'config/errCode.js'))
    if (errCode) {
        for (let index in errCode) {
            if (Object.prototype.hasOwnProperty.call(errCode, index)) {
                errCode[index] = new Proxy(errCode[index], {
                    get: function (target, prop, receiver) {
                        return (target.code || '0000') + (Reflect.get(...arguments) || '00')
                    }
                })
            }
        }
        app.errCode = errCode
    } else {
        app.logger.warn('can not find errCode file')
    }
}

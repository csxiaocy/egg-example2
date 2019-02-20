// app/extend/helper.js
const crypto = require('crypto')

module.exports = {
    /**
     * 创建一个带有错误码的Error对象
     * @param msg 错误信息
     * @param code 错误码，默认为 errCode.APP_ERROR_CODE
     * @param arg_props 其他混入到Error对象的属性
     * @returns {Error}
     */
    createError(msg, code, arg_props) {
        let props = arg_props
        const err = msg instanceof Error ? msg : new Error(msg)
        if (code) {
            err.code = this.config.errCode.APP_ERROR_CODE + code
        } else {
            err.code = this.config.errCode.APP_ERROR_CODE + (this.config.errCode.NOT_REGISTER_ERROR || '000000')
            this.ctx.logger.warn(`当前错误码未登记，错误信息: ${err.message}`)
        }

        if (props) {
            for (let key in props) {
                if (props.hasOwnProperty(key)) {
                    err[key] = props[key]
                }
            }
        }
        return err
    },

    /**
     * 带有 key 的md5加密，单向加密
     * @param data 要加密的数据
     * @param key  秘钥
     * @returns {string}
     */
    md5withKey(data, key) {
        const hash = crypto.createHash('md5')
        hash.update(data)
        hash.update(key)
        return hash.digest('hex')
    },

    /**
     * 加密函数
     * @param type  加密类型，默认为 aes-256-cbc
     * @param data  要加密的数据
     * @param key   aes-256-cbc时为 32位
     * @param iv    aes-256-cbc时为 16位
     * @param inputEncoding    输入编码，默认为utf8
     * @param outputEncoding    输出编码，默认为hex
     * @returns {string}
     */
    aesEncrypt({ type = 'aes-256-cbc', data, key, iv, inputEncoding = 'utf8', outputEncoding = 'hex' }) {
        const cipher = crypto.createCipheriv(type, key, iv)
        let crypted = cipher.update(data, inputEncoding, outputEncoding)
        crypted += cipher.final(outputEncoding)
        return crypted
    },

    /**
     * 解密函数
     * @param type  解密类型，默认为 aes-256-cbc
     * @param data  要解密的数据
     * @param key   aes-256-cbc时为 32位
     * @param iv    aes-256-cbc时为 16位
     * @param inputEncoding    输入编码，默认为hex
     * @param outputEncoding    输出编码，默认为utf8
     * @returns {string}
     */
    aesDecrypt({ type = 'aes-256-cbc', data, key, iv, inputEncoding = 'hex', outputEncoding = 'utf8' }) {
        const decipher = crypto.createDecipheriv(type, key, iv)
        let decrypted = decipher.update(data, inputEncoding, outputEncoding)
        decrypted += decipher.final(outputEncoding)
        return decrypted
    },

    /**
     * 日期格式化函数
     * @param date js Date对象，默认为当前时间
     * @param fmt   格式化的格式，默认为 yyyy-MM-dd HH:mm:ss
     * @returns {string}
     */
    dateFormat(date = new Date(), fmt = 'yyyy-MM-dd hh:mm:ss') { // author: meizz
        let o = {
            'M+': date.getMonth() + 1, // 月份
            'd+': date.getDate(), // 日
            'h+': date.getHours(), // 小时
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds(), // 秒
            'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
            'S': date.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (String(date.getFullYear())).substr(4 - RegExp.$1.length))   // eslint-disable-line
        for (let k in o) if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr((String(o[k])).length))) // eslint-disable-line
        return fmt
    }
}

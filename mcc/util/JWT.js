const { json } = require("body-parser")
const jwt = require("jsonwebtoken")
const secret = 'vip-system'
const JWT = {
    // 生成token
    generate(value, expires) {
        return jwt.sign(value, secret, { expiresIn: expires })
    },
    // 解析token
    verify(token) {
        try {
            return jwt.verify(token, secret)
        } catch (error) {
            return false
        }
    }

}
module.exports = JWT
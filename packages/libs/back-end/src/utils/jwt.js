
import jwt from "jsonwebtoken"
const salt = 'zhaowajiaoyu'

export const signature = (user) => {
  return jwt.sign(user, salt, {
        // 过期时间
        expiresIn: 1000
    })
}

const verify = async (token) => {
    return new Promise((resolve, reject) => {
        if (token) {
            jwt.verify(token, salt, (err, data) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        resolve({
                            status: false,
                            error: 'token 已过期'
                        })
                    } else {
                        resolve({
                            status: false,
                            error: 'token 认证失败'
                        })
                    }
                }else{
                    resolve({
                        status:true
                    })
                }
            })
        } else {
            resolve({
                status: false,
                error: 'token 不能为空'
            })
        }
    })
}

export const jwtVerify = async (ctx, next) => {
    // 若是登录路径 那么 就不判断
    if (ctx.path !== '/user/login') {
        // 应用才鉴权
        let token;
        try {
            token = ctx.request.headers.authorization.split("Bearer ")[1]
        } catch (err) {

        }
        // 去验证这个token
        const res = await verify(token)
        if (res.status) {
            // 验证成功
            next(ctx)
        } else {
            ctx.body = {
                ...res,
                status: 401
            }
        }
    } else {
        //若 我是登录，则无需判断 
        next(ctx)
    }
}
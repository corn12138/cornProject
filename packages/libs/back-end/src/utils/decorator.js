export const RequestMethod = {
    GET: 'get',
    POST: 'post',
    DELETE: 'delete'
}

export const controllers = [];

// 装饰器的行为，是在运行之前的，编译期。
export function Controller(prefix = "") {
    return function (target) {
        // 给这个类加一个路由前缀
        target.prefix = prefix

    }
}
export function RequestMapping(method = '', url = '') {
    return function (target, name, descriptor) {
        let path = url || `/${name}`;
        const item = {
            url: path,
            method,
            handler: target[name],
            constructor: target.constructor,
        }
        controllers.push(item)
    }
}
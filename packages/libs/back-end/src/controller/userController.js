import {
    RequestMapping,
    RequestMethod,
    Controller
} from "../utils/decorator";
import {
    signature
} from "../utils/jwt";

// 希望访问 locahost:3008/user ，执行getAlluser方法

@Controller('/user')
export default class UserController {

    @RequestMapping(RequestMethod.GET, '/all')
    async getAlluser(ctx) {
        ctx.body = 'all user'
    }
    @RequestMapping(RequestMethod.POST, '/login')
    async loginUser(ctx) {
        const {
            body
        } = ctx.request;
        // console.log(body,'body')
        const {
            username,
            password
        } = body;
        if (username === 'hym' && password === '123456') {
            const token = signature({
                username
            });
            // console.log(token,'token')
            ctx.body = {
                code: 200,
                msg: '登陆成功',
                data: {
                    token
                }
            }
        } else {
            ctx.body = {
                code: 200,
                msg: '账号或者密码错误',
                data: void 0
            }
        }

    }
}
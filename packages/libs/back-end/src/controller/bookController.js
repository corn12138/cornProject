import { RequestMapping,RequestMethod,Controller } from "../utils/decorator";

// 希望访问 locahost:3006/user ，执行getAlluser方法

@Controller('/book')
export default class UserController{

    @RequestMapping(RequestMethod.GET,'/all')
    async getAlluser(ctx){
        ctx.body ={data:'all book'}
    }
}
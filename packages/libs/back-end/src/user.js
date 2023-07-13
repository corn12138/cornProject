import Router from "koa-router";

const router = new Router()

router.get('/user',async(ctx,next)=>{
    ctx.body='User';
})
//收集的过程，method-Map 

export default router;
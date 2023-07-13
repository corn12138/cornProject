import Koa from 'koa'

import Router from 'koa-router'
import bodyParser from 'koa-bodyparser';
import {jwtVerify} from './utils/jwt'

import Routers from './controller/index';
import {
    controllers
} from './utils/decorator';

// console.log('controllers', controllers)

const app = new Koa()
const router = new Router();

app.use(bodyParser());
app.use(jwtVerify)

controllers.forEach(item => {
    let {
        url,
        constructor,
        method,
        handler
    } = item;
    const {
        prefix
    } = constructor;
    if (prefix) url = `${prefix}${url}`;
    router[method](url, handler)
})
app.use(router.routes())
app.listen(3008);
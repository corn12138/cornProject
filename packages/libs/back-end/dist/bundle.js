(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('core-js/modules/esnext.async-iterator.for-each.js'), require('core-js/modules/esnext.iterator.constructor.js'), require('core-js/modules/esnext.iterator.for-each.js'), require('koa'), require('koa-router'), require('koa-bodyparser'), require('jsonwebtoken'), require('core-js/modules/esnext.async-iterator.reduce.js'), require('core-js/modules/esnext.iterator.reduce.js'), require('core-js/modules/es.array.push.js')) :
  typeof define === 'function' && define.amd ? define(['core-js/modules/esnext.async-iterator.for-each.js', 'core-js/modules/esnext.iterator.constructor.js', 'core-js/modules/esnext.iterator.for-each.js', 'koa', 'koa-router', 'koa-bodyparser', 'jsonwebtoken', 'core-js/modules/esnext.async-iterator.reduce.js', 'core-js/modules/esnext.iterator.reduce.js', 'core-js/modules/es.array.push.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(null, null, null, global.Koa, global.Router, global.bodyParser, global.jwt));
})(this, (function (esnext_asyncIterator_forEach_js, esnext_iterator_constructor_js, esnext_iterator_forEach_js, Koa, Router, bodyParser, jwt) { 'use strict';

  const salt = 'zhaowajiaoyu';
  const signature = user => {
    return jwt.sign(user, salt, {
      // 过期时间
      expiresIn: 1000
    });
  };
  const verify = async token => {
    return new Promise((resolve, reject) => {
      if (token) {
        jwt.verify(token, salt, (err, data) => {
          if (err) {
            if (err.name === 'TokenExpiredError') {
              resolve({
                status: false,
                error: 'token 已过期'
              });
            } else {
              resolve({
                status: false,
                error: 'token 认证失败'
              });
            }
          } else {
            resolve({
              status: true
            });
          }
        });
      } else {
        resolve({
          status: false,
          error: 'token 不能为空'
        });
      }
    });
  };
  const jwtVerify = async (ctx, next) => {
    // 若是登录路径 那么 就不判断
    if (ctx.path !== '/user/login') {
      // 应用才鉴权
      let token;
      try {
        token = ctx.request.headers.authorization.split("Bearer ")[1];
      } catch (err) {}
      // 去验证这个token
      const res = await verify(token);
      if (res.status) {
        // 验证成功
        next(ctx);
      } else {
        ctx.body = {
          ...res,
          status: 401
        };
      }
    } else {
      //若 我是登录，则无需判断 
      next(ctx);
    }
  };

  const RequestMethod = {
    GET: 'get',
    POST: 'post',
    DELETE: 'delete'
  };
  const controllers = [];

  // 装饰器的行为，是在运行之前的，编译期。
  function Controller(prefix = "") {
    return function (target) {
      // 给这个类加一个路由前缀
      target.prefix = prefix;
    };
  }
  function RequestMapping(method = '', url = '') {
    return function (target, name, descriptor) {
      let path = url || `/${name}`;
      const item = {
        url: path,
        method,
        handler: target[name],
        constructor: target.constructor
      };
      controllers.push(item);
    };
  }

  var _dec$1, _dec2$1, _class$1, _class2$1;
  function _applyDecoratedDescriptor$1(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  // 希望访问 locahost:3006/user ，执行getAlluser方法
  let UserController$1 = (_dec$1 = Controller('/book'), _dec2$1 = RequestMapping(RequestMethod.GET, '/all'), _dec$1(_class$1 = (_class2$1 = class UserController {
    async getAlluser(ctx) {
      ctx.body = {
        data: 'all book'
      };
    }
  }, (_applyDecoratedDescriptor$1(_class2$1.prototype, "getAlluser", [_dec2$1], Object.getOwnPropertyDescriptor(_class2$1.prototype, "getAlluser"), _class2$1.prototype)), _class2$1)) || _class$1);

  var _dec, _dec2, _dec3, _class, _class2;
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  // 希望访问 locahost:3008/user ，执行getAlluser方法
  let UserController = (_dec = Controller('/user'), _dec2 = RequestMapping(RequestMethod.GET, '/all'), _dec3 = RequestMapping(RequestMethod.POST, '/login'), _dec(_class = (_class2 = class UserController {
    async getAlluser(ctx) {
      ctx.body = 'all user';
    }
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
        };
      } else {
        ctx.body = {
          code: 200,
          msg: '账号或者密码错误',
          data: void 0
        };
      }
    }
  }, (_applyDecoratedDescriptor(_class2.prototype, "getAlluser", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "getAlluser"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loginUser", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "loginUser"), _class2.prototype)), _class2)) || _class);

  var index = {
    Book: UserController$1,
    User: UserController
  };

  // console.log('controllers', controllers)

  const app = new Koa();
  const router = new Router();
  app.use(bodyParser());
  app.use(jwtVerify);
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
    router[method](url, handler);
  });
  app.use(router.routes());
  app.listen(3008);

}));

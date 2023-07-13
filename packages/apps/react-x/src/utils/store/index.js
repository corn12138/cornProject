

/**
 * 1. 可以选择，我是不是要存储本地；
 * 2. 如果要存，我可以选择 localStorage 还是 sessionStorage
 * 3. 我们针对这两种情况，都是可以降级
 */

const CreateStore = function(unLocal = false, maxLength = 30, expireTime = 10000000) {
    this.unLocal = unLocal;
    this.maxLength = maxLength;
    this.observe();
}

CreateStore.prototype.setItem = function(type, data) {
    if(!window) throw new Error('browser runtime need');
    const dataJson = JSON.stringify(data);
    window[this.storageMethod].setItem(type, dataJson);
};
CreateStore.prototype.getItem = function(type) {
    if(!window) throw new Error('browser runtime need');
    const data = window[this.storageMethod].getItem(type);
    let dataJson;
    try {
        dataJson = JSON.parse(data)
    } catch(err) {
        throw new Error(err);
    }
    return dataJson;
};

CreateStore.prototype.observe = function() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    this.__mock__storage = new Proxy(
        {}, 
        {
            get(target, propKey, receiver) {
                let result;
                if(!context.unLocal) {
                    // 如果你选择了，用本地存储的方式，我直接给你 getItem 
                    result = (context.getItem && context.getItem(propKey)) || void 0;
                }
                return result || Reflect.get(target, propKey, receiver);
            },
            set(target, propKey, value, receiver) {
                // 你如果往数组里面放东西
                let _value = value;
                if(value instanceof Array && value.length > context.maxLength) {
                    _value = value.slice(0, context.maxLength);
                }
                // 如果说，你的 unlocal = false, 意味着，我们要在一个合适的时间，进行本地存储
                if(!context.unLocal) {
                    new Promise((resolve) => { resolve(-1) }).then(() => {
                        // 给后端发请求。
                        context.setItem && context.setItem(propKey, _value);
                    })
                }

                return Reflect.set(target, propKey, value, receiver)
            }
        }
    )
}

CreateStore.prototype.set = function(type, data) {
    // __mock__storage 是一个代理
    this.__mock__storage[`${this.storeKey}__${type}`] = data;
}

CreateStore.prototype.get = function(type, data) {
    // __mock__storage 是一个代理
    return this.__mock__storage[`${this.storeKey}__${type}`] 
};


['pop', 'push', 'unshift', 'shift', 'reverse', 'splice'].forEach((method) => {
    CreateStore.prototype[method] = function(type, ...rest) {
        // 如果你type没有值，你要用数组方法，那我给你做一个空数组的存储
        if(!this.get(type)) {
            this.set(type, [])
        }

        // 如果你type有值，但你不是数组，拜拜！~
        if(!(this.get(type) instanceof Array)) {
            throw new Error('this data using array methods must be an array!')
        }

        // 是数组
        const dataList = this.get(type);
        Array.prototype[method].apply(dataList, rest);
        this.set(type, dataList)
    }
})

const CreateLocalStore = function(key, ...rest) {
    // 构造函数继承
    CreateStore.apply(this, rest);
    // 我是不是还要有一个关键词，window.localStorage
    this.storageMethod = 'localStorage';
    this.storeKey = `LOCAL_KEY_${key}`
}

CreateLocalStore.prototype = Object.create(CreateStore.prototype);
CreateLocalStore.prototype.constructor = CreateLocalStore;

const CreateSessionStore = function(key, ...rest) {
    // 构造函数继承
    CreateStore.apply(this, rest);
    // 我是不是还要有一个关键词，window.localStorage
    this.storageMethod = 'sessionStorage';
    this.storeKey = `LOCAL_KEY_${key}`
}

CreateSessionStore.prototype = Object.create(CreateStore.prototype);
CreateSessionStore.prototype.constructor = CreateSessionStore;


export const localStore = new CreateLocalStore('demo', false);
export const sessionStore = new CreateSessionStore('demo', true);



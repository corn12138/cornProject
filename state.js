//  solid.js 框架。

const obs = [];

const createState = (value) => {
    const subscribers = new Set();
    const getter = () => {
        const curOb = obs[obs.length -1];
        if(curOb) {
            subscribers.add(curOb);
        }
        return value;
    };

    const setter = (newValue) => {
        value = newValue;
        subscribers.forEach(s => s())
    };
    return [getter, setter];
};

const createEffect = (effect) => {
    const execute = () => {
        obs.push(execute);
        effect();
        obs.pop();
    }
    execute();
}

// useState , useEffect. babel 中文的, warning, 
const [name, setName] = createState('luyi');

createEffect(()=>{
    console.log('name:', name());
});

setName('yunyin');
setName('yunyin2');

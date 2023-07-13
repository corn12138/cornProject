const {
    resolve
} = require('core-js/stable/promise'); //这是 core.js 3.x版本 2.x版本的是core-js/fn/promise
const {
    options
} = require('less');
var postcss = require('postcss');
const defaults = {
    functionName: 'luyi',
    groups: {},
    colors: {},
    useCustomProperties: false,
    darkThemeSelector: 'html[data-theme="dark"]',
    nestingPlugin: null,
}

const resolveColor = (options, theme, group, defaultValue) => {
    const [lightColor, darkColor] = options.groups[group] || [];
    const color = theme === 'dark' ? darkColor : lightColor;
    if (!color) {
        return defaultValue
    }

    return options.colors[color] || defaultValue
}

module.exports = postcss.plugin('postcss-theme-colors', (options) => {
    // 合并参数
    options = Object.assign({}, defaults, options)
    // 获取 luyi的 默认色值
    const reGroup = new RegExp(`\\b${options.functionName}\\(([^)]+)\\)`, 'g');
    return (style, result) => {

        const hasPlugin = name => name.replace(/^postcss-/, '') === options.nestingPlugin || result.processor.plugins.some(p => p.postcssPlugin === name);

        const getValue = (value, theme) => {
            return value.replace(reGroup, (match, group) => {
                return resolveColor(options, theme, group, match)
            })
        }

        style.walkDecls(decl => {
            const value = decl.value;
            if (!value || !reGroup.test(value)) {
                // 没有色值，或者没有匹配到
                return;
            }
            // 获取 tailwind的 luyi（cw） 以及 light 
            const lightValue = getValue(value, 'light');
            const darkValue = getValue(value, 'dark');
            // 复制一份 dark的decl的节点
            const darkDecl = decl.clone({
                value: darkValue
            })
            let darkRule
            // 使用插件，生成 dark的样式
            if (hasPlugin('postcss-nesting')) {
                darkRule = postcss.atRule({
                    name: 'nest',
                    params: `${options.darkThemeSelector} &`
                })
            } else if (hasPlugin('postcss-nested')) {
                darkRule = postcss.atRule({
                    name: 'nest',
                    params: `${options.darkThemeSelector} &`
                })
            } else {
                decl.warn(result, 'not plugin nest find')
            }

            if (darkRule) {
                darkRule.append(darkDecl);
                decl.after(darkRule);
            }
            // 浅色
            const lightDecl = decl.clone({
                value: lightValue
            })
            decl.replaceWith(lightDecl)
        })
    }
})
// 这是一个自定义的babel插件的编写。

const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const template = require('@babel/template').default;

// 定义一个数组，去取console的位置
const targetList = ['log', 'info', 'error'].map(item => `console.${item}`)

const consolePlugin = function ({
    types
}) {
    return {
        visitor: {
            CallExpression(path) {
                const name = generator(path.node.callee).code;
                if (targetList.includes(name)) {
                    const {
                        line,
                        column
                    } = path.node.loc.start;
                    path.node.arguments.unshift(types.stringLiteral(`filePath:${line}，${column}`))
                }
            }
        }
    }
}

module.exports = consolePlugin;
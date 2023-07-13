# 20:00 开始，有问题先问。
- 8 节课

2节。4节。

# Q&A
- flex-1
- flex order
- flex 左边占满，右边固定

## 35岁，你还在一线，是一个普通的编码人员。
- 10余年的工作，潜力和能力是不够的；
- 小组长、资深架构师。
  - 技术管理
  - 架构
  - 产品

## 技术经理
- 资源协调，
- 业务能力，
- 带人

## 如何转为技术管理
- 上升的事情。
- 先卷自己，再卷别人。
- 10个人，你带9个人干活 > 10个人一起干活。

   

# 第一讲，仓库构建

- A工程
- B工程
- C工程

- M工程
- N工程

假如，我们是一个 multirepo 的工程。
- 子git仓库
- M工程，发布，打包，提交，A工程反过来下载。

10个前端。

## 为什么要构建 monorepo， monorepo 是什么？

### monorepo 的含义

Monorepo 最早的出处是软件开发策略的一个分支，”mono” 表示单一 “repo” 是”repository”的缩写，意为多个项目共用一个代码库来管理依赖关系，同一套配置文件，统一构建部署流程等等。

- 如果各个项目之间没有明确定义的关系，仅仅是物理上是一个 git；
- 需要具备明确的关系，但是也需要良好的组织方式。

### 多仓的缺点在哪里


### mono 做了什么？

1. 更好的代码复用，可以让所有项目代码集中于单一仓库，易于抽离出共用的业务组件或工具。
2. 整体的构建、测试逻辑统一，方便协作。

## mono 构建有哪些方法？

### lerna
- 更倾向于去做一些版本的管理。
- 缺少库与库之间的软链。


### yarn / pnpm / npm 
- 会给你做link；
- 但是没有严格的包管理。

### 这两者之间不同点是？



## 使用 pnpm 构建 mono

### 主要步骤

1. 添加 yaml 文件

```yml
packages:
  - "packages/**"
```

2. 创建项目文件和第三方库文件夹

一般情况下：
- apps: web 项目
- components: 组件库
- libs: 工具

进行测试：

3. 共建软链接

`pnpm add @proj/react-components --filter @proj/react-x`

如果说自己构建
@proj/react-components: `pnpm link`
@proj/react-x: `pnpm link @proj/react-components`

### 安装测试环境
```sh
pnpm add eslint -D -w
npx eslint --init

# 由于命令行自动化，不给我们加 w
pnpm add @typescript-eslint/eslint-plugin @typescript-eslint/parser -D -w
pnpm add eslint-plugin-react -D -w

```


#### 安装 eslint 与 配置
- eslint 和 prettier 如何配置
  - eslint 一般多用来做代码的检测（逻辑、功能）
  - prettier 一般用来做代码的美化


### 安装 typescript 配置

- tsc, ts-loader, @babel/preset-typescript 有什么区别？

#### ts-loader 
他是在内部调用了 typescript 的官方编译器 tsc ，所以 ts-loader 和 tsc 是可以公用 tsconfig.json

#### @babel/preset-typescript
只会给你做编译，不做类型检查
所以，我们要自己做类型检查，就要用到 tsc 的配置了。


#### 结论
- 没有 babel，首选 tsc + ts-loader 
- 有 babel, @babel/preset-typescript + tsc 做类型检查

### 如何配置 react 环境？
```sh
pnpm add webpack webpack-cli webpack-merge webpack-dev-server @babel/core @babel/preset-react @babel/preset-typescript babel-loader css-loader less style-loader less-loader postcss postcss-loader tailwindcss autoprefixer html-webpack-plugin cross-env -D --filter @proj/react-x
```
多个条件，多项选择。

# 有问题先问，20:00开始。

# 什么是亮点？
## 学术性
- 现在，行业的解决方案就是A，你创造了一个 A+；
- svelte, solid.
- SCI 

## 稀缺性
- 你用了一个东西，这个东西是新的，一般人不知道的。
- 小众。

## 组合性
- EI 
- 现在有一个解决方案A，但是有 m 缺点，有 p 优点
- 有另一个解决方案B，但是有 n 缺点，有 m 优点
- 你搞了一个 A+B，针对你项目的特点
  - 可以接收 n 缺点，但是不能接受 m 缺点，而且需要 p 解决问题。

- 微前端，改了一些使用方法。让一部分能力增强了，但是可能会引入新的问题。

## X 是不是亮点 ？
- 换个人想出来 X 方案，需要多少技术积累。
- 如果不需要想很久，做出来，落地，有多困难。

## rollup 
- rollup 有一些问题，js 写的，不够快， rust 写一个。
- rust: swc ？ ->
- go: esbuild ? -> 

## 优化
优化啥？
- FMP
  - 根据你的需求去优化
    - I/O 角度： 让你的 bundlesize 最小
      - minimize, terser, gzip
    - CDN,
    - DNS, 
    - webp,
    - 加key, 
- FID

# 第二讲 react 环境安装

## css 解析

### 什么是loader？
```js
import styles from './index.less';
import pkg from './mock.json';
import img from './assert/img1.png';

.xxx {

}
```
本质上，js 是不支持的，所以，我需要一些东西，来解析这些内容。
你写一段 `.xxx{}` ，浏览器是不认识的。
浏览器只认识 `<style></style>` 和 `<link>`


## 典型的 css 方案有哪些 ？

### css in js
- emotion 
  - 好处是不是更灵活了，
  - 坏处，代码更复杂了，没有提示。
- styled-component

### css module 
```js
  {
    // 定义一下，使用 xxx.module.（less|css)
    test: /.module.(less|css)$/,
    include: [path.resolve(__dirname, '../src')],
    use: [
        // 我们一般情况下，在开发环境中，我们用 'style-loader', 方便我们做热更新。
        // 生产环境下，我们要放在单独的文件里。
        !isDev ? "style-loader" : MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                importLoaders: 2,
                // 开启 css modules
                modules: {
                    localIdentName: '[path][name]__[local]--[hash:base64:4]'
                }
            }
        },
        "postcss-loader",
        "less-loader"
    ]
  },
```

### utility css
- tailwindcss

### headless with styled ， 应该怎么选？


## 如何选择合理的状态管理？
- zustand ?
- solid.js
- @reduxjs/toolkit
- redux ?
- mobx ?

状态管理的核心，就是我有一个统一的数据储存，完了修改的时候，可以触发更新。
react - vue
vue: 我在修改了数据的时候，让界面更新了。
  - document.createElement()
  - 我在什么时候，为什么能触发界面更新
  - data.x -> set -> get -> observers -> notifyAll
react: 我在setState的时候，让界面更新了。
  - render -> 对比 -> effects -> 界面更新。

- 修改一个数据
- 数据的改变，触发某些函数的执行
- 这些函数，能够调用 setState 



## 如何选择合理的组件库？


# 第三讲 组件库

## 如何构建一个组件库？
gulp 是一个很好的选择
rollup 分文件夹，一起构建。
antd 的构建：

### 组件库打包的方案有哪些？

一般情况下，我们需要“三证齐全”

#### umd
`<script src="xxxx.xxx.xxx.cdn.xxx.js"></script>`
#### cjs
`const xxx = require('xxxx')`
#### esm 
`import { Button } from '@proj/c'`

### 组件库和前端项目，到底有什么区别？

### 使用 rollup 构建组件库。






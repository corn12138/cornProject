// import babel from 'rollup-plugin-babel';
// import json from '@rollup/plugin-json';
// import resolve from '@rollup/plugin-node-resolve'
// import commonjs from '@rollup/plugin-commonjs'
// const resolve = require('@rollup/plugin-node-resolve');
const babel = require('rollup-plugin-babel')
const json = require('@rollup/plugin-json')

export default  {
    input:'./src/index.js',
    output:{
        file:'./dist/bundle.js',
        format:'umd',
        globals: {
            'koa': 'Koa',
            'koa-router': 'Router'
        },
        // format:'cjs'
    },
    treeshake:false,
    // external:['koa','koa-router', 'core-js'],
    plugins:[
        // resolve(),
        // commonjs(),
        babel({
            runtimeHelpers:true,
            // runtimeHelpers:'runtime',
            extensions:['.js','.ts'],
            exclude:'node_modules/**',
            externalHelpers:true
            // externalHelpers:'bundled'

        }),
        json()
    ]
}
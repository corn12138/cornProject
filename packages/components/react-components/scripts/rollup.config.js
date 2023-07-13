const clear = require('rollup-plugin-clear')
const autoAdd = require('')
const pkg = require('../package.json')
const banner =`/**
*`

moudule.exports=[
//     esm
    {

    },
//     umd
    {
        input:'src/index.tsx',
        output:[{
            banner,dir:'dist',format:'ump',exports:'named',
        }]
    },
]
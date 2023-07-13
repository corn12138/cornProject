const {
    colors,
    groups
} = require('./colorCard')

module.exports = {
    "plugins": [
        'autoprefixer',
        'tailwindcss',
        require('postcss-nested'),
        require('postcss-nesting'),
        require('./themePlugin')({
            colors,
            groups
        })
    ]
}
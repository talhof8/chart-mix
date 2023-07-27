const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

module.exports = {
    lintOnSave: false,
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src'))
    },
    configureWebpack: (config) => {
        if (process.env.NODE_ENV == 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
        }
        config["performance"] = {
            hints: "warning",
            maxAssetSize: 15000000,
            maxEntrypointSize: 15000000,

            assetFilter: function (assetFilename) {
                return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
            }
        }
        config["externals"] = IS_PROD ? {
            'vue': 'Vue',
            'vuex': 'Vuex',
            "element-ui": "ELEMENT",
            'echarts': 'echarts',
        } : {}
    }
}
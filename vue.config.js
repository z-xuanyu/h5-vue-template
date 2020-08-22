const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin  // 打包分析

module.exports = {
    publicPath: './', // 署应用包时的基本 URL。 vue-router hash 模式使用
    outputDir: 'dist', //  生产环境构建文件的目录
    assetsDir: 'static', //  outputDir的静态资源(js、css、img、fonts)目录
    lintOnSave: !IS_PROD,
    productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    css: {
        extract: IS_PROD, //是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
        sourceMap: false,
        loaderOptions: {
            scss: {
                // 向全局sass样式传入共享的全局变量,
                // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
                prependData: `
                    @import "assets/css/mixin.scss";
                     @import "assets/css/variables.scss";
                     `
            },
            postcss: {
                plugins: [
                    require("postcss-px-to-viewport")({
                        unitToConvert: "px", //需要转换的单位，默认为"px"
                        viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度
                        viewportHeight: 667, //视窗的高度，根据375设备的宽度来指定，一般指定667，也可以不配置
                        unitPrecision: 13, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
                        propList: ["*"], // 能转化为vw的属性列表
                        viewportUnit: "vw", // 指定需要转换成的视窗单位，建议使用vw
                        fontViewportUnit: "vw", //字体使用的视口单位
                        selectorBlackList: [".ignore-", ".hairlines"], //指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
                        minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
                        mediaQuery: false, // 允许在媒体查询中转换`px`
                        replace: true, //是否直接更换属性值，而不添加备用属性
                        // exclude: /node_modules/i, //忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
                        landscape: false, //是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
                        landscapeUnit: "vw", //横屏时使用的单位
                        landscapeWidth: 1134 //横屏时使用的视口宽度
                    })
                ]
            }
        }
    },
    chainWebpack: config => {
        config.plugins.delete('preload') // TODO: need test
        config.plugins.delete('prefetch') // TODO: need test
        // 别名路径
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('api', resolve('src/api'))
            .set('layout', resolve('src/layouts'))
            .set('views', resolve('src/views'))
            .set('components', resolve('src/components'))
        // 打包分析
        if (IS_PROD) {
            config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
                {
                    analyzerMode: 'static'
                }
            ])
        }

        config
            // https://webpack.js.org/configuration/devtool/#development
            .when(!IS_PROD, config => config.devtool('cheap-source-map'))

        config.when(IS_PROD, config => {
            config
                .plugin('ScriptExtHtmlWebpackPlugin')
                .after('html')
                .use('script-ext-html-webpack-plugin', [
                    {
                        // 将 runtime 作为内联引入不单独存在
                        inline: /runtime\..*\.js$/
                    }
                ])
                .end()
            config.optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                    // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块
                    commons: {
                        name: 'chunk-commons',
                        test: resolve('src/components'),
                        minChunks: 3, //  被至少用三次以上打包分离
                        priority: 5, // 优先级
                        reuseExistingChunk: true // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
                    },
                    node_vendors: {
                        name: 'chunk-libs',
                        chunks: 'initial', // 只打包初始时依赖的第三方
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10
                    },
                    vantUI: {
                        name: 'chunk-vantUI', // 单独将 vantUI 拆包
                        priority: 20, // 数字大权重到，满足多个 cacheGroups 的条件时候分到权重高的
                        test: /[\\/]node_modules[\\/]_?vant(.*)/
                    }
                }
            })
            config.optimization.runtimeChunk('single')
        })
    },
}
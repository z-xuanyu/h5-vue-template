const path = require('path')
const { config } = require('process')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
    publicPath: './', // 署应用包时的基本 URL。 vue-router hash 模式使用
    outputDir: 'dist', //  生产环境构建文件的目录
    assetsDir: 'static', //  outputDir的静态资源(js、css、img、fonts)目录
    productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。


    chainWebpack: config => {
        // 别名路径
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('api', resolve('src/api'))
            .set('layout', resolve('src/layouts'))
            .set('views', resolve('src/views'))
            .set('components', resolve('src/components'))
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require("postcss-px-to-viewport")({
                        unitToConvert: "px", //需要转换的单位，默认为"px"
                        viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度
                        viewportHeight: 1334, //视窗的高度，根据375设备的宽度来指定，一般指定667，也可以不配置
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
    }
}
const IS_PROD = ['production', 'prod'].includes(process.env.VUE_APP_ENV)

// 去除 console.log
let transformRemoveConsolePlugin = []
if (IS_PROD) {
  transformRemoveConsolePlugin = ['transform-remove-console']
}
module.exports = {
  presets: [
    ['@vue/cli-plugin-babel/preset', { useBuiltIns: 'usage', corejs: 3 }]
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant'],
    ...transformRemoveConsolePlugin
  ]
}

const path = require('path');
const envPage = require(`./config/${process.env.page}`);
const { pages } = require('./config/pages');

console.log(envPage);

const resolve = (dir) => path.join(__dirname, dir);
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);

module.exports = {
  publicPath: './', // 默认'/'，部署应用包时的基本 URL
  assetsDir: 'static', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  outputDir: envPage.webpackConfig.outputDir
    ? `dist/${envPage.webpackConfig.outputDir}`
    : 'dist',
  chainWebpack: (config) => {
    // 添加别名
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'));
    return config;
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/less/color.less'),
        path.resolve(__dirname, './src/assets/less/font.less'),
      ],
    },
  },
  transpileDependencies: [],
  lintOnSave: false,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require('os').cpus().length > 1,
  pwa: {},
  pages,
  devServer: {
    open: false, // 是否打开浏览器
    host: '0.0.0.0',
    port: '8080', // 代理
    https: false,
    // hotOnly: false, // 热更新
    proxy: {
      '/api': {
        target: 'http://localhost:5555', // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
};

//const autoprefixer = require('autoprefixer');
//const pxtorem = require('postcss-pxtorem');
const px2remplugin = require('postcss-plugin-px2rem');
module.exports = ({ file }) => {
  let rootValue;
  if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
    rootValue = 37.5;
  } else {
    rootValue = 75;
  }
  return {
    plugins: [
      px2remplugin({
        exclude: new RegExp('pc[a-z]+', 'ig'),
        selectorBlackList: ['norem'],
        mediaQuery: false,
        rootValue: rootValue,
        unitPrecision: 6,
        propList: ['*'],
        minPixelValue: 2,
      }),
    ],
  };
};

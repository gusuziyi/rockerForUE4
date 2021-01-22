import Vue from 'vue';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const requireComponent = require.context('../components', true, /\.vue$/);
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = capitalizeFirstLetter(
    /index.vue$/.test(fileName)
      ? fileName.replace(/^\.\//, '').replace(/\/index(.vue)$/, '')
      : fileName
          .replace(/^\.\//, '')
          .replace(/\w+\//, '')
          .replace(/(.vue)$/, '')
  );
  Vue.component(componentName, componentConfig.default || componentConfig);
});

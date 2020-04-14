import Vue from 'vue'
import App from './App.vue'
import VueSmartSlider from './plugins/VueSmartSlider'

Vue.config.productionTip = false
Vue.use(VueSmartSlider)

new Vue({ render: createElement => createElement(App) }).$mount('#app')

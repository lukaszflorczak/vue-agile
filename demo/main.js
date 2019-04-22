import Vue from 'vue'
import App from './App.vue'
import Agile from '../src'

Vue.config.productionTip = false

Vue.use(Agile)

new Vue({
	render: h => h(App)
}).$mount('#app')

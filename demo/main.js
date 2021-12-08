import { createApp } from 'vue'
import App from './App.vue'
import Agile from '../src'
import CodePen from './components/CodePen'

createApp(App)
  .use(Agile)
  .component('code-pen', CodePen)
  .mount('#app')

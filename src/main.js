import '@babel/polyfill'
import 'mutationobserver-shim'
import './plugins/bootstrap-vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './stores';
createApp(App).use(
    router,
    store
).mount('#app')

import '@babel/polyfill'
import 'mutationobserver-shim'
import './plugins/bootstrap-vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './stores';
 const app = createApp(App);
 app.use(store);
 app.use(router);
 app.mount('#app');

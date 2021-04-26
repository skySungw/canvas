import { createApp } from 'vue'
import App from './App.vue'
import  { createRouter, createWebHashHistory } from 'vue-router'
import routes from './router';
console.log("routes", routes)
import './index.css'
const VueRouter = createRouter({
  history:createWebHashHistory(),
  routes
});
const app = createApp(App);
app.use(VueRouter);
app.mount('#app');
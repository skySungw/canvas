import User from '../views/User.vue';
import Index from '../views/Index.vue';
import DefaultLayout from '../layouts/Default.vue'; // 上下结构
import LeftLayout from '../layouts/LeftLayout.vue'; // 上左右结构

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [{
      path: '/',
      name: 'home',
      component: Index
    }]
  }
];
export default routes;
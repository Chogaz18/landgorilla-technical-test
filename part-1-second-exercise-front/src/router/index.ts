import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Crud from '../views/Crud.vue';

const routes = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/crud',
    component: Crud,
    beforeEnter: (to: any, from: any, next: any) => {
      const token = localStorage.getItem('accessToken');
      if (token) next(); 
      else next('/'); 
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'hero',
      component: () => import(`@/Hero`)
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import(`@/Signin`)
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import(`@/Signup`)
    }
  ]
});

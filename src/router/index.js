import Vue from 'vue';
import Router from 'vue-router';

import { isLogged, isNotLogged } from './auth-guard';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import(`@/Hero`)
    },
    {
      path: '/signin',
      component: () => import(`@/Signin`),
      beforeEnter: isNotLogged
    },
    {
      path: '/form',
      component: () => import(`@/Signup`),
      beforeEnter: isNotLogged
    },
    {
      path: '/signout',
      component: () => import(`@/Signout`),
      beforeEnter: isLogged
    }
  ]
});

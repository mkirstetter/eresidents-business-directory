import Vue from 'vue';
import Router from 'vue-router';
import { store } from '../store/store';

import Home from '../components/pages/Home';
import Login from '../components/pages/auth/Login';
import Register from '../components/pages/auth/Register';
import ResetPassword from '../components/pages/auth/ResetPassword';
import Terms from '../components/pages/Terms';
import Privacy from '../components/pages/Privacy';
import Profile from '../components/pages/settings/Profile';
import Security from '../components/pages/settings/Security';
import Dashboard from '../components/pages/dashboard/Dashboard';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { redirectIfLogged: true },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { redirectIfLogged: true },
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { redirectIfLogged: true },
    },
    {
      path: '/terms',
      name: 'Terms',
      component: Terms,
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: Privacy,
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      component: ResetPassword,
    },
    {
      path: '/settings/profile',
      name: 'Profile',
      component: Profile,
      meta: { requiresLogin: true },
    },
    {
      path: '/settings/security',
      name: 'Security',
      component: Security,
      meta: { requiresLogin: true },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresLogin: true },
    },
  ],
  linkExactActiveClass: 'active',
  // mode: 'history',
  // eslint-disable-next-line
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogin) && !store.state.currentUser) {
    next('/login');
  } else {
    next();
  }
});

export default router;

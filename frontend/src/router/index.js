import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';

const router = createRouter({
    history: createWebHistory('/login/'), // base URL を設定
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            props: true,
            //meta: { requiresAuth: true } // 承認が必要なルート
        },
        /*{
          path: '*',
          redirect: '/login'
        }*/
        // 他のルートも追加可能
    ]
});

// ルートガードの設定
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token');
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next('/');
    } else {
        next();
    }
});

export default router;

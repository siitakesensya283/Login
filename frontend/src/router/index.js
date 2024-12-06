import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import Result from '@/views/Result.vue';
import Admin from '@/views/Admin.vue';
import Register from '@/views/Register.vue';

const router = createRouter({
    history: createWebHistory('/login/'),
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            props: true,
        },
        {
            path: '/result',
            name: 'Result',
            component: Result
        },
        {
            path: '/admin',
            name: 'Admin',
            component: Admin,
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
        }
    ]
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token');
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next('/');
    } else {
        next();
    }
});

export default router;

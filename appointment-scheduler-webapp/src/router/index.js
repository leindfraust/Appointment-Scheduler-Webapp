import {
    createRouter,
    createWebHistory
} from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Registration from '../views/Registration.vue'
import LoginAdmin from '../views/LoginAdmin.vue'
import Admin from '../components/Admin.vue'
import SignUpAdmin from '../views/SignUpAdmin.vue'

    const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/registration',
        name: 'Registration',
        component: Registration,
        meta: {
            requireProcess: true
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginAdmin,
    },
    {
        path: '/register',
        name: 'Sign Up',
        component: SignUpAdmin,
    },
    {
        path: '/admin/user/:user',
        name: 'Admin',
        component: Admin,
        meta: {
            requiresAuth: true
        },
    },
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requireProcess)) {
        if (store.state.statusAvailability) {
            return next();
        } else {
            return next('/');
        }
    }
    next();
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requiresAuth)) {
        if (store.state.alias) {
            return next();
        } else {
            return next('/login');
        }
    }
    next();
});

export default router
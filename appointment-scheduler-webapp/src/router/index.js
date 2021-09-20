import {
    createRouter,
    createWebHistory
} from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import DoctorList from '../components/DoctorList.vue'
import Registration from '../views/Registration.vue'
import LoginAdmin from '../views/LoginAdmin.vue'
import Admin from '../components/Admin.vue'
import SignUpAdmin from '../views/SignUpAdmin.vue'
import Scheduler from '../components/Scheduler.vue'
import userProfile from '../components/Profile.vue'
import DoctorPickSuccess from '../components/DoctorPickSuccess.vue'

    const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/doctors',
        name: 'DoctorList',
        component: DoctorList,
    },
    {
        path: '/success',
        name: 'pickDoctorSuccess',
        component: DoctorPickSuccess,
        meta: {
            requireSuccessPickDoctor: true
        },
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
        path: '/admin/signup',
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
    {
        path: '/admin/user/:user/schedule',
        name: 'Scheduler',
        component: Scheduler,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/admin/user/:user/profile',
        name: 'userProfile',
        component: userProfile,
        meta: {
            requiresAuth: true
        },
    }
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
            return next('/doctors');
        }
    }
    next();
}); 

router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requireSuccessPickDoctor)) {
        if (store.state.userID) {
            return next();
        } else {
            return next('/registration');
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

router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requireProcess)) {
        if (store.state.statusAvailability) {
            return next();
        } else {
            return next('/doctors');
        }
    }
    next();
}); 

export default router
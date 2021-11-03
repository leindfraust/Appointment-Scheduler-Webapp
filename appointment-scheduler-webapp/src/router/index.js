import {
    createRouter,
    createWebHistory
} from 'vue-router'
import store from '../store'
import Home from '../views/Public/Home.vue'
import DoctorList from '../views/Public/DoctorList.vue'
import RegForm from '../views/Public/RegForm.vue'
import LoginAdmin from '../views/PortalAdmin/LoginAdmin.vue'
import Admin from '../views/PortalAdmin/Admin.vue'
import SignUpAdmin from '../views/PortalAdmin/SignUpAdmin.vue'
import Scheduler from '../views/PortalAdmin/Scheduler.vue'
import AdminProfile from '../views/PortalAdmin/Profile.vue'
import DoctorPickSuccess from '../views/PortalSuccessConfirmations/DoctorPickSuccess.vue'
import ImageUploadSuccess from '../views/PortalSuccessConfirmations/ImageUploadSuccess'
import UserSignUp from '../views/Public/UserSignUp.vue'
import UserLogin from '../views/Public/UserLogin.vue'
import User from '../views/Public/User.vue'
import DoctorChat from '../views/Public/DoctorChat.vue'

    const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
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
        name: 'AdminProfile',
        component: AdminProfile,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/imgUploadSuccess',
        name :'imgUploadSuccess',
        component: ImageUploadSuccess,
        meta: {
            requireImgUploadSuccess: true
        }
    },
    {
        path: '/user/signup',
        name: 'UserSignup',
        component: UserSignUp
    },
    {
        path: '/user/login',
        name: 'UserLogin',
        component: UserLogin
    },
    {
        path: '/user/:user/',
        name: 'User',
        component: User,
        meta: {
            requiresAuthPatient: true
        }
    },
    {
        path: '/chatnow',
        name: 'DoctorChat',
        component: DoctorChat,
        meta: {
            requiresAuthUsers: true
        }
    },
    {
        path: '/user/:user/doctors',
        name: 'DoctorList',
        component: DoctorList,
         meta: {
            requiresAuthPatient: true
        } 
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
        path: '/user/:user/registration',
        name: 'RegForm',
        component: RegForm,
        meta: {
            requireProcess: true
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
            return next('/user/:user/doctors');
        }
    }
    next();
}); 

router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requireImgUploadSucess)) {
        if (store.state.imgSuccess) {
            return next();
        } else {
            return next('/login');
        }
    }
    next();
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requireSuccessPickDoctor)) {
        if (store.state.userID) {
            return next();
        } else {
            return next('/user/:user/registration');
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
    if (to.matched.some(route => route.meta.requiresAuthPatient)) {
        if (store.state.patientUsername) {
            return next();
        } else {
            return next('/user/login');
        }
    }
    next();
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requireProcess)) {
        if (store.state.statusAvailability) {
            return next();
        } else {
            return next('/user/:user/doctors');
        }
    }
    next();
}); 

router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requiresAuthUsers)) {
        if (store.state.patientUsername || store.state.alias) {
            return next();
        } else {
            return next('/');
        }
    }
    next();
}); 

export default router
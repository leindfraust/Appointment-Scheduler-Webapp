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
import PatientLogs from '../views/PortalAdmin/PatientLogs.vue'
import AdminSecurity from '../views/PortalAdmin/Security.vue'
import DoctorPickSuccess from '../views/PortalSuccessConfirmations/DoctorPickSuccess.vue'
import ImageUploadSuccess from '../views/PortalSuccessConfirmations/ImageUploadSuccess'
import ImageUploadSuccessAdmin from '../views/PortalSuccessConfirmations/ImageUploadSuccessAdmin.vue'
import ImageUploadSuccessManager from '../views/PortalSuccessConfirmations/imageUploadSuccessManager.vue'
import UserSignUp from '../views/Public/UserSignUp.vue'
import UserLogin from '../views/Public/UserLogin.vue'
import User from '../views/Public/User.vue'
import UserProfile from '../views/Public/UserProfile.vue'
import UserSecurity from '../views/Public/UserSecurity.vue'
import SuperUser from '../views/PortalSuperUsers/SuperUser.vue'
import SuperUserLogin from '../views/PortalSuperUsers/SuperUserLogin.vue'
import Manager from '../views/PortalSuperUsers/Manager.vue'
import ManagerLogin from '../views/PortalSuperUsers/ManagerLogin.vue'
import ManagerSignup from '../views/PortalSuperUsers/ManagerSignup.vue'
import ManagerProfile from '../views/PortalSuperUsers/ManagerProfile.vue'
import ContactSupport from '../views/Public/ContactSupport.vue'

const routes = [{
        path: '/',
        component: Home,
    },
    //Manager/Hospital account routes
    {
        path: '/user/manager/:user',
        component: Manager,
        meta: {
            requiresManagerAuth: true
        }
    },
    {
        path: '/user/manager/signup',
        component: ManagerSignup
    },
    {
        path: '/user/manager/login',
        component: ManagerLogin,
    },
    {
        path: '/user/manager/:user/profile',
        component: ManagerProfile,
        meta: {
            requiresManagerAuth: true
        }
    },
    //Superuser account routes
    {
        path: '/user/superuser',
        component: SuperUser,
        meta: {
            requiresSuperUserAuth: true
        }
    },
    {
        path: '/user/superuser/login',
        component: SuperUserLogin,
    },
    //Doctor account routes
    {
        path: '/admin/login',
        component: LoginAdmin,
    },
    {
        path: '/admin/signup',
        component: SignUpAdmin,
    },
    {
        path: '/admin/user/:user',
        component: Admin,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/admin/user/:user/schedule',
        component: Scheduler,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/admin/user/:user/profile',
        component: AdminProfile,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/admin/user/:user/security',
        component: AdminSecurity,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/admin/user/:user/patients',
        component: PatientLogs,
        meta: {
            requiresAuth: true
        }
    },
    //Confirmation routes
    {
        path: '/imgUploadSuccess',
        component: ImageUploadSuccess,
        meta: {
            requireImgUploadSuccess: true
        }
    },
    {
        path: '/imgUploadSuccessAdmin',
        component: ImageUploadSuccessAdmin,
        meta: {
            requireImgUploadSuccess: true
        }
    },
    {
        path: '/imgUploadSuccessManager',
        component: ImageUploadSuccessManager,
        meta: {
            requireImgUploadSuccessManager: true
        }
    },
    //User routes
    {
        path: '/user/signup',
        component: UserSignUp
    },
    {
        path: '/user/login',
        component: UserLogin
    },
    {
        path: '/user/:user/',
        component: User,
        meta: {
            requiresAuthPatient: true
        }
    },
    {
        path: '/user/:user/doctors',
        component: DoctorList,
        meta: {
            requiresAuthPatient: true
        }
    },
    {
        path: '/user/:user/profile',
        component: UserProfile,
        meta: {
            requiresAuthPatient: true
        }
    },
    {
        path: '/user/:user/security',
        component: UserSecurity,
        meta: {
            requiresAuthPatient: true
        }
    },
    {
        path: '/success',
        component: DoctorPickSuccess,
        meta: {
            requireSuccessPickDoctor: true
        },
    },
    {
        path: '/user/:user/registration',
        component: RegForm,
        meta: {
            requireProcess: true
        },
    },
    {
        path: '/contactus',
        component: ContactSupport
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
            return next('/user/:user/doctors');
        }
    }
    next();
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requireImgUploadSuccess)) {
        if (store.state.imgSuccess === true) {
            return next();
        } else {
            return next('/admin/login');
        }
    }
    next();
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requireImgUploadSuccessManager)) {
        if (store.state.imgSuccessManager) {
            return next();
        } else {
            return next('/user/manager/login');
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
            return next('/admin/login');
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
    if (to.matched.some(route => route.meta.requiresSuperUserAuth)) {
        if (store.state.superUserAuth) {
            return next();
        } else {
            return next('/user/superuser/login');
        }
    }
    next();
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requiresManagerAuth)) {
        if (store.state.managerHospital) {
            return next();
        } else {
            return next('/user/manager/login');
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
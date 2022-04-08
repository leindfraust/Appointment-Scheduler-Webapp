import {
    createRouter,
    createWebHistory
} from 'vue-router'
import store from '../store'
import Home from '../views/Public/Home.vue'
import DoctorList from '../views/Public/DoctorList.vue'
import RegForm from '../views/Public/RegForm.vue'
import LoginDoctor from '../views/PortalDoctor/LoginDoctor.vue'
import Doctor from '../views/PortalDoctor/Doctor.vue'
import SignUpDoctor from '../views/PortalDoctor/SignUpDoctor.vue'
import Scheduler from '../views/PortalDoctor/Scheduler.vue'
import DoctorProfile from '../views/PortalDoctor/Profile.vue'
import PatientLogs from '../views/PortalDoctor/PatientLogs.vue'
import DoctorSecurity from '../views/PortalDoctor/Security.vue'
import DoctorPickSuccess from '../views/PortalSuccessConfirmations/DoctorPickSuccess.vue'
import ImageUploadSuccess from '../views/PortalSuccessConfirmations/ImageUploadSuccess'
import ImageUploadSuccessDoctor from '../views/PortalSuccessConfirmations/ImageUploadSuccessDoctor.vue'
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
    //doctor account routes
    {
        path: '/doctor/login',
        component: LoginDoctor,
    },
    {
        path: '/doctor/signup',
        component: SignUpDoctor,
    },
    {
        path: '/doctor/user/:user',
        component: Doctor,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/doctor/user/:user/schedule',
        component: Scheduler,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/doctor/user/:user/profile',
        component: DoctorProfile,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/doctor/user/:user/security',
        component: DoctorSecurity,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/doctor/user/:user/patients',
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
        path: '/imgUploadSuccessDoctor',
        component: ImageUploadSuccessDoctor,
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
            return next('/doctor/login');
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
            return next('/doctor/login');
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
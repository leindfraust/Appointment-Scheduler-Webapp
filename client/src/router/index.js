import {
    createRouter,
    createWebHistory
} from 'vue-router'
import store from '../store'
const Home = () => import('../views/Public/Home.vue')
const DoctorList = () => import('../views/Public/DoctorList.vue')
const RegForm = () => import('../views/Public/RegForm.vue')
const LoginDoctor = () => import('../views/PortalDoctor/LoginDoctor.vue')
const Doctor = () => import('../views/PortalDoctor/Doctor.vue')
const SignUpDoctor = () => import('../views/PortalDoctor/SignUpDoctor.vue')
const Scheduler = () => import('../views/PortalDoctor/Scheduler.vue')
const DoctorProfile = () => import('../views/PortalDoctor/Profile.vue')
const PatientLogs = () => import('../views/PortalDoctor/PatientLogs.vue')
const DoctorSecurity = () => import('../views/PortalDoctor/Security.vue')
const DoctorPickSuccess = () => import('../views/PortalSuccessConfirmations/DoctorPickSuccess.vue')
const ImageUploadSuccess = () => import('../views/PortalSuccessConfirmations/ImageUploadSuccess')
const imageUploadSuccessPatientProfile = () => import('../views/PortalSuccessConfirmations/imageUploadSuccessPatientProfile.vue')
const ImageUploadSuccessDoctor = () => import('../views/PortalSuccessConfirmations/ImageUploadSuccessDoctor.vue')
const ImageUploadSuccessManager = () => import('../views/PortalSuccessConfirmations/imageUploadSuccessManager.vue')
const UserSignUp = () => import('../views/Public/UserSignUp.vue')
const UserLogin = () => import('../views/Public/UserLogin.vue')
const User = () => import('../views/Public/UserView.vue')
const UserProfile = () => import('../views/Public/UserProfile.vue')
const UserSecurity = () => import('../views/Public/UserSecurity.vue')
const SuperUser = () => import('../views/PortalSuperUsers/SuperUser.vue')
const SuperUserLogin = () => import('../views/PortalSuperUsers/SuperUserLogin.vue')
const Manager = () => import('../views/PortalSuperUsers/Manager.vue')
const ManagerLogin = () => import('../views/PortalSuperUsers/ManagerLogin.vue')
const ManagerSignup = () => import('../views/PortalSuperUsers/ManagerSignup.vue')
const ManagerProfile = () => import('../views/PortalSuperUsers/ManagerProfile.vue')
const ManagerSecurity = () => import('../views/PortalSuperUsers/ManagerSecurity.vue')
const ContactSupport = () => import('../views/Public/ContactSupport.vue')
const PageNotExist = () => import('../views/Public/PageNotExist.vue')

const routes = [{
    path: '/',
    component: Home,
},
{
    path: '/provider',
    component: () => import('../views/Public/ProviderLoader.vue')
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
{
    path: '/user/manager/:user/security',
    component: ManagerSecurity,
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
    path: '/imgUploadSuccessPatient',
    component: imageUploadSuccessPatientProfile,
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
    path: '/user/:user/:hospital/doctors',
    component: DoctorList,
    meta: {
        requiresAuthPatient: true
    }
},
{
    path: '/user/:user/profile',
    component: UserProfile,
    name: UserProfile,
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
},
{
    path: '/:catchAll404(.*)*',
    component: PageNotExist
}
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

import axios from 'axios'
import socket from '../socket'

//route guards
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
        if (store.state.appointed) {
            return next();
        } else {
            return next('/user/:user/registration');
        }
    }
    next();
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(route => route.meta.requiresAuth)) {
        //check doctor session
        await axios.get("/session/doctor").then(async response => {
            if (typeof response.data.alias !== 'undefined') {
                store.commit("alias", response.data.alias);
                store.commit("doctorID", response.data._id);
                store.commit("doctorName", response.data.fullname);
            } else {
                store.commit("alias", null);
                await axios.delete("/session/doctor");
            }
        });
        if (store.state.alias) {
            return next();
        } else {
            return next('/doctor/login');
        }
    }
    next();
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(route => route.meta.requiresAuthPatient)) {

        //check patient session
        await axios.get("/session/patient").then(async response => {
            if (typeof response.data.username !== 'undefined') {
                store.commit("patientUsername", response.data.username)
                store.commit("patientID", response.data._id)
            } else {
                store.commit("patientID", null);
                store.commit("patientUsername", '');
                await axios.delete("/session/patient");
                socket.disconnect();
            }
        });

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

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(route => route.meta.requiresManagerAuth)) {
        //check provider/manager session
        await axios.get("/session/manager").then(async response => {
            if (typeof response.data.hospital !== 'undefined') {
                store.commit("managerHospital", response.data.hospital);
            } else {
                store.commit("managerHospital", null);
                await axios.delete('/session/manager');
            }
        });
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

export default router
import {
    createRouter,
    createWebHistory
} from 'vue-router'
import store from '../store'
const Home = () => import('../views/Public/Home.vue')
const AboutMedicSearch = () => import('../views/Public/AboutMedicSearch.vue')
const TermsAndConditions = () => import('../views/Public/TermsAndConditions.vue')
const Eula = () => import('../views/Public/EULA.vue')
const DoctorList = () => import('../views/Public/DoctorList.vue')
const RegForm = () => import('../views/Public/RegForm.vue')
const DoctorSignup = () => import('../views/PortalDoctor/DoctorSignup.vue')
const Doctor = () => import('../views/PortalDoctor/Doctor.vue')
const DoctorScheduler = () => import('../views/PortalDoctor/DoctorScheduler.vue')
const DoctorProfile = () => import('../views/PortalDoctor/DoctorProfile.vue')
const DoctorCancelledAppointments = () => import('../views/PortalDoctor/DoctorCancelledAppointments.vue')
const DoctorPatientHistory = () => import('../views/PortalDoctor/DoctorPatientHistory.vue')
const DoctorSecurity = () => import('../views/PortalDoctor/DoctorSecurity.vue')
const DoctorPayment = () => import('../views/PortalDoctor/DoctorPayment.vue')
const DoctorPickSuccess = () => import('../views/PortalSuccessConfirmations/DoctorPickSuccess.vue')
const ImageUploadSuccess = () => import('../views/PortalSuccessConfirmations/ImageUploadSuccess')
const imageUploadSuccessPatientProfile = () => import('../views/PortalSuccessConfirmations/imageUploadSuccessPatientProfile.vue')
const ImageUploadSuccessDoctor = () => import('../views/PortalSuccessConfirmations/ImageUploadSuccessDoctor.vue')
const ImageUploadSuccessManager = () => import('../views/PortalSuccessConfirmations/imageUploadSuccessManager.vue')
const PaymentStatus = () => import('../views/Public/PaymentStatus.vue')
const UserSignUp = () => import('../views/Public/UserSignUp.vue')
const DynamicLogin = () => import('../views/Public/DynamicLogin.vue')
const User = () => import('../views/Public/UserView.vue')
const UserProfile = () => import('../views/Public/UserProfile.vue')
const UserSecurity = () => import('../views/Public/UserSecurity.vue')
const SuperUser = () => import('../views/PortalSuperUsers/SuperUser.vue')
const SuperUserLogin = () => import('../views/PortalSuperUsers/SuperUserLogin.vue')
const Manager = () => import('../views/PortalSuperUsers/Manager.vue')
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
    path: '/about',
    component: AboutMedicSearch
},
{
    path: '/terms-and-conditions',
    component: TermsAndConditions
},
{
    path: '/eula',
    component: Eula
},
{
    path: '/provider',
    component: () => import('../views/Public/ProviderLoader.vue')
},
{
    path: '/account/login',
    component: DynamicLogin
},
//Manager/Hospital account routes
{
    path: '/manager/:user',
    component: Manager,
    meta: {
        requiresManagerAuth: true
    }
},
{
    path: '/manager/signup',
    component: ManagerSignup
},
{
    path: '/manager/:user/profile',
    component: ManagerProfile,
    meta: {
        requiresManagerAuth: true
    }
},
{
    path: '/manager/:user/security',
    component: ManagerSecurity,
    meta: {
        requiresManagerAuth: true
    }
},
//Superuser account routes
{
    path: '/superuser',
    component: SuperUser,
    meta: {
        requiresSuperUserAuth: true
    }
},
{
    path: '/superuser/login',
    component: SuperUserLogin,
},
//doctor account routes
{
    path: '/doctor/signup',
    component: DoctorSignup,
},
{
    path: '/doctor/:user/appointments',
    component: Doctor,
    meta: {
        requiresAuth: true
    },
},
{
    path: '/doctor/:user/appointments/history',
    component: DoctorPatientHistory,
    meta: {
        requiresAuth: true
    }
},
{
    path: '/doctor/:user/appointments/cancelled',
    component: DoctorCancelledAppointments,
    meta: {
        requiresAuth: true
    }
},
{
    path: '/doctor/:user/schedule',
    component: DoctorScheduler,
    meta: {
        requiresAuth: true
    },
},
{
    path: '/doctor/:user/profile',
    component: DoctorProfile,
    meta: {
        requiresAuth: true
    },
},
{
    path: '/doctor/:user/security',
    component: DoctorSecurity,
    meta: {
        requiresAuth: true
    },
},
{
    path: '/doctor/:user/payment',
    component: DoctorPayment,
    meta: {
        requiresAuth: true
    },
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
{
    path: '/payment-status',
    component: PaymentStatus,
    meta: {
        requirePaymentTransacted: true
    }
},
//User routes
{
    path: '/user/signup',
    component: UserSignUp
},
{
    path: '/:hospital/doctors',
    component: DoctorList,
},
{
    path: '/user/:user/',
    component: User,
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
    if (to.matched.some(route => route.meta.requireImgUploadSuccess)) {
        if (store.state.imgSuccess === true) {
            return next();
        } else {
            return next('/account/login');
        }
    }
    next();
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requireImgUploadSuccessManager)) {
        if (store.state.imgSuccessManager) {
            return next();
        } else {
            return next('/account/login');
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
            return next('/account/login');
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
            return next('/account/login');
        }
    }
    next();
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requiresSuperUserAuth)) {
        if (store.state.superUserAuth) {
            return next();
        } else {
            return next('/superuser/login');
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
            return next('/account/login');
        }
    }
    next();
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
    if (to.matched.some(route => route.meta.requirePaymentTransacted)) {
        if (store.state.paymentID) {
            return next();
        } else {
            return next('/');
        }
    }
    next();
});

export default router
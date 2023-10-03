import {
    createRouter,
    createWebHistory
} from 'vue-router'
import store from '../store'
const HomeView = () => import('../views/Public/HomeView.vue')
const AboutMedicSearch = () => import('../views/Public/AboutMedicSearch.vue')
const TermsAndConditions = () => import('../views/Public/TermsAndConditions.vue')
const Eula = () => import('../views/Public/EULA.vue')
const DoctorList = () => import('../views/Public/DoctorList.vue')
const RegForm = () => import('../views/Public/RegForm.vue')
const DoctorSignup = () => import('../views/PortalDoctor/DoctorSignup.vue')
const DoctorAppointments = () => import('../views/PortalDoctor/DoctorAppointments.vue')
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
const ManagerDashboard = () => import('../views/PortalSuperUsers/ManagerDashboard.vue')
const ManagerSignup = () => import('../views/PortalSuperUsers/ManagerSignup.vue')
const ManagerProfile = () => import('../views/PortalSuperUsers/ManagerProfile.vue')
const ManagerSecurity = () => import('../views/PortalSuperUsers/ManagerSecurity.vue')
const ContactSupport = () => import('../views/Public/ContactSupport.vue')
const PageNotExist = () => import('../views/Public/PageNotExist.vue')

const routes = [{
    path: '/',
    component: HomeView,
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
    path: `/manager/${store.state.managerHospital}`,
    component: ManagerDashboard,
    meta: {
        requiresManagerAuth: true
    }
},
{
    path: '/manager/signup',
    component: ManagerSignup
},
{
    path: `/manager/${store.state.managerHospital}/profile`,
    component: ManagerProfile,
    meta: {
        requiresManagerAuth: true
    }
},
{
    path: `/manager/${store.state.managerHospital}/security`,
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
    path: `/doctor/${store.state.alias}/appointments`,
    component: DoctorAppointments,
    meta: {
        requiresAuthDoctor: true
    },
},
{
    path: `/doctor/${store.state.alias}/appointments/history`,
    component: DoctorPatientHistory,
    meta: {
        requiresAuthDoctor: true
    }
},
{
    path: `/doctor/${store.state.alias}/appointments/cancelled`,
    component: DoctorCancelledAppointments,
    meta: {
        requiresAuthDoctor: true
    }
},
{
    path: `/doctor/${store.state.alias}/schedule`,
    component: DoctorScheduler,
    meta: {
        requiresAuthDoctor: true
    },
},
{
    path: `/doctor/${store.state.alias}/profile`,
    component: DoctorProfile,
    meta: {
        requiresAuthDoctor: true
    },
},
{
    path: `/doctor/${store.state.alias}/security`,
    component: DoctorSecurity,
    meta: {
        requiresAuthDoctor: true
    },
},
{
    path: `/doctor/${store.state.alias}/payment`,
    component: DoctorPayment,
    meta: {
        requiresAuthDoctor: true
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
    path: `/user/${store.state.patientUsername}/`,
    component: User,
    meta: {
        requiresAuthPatient: true
    }
},
{
    path: `/user/${store.state.patientUsername}/profile`,
    component: UserProfile,
    name: UserProfile,
    meta: {
        requiresAuthPatient: true
    }
},
{
    path: `/user/${store.state.patientUsername}/security`,
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
    path: `/user/${store.state.patientUsername}/registration`,
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
router.beforeEach((to) => {
    if (to.matched.some(route => route.meta.requireImgUploadSuccess)) {
        if (store.state.imgSuccess === true) {
            return true;
        } else {
            return '/account/login';
        }
    }
});

router.beforeEach((to) => {
    if (to.matched.some(route => route.meta.requireImgUploadSuccessManager)) {
        if (store.state.imgSuccessManager) {
            return true;
        } else {
            return '/account/login';
        }
    }
});

router.beforeEach((to) => {
    if (to.matched.some(route => route.meta.requireSuccessPickDoctor)) {
        if (store.state.appointed) {
            return true;
        } else {
            return '/user/:user/registration';
        }
    }
});

router.beforeEach(async (to) => {
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
    if (await to.meta.requiresAuthDoctor && !store.state.alias) {
        return {
            path: '/account/login',
            query: { redirect: to.fullPath }
        }
    }
});

router.beforeEach(async (to) => {
    await axios.get("/session/patient").then(async response => {
        if (typeof response.data.username !== 'undefined' && !response.data.alias && !response.data.hospital) {
            store.commit("patientUsername", response.data.username)
            store.commit("patientID", response.data._id)
        } else {
            store.commit("patientID", null);
            store.commit("patientUsername", '');
            await axios.delete("/session/patient");
            socket.disconnect();
        }
    });
    if (await to.meta.requiresAuthPatient && !store.state.patientUsername) {

        return {
            path: '/account/login',
            query: { redirect: to.fullPath }
        }
    }
});

router.beforeEach((to) => {
    if (to.meta.requiresSuperUserAuth && !store.state.superUserAuth) {
        return {
            path: '/superuser/login',
            query: { redirect: to.fullPath }
        }
    }
});

router.beforeEach(async (to) => {
    await axios.get("/session/manager").then(async response => {
        if (typeof response.data.hospital !== 'undefined') {
            store.commit("managerHospital", response.data._id);
        } else {
            store.commit("managerHospital", null);
            await axios.delete('/session/manager');
        }
    });
    if (to.matched.some(route => route.meta.requiresManagerAuth)) {
        //check provider/manager session
        if (store.state.managerHospital) {
            return true;
        } else {
            return '/account/login';
        }
    }
});

router.beforeEach((to) => {
    if (to.matched.some(route => route.meta.requireProcess)) {
        if (store.state.statusAvailability) {
            return true;
        } else {
            return '/';
        }
    }
});

router.beforeEach((to) => {
    if (to.matched.some(route => route.meta.requirePaymentTransacted)) {
        if (store.state.paymentID) {
            return true;
        } else {
            return '/';
        }
    }
});

export default router
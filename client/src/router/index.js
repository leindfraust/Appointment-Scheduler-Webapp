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
import imageUploadSuccessPatientProfile from '../views/PortalSuccessConfirmations/imageUploadSuccessPatientProfile.vue'
import ImageUploadSuccessDoctor from '../views/PortalSuccessConfirmations/ImageUploadSuccessDoctor.vue'
import ImageUploadSuccessManager from '../views/PortalSuccessConfirmations/imageUploadSuccessManager.vue'
import UserSignUp from '../views/Public/UserSignUp.vue'
import UserLogin from '../views/Public/UserLogin.vue'
import User from '../views/Public/UserView.vue'
import UserProfile from '../views/Public/UserProfile.vue'
import UserSecurity from '../views/Public/UserSecurity.vue'
import SuperUser from '../views/PortalSuperUsers/SuperUser.vue'
import SuperUserLogin from '../views/PortalSuperUsers/SuperUserLogin.vue'
import Manager from '../views/PortalSuperUsers/Manager.vue'
import ManagerLogin from '../views/PortalSuperUsers/ManagerLogin.vue'
import ManagerSignup from '../views/PortalSuperUsers/ManagerSignup.vue'
import ManagerProfile from '../views/PortalSuperUsers/ManagerProfile.vue'
import ManagerSecurity from '../views/PortalSuperUsers/ManagerSecurity.vue'
import ContactSupport from '../views/Public/ContactSupport.vue'
import PageNotExist from '../views/Public/PageNotExist.vue'

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
import cld from "../cloudinary"
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
                store.commit("profileImg", cld.imageTag(`assets/doctors/${response.data.alias}.jpg`).toHtml());
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
import {
    createStore
} from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
    plugins: [createPersistedState()],
    state: {
        paymentStatus: 'pending',
        patientFilters: {}, //specialist and date/time filter
        paymentID: '',
        notificationClicked: false,
        checkProfileImg: false,
        accountCreated: false,
        userAuth: false,
        superUserAuth: false,
        statusAvailability: false,
        alias: '',
        doctorDetails: [],
        patientUsername: '',
        patientID: null,
        doctorID: null,
        doctorName: null,
        appointed: null,
        specialistList: [],
        pickedSpecialization: null,
        patientDetails: [],
        profileImg: null,
        imgSuccess: false,
        imgSuccessManager: false,
        managerHospital: '',
        hospitalDetails: [],
        hospitalName: '',
        specializationList: ["Addiction Medicine Specialists", "Allergists", "Anesthesiologists", "Cardiologists", "Dermatologists", "Emergency Medicine Physicians", "Endocrinologists", "General Surgeons", "Geriatricians", "Gastroenterologists", "Gynecologists", "Hematologists", "Hospice and Palliative Medicine Specialists", "Infectious Disease Specialists", "Infectious Disease Specialists", "Medical Genetics Specialists", "Medical Oncologists", "Neurologists", "Nephrologists", "Obstetricians", "Oncologists", "Ophthalmologists", "Orthopedic Surgeons", "Otolaryngologists", "Pain Medicine Specialists", "Pediatricians", "Pathologists", "Physical Medicine and Rehabilitation Specialists", "Plastic Surgeons", "Preventive Medicine Specialists", "Psychiatrists", "Pulmonologists", "Radiation Oncologists", "Radiologists", "Rheumatologists", "Sleep Medicine Specialists", "Sports Medicine Specialists", "Thoracic Surgeons", "Urologists", "Vascular Surgeons"]
    },
    getters: {
        getStatusAvail: state => state.statusAvailability,
        getSpecializationList: state => state.specializationList
    },
    mutations: {
        patientFilters(state, patientFilters) {
            state.patientFilters = patientFilters
        },
        paymentStatus(state, paymentStatus) {
            state.paymentStatus = paymentStatus
        },
        paymentID(state, paymentID) {
            state.paymentID = paymentID
        },
        checkProfileImg(state, checkProfileImg) {
            state.checkProfileImg = checkProfileImg
        },
        notificationClicked(state, notificationClicked) {
            state.notificationClicked = notificationClicked
        },
        accountCreated(state, accountCreated) {
            state.accountCreated = accountCreated
        },
        alias(state, alias) {
            state.alias = alias
        },
        doctorDetails(state, doctorDetails) {
            state.doctorDetails = doctorDetails
        },
        patientUsername(state, patientUsername) {
            state.patientUsername = patientUsername
        },
        doctorID(state, doctorID) {
            state.doctorID = doctorID
        },
        doctorName(state, doctorName) {
            state.doctorName = doctorName
        },
        patientID(state, patientID) {
            state.patientID = patientID
        },
        appointed(state, appointed) {
            state.appointed = appointed
        },
        statusTrue(state) {
            state.statusAvailability = true;
        },
        specialistList(state, specialistList) {
            state.specialistList = specialistList
        },
        pickedSpecialization(state, specialization) {
            state.pickedSpecialization = specialization
        },
        patientDetails(state, patientDetails) {
            state.patientDetails = patientDetails
        },
        profileImg(state, profileImg) {
            state.profileImg = profileImg
        },
        imgSuccess(state, imgSuccess) {
            state.imgSuccess = imgSuccess
        },
        imgSuccessManager(state, imgSuccessManager) {
            state.imgSuccessManager = imgSuccessManager
        },
        userType(state, userType) {
            state.userType = userType
        },
        superUserAuth(state, superUserAuth) {
            state.superUserAuth = superUserAuth
        },
        managerHospital(state, managerHospital) {
            state.managerHospital = managerHospital
        },
        hospitalDetails(state, hospitalDetails) {
            state.hospitalDetails = hospitalDetails
        },
        hospitalName(state, hospitalName) {
            state.hospitalName = hospitalName
        },
        statusAvailability(state, statusAvailability) {
            state.statusAvailability = statusAvailability
        }
    },
});

export default store
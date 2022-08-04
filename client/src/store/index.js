import {
    createStore
} from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
    plugins: [createPersistedState()],
    state: {
        notificationClicked: false,
        accountCreated: false,
        userAuth: false,
        superUserAuth: false,
        statusAvailability: false,
        alias: '',
        doctorDetails: [],
        patientUsername: '',
        patientID: null,
        doctorID: null,
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
        specializationList: ["Allergists", "Anesthesiologists", "Cardiologists", "Colon and Rectal Surgeons", "Critical Care Medicine Specialists", " Dermatologists", "Endocrinologists", "Emergency Medicine Specialists", "Family Physicians",
            "Gastroenterologists", "Geriatric Medicine Specialists", "Hematologists", "Hospice and Palliative Medicine Specialists", "Infectious Disease Specialists",
            "Internists", "Medical Geneticists", "Nephrologists", "Neurologists", "Obstetricians and Gynecologists", "Oncologists", "Ophthalmologists",
            "Osteopaths", "Otolaryngologists", "Pathologists", "Pediatricians", "Physiatrists", "Plastic Surgeons", "Podiatrists", "Preventive Medicine Specialists", "Psychiatrists", "Pulmonologists", "Radiologists", "Rheumatologists", "Sleep Medicine Specialists", "Sports Medicine Specialists", "General Surgeons",
            "Urologists"
        ]
    },
    getters: {
        getStatusAvail: state => state.statusAvailability,
        getSpecializationList: state => state.specializationList
    },
    mutations: {
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
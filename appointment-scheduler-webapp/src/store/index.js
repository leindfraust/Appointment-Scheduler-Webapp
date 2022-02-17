import {
    createStore
} from 'vuex'

const store = createStore({
    state: {
        notificationClicked: false,
        accountCreated: false,
        disableCSSVH: true,
        userAuth: false,
        superUserAuth: false,
        statusAvailability: false,
        alias: '',
        doctorSched: [],
        userID: null, //doctor's ID
        patientUsername: '',
        patientID: null,
        specialistList: [],
        patientDetails: [],
        profileImg: null,
        imgSuccess: false,
        imgSuccessManager: false,
        managerHospital: '',
        hospitalID: '',
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
        notificationClicked(state, notificationClicked){
            state.notificationClicked = notificationClicked
        },
        accountCreated(state, accountCreated) {
            state.accountCreated = accountCreated
        },
        disableCSSVH(state, disableCSSVH){
            state.disableCSSVH = disableCSSVH
        },
        alias(state, alias) {
            state.alias = alias
        },
        doctorSched(state, doctorSched) {
            state.doctorSched = doctorSched
        },
        userID(state, userID) {
            state.userID = userID
        },
        patientUsername(state, patientUsername) {
            state.patientUsername = patientUsername
        },
        patientID(state, patientID) {
            state.patientID = patientID
        },
        statusTrue(state) {
            state.statusAvailability = true;
        },
        specialistList(state, specialistList) {
            state.specialistList = specialistList
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
        imgSuccessManager(state, imgSuccessManager){
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
        hospitalID(state, hospitalID) {
            state.hospitalID = hospitalID
        },
        hospitalName(state, hospitalName){
            state.hospitalName = hospitalName
        },
        statusAvailability(state, statusAvailability) {
            state.statusAvailability = statusAvailability
        }
    },
});

export default store
import {
    createStore
} from 'vuex'

const store = createStore({
    state: {
        userAuth: false,
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
        userType: null
    },
    getters: {
        getStatusAvail: state => state.statusAvailability,
    },
    mutations: {
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
        imgSucess(state, imgSuccess) {
            state.imgSuccess = imgSuccess
        },
        userType(state, userType) {
            state.userType = userType
        }
    },
});

export default store
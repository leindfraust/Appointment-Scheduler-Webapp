import {
    createStore
} from 'vuex'

const store = createStore({
    state: {
        userAuth: false,
        statusAvailability: false,
        alias: '',
        doctorSched: [],
        userID: null,
        specialistList: [],
        patientDetails: [],
        profileImg: null,
        imgSuccess: false
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
        }
    },
});

export default store
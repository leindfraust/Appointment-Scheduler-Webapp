import axios from 'axios';
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
    },
});

export default store
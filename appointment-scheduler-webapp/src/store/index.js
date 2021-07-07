import axios from 'axios';
import {
    createStore
} from 'vuex'

const store = createStore({
    state: {
        userAuth: false,
        statusAvailability: false,
        alias: '',
        userID: null,
        appointmentSched: [],
        month: '',
        dateNum: '',
        day: '',
        statedHr: '',
        expireHr: ''
    },
    getters: {
        getStatusAvail: state => state.statusAvailability,
        appointmentSched: state => {
            return state.appointmentSched
        },
    },
    mutations: {
        alias(state, alias) {
            state.alias = alias
        },
        userID(state, userID) {
            state.userID = userID
        },
        statusTrue(state) {
            state.statusAvailability = true;
        },
        appointmentList(state, appointmentSched) {
            state.appointmentSched = appointmentSched
        },
    },
    actions: {
        appointmentItems({
            commit
        }) {
            axios.get('/api/appointmentList')
                .then(response => response.data)
                .then(appointmentSched => {
                    commit('appointmentList', appointmentSched)
                });
        },
    }
});

export default store
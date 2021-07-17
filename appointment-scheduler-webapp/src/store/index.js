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
        appointmentSched: [],
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
        doctorSched(state, doctorSched) {
            state.doctorSched = doctorSched
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
                .then(response => response.data.filter(x => x.doctor === store.state.userID))
                .then(appointmentSched => {
                    commit('appointmentList', appointmentSched)
                });
        },
    }
});

export default store
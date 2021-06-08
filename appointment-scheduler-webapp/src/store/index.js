import axios from 'axios';
import {
    createStore
} from 'vuex'

const store = createStore({
    state: {
        userAuth: false,
        statusAvailability: false,
        alias: '',
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
        userTrue(state) {
            state.userAuth = true;
        },
        statusTrue(state) {
            state.statusAvailability = true;
        },
        appointmentList(state, appointmentSched) {
            state.appointmentSched = appointmentSched
        },
        month(state, month) {
            state.month = month
        },
        dateNum(state, dateNum){
            state.dateNum = dateNum
        },
        day(state, day) {
            state.day = day
        },
        stateHr(state, hour) {
            state.statedHr = hour
        },
        expireHr(state, hour) {
            state.expireHr = hour
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
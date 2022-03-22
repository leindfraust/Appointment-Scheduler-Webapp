<script setup>
import NavigationTab from '../../components/NavigationTab.vue';
import axios from 'axios'
import { ref, onMounted } from 'vue';

let patient = ref([]);
let geolocationData = ref([])
let citiesData = ref([])
let userProvince = ref('')
let userCity = ref('')
let dropDownProvince = ref(false)
let dropDownCity = ref(false)
let errMsg = ref('')
let successMsg = ref(false)
onMounted(async () => {
    await axios.get("/session/patient").then(response => patient.value = response.data);
    await axios.get("/api/geolocation").then(response => geolocationData.value = response.data)

    userProvince.value = await patient.value.province
    userCity.value = await patient.value.city

    await axios.get('/api/geolocation').then(response => citiesData.value = response.data.find(x => x.province === userProvince.value))
    citiesData.value = await citiesData.value.citiesOrMunicipalities.sort((a, b) => { return a.name > b.name ? 1 : -1 })

});

//methods
async function selectProvince(province) {
    dropDownProvince.value = false
    userCity.value = ''
    userProvince.value = province
    await axios.get('/api/geolocation').then(response => citiesData.value = response.data.find(x => x.province === province))
    citiesData.value = await citiesData.value.citiesOrMunicipalities.sort((a, b) => { return a.name > b.name ? 1 : -1 })
}
function selectCity(city) {
    dropDownCity.value = false
    userCity.value = city
}
async function updatePatient() {
    try {
        await axios.put('/session/patient/', {
            name: [patient.value.name[0], patient.value.name[1]],
            province: userProvince.value,
            city: userCity.value,
            currentAddress: patient.value.currentAddress
        });
        await axios.put(`/api/user/${patient.value._id}`, {
            name: [patient.value.name[0], patient.value.name[1]],
            province: userProvince.value,
            city: userCity.value,
            currentAddress: patient.value.currentAddress
        });

        successMsg.value = true
        errMsg.value = ''

        await axios.get("/session/patient").then(response => patient.value = response.data);
        await axios.get("/api/geolocation").then(response => geolocationData.value = response.data)

        userProvince.value = await patient.value.province
        userCity.value = await patient.value.city

        await axios.get('/api/geolocation').then(response => citiesData.value = response.data.find(x => x.province === userProvince.value))
        citiesData.value = await citiesData.value.citiesOrMunicipalities.sort((a, b) => { return a.name > b.name ? 1 : -1 })
    } catch (err) {
        errMsg.value = err
    }
}

</script>
<template>
    <NavigationTab />
    <section class="section is-medium" v-if="patient.length !== 0">
        <div class="box" style="width: 50%; margin: auto">
            <h1 class="title">Profile</h1>
            <div class="notification is-danger" v-if="errMsg">{{ errMsg }}</div>
            <div class="notification is-success" v-if="successMsg">Changes have been pushed.</div>
            <div class="field is-horizontal">
                <div class="field-body">
                    <div class="field">
                        <label class="label">Username:</label>
                        <div class="controls">
                            <input type="text" class="input" v-model="patient.username" disabled />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Email:</label>
                        <div class="controls">
                            <input type="text" class="input" v-model="patient.email" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-body">
                    <div class="field">
                        <label class="label">First Name:</label>
                        <div class="controls">
                            <input type="text" class="input" v-model="patient.name[0]" />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Last Name:</label>
                        <div class="controls">
                            <input type="text" class="input" v-model="patient.name[1]" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <label class="label">Province:</label>
                            <div class="dropdown" :class="{ 'is-active': dropDownProvince }">
                                <div class="dropdown-trigger">
                                    <button
                                        class="button"
                                        @click="dropDownProvince = !dropDownProvince"
                                    >
                                        <span v-if="userProvince == ''">Select</span>
                                        <span v-else>{{ userProvince }}</span>
                                    </button>
                                </div>
                                <div class="dropdown-menu">
                                    <div
                                        class="dropdown-content"
                                        v-for="provinces in geolocationData"
                                        :key="provinces._id"
                                    >
                                        <a
                                            class="dropdown-item"
                                            @click="selectProvince(provinces.province)"
                                        >{{ provinces.province }}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <div class="control">
                            <div class="label">City/Municipality:</div>
                            <div class="dropdown" :class="{ 'is-active': dropDownCity }">
                                <div class="dropdown-trigger">
                                    <button
                                        class="button"
                                        aria-haspopup="true"
                                        @click="dropDownCity = !dropDownCity"
                                        :disabled="userProvince == ''"
                                    >
                                        <span v-if="userCity == ''">Select</span>
                                        <span v-else>{{ userCity }}</span>
                                    </button>
                                </div>
                                <div class="dropdown-menu">
                                    <div
                                        class="dropdown-content"
                                        v-if="userProvince"
                                        v-for="cities in citiesData"
                                        :key="cities.name"
                                    >
                                        <a
                                            class="dropdown-item"
                                            @click="selectCity(cities.name)"
                                        >{{ cities.name }}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Current Address:</label>
                        <div class="controls">
                            <input type="text" class="input" v-model="patient.currentAddress" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="field is-grouped is-grouped-right">
                <p class="control">
                    <a class="button is-primary" @click="updatePatient">Save changes</a>
                </p>
            </div>
        </div>
    </section>
</template>
<style scoped>
@media (max-width: 991.98px) {
    .box {
        width: 100% !important;
    }
}
</style>
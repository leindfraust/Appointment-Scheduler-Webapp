<template>
    <section class="section" style="background-color: whitesmoke;">
        <div class="container box" style="width: 50%; margin: auto;">
            <div class="notification is-danger" v-if="errMsg">
                Oops, something went wrong. Try again later or
                <router-link :to="'/contactus'">contact us</router-link>
            </div>
            <div class="field">
                <label class="label">Hospital Name</label>
                <input class="input" type="text" placeholder="Hospital name" v-model="hospital" />

                <label class="label">E-mail</label>
                <input class="input" type="email" placeholder="Official hospital email" v-model="email" />
            </div>
            <div class="field is-horizontal">
                <div class="field-body">
                    <div class="field">
                        <label class="label">Province</label>
                        <div class="dropdown" :class="{ 'is-active': isActiveDropdownProvince }">
                            <div class="dropdown-trigger">
                                <button class="button" aria-haspopup="true" @click="provinceDropdown">
                                    <span v-if="province == ''">Select</span>
                                    <span v-else>{{ province }}</span>
                                </button>
                            </div>
                            <div class="dropdown-menu">
                                <div class="dropdown-content" v-for="provinces in geolocationData" :key="provinces._id">
                                    <a class="dropdown-item" @click="selectProvince(provinces.province)">{{
                                        provinces.province
                                    }}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">City/Municipality</label>
                        <div class="dropdown" :class="{ 'is-active': isActiveDropdownCity }">
                            <div class="dropdown-trigger">
                                <button class="button" aria-haspopup="true" @click="cityDropdown"
                                    :disabled="province == ''">
                                    <span v-if="city == ''">Select</span>
                                    <span v-else>{{ city }}</span>
                                </button>
                            </div>
                            <div class="dropdown-menu" v-if="province">
                                <div class="dropdown-content" v-for="cities in citiesData"
                                    :key="cities.name">
                                    <a class="dropdown-item" @click="selectCity(cities.name)">{{ cities.name }}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="field">
                <div class="control">
                    <label class="label">Postal Code:</label>
                </div>
                <input type="number" class="input" v-model="postalCode" placeholder="Postal Code" />
            </div>
            <div class="field">
                <div class="control">
                    <label class="label">Type:</label>
                    <label class="radio">
                        <input type="radio" name="type" @click="selectPublicType" />Public
                    </label>
                    <label class="radio">
                        <input type="radio" name="type" @click="selectPrivateType" />Private
                    </label>
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <label class="label">Barangay or Street</label>
                    <input class="input" type="text" placeholder="Barangay or Street of the hospital"
                        v-model="barangayORStreet" />
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <label class="label">Latitude</label>
                            <input class="input" type="number" placeholder="Latitude of the hospital location"
                                v-model="latitude" />
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <label class="label">Longtitude</label>
                            <input class="input" type="number" placeholder="Longtitude of the hospital location"
                                v-model="longtitude" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <label class="label">Username:</label>
                            <div v-if="usernameFound !== ''">
                                <p class="help is-danger" v-if="usernameFound">
                                    Unavailable
                                    <i class="fas fa-spinner fa-spin" v-if="loadingUsername"></i>
                                </p>
                                <p class="help is-success" v-else>
                                    Available
                                    <i class="fas fa-spinner fa-spin" v-if="loadingUsername"></i>
                                </p>
                            </div>
                            <input class="input" type="text" placeholder="Username" v-model="username"
                                @input="usernameFindTimeout" />
                        </div>
                        <div class="notification is-light is-danger" v-if="usernameAlreadyTaken">Username is already
                            taken.</div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <label class="label">Password</label>
                            <input class="input" type="password" placeholder="Password" v-model="password" />
                        </div>
                        <div class="control">
                            <label class="label">Confirm Password</label>
                            <input class="input" type="password" placeholder="Confirm Password"
                                v-model="confirmPassword" />
                        </div>
                        <div class="notification is-light is-danger" v-if="passwordNotMatch">Password does not match.
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <label class="label">Specializations offered(Select all that applies)</label>
                    <nav class="panel">
                        <div class="panel-block">
                            <input class="input" type="text" v-model="searchBar" placeholder="Search" />
                        </div>
                        <div style="max-height: 20em; overflow: auto">
                            <div class="panel-block" v-for="(specializations, index) in specializationListIndexed"
                                :key="index" :value="specializations">
                                <a @click="selectSpecialization(specializations)">{{ specializations }}</a>
                            </div>
                        </div>
                    </nav>
                </div>
                <div class="column">
                    <label class="label">Selected</label>
                    <div class="columns is-multiline">
                        <div class="column" id="selectedSpecializations">
                            <button v-for="(specialist, index) in specializationsSelected" :key="index"
                                class="button is-light" style="margin: 5px">
                                {{ specialist.specialist }}&nbsp;
                                <span class="has-text-danger"
                                    @click="undoSpecialization(specialist.specialist)">X</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <h1 class="label has-text-centered">Choose a plan</h1>
            <div class="columns has-text-centered">
                <div class="column">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4">STANDARD PLAN</p>
                                </div>
                            </div>

                            <div class="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Phasellus nec iaculis mauris.
                            </div>
                            <div class="field">
                                <div class="control">
                                    <label class="radio">
                                        <input class="radio" name="plan" type="radio" @click="selectStandardPlan" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4">PREMIUM PLAN</p>
                                </div>
                            </div>

                            <div class="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Phasellus nec iaculis mauris.
                            </div>

                            <div class="field">
                                <div class="control">
                                    <label class="radio">
                                        <input class="radio" name="plan" type="radio" @click="selectPremiumPlan" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button class="button is-primary" @click="create"
                :disabled="pricing == '' || hospital == '' || email == '' || hospitalType == '' || latitude == '' || longtitude == '' || barangayORStreet == '' || city == '' || province == '' || specializationsSelected == []">Create
                Account</button>
        </div>
    </section>
</template>
<script>
import axios from 'axios'

export default {
    name: "ManagerSignup",
    async mounted() {
        await axios.get('/api/geolocation').then(response => this.geolocationData = response.data)
    },
    computed: {
        specializationListIndexed() {
            return this.specializationList.filter(x => x.toLowerCase().includes(this.searchBar.toLowerCase()))
        }
    },
    data() {
        return {
            geolocationData: [],
            isActiveDropdownProvince: false,
            isActiveDropdownCity: false,
            pricing: '',
            hospital: '',
            email: '',
            hospitalType: '',
            latitude: '',
            longtitude: '',
            barangayORStreet: '',
            postalCode: '',
            city: '',
            province: '',
            username: '',
            password: '',
            confirmPassword: '',
            loadingUsername: false,
            usernameFound: '',
            passwordNotMatch: false,
            citiesData: [],
            specializationsSelected: [],
            specializationList: this.$store.getters.getSpecializationList,
            searchBar: '',
            errMsg: '',
            searchTimeout: null
        }
    },
    methods: {
        async usernameFindTimeout() {
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout)
                this.searchTimeout = null
            }
            this.searchTimeout = setTimeout(this.usernameFinder, 500)
        },
        async usernameFinder() {
            this.loadingUsername = true
            await axios.post('/api/manager/check_username', {
                username: this.username
            }).then(response => { this.usernameFound = response.data })
            if (await this.username == '') {
                this.usernameFound = ''
            }
            this.loadingUsername = false
        },
        async selectProvince(province) {
            this.city = ''
            this.province = province
            this.isActiveDropdownProvince = false
            await axios.get('/api/geolocation').then(response => this.citiesData = response.data.find(x => x.province === province))
            this.citiesData = await this.citiesData.citiesOrMunicipalities.sort((a, b) => { return a.name > b.name ? 1 : -1 })
        },
        selectCity(city) {
            this.city = city
            this.isActiveDropdownCity = false
        },
        selectPublicType() {
            this.hospitalType = 'Public'
        },
        selectPrivateType() {
            this.hospitalType = 'Private'
        },
        selectStandardPlan() {
            this.pricing = 'Standard'
        },
        selectPremiumPlan() {
            this.pricing = 'Premium'
        },
        provinceDropdown() {
            this.isActiveDropdownProvince = !this.isActiveDropdownProvince
        },
        cityDropdown() {
            this.isActiveDropdownCity = !this.isActiveDropdownCity
        },
        selectSpecialization(specialization) {
            if (!this.specializationsSelected.find(x => x.specialist === specialization)) {
                this.specializationsSelected.push({
                    specialist: specialization
                });
            }
        },
        undoSpecialization(specialization) {
            this.specializationsSelected = this.specializationsSelected.filter(x => x.specialist !== specialization)
        },
        async create() {
            this.passwordNotMatch = false

            if (await this.password !== this.confirmPassword) {
                this.passwordNotMatch = true
            } else {
                this.passwordNotMatch = false
            }

            if (await this.password === this.confirmPassword && !this.usernameFound) {
                try {
                    await axios.post('/api/manager', {
                        pricing: this.pricing,
                        status: 'Inactive',
                        hospital: this.hospital,
                        type: this.hospitalType,
                        email: this.email,
                        province: this.province,
                        city: this.city,
                        barangayORStreet: this.barangayORStreet,
                        postalCode: this.postalCode,
                        location: {
                            type: 'Point',
                            coordinates: [this.longtitude, this.latitude]
                        },
                        specializations: this.specializationsSelected,
                        username: this.username,
                        password: this.password
                    });
                    await this.$store.commit('accountCreated', true)
                    await this.$router.push('/user/manager/login')
                } catch (err) {
                    this.errMsg = err
                }
            }
        }
    }
}
</script>
<style scoped>
.dropdown-menu {
    max-height: 20em;
    overflow: auto;
}

#selectedSpecializations {
    max-height: 26em;
    overflow: auto;
}

@media (max-width: 991.98px) {
    .container {
        width: 100% !important;
    }
}
</style>
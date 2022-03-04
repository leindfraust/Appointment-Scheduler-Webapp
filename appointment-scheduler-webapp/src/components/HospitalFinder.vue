<template>
    <h1 class="title">Find and make an appointment on hospitals near you.</h1>
    <div class="modal" :class="{ 'is-active': isHospitalLoading }">
        <div class="modal-background"></div>
        <div class="modal-content" style="overflow: hidden">
            <div class="loader" style="margin: auto;"></div>
        </div>
    </div>
    <div class="container">
        <div class="dropdown" :class="{ 'is-active': isActiveDropdown }">
            <div class="dropdown-trigger">
                <div class="field">
                    <div class="control">
                        <input
                            class="input"
                            type="text"
                            v-model="province"
                            style="width: 300px;"
                            placeholder="What region are you located?"
                            @click="regionSelect"
                            :disabled="locationPermissionDenied"
                        />
                    </div>
                    <div class="notification is-light is-danger" v-if="locationPermissionDenied">
                        <a class="has-text-success" @click="getUserLocation">Enable</a> location to start booking an
                        <b>appointment</b>.
                    </div>
                </div>
                <div class="dropdown-menu">
                    <div class="dropdown-content has-text-left">
                        <a
                            class="dropdown-item"
                            v-for="geodata in geolocationIndexed"
                            :key="geodata._id"
                            @click="selectRegion(geodata.province)"
                        >{{ geodata.province }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container block" v-if="citiesOrMunicipalities != ''">
        <br />
        <div class="block" v-if="this.checkUser == false">
            <div
                class="notification box"
                id="notification"
                style="width: 50%; margin: auto; background-color: white;"
            >
                You must
                <a class="has-text-success" href="/user/login">login</a>. or
                <a class="has-text-danger" href="/user/signup">create an account</a>. to make an appointment.
            </div>
        </div>
        <div class="columns">
            <div class="column is-2 has-text-left">
                <ul class="box">
                    <p class="title is-5">Filter</p>
                    <div class="field has-text-left">
                        <div class="control">
                            <input
                                class="input"
                                type="text"
                                v-model="hospital"
                                style="width: 300px;"
                                placeholder="Search Hospital..."
                            />
                        </div>
                    </div>
                    <hr />
                    <li>
                        <a @click="filterAll">
                            <span style="color: #b5b5b5">&#183;</span>&nbsp;&nbsp;&nbsp;All
                        </a>
                    </li>
                    <li>
                        <a @click="filterPublic">
                            <span style="color: #b5b5b5">&#183;</span>&nbsp;&nbsp;&nbsp;Public
                        </a>
                    </li>
                    <li>
                        <a @click="filterPrivate">
                            <span style="color: #b5b5b5">&#183;</span>&nbsp;&nbsp;&nbsp;Private
                        </a>
                    </li>
                    <hr />
                    <nav class="breadcrumb has-dot-separator" aria-label="breadcrumbs">
                        <ul>
                            <span style="color: #b5b5b5">&#183;</span>
                            <li
                                v-for="(cityorMunicipality, index) in citiesOrMunicipalities.citiesOrMunicipalities.sort((a, b) => { return a.name > b.name ? 1 : -1 })"
                                :key="index"
                            >
                                <a
                                    @click="filterByCity(cityorMunicipality.name)"
                                >{{ cityorMunicipality.name }}</a>
                            </li>
                        </ul>
                    </nav>
                </ul>
            </div>
            <div class="column" v-if="geoHospitalNearestUser.length !== 0">
                <div
                    class="columns has-text-left box"
                    id="hospital"
                    style="margin-bottom: 5%"
                    v-for="geoHospital in geoHospitalNearestUserIndexed.filter(x => x.type == this.filter1 || x.type == this.filter2).filter(x => x.city.includes(this.city))"
                    :key="geoHospital._id"
                >
                    <div class="column is-5">
                        <figure class="image is-square">
                            <img
                                :src="`https://res.cloudinary.com/leindfraust/image/upload/v1/assets/managers/${geoHospital.hospital}.jpg`"
                            />
                        </figure>
                    </div>
                    <div class="column">
                        <h1 class="title">{{ geoHospital.hospital }}</h1>
                        <p
                            class="subtitle"
                        >📌 {{ geoHospital.barangayORStreet }}, {{ geoHospital.city }}, {{ geoHospital.province }}</p>
                        <iframe width="500" height="300" id="geoIframe"
                            :src="`https://maps.google.com/maps?q=${geoHospital.location.coordinates[1]},${geoHospital.location.coordinates[0]}&hl=es;z=14&amp;output=embed`"
                        ></iframe>
                        <br />
                        <br />
                        <p class="subtitle">Contacts:</p>
                        <ul
                            class="block"
                            v-if="typeof geoHospital.details[0].contacts !== 'undefined'"
                        >
                            <li
                                v-for="contacts in geoHospital.details[0].contacts"
                            >{{ contacts.contact }}</li>
                        </ul>
                        <p
                            class="subtitle"
                        >{{ parseInt(geoHospital.distance) / 1000 }} km away from you.</p>
                        <button
                            class="button is-link"
                            @click="bookAppointment(geoHospital._id)"
                            v-if="checkUser"
                        >Book an Appointment</button>
                    </div>
                </div>
            </div>
            <div class="container box notification is-danger has-text-centered" v-else>
                <h1 class="title" style="margin-top: 12.5%">Hospitals unavailable. Coming soon...</h1>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name: "HospitalFinder",
    computed: {
        geolocationIndexed() {
            return this.geolocation.filter(x => { return x.province.toLowerCase().includes(this.province.toLowerCase()) })
        },
        geoHospitalNearestUserIndexed() {
            if (this.geoHospitalNearestUser) {
                return this.geoHospitalNearestUser.filter(x => { return x.hospital.toLowerCase().includes(this.hospital.toLowerCase()) })
            }
        }
    },
    async created() {
        await axios.get('/api/geolocation').then(response => this.geolocation = response.data)
        await this.getUserLocation();
    },
    async mounted() {
        if (this.$store.state.patientID !== null) {
            this.checkUser = true
        } else {
            this.checkUser = false
        }
    },
    data() {
        return {
            locationPermissionDenied: false,
            city: '',
            isHospitalLoading: false,
            checkUser: '',
            hospital: '',
            geolocation: [],
            filter1: 'Private',
            filter2: 'Public',
            citiesOrMunicipalities: [],
            province: '',
            userLatitude: '',
            userLongitude: '',
            isActiveDropdown: false,
            geoHospitalNearestUser: '',
        }
    },
    methods: {
        async bookAppointment(hospitalID) {
            await this.$store.commit('hospitalID', hospitalID)
            await this.$router.push(`/user/${this.$store.state.patientUsername}/doctors`)
        },
        filterByCity(city) {
            this.city = city
            this.filter1 = 'Private'
            this.filter2 = 'Public'
        },
        filterAll() {
            this.city = ''
            this.filter1 = 'Private'
            this.filter2 = 'Public'
        },
        filterPrivate() {
            this.city = ''
            this.filter1 = 'Private'
            this.filter2 = 'Private'
        },
        filterPublic() {
            this.city = ''
            this.filter1 = 'Public'
            this.filter2 = 'Public'
        },
        regionSelect() {
            if (!this.locationPermissionDenied) {
                this.isActiveDropdown = true
            }
        },
        async selectRegion(province) {
            this.isHospitalLoading = true
            this.province = province
            this.citiesOrMunicipalities = this.geolocation.find(x => x.province === province)
            this.isActiveDropdown = false
            this.$store.commit('disableCSSVH', false)
            await axios.post('/api/geoFindHospitalNearestUser', {
                province: this.province,
                latitude: this.userLatitude,
                longitude: this.userLongitude
            });
            await axios.get('/api/geoHospitalNearestUser').then(response => { this.geoHospitalNearestUser = response.data })
            this.isHospitalLoading = false
        },
        getUserLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.geoUserPosition, this.geoUserPositionError)
            } else {
                alert('Geolocation is not supported by this browser')
            }
        },
        geoUserPosition(position) {
            this.userLatitude = position.coords.latitude
            this.userLongitude = position.coords.longitude
        },
        geoUserPositionError(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    this.locationPermissionDenied = true
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert('Unable to obtain Geolocation information.')
                    break;
                case error.TIMEOUT:
                    alert('Request timed out.')
                    break;
                case error.UNKNOWN_ERROR:
                    alert('An unknown error occured, please try again.')
                    break;
            }
        }
    }
}
</script>
<style scoped>
@media (max-width: 991.98px){
    #geoIframe {
        width: 75vw;
        height: 200px;
    }
}
.loader {
    border: 7px solid #f3f3f3;
    border-radius: 50%;
    border-top: 7px solid gray;
    border-bottom: 7px solid gray;
    width: 60px;
    height: 60px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
    0% {
        -webkit-transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
@media (max-width: 991.98px) {
    #notification {
        width: 100% !important;
    }
    #hospital {
        margin-bottom: 15% !important;
    }
}
</style>
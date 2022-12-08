<template>
    <div class="modal" :class="{ 'is-active': loading }">
        <div class="modal-background"></div>
        <div class="modal-content loader"></div>
    </div>
    <div class="columns">
        <div class="column is-2">
            <ManagerMenuVue />
        </div>
        <div class="column">
            <section class="section">
                <CatchError :err-msg="errMsg" />
                <div class="notification is-light is-info" v-if="hospitalStatus == 'Inactive'">To get started, upload a
                    <b>photo</b> of your hospital and fill in the details of your <b>description</b> and
                    <b>contacts</b>. Activation of the
                    account is only available when you have filled up the <b>description</b> and <b>contacts</b>. Get
                    started by clicking <b>"Edit"</b>.
                    <div class="block"></div>
                    Make sure you <b>upload a photo</b> of your hospital before activating the account.
                </div>
                <div class="box">
                    <h1 class="title">Display Picture</h1>
                    <figure class="image is-16by9" v-if="hospitalStatus !== 'Inactive' && !imgPreview">
                        <img
                            :src="`https://res.cloudinary.com/leindfraust/image/upload/v${new Date().getMonth()}${new Date().getDate()}/assets/managers/${managerHospital}.jpg`" />
                    </figure>
                    <figure class="image is-16by9" v-if="imgPreview">
                        <img :src="imgPreview" />
                    </figure>
                    <!--Hospital picture & upload -->
                    <form id="formUpload" action="/api/imgUploadManager" method="post" enctype="multipart/form-data"
                        style="margin-left: auto; width: 50%" class="form">
                        <div class="control">
                            <input type="hidden" name="hospital" :value="(managerHospital)" />
                            <input class="input" type="file" name="imgFile" @change="fileHandlerInput($event)"
                                required />
                            <div class="block"></div>
                            <div class="buttons is-centered" v-if="imgPreview">
                                <button class="button" type="button" @click="imgPreview = ''">Cancel Upload</button>
                                <button type="submit" value="Upload" class="button is-info">Upload Photo</button>
                            </div>
                        </div>
                    </form>
                    <br />
                    <a class="has-text-info" v-if="!editingMode" @click="editMode">[Edit]</a>
                    <a class="has-text-danger" v-else @click="editModeCancel">[Cancel Editing]</a>
                    <div class="container is-max-desktop">
                        <div class="block">
                            <h1 class="title">Description:</h1>
                            <p class="subtitle" v-if="!editingMode">{{ description }}</p>
                            <form class="form" v-if="editingMode">
                                <div class="control">
                                    <textarea class="textarea" v-model="editDescription"
                                        placeholder="Edit description..."></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="block">
                            <h1 class="title">Contacts:</h1>
                            <ul v-if="!editingMode">
                                <li v-for="(contact, index) in contacts" :key="index">
                                    <p class="subtitle">{{ contact.contact }}</p>
                                </li>
                            </ul>
                            <ul v-else>
                                <li v-for="(contactEdit, index) in editContacts" :key="index">
                                    <p class="subtitle">
                                        {{ contactEdit.contact }}
                                        <a v-if="editingMode" class="has-text-danger"
                                            @click="removeContact(contactEdit.contact)">Remove</a>
                                    </p>
                                </li>
                            </ul>
                            <br />
                            <div class="field has-addons" v-if="editingMode">
                                <div class="control">
                                    <input class="input" type="number" v-model="contact"
                                        placeholder="Add contacts..." />
                                </div>
                                <div class="control">
                                    <button type="submit" class="button is-light" @click="addContact"
                                        :disabled="contact == ''">+</button>
                                </div>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <h1 class="title">Latitude N</h1>
                                <p class="subtitle" v-if="!editingMode">
                                    {{ latitude }}</p>
                                <div class="field" v-if="editingMode">
                                    <input class="input" type="text" v-model="editLatitude" />
                                </div>
                                <h1 class="title">Longitude E</h1>
                                <p class="subtitle" v-if="!editingMode">
                                    {{ longitude }}</p>
                                <div class="field" v-if="editingMode">
                                    <input class="input" type="text" v-model="editLongitude" />
                                </div>
                                <p class="subtitle is-6 has-text-info">To get accurate geological coordinates, please
                                    refer to <a href="https://www.google.com/maps" class="has-text-weight-bold">Google
                                        Maps</a>.</p>
                            </div>
                            <div class="column">
                                <iframe v-if="hospitalData !== ''" width="500" height="500"
                                    :src="`https://maps.google.com/maps?q=${hospitalData.location.coordinates[1]},${hospitalData.location.coordinates[0]}&hl=es;z=14&amp;output=embed`"></iframe>
                            </div>
                        </div>
                    </div>
                    <br />

                    <h1 class="title">Specializations offered</h1>
                    <div class="columns is-multiline" v-if="!editingMode">
                        <div class="column" id="selectedSpecializations">
                            <button v-for="(specialist, index) in hospitalSpecializations" :key="index" class="button"
                                style="margin: 5px">
                                {{ specialist.specialist }}
                            </button>
                        </div>
                    </div>
                    <div class="columns" v-if="editingMode">
                        <div class="column">
                            <label class="label">Selected Specializations</label>
                            <div class="columns is-multiline">
                                <div class="column" id="selectedSpecializations">
                                    <button v-for="(specialist, index) in editHospitalSpecializations" :key="index"
                                        class="button is-light" style="margin: 5px">
                                        {{ specialist.specialist }}&nbsp;
                                        <span class="has-text-danger"
                                            @click="undoSpecialization(specialist.specialist)">X</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <label class="label">Select Specializations</label>
                            <nav class="panel">
                                <div class="panel-block">
                                    <input class="input" type="text" v-model="searchBar" placeholder="Search" />
                                </div>
                                <div style="max-height: 20em; overflow: auto">
                                    <div class="panel-block"
                                        v-for="(specializations, index) in specializationListIndexed" :key="index"
                                        :value="specializations">
                                        <a @click="selectSpecialization(specializations)">{{ specializations }}</a>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                    <div class="control" v-if="hospitalStatus == 'Inactive' && editingMode">
                        <label class="radio">
                            <input type="radio" @click="activateAccount" />
                            Activate this account.
                        </label>
                        <p class="help" v-if="activate">Please make sure you have uploaded a <b>photo</b> of the
                            hospital before activating it. To cancel this, just click <b>"Cancel Editing"</b>.</p>
                    </div>
                    <br />
                    <button class="button is-danger" v-if="editingMode" @click="saveProfileEdit"
                        :disabled="editDescription == '' || editContacts.length == 0 || editLatitude == '' || editLongitude == ''">
                        {{ hospitalStatus === "Inactive" && activate ? "Save changes and activate this account" :
        "Save changes"
                        }}</button>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import CatchError from '../../components/CatchError.vue'
import ManagerMenuVue from '../../components/ManagerMenu.vue'

export default {
    name: 'ManagerProfile',
    components: {
        ManagerMenuVue,
        CatchError
    },
    async mounted() {
        this.loading = true
        await axios.get('/session/manager').then(response => this.managerHospital = response.data.hospital)
        await axios.get('/session/manager').then(response => this.managerHospitalID = response.data._id)
        await axios.post(`/api/manager/${this.managerHospitalID}`).then(response => this.hospitalData = response.data)
        this.hospitalStatus = await this.hospitalData.status
        this.latitude = await this.hospitalData.location.coordinates[1]
        this.longitude = await this.hospitalData.location.coordinates[0]
        this.hospitalSpecializations = await this.hospitalData.specializations
        if (this.hospitalStatus !== "Inactive") {
            this.description = await this.hospitalData.details[0].description
            this.contacts = await this.hospitalData.details[0].contacts
            this.latitude = await this.hospitalData.location.coordinates[1]
            this.longitude = await this.hospitalData.location.coordinates[0]
            this.hospitalSpecializations = await this.hospitalData.specializations
        }
        this.loading = false
    },
    computed: {
        specializationListIndexed() {
            return this.specializationList.filter(x => x.toLowerCase().includes(this.searchBar.toLowerCase()))
        }
    },
    data() {
        return {
            errMsg: '',
            searchBar: '',
            specializationList: this.$store.getters.getSpecializationList,
            loading: false,
            hospitalStatus: '',
            activate: false,
            managerHospital: '',
            managerHospitalID: '',
            editingMode: false,
            editDescription: '',
            editContacts: [],
            editLatitude: '',
            editLongitude: '',
            hospitalSpecializations: [],
            editHospitalSpecializations: [],
            latitude: '',
            longitude: '',
            description: '',
            contact: '',
            contacts: [],
            hospitalData: '',
            details: [],
            coordinates: [],
            imgPreview: '',
            fileHandler: ''
        }
    },
    methods: {
        fileHandlerInput(e) {
            this.fileHandler = e.target.files[0]
            this.imgPreview = URL.createObjectURL(this.fileHandler)
            this.$store.commit('imgSuccessManager', true);
        },
        editMode() {
            this.editingMode = true
            this.editDescription = this.description
            this.editContacts = [...this.contacts]
            this.editLatitude = this.latitude
            this.editLongitude = this.longitude
            this.editHospitalSpecializations = [...this.hospitalSpecializations]
        },
        editModeCancel() {
            this.editingMode = false
            this.editDescription = ''
            this.editContacts = []
            this.editLatitude = ''
            this.editLongitude = ''
            this.editHospitalSpecializations = []
            if (this.hospitalStatus == 'Inactive') {
                this.activate = false
            }
        },
        addContact() {
            this.editContacts.push({
                contact: this.contact
            });

            this.contact = ''
        },
        removeContact(contact) {
            this.editContacts = this.editContacts.filter(x => x.contact !== contact)
        },
        activateAccount() {
            this.activate = true
        },
        selectSpecialization(specialization) {
            if (!this.editHospitalSpecializations.find(x => x.specialist === specialization)) {
                this.editHospitalSpecializations.push({
                    specialist: specialization
                });
            }
        },
        undoSpecialization(specialization) {
            this.editHospitalSpecializations = this.editHospitalSpecializations.filter(x => x.specialist !== specialization)
        },
        async saveProfileEdit() {
            if (this.editDescription !== '' && this.editContacts.length !== 0 && this.editLongitude !== '' && this.editLongitude !== '' && this.editHospitalSpecializations) {
                this.details.push({
                    description: this.editDescription,
                    contacts: this.editContacts
                });
                this.coordinates.push(this.editLongitude, this.editLatitude);
                if (this.activate) {
                    await axios.put(`/api/manager/${this.managerHospitalID}`, {
                        details: this.details,
                        specializations: this.editHospitalSpecializations,
                        location: {
                            type: 'Point',
                            coordinates: this.coordinates
                        },
                        status: 'Active'
                    }).catch(err => this.errMsg = err);
                } else {
                    await axios.put(`/api/manager/${this.managerHospitalID}`, {
                        details: this.details,
                        specializations: this.editHospitalSpecializations,
                        location: {
                            type: 'Point',
                            coordinates: this.coordinates
                        }
                    }).catch(err => this.errMsg = err);
                }

                await axios.get('/api/manager').then(response => this.hospitalData = response.data.find(x => x._id == this.managerHospitalID))
                this.description = await this.hospitalData.details[0].description
                this.contacts = await this.hospitalData.details[0].contacts
                this.hospitalStatus = await this.hospitalData.status
                this.latitude = await this.hospitalData.location.coordinates[1]
                this.longitude = await this.hospitalData.location.coordinates[0]
                this.hospitalSpecializations = await this.hospitalData.specializations

                this.editingMode = false
                this.editDescription = ''
                this.editContacts = []
                this.editLongitude = ''
                this.editLatitude = ''
                this.editHospitalSpecializations = []
                this.details = []
                this.coordinates = []
                this.activate = false
            }
        }
    }
}
</script>
<style scoped>
#selectedSpecializations {
    max-height: 26em;
    overflow: auto;
}
</style>
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
                <h1 class="title">PROFILE</h1>
                <div
                    class="notification is-light is-info"
                    v-if="hospitalStatus == 'Inactive'"
                >To get started, upload a photo of your hospital and fill in the details of your description and contacts. Activation of the account is available when editing.</div>
                <div class="columns box">
                    <div class="column">
                        <figure class="image is-16by9">
                            <img
                                :src="`https://res.cloudinary.com/leindfraust/image/upload/v1/assets/managers/${managerHospital}.jpg`"
                            />
                        </figure>
                        <!--Hospital picture & upload -->
                        <form
                            id="formUpload"
                            action="/api/imgUploadManager"
                            method="post"
                            enctype="multipart/form-data"
                            style="margin: auto; width: 50%"
                            class="field"
                        >
                            <div class="control">
                                <input type="hidden" name="hospital" :value="(managerHospital)" />
                                <input
                                    class="input"
                                    type="file"
                                    name="imgFile"
                                    @click="imgSuccess"
                                    required
                                />
                                <div class="has-text-centered">
                                    <button
                                        type="submit"
                                        value="Upload"
                                        class="button is-primary"
                                    >Change profile picture</button>
                                </div>
                            </div>
                        </form>
                        <br />
                        <div class="container has-text-centered">
                            <iframe
                                v-if="hospitalData !== ''"
                                width="300"
                                height="300"
                                :src="`https://maps.google.com/maps?q=${hospitalData.location.coordinates[1]},${hospitalData.location.coordinates[0]}&hl=es;z=14&amp;output=embed`"
                            ></iframe>
                        </div>
                    </div>
                    <div class="column">
                        <a class="has-text-info" v-if="!editingMode" @click="editMode">[Edit]</a>
                        <a class="has-text-danger" v-else @click="editModeCancel">[Cancel Editing]</a>
                        <div class="container">
                            <div class="block">
                                <h1 class="title">Description:</h1>
                                <p class="subtitle" v-if="!editingMode">{{ description }}</p>
                                <form class="form" v-if="editingMode">
                                    <div class="control">
                                        <textarea
                                            class="textarea"
                                            v-model="editDescription"
                                            placeholder="Edit description..."
                                        ></textarea>
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
                                            <a
                                                v-if="editingMode"
                                                class="has-text-danger"
                                                @click="removeContact(contactEdit.contact)"
                                            >Remove</a>
                                        </p>
                                    </li>
                                </ul>
                                <br />
                                <div class="field has-addons" v-if="editingMode">
                                    <div class="control">
                                        <input
                                            class="input"
                                            type="number"
                                            v-model="contact"
                                            placeholder="Add contacts..."
                                        />
                                    </div>
                                    <div class="control">
                                        <button
                                            type="submit"
                                            class="button is-light"
                                            @click="addContact"
                                            :disabled="contact == ''"
                                        >+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div class="control" v-if="hospitalStatus == 'Inactive' && editingMode">
                            <label class="radio">
                                <input type="radio" @click="activateAccount" />
                                Activate this account.
                            </label>
                        </div>
                        <br />
                        <button
                            class="button is-danger"
                            v-if="editingMode"
                            @click="saveProfileEdit"
                        >Save Changes</button>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import ManagerMenuVue from '../../components/ManagerMenu.vue'

export default {
    name: 'ManagerProfile',
    components: {
        ManagerMenuVue
    },
    async created() {
        this.loading = true
        await axios.get('/session/manager').then(response => this.managerHospital = response.data.hospital)
        await axios.get('/session/manager').then(response => this.managerHospitalID = response.data._id)
        await axios.get('/api/manager').then(response => this.hospitalData = response.data.find(x => x._id == this.managerHospitalID))
        this.description = await this.hospitalData.details[0].description
        this.contacts = await this.hospitalData.details[0].contacts
        this.hospitalStatus = await this.hospitalData.status
        this.loading = false
    },
    data() {
        return {
            loading: false,
            hospitalStatus: '',
            activate: false,
            managerHospital: '',
            managerHospitalID: '',
            editingMode: false,
            editDescription: '',
            editContacts: [],
            description: '',
            contact: '',
            contacts: [],
            hospitalData: '',
            details: []
        }
    },
    methods: {
        async imgSuccess() {
            this.$store.commit('imgSuccessManager', true);
        },
        editMode() {
            this.editingMode = true
            this.editDescription = this.description
            this.editContacts = [...this.contacts]
        },
        editModeCancel() {
            this.editingMode = false
            this.editDescription = ''
            this.editContacts = []
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
        async saveProfileEdit() {
            this.details.push({
                description: this.editDescription,
                contacts: this.editContacts
            });
            if (this.activate) {
                await axios.put(`/api/manager/${this.managerHospitalID}`, {
                    details: this.details,
                    status: 'Active'
                });
            } else {
                await axios.put(`/api/manager/${this.managerHospitalID}`, {
                    details: this.details
                });
            }

            await axios.get('/api/manager').then(response => this.hospitalData = response.data.find(x => x._id == this.managerHospitalID))
            this.description = await this.hospitalData.details[0].description
            this.contacts = await this.hospitalData.details[0].contacts
            this.hospitalStatus = await this.hospitalData.status

            this.editingMode = false
            this.editDescription = ''
            this.editContacts = []
            this.details = []
            this.activate = false
        }
    }
}
</script>
<style>
</style>
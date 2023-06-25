<script setup>
import axios from 'axios'
import CatchError from '../../components/CatchError.vue'
import ManagerMenuVue from '../../components/ManagerMenu.vue'
import { ref, onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const errMsg = ref('')
const searchBar = ref('')
const specializationList = ref(store.getters.getSpecializationList)
const loading = ref(false)
const hospitalStatus = ref('')
const activate = ref(false)
const managerHospital = ref('')
const managerHospitalID = ref('')
const editingMode = ref(false)
const editDescription = ref('')
const editContacts = ref([])
const editLatitude = ref('')
const editLongitude = ref('')
const hospitalSpecializations = ref([])
const editHospitalSpecializations = ref([])
const latitude = ref('')
const longitude = ref('')
const description = ref('')
const contact = ref('')
const contacts = ref([])
const hospitalData = ref('')
const details = ref([])
const coordinates = ref([])
const imgPreview = ref('')
const fileHandler = ref('')

const specializationListIndexed = computed(() => specializationList.value.filter(x => x.toLowerCase().includes(searchBar.value.toLowerCase())))

onBeforeMount(async () => {
    loading.value = true
    await axios.get('/session/manager').then(response => managerHospital.value = response.data.hospital)
    await axios.get('/session/manager').then(response => managerHospitalID.value = response.data._id)
    await axios.post(`/api/manager/${managerHospitalID.value}`).then(response => hospitalData.value = response.data)
    hospitalStatus.value = await hospitalData.value.status
    latitude.value = await hospitalData.value.location.coordinates[1]
    longitude.value = await hospitalData.value.location.coordinates[0]
    hospitalSpecializations.value = await hospitalData.value.specializations
    if (hospitalStatus.value !== "Inactive") {
        description.value = await hospitalData.value.details[0].description
        contacts.value = await hospitalData.value.details[0].contacts
        latitude.value = await hospitalData.value.location.coordinates[1]
        longitude.value = await hospitalData.value.location.coordinates[0]
        hospitalSpecializations.value = await hospitalData.value.specializations
    }
    loading.value = false
})

function fileHandlerInput(e) {
    fileHandler.value = e.target.files[0]
    imgPreview.value = URL.createObjectURL(fileHandler.value)
    store.commit('imgSuccessManager', true);
}
function editMode() {
    editingMode.value = true
    editDescription.value = description.value
    editContacts.value = [...contacts.value]
    editLatitude.value = latitude.value
    editLongitude.value = longitude.value
    editHospitalSpecializations.value = [...hospitalSpecializations.value]
}
function editModeCancel() {
    editingMode.value = false
    editDescription.value = ''
    editContacts.value = []
    editLatitude.value = ''
    editLongitude.value = ''
    editHospitalSpecializations.value = []
    if (hospitalStatus.value == 'Inactive') {
        activate.value = false
    }
}
function addContact() {
    editContacts.value.push({
        contact: contact.value
    });

    contact.value = ''
}
function removeContact(contact) {
    editContacts.value = editContacts.value.filter(x => x.contact !== contact)
}
function activateAccount() {
    activate.value = true
}
function selectSpecialization(specialization) {
    if (!editHospitalSpecializations.value.find(x => x.specialist === specialization)) {
        editHospitalSpecializations.value.push({
            specialist: specialization
        });
    }
}
function undoSpecialization(specialization) {
    editHospitalSpecializations.value = editHospitalSpecializations.value.filter(x => x.specialist !== specialization)
}
async function saveProfileEdit() {
    if (editDescription.value !== '' && editContacts.value.length !== 0 && editLongitude.value !== '' && editLongitude.value !== '' && editHospitalSpecializations.value) {
        details.value.push({
            description: editDescription.value,
            contacts: editContacts.value
        });
        coordinates.value.push(editLongitude.value, editLatitude.value);
        if (activate.value) {
            await axios.put(`/api/manager/${managerHospitalID.value}`, {
                details: details.value,
                specializations: editHospitalSpecializations.value,
                location: {
                    type: 'Point',
                    coordinates: coordinates.value
                },
                status: 'Active'
            }).catch(err => errMsg.value = err);
        } else {
            await axios.put(`/api/manager/${managerHospitalID.value}`, {
                details: details.value,
                specializations: editHospitalSpecializations.value,
                location: {
                    type: 'Point',
                    coordinates: coordinates.value
                }
            }).catch(err => errMsg.value = err);
        }

        await axios.get('/api/manager').then(response => hospitalData.value = response.data.find(x => x._id == managerHospitalID.value))
        description.value = await hospitalData.value.details[0].description
        contacts.value = await hospitalData.value.details[0].contacts
        hospitalStatus.value = await hospitalData.value.status
        latitude.value = await hospitalData.value.location.coordinates[1]
        longitude.value = await hospitalData.value.location.coordinates[0]
        hospitalSpecializations.value = await hospitalData.value.specializations

        editingMode.value = false
        editDescription.value = ''
        editContacts.value = []
        editLongitude.value = ''
        editLatitude.value = ''
        editHospitalSpecializations.value = []
        details.value = []
        coordinates.value = []
        activate.value = false
    }
}

</script>
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
                            <input class="input" type="file" name="imgFile" @change="fileHandlerInput($event)" required />
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
                                    <input class="input" type="number" v-model="contact" placeholder="Add contacts..." />
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
                                    <div class="panel-block" v-for="(specializations, index) in specializationListIndexed"
                                        :key="index" :value="specializations">
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
<style scoped>
#selectedSpecializations {
    max-height: 26em;
    overflow: auto;
}
</style>
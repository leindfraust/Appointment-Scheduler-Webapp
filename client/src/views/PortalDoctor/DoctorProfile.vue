<script setup>
import axios from "axios";
import DoctorMenu from "../../components/DoctorMenu.vue";
import { useStore } from "vuex";
import { ref, onBeforeMount } from "vue";

const store = useStore()

const alias = ref(store.state.alias)
const fullname = ref(null)
const infoValidate = ref(null)
const infoValidateMessage = ref(null)
const doctorDetails = ref(null)
const id = ref(null)
const hospitalOrigin = ref(null)
const specialist = ref(null)
const hospital = ref(null)
const gmail = ref(null)
const specializationList = ref(store.getters.getSpecializationList)
const hospitalList = ref([])
const isActiveDropdownSpecialist = ref(false)
const licenseNo = ref(null)
const verified = ref(null)
const modalActive = ref(false)
const registrationCode = ref('')
const errorCode = ref(false)
const duplicateHospital = ref(false)
const fileReady = ref(false)
const imgPreviewFile = ref(null)

onBeforeMount(async () => {
  await axios.get("/session/doctor").then(response => doctorDetails.value = response.data)
  verified.value = await doctorDetails.value.verified
  licenseNo.value = await doctorDetails.value.licenseNo
  fullname.value = await doctorDetails.value.fullname
  id.value = await doctorDetails.value._id
  specialist.value = await doctorDetails.value.specialist
  gmail.value = await doctorDetails.value.gmail
  hospitalOrigin.value = await doctorDetails.value.hospitalOrigin
  await axios.get('/api/manager').then(response => hospitalList.value = response.data)
})

async function updateInfo() {
  if (!verified.value) {
    await axios.put(`/api/doctor/${id.value}`, {
      licenseNo: licenseNo.value,
      name: fullname.value,
      gmail: gmail.value
    })
    await axios.put("/session/doctor", {
      licenseNo: licenseNo.value,
      fullname: fullname.value, //session schema
      gmail: gmail.value
    })
    await axios
      .get("/session/doctor")
      .then((response) => (fullname.value = response.data.fullname));

    infoValidate.value = true
    infoValidateMessage.value = "changes saved successfully"
  }
}
function handleFile(e) {
  imgPreviewFile.value = URL.createObjectURL(e.target.files[0])
  fileReady.value = true
  store.commit('imgSuccess', true)
}
function dropdownSpecialist() {
  isActiveDropdownSpecialist.value = !isActiveDropdownSpecialist.value
}
async function addSpecialization(specialistParam) {
  if (!specialist.value.find(x => x === specialistParam)) {
    specialist.value.push(specialistParam)
    isActiveDropdownSpecialist.value = false
    await axios.put(`/api/doctor/${id.value}`, {
      specialist: specialist.value
    });
    await axios.put('/session/doctor', {
      specialist: specialist.value
    });
    await axios.get('/session/doctor').then(response => specialist.value = response.data.specialist)
  }
}
async function addHospital() {
  errorCode.value = false
  duplicateHospital.value = false
  await axios.post('/api/doctor/check_registrationCode', {
    registrationCode: registrationCode.value
  }).then(response => hospital.value = response.data)
  if (hospital.value) {
    if (hospitalOrigin.value.find(x => x.hospital == hospital.value.hospital)) {
      duplicateHospital.value = true
    } else {
      hospitalOrigin.value.push({ hospital: hospital.value.hospital })
      await axios.put(`/api/doctor/${id.value}`, {
        hospitalOrigin: hospitalOrigin.value
      });
      await axios.put('/session/doctor', {
        hospitalOrigin: hospitalOrigin.value
      });
      await axios.get('/session/doctor').then(response => hospitalOrigin.value = response.data.hospitalOrigin)
      modalActive.value = false
    }
  } else {
    errorCode.value = true
  }
}
async function pullSpecialization(specializationParam) {
  specialist.value = specialist.value.filter(x => x !== specializationParam)
  await axios.put(`/api/doctor/${id.value}`, {
    specialist: specialist.value
  });
  await axios.put('/session/doctor', {
    specialist: specialist.value
  });
  await axios.get('/session/doctor').then(response => specialist.value = response.data.specialist)
}
async function pullHospital(hospitalParam) {
  hospitalOrigin.value = hospitalOrigin.value.filter(x => x.hospital !== hospitalParam)
  await axios.put(`/api/doctor/${id.value}`, {
    hospitalOrigin: hospitalOrigin.value
  });
  await axios.put('/session/doctor', {
    hospitalOrigin: hospitalOrigin.value
  });
  await axios.get('/session/doctor').then(response => hospitalOrigin.value = response.data.hospitalOrigin)
}
function modalClose() {
  modalActive.value = false
}
</script>
<template>
  <div class="main-doctor">
    <div class="columns">
      <div class="column is-2">
        <DoctorMenu />
      </div>
      <div class="column main-doctor-content">
        <section class="section">
          <h1 class="title">PROFILE</h1>
          <div class="container box is-fluid">
            <article class="message is-danger" v-if="!verified">
              <div class="message-header">
                <p>YOU ARE NOT VERIFIED ❌</p>
              </div>
              <div class="message-body">
                To get started, please visit
                <b>Security</b> tab under
                <b>VERIFICATION AND INFORMATION.</b>
              </div>
            </article>
            <article class="message is-success" v-if="verified">
              <div class="message-header">
                <p>YOU ARE VERIFIED ✓</p>
              </div>
              <div class="message-body">
                Your basic information is
                <b>locked</b>. To edit, please go to the
                <b>Security</b> tab.
              </div>
            </article>
            <div class="columns">
              <div class="column is-4">
                <form id="formUpload" action="/api/imgUpload" method="post" enctype="multipart/form-data">
                  <figure class="image image-outer is-square">
                    <img class="is-rounded image-inner" v-if="imgPreviewFile" :src="imgPreviewFile" />
                    <img class="is-rounded image-inner" v-else
                      :src="`http://res.cloudinary.com/leindfraust/image/upload/v${new Date().getMonth()}${new Date().getDate()}/assets/doctors/${alias}.jpg`">
                    <div class="buttons is-hidden-mobile" style="bottom: 5%; right: 10%; position: absolute">
                      <label for="file-input" style="cursor: pointer"><a class="button is-medium is-responsive"><i
                            class="fa-solid fa-camera"></i>
                        </a></label>
                    </div>
                    <div class="buttons is-hidden-desktop" style="bottom: 15%; left:75%; position: absolute">
                      <label for="file-input" style="cursor: pointer"><a class="button is-medium is-responsive"><i
                            class="fa-solid fa-camera"></i>
                        </a></label>
                    </div>
                  </figure>
                  <div class="control">
                    <input type="hidden" name="alias" :value="(alias)" />
                    <input class="input is-hidden" id="file-input" type="file" name="imgFile" @change="handleFile($event)"
                      required />
                  </div>
                  <div class="buttons is-centered" v-if="fileReady">
                    <button type="button" class="button" @click="fileReady = false, imgPreviewFile = null">Cancel</button>
                    <button type="submit" value="Upload" class="button is-info">Upload Picture</button>
                  </div>
                </form>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">
                    <b>License No.</b>
                  </label>
                  <div class="control">
                    <input class="input" type="text" v-model="licenseNo" style="width: 33%"
                      :disabled="verified == true" />
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-body">
                    <div class="field">
                      <label class="label">
                        <b>Full Name:</b>
                      </label>
                      <div class="control">
                        <input class="input" size="5" type="text" v-model="fullname" :disabled="verified == true" />
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">
                        <b>Email:</b>
                      </label>
                      <div class="control">
                        <input class="input" size="5" type="text" v-model="gmail" :disabled="verified == true" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <button v-if="!verified" class="button is-link" type="button" @click="updateInfo">Save
                      changes</button>
                    <div v-if="infoValidate" class="notification is-success is-light">{{ infoValidateMessage }}</div>
                  </div>
                </div>
                <div class="field">
                  <label class="label">
                    <b>Managed Hospitals:</b>
                  </label>
                  <div class="control">
                    <div class="buttons">
                      <button class="button" v-for="hospitals in hospitalOrigin" :key="hospitals.hospital">
                        {{ hospitals.hospital }}&nbsp;
                        <span class="has-text-danger" @click="pullHospital(hospitals.hospital)">x</span>
                      </button>&nbsp;
                      <button @click="modalActive = !modalActive" class="button">+</button>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <label class="label">
                    <b>Specializations:</b>
                  </label>
                  <div class="control">
                    <button class="button" style="margin: 5px; margin-top: auto"
                      v-for="(specializations, index) in specialist" :key="index">
                      {{ specializations }}&nbsp;
                      <span class="has-text-danger" @click="pullSpecialization(specializations)">x</span>
                    </button>&nbsp;
                    <div class="dropdown" :class="{ 'is-active': isActiveDropdownSpecialist }">
                      <div class="dropdown-trigger">
                        <button @click="dropdownSpecialist" class="button">+</button>
                      </div>
                      <div class="dropdown-menu">
                        <div class="dropdown-content" v-for="(specialist, index) in specializationList" :key="index">
                          <a class="dropdown-item" @click="addSpecialization(specialist)">{{ specialist }}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal" :class="{ 'is-active': modalActive }">
            <div class="modal-background"></div>
            <div class="modal-content">
              <section class="section box">
                <div v-if="errorCode" class="notification is-danger">Invalid registration code.</div>
                <div v-if="duplicateHospital" class="notification is-warning">Hospital has already been registered</div>
                <div class="field">
                  <label class="label">Input the hospital's registration code.</label>
                  <div class="control">
                    <input class="input" v-model="registrationCode" type="text" placeholder="registration code" />
                  </div>
                  <br />
                  <div class="has-text-centered">
                    <button class="button is-info" @click="addHospital"
                      :disabled="registrationCode == ''">Confirm</button>
                  </div>
                </div>
              </section>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="modalClose"></button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown-menu {
  max-height: 12em;
  overflow: auto;
}
</style>
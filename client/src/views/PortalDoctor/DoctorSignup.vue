<script setup>
import axios from 'axios'
import { ref, computed } from 'vue'
import { useStore } from 'vuex';


const store = useStore()

const licenseCode = ref('')
const alias = ref('')
const name = ref('')
const registrationCode = ref('')
const username = ref('')
const password = ref('')
const passwordRepeat = ref('')
const gmail = ref('')
const passwordMatch = ref(null)
const aliasFound = ref('')
const usernameFound = ref('')
const registrationCodeFound = ref('')
const emailFound = ref('')
const loadingUsername = ref(false)
const loadingAlias = ref(false)
const loadingRegistrationCode = ref(false)
const loadingEmail = ref(false)
const specializationsSelected = ref([])
const specializationList = ref(store.getters.getSpecializationList)
const searchBarSpecialization = ref('')
const errMsg = ref('')
const searchTimeoutUsername = ref(null)
const searchTimeoutAlias = ref(null)
const searchTimeoutRegistrationCode = ref(null)
const searchTimeoutEmail = ref(null)

const specializationListIndexed = computed(() => specializationList.value.filter(x => x.toLowerCase().includes(searchBarSpecialization.value.toLowerCase())))

async function registrationCodeFindTimeout() {
  if (searchTimeoutRegistrationCode.value) {
    clearTimeout(searchTimeoutRegistrationCode.value)
    searchTimeoutRegistrationCode.value = null
  }
  searchTimeoutRegistrationCode.value = setTimeout(registrationCodeFinder, 500)
}
async function emailFindTimeout() {
  if (searchTimeoutEmail.value) {
    clearTimeout(searchTimeoutEmail.value)
    searchTimeoutEmail.value = null
  }
  searchTimeoutEmail.value = setTimeout(emailFinder, 500)
}
async function usernameFindTimeout() {
  if (searchTimeoutUsername.value) {
    clearTimeout(searchTimeoutUsername.value)
    searchTimeoutUsername.value = null
  }
  searchTimeoutUsername.value = setTimeout(usernameFinder, 500)
}
async function aliasFindTimeout() {
  if (searchTimeoutAlias.value) {
    clearTimeout(searchTimeoutAlias.value)
    searchTimeoutAlias.value = null
  }
  searchTimeoutAlias.value = setTimeout(aliasFinder, 500)
}
async function registrationCodeFinder() {
  loadingRegistrationCode.value = true
  await axios.post('/api/doctor/check_registrationCode', {
    registrationCode: registrationCode.value
  }).then(response => {
    registrationCodeFound.value = response.data
  });
  if (registrationCode.value == '') {
    registrationCodeFound.value = ''
  }
  loadingRegistrationCode.value = false
}
async function emailFinder() {
  loadingEmail.value = true
  await axios.post('/api/doctor/check_email', {
    email: gmail.value
  }).then(response => {
    emailFound.value = response.data
  })
  if (gmail.value == '') {
    emailFound.value = ''
  }
  loadingEmail.value = false
}
async function usernameFinder() {
  loadingUsername.value = true
  usernameFound.value = false
  await axios.post('/api/user/check_username', {
    username: username.value
  }).then(response => {
    if (response.data) {
      usernameFound.value = response.data
    }
  })
  await axios.post('/api/doctor/check_username', {
    username: username.value
  }).then(response => {
    if (response.data) {
      usernameFound.value = response.data
    }
  })
  await axios.post('/api/manager/check_username', {
    username: username.value
  }).then(response => {
    if (response.data) {
      usernameFound.value = response.data
    }
  })
  if (username.value == '') {
    usernameFound.value = ''
  }
  loadingUsername.value = false
}
async function aliasFinder() {
  loadingAlias.value = true
  await axios.post('/api/doctor/check_alias', {
    alias: alias.value
  }).then(response => {
    aliasFound.value = response.data
  })
  if (alias.value == '') {
    aliasFound.value = ''
  }
  loadingAlias.value = false
}
async function create(e) {
  //password, alias and username checks
  if ((password.value) !== passwordRepeat.value) {
    passwordMatch.value = "password do not match";
    await e.preventDefault();
    if (registrationCode.value) {
      if (registrationCodeFound.value != null || !registrationCodeFound.value) {
        await e.preventDefault();
      }
    }
    if (alias.value) {
      if (aliasFound.value == null || aliasFound.value) {
        await e.preventDefault();
      }
    }
    if (username.value) {
      if (usernameFound.value == null || usernameFound.value) {
        await e.preventDefault();
      }
    }
  } else {
    passwordMatch.value = null;

    if (registrationCode.value) {
      if (registrationCodeFound.value == null || !registrationCodeFound.value) {
        await e.preventDefault();
      }
    }
    if (alias.value) {
      if (aliasFound.value == null || aliasFound.value) {
        await e.preventDefault();
      }
    }
    if (username.value) {
      if (usernameFound.value == null || usernameFound.value) {
        await e.preventDefault();
      }
    }
  }
  //if no errors, proceed to POST
  if (password.value === passwordRepeat.value &&
    !aliasFound.value &&
    !usernameFound.value &&
    !emailFound.value &&
    registrationCodeFound.value // only passes when a registration code is found
  ) {
    await axios.post("/api/doctor", {
      alias: alias.value,
      licenseNo: licenseCode.value,
      name: name.value,
      gmail: gmail.value,
      specialist: specializationsSelected.value,
      username: username.value,
      password: password.value,
      hospitalOrigin: [registrationCodeFound.value]
    }).catch(err => errMsg.value = err);
    store.commit("imgSuccess", true)
  }
}
function selectSpecialization(specialization) {
  if (!specializationsSelected.value.find(x => x === specialization)) {
    specializationsSelected.value.push(specialization);
  }
}
function undoSpecialization(specialization) {
  specializationsSelected.value = specializationsSelected.value.filter(x => x !== specialization)
}

</script>
<template>
  <section class="section">
    <router-link :to="'/account/login'"><i class="fa-solid fa-arrow-left"></i> Back to Login</router-link>
    <div class="container box animate__animated animate__fadeInLeft" style="margin: auto; width: 50%">
      <div class="notification is-danger" v-if="errMsg">
        Oops, something went wrong. Try again later or
        <router-link :to="'/contactus'">contact us</router-link>
      </div>
      <form action="/api/imgUploadDoctor" method="post" enctype="multipart/form-data">
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <label class="label">License code:</label>
              <div class="control">
                <input class="input" type="text" v-model="licenseCode" placeholder="license code" required />
              </div>
            </div>
            <div class="field">
              <label class="label">Alias</label>
              <span v-if="aliasFound !== ''">
                <p class="help is-danger" v-if="aliasFound">
                  Unavailable
                  <i class="fas fa-spinner fa-spin" v-if="loadingAlias"></i>
                </p>
                <p class="help is-success" v-else>
                  Available
                  <i class="fas fa-spinner fa-spin" v-if="loadingAlias"></i>
                </p>
              </span>
              <div class="control">
                <input class="input" type="text" v-model="alias" placeholder="alias" name="alias" required
                  @input="aliasFindTimeout" />
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="field-body">
            <div class="field">
              <label class="label">Full Name</label>
              <div class="control">
                <input class="input" type="text" v-model="name"
                  placeholder="Last name, First name, Extension name, Middle name" required />
              </div>
            </div>
            <div class="field">
              <label class="label">Profile Picture</label>
              <div class="control">
                <input class="input" type="file" name="imgFile" required />
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Registration Code</label>
          <div v-if="registrationCodeFound !== ''">
            <p class="help is-success" v-if="registrationCodeFound">
              Registration code is correct.
              <i class="fas fa-spinner fa-spin" v-if="loadingRegistrationCode"></i>
            </p>
            <p class="help is-danger" v-else>
              Incorrect registration code, please refer to your hospital for your registration code.
              <i class="fas fa-spinner fa-spin" v-if="loadingRegistrationCode"></i>
            </p>
          </div>
          <div class="control">
            <input class="input" type="text" v-model="registrationCode" @input="registrationCodeFindTimeout"
              placeholder="registration code" required />
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <label class="label">Username</label>
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
              <div class="control">
                <input class="input" type="text" v-model="username" @input="usernameFindTimeout" placeholder="username"
                  required />
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div v-if="emailFound !== ''">
                <p class="help is-danger" v-if="emailFound">
                  Unavailable
                  <i class="fas fa-spinner fa-spin" v-if="loadingEmail"></i>
                </p>
                <p class="help is-success" v-else>
                  Available
                  <i class="fas fa-spinner fa-spin" v-if="loadingEmail"></i>
                </p>
              </div>
              <div class="control">
                <input class="input" type="email" v-model="gmail" @input="emailFindTimeout" placeholder="gmail"
                  required />
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input class="input" type="password" v-model="password" placeholder="password" required />
              </div>
              <p class="subtitle has-text-danger">{{ passwordMatch }}</p>
            </div>
            <div class="field">
              <label class="label">Repeat Password</label>
              <div class="control">
                <input class="input" type="password" v-model="passwordRepeat" placeholder="repeat password" required />
              </div>
              <p class="subtitle has-text-danger">{{ passwordMatch }}</p>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <label class="label">Specializations you possess(Select all that applies)</label>
            <nav class="panel">
              <div class="panel-block">
                <input class="input" type="text" v-model="searchBarSpecialization" placeholder="Search" />
              </div>
              <div style="max-height: 20em; overflow: auto">
                <div class="panel-block" v-for="(specializations, index) in specializationListIndexed" :key="index"
                  :value="specializations">
                  <a @click="selectSpecialization(specializations)">{{ specializations }}</a>
                </div>
              </div>
            </nav>
          </div>
          <div class="column">
            <label class="label">Selected</label>
            <div class="columns is-multiline">
              <div class="column" id="selectedSpecializations" style="max-height: 26em; overflow: auto">
                <button v-for="(specialist, index) in specializationsSelected" type="button" :key="index"
                  class="button is-light" style="margin: 5px;">
                  {{ specialist }}&nbsp;
                  <span class="has-text-danger" @click="undoSpecialization(specialist)">X</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="has-text-right">
          <button type="submit" value="Submit" class="button is-info" @click="create($event)"
            :disabled="specializationsSelected == ''">Create account</button>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
@media (max-width: 991.98px) {
  .container {
    width: 100% !important;
  }
}

.section {
  background: center center no-repeat url('../../assets/images/background-client-signup.png');
  background-size: cover
}
</style>
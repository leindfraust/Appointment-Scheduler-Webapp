<script setup>
import axios from 'axios'
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useUsernameCheck } from '../../composables/usernameCheck'

const store = useStore()
const router = useRouter()

const firstName = ref('')
const lastName = ref('')
const age = ref('')
const contactNum = ref('')
const gmail = ref('')
const currentAddress = ref('')
const username = ref('')
const password = ref('')
const passwordRepeat = ref('')
const sex = ref(null)
const passwordMatch = ref('')
const geolocationData = ref([])
const isActiveDropdownProvince = ref(false)
const isActiveDropdownCity = ref(false)
const city = ref('')
const province = ref('')
const citiesData = ref([])
const termsAndConditionsAgreed = ref(false)
const errMsg = ref('')
const emailFound = ref('')
const loadingEmail = ref(false)
const searchTimeout = ref(null)
const { usernameFound, loadingUsername } = useUsernameCheck(username)
const randomChar = ref('')

onBeforeMount(async () => {
  await axios.get('/api/geolocation').then(response => geolocationData.value = response.data)
})

async function emailFindTimeout() {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
    searchTimeout.value = null
  }
  searchTimeout.value = setTimeout(emailFinder, 500)
}
async function emailFinder() {
  loadingEmail.value = true
  await axios.post('/api/user/check_email', {
    email: gmail.value
  }).then(response => { emailFound.value = response.data })
  if (gmail.value == '') {
    emailFound.value = ''
  }
  loadingEmail.value = false
}
function agreeTermsAndConditions() {
  termsAndConditionsAgreed.value = true
}
function sexMale() {
  sex.value = "Male"
}
function sexFemale() {
  sex.value = "Female"
}
async function selectProvince(provinceParam) {
  city.value = ''
  province.value = provinceParam
  isActiveDropdownProvince.value = false
  await axios.get('/api/geolocation').then(response => citiesData.value = response.data.find(x => x.province === provinceParam))
  citiesData.value = await citiesData.value.citiesOrMunicipalities.sort((a, b) => { return a.name > b.name ? 1 : -1 })
}
function selectCity(cityParam) {
  city.value = cityParam
  isActiveDropdownCity.value = false
}
function provinceDropdown() {
  isActiveDropdownProvince.value = !isActiveDropdownProvince.value
}
function cityDropdown() {
  isActiveDropdownCity.value = !isActiveDropdownCity.value
}
function generateRandomChar() {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < 12; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  randomChar.value = result
}
async function signup() {
  if ((password.value) !== passwordRepeat.value) {
    passwordMatch.value = "password do not match";
  } else {
    passwordMatch.value = null;
  }
  if (password.value === passwordRepeat.value &&
    !usernameFound.value && !emailFound.value
  ) {
    try {
      if (gmail.value == '') {
        generateRandomChar()
      }
      await axios.post("/api/user", {
        username: username.value,
        password: password.value,
        name: [firstName.value, lastName.value],
        age: age.value,
        sex: sex.value,
        contactNum: contactNum.value,
        gmail: gmail.value == '' ? `${randomChar.value}dummyemail@email.com` : gmail.value,
        province: province.value,
        city: city.value,
        currentAddress: currentAddress.value
      });
      store.commit('accountCreated', true)
      await router.push("/account/login");
    } catch (err) {
      errMsg.value = err
    }
  }
}
</script>
<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <router-link :to="'/account/login'"><i class="fa-solid fa-arrow-left"></i> Back to Login</router-link>
        <div class="container" style="width: 50%; margin: auto">
          <div class="notification is-danger" v-if="errMsg">
            Oops, something went wrong. Try again later or
            <router-link :to="'/contactus'">contact us</router-link>
          </div>
          <div class="box">
            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <p class="control">
                    <label class="label">First name:</label>
                    <input class="input" type="text" placeholder="First name" v-model="firstName" required />
                  </p>
                </div>
                <div class="field">
                  <p class="control">
                    <label class="label">Last name:</label>
                    <input class="input" type="text" placeholder="Last name" v-model="lastName" required />
                  </p>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <p class="control">
                    <label class="label">Age:</label>
                    <input class="input" type="number" placeholder="age" v-model="age" required style="width: 150px" />
                  </p>
                </div>

                <br />
                <div class="field">
                  <p class="control">
                    <label class="label">Gender:</label>
                    <label class="radio">
                      <input type="radio" name="sex" @click="sexMale" />
                      Male
                    </label>
                    <label class="radio">
                      <input type="radio" name="sex" @click="sexFemale" />
                      Female
                    </label>
                  </p>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <br />
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <label class="label">Contact Number:</label>
                    <input class="input" type="number" placeholder="contact number" v-model="contactNum" required />
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <label class="label">Email(Optional):</label>
                    <div v-if="emailFound !== ''">
                      <p class="help is-danger" v-if="emailFound">Unavailable<i class="fas fa-spinner fa-spin"
                          v-if="loadingEmail"></i></p>
                      <p class="help is-success" v-else>Available<i class="fas fa-spinner fa-spin"
                          v-if="loadingEmail"></i>
                      </p>
                    </div>
                    <input class="input" type="email" placeholder="gmail" v-model="gmail" @input="emailFindTimeout"
                      required />
                  </div>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <label class="label">Province:</label>
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
                </div>

                <div class="field">
                  <div class="control">
                    <div class="label">City/Municipality:</div>
                    <div class="dropdown" :class="{ 'is-active': isActiveDropdownCity }">
                      <div class="dropdown-trigger">
                        <button class="button" aria-haspopup="true" @click="cityDropdown" :disabled="province == ''">
                          <span v-if="city == ''">Select</span>
                          <span v-else>{{ city }}</span>
                        </button>
                      </div>
                      <div class="dropdown-menu" v-if="province">
                        <div class="dropdown-content" v-for="cities in citiesData" :key="cities.name">
                          <a class="dropdown-item" @click="selectCity(cities.name)">{{ cities.name }}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="field">
              <p class="control">
                <label class="label">Current Address</label>
                <input class="input" type="text" placeholder="your current address" v-model="currentAddress" required />
              </p>
            </div>
            <div class="field">
              <div class="control">
                <label class="label">Username:</label>
                <div v-if="usernameFound !== ''">
                  <p class="help is-danger" v-if="usernameFound">Unavailable<i class="fas fa-spinner fa-spin"
                      v-if="loadingUsername"></i></p>
                  <p class="help is-success" v-else>Available<i class="fas fa-spinner fa-spin" v-if="loadingUsername"></i>
                  </p>
                </div>
                <input class="input" type="text" placeholder="username" v-model="username" required />
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <p class="control">
                    <label class="label">Password:</label>
                    <input class="input" type="password" placeholder="password" v-model="password" required />
                  </p>
                  <p class="subtitle has-text-danger">{{ passwordMatch }}</p>
                </div>
                <div class="field">
                  <p class="control">
                    <label class="label">Repeat Password:</label>
                    <input class="input" type="password" placeholder="repeat password" v-model="passwordRepeat"
                      required />
                  </p>
                  <p class="subtitle has-text-danger">{{ passwordMatch }}</p>
                </div>
              </div>
            </div>
            <label class="checkbox">
              <input type="checkbox" @click="agreeTermsAndConditions" />
              I agree to the
              <router-link :to="'/terms-and-conditions'">terms and conditions</router-link> and <router-link
                :to="'/eula'">End User's License Agreement</router-link>
            </label>
            <br />
            <div class="has-text-right">
              <button class="button is-primary" @click="signup($event)"
                :disabled="firstName == null || lastName == null || age == null || sex == null || contactNum == null || province == null || city == null || currentAddress == null || username == null || password == null || termsAndConditionsAgreed == false">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.hero-body {
  background: center center no-repeat url('../../assets/images/background-client-signup.png');
  background-size: cover
}

.dropdown-menu {
  max-height: 13em;
  overflow: auto;
}

@media (max-width: 991.98px) {
  .container {
    width: 100% !important;
  }
}
</style>
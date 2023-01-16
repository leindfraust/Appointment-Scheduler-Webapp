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
                    <input class="input" type="number" placeholder="age" v-model="age" required />
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
                          <a class="dropdown-item" @click="selectProvince(provinces.province)">{{ provinces.province
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
                  <p class="help is-success" v-else>Available<i class="fas fa-spinner fa-spin"
                      v-if="loadingUsername"></i>
                  </p>
                </div>
                <input class="input" type="text" placeholder="username" v-model="username" @input="usernameFindTimeout"
                  required />
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
              <router-link :to="'/terms-and-conditions'">terms and conditions</router-link>
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
<script>
import axios from 'axios'

export default {
  username: "UserSignUp",
  data() {
    return {
      firstName: '',
      lastName: '',
      age: '',
      contactNum: '',
      gmail: '',
      currentAddress: '',
      username: '',
      password: '',
      passwordRepeat: '',
      sex: null,
      passwordMatch: '',
      geolocationData: [],
      isActiveDropdownProvince: false,
      isActiveDropdownCity: false,
      city: '',
      province: '',
      citiesData: [],
      termsAndConditionsAgreed: false,
      errMsg: '',
      usernameFound: '',
      loadingUsername: false,
      emailFound: '',
      loadingEmail: false,
      searchTimeout: null,
      randomChar: ''
    }
  },
  async mounted() {
    await axios.get('/api/geolocation').then(response => this.geolocationData = response.data)
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
      await axios.post('/api/user/check_username', {
        username: this.username
      }).then(response => { this.usernameFound = response.data })
      if (this.username == '') {
        this.usernameFound = ''
      }
      this.loadingUsername = false
    },
    async emailFindTimeout() {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
        this.searchTimeout = null
      }
      this.searchTimeout = setTimeout(this.emailFinder, 500)
    },
    async emailFinder() {
      this.loadingEmail = true
      await axios.post('/api/user/check_email', {
        email: this.gmail
      }).then(response => { this.emailFound = response.data })
      if (this.gmail == '') {
        this.emailFound = ''
      }
      this.loadingEmail = false
    },
    agreeTermsAndConditions() {
      this.termsAndConditionsAgreed = true
    },
    sexMale() {
      this.sex = "Male"
    },
    sexFemale() {
      this.sex = "Female"
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
    provinceDropdown() {
      this.isActiveDropdownProvince = !this.isActiveDropdownProvince
    },
    cityDropdown() {
      this.isActiveDropdownCity = !this.isActiveDropdownCity
    },
    generateRandomChar() {
      let result = '';
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let charactersLength = characters.length;
      for (let i = 0; i < 12; i++) {
        result += characters.charAt(Math.floor(Math.random() *
          charactersLength));
      }
      this.randomChar = result
    },
    async signup() {
      if ((this.password) !== this.passwordRepeat) {
        this.passwordMatch = "password do not match";
      } else {
        this.passwordMatch = null;
      }
      if (this.password === this.passwordRepeat &&
        !this.usernameFound && !this.emailFound
      ) {
        try {
          if (this.gmail == '') {
            this.generateRandomChar()
          }
          await axios.post("/api/user", {
            username: this.username,
            password: this.password,
            name: [this.firstName, this.lastName],
            age: this.age,
            sex: this.sex,
            contactNum: this.contactNum,
            gmail: this.gmail == '' ? `${this.randomChar}dummyemail@email.com` : this.gmail,
            province: this.province,
            city: this.city,
            currentAddress: this.currentAddress
          });
          await this.$store.commit('accountCreated', true)
          await this.$router.push("/account/login");
        } catch (err) {
          this.errMsg = err
        }
      }
    }
  }
}
</script>
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
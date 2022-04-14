<template>
  <section class="section" style="background-color: whitesmoke;">
    <div class="container box animate__animated animate__fadeInLeft" style="margin: auto; width: 50%">
      <!-- I know it sucks, having a form action for only image upload while separating a post with axios for the document, but shit works so I guess it's okay.-->
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
              <div v-if="aliasFound !== ''">
                <p class="help is-danger" v-if="aliasFound">
                  Unavailable
                  <i class="fas fa-spinner fa-spin" v-if="loadingAlias"></i>
                </p>
                <p class="help is-success" v-else>
                  Available
                  <i class="fas fa-spinner fa-spin" v-if="loadingAlias"></i>
                </p>
              </div>
              <div class="control">
                <input class="input" type="text" v-model="alias" placeholder="alias" name="alias" required
                  @keyup="aliasFindTimeout" />
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
                <input class="input" type="text" v-model="username" @keyup="usernameFindTimeout" placeholder="username"
                  required />
              </div>
            </div>
            <div class="field">
              <label class="label">Gmail</label>
              <div class="control">
                <input class="input" type="email" v-model="gmail" placeholder="gmail" required />
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
          <button type="submit" class="button is-primary" @click="create($event)"
            :disabled="specializationsSelected == ''">Create account</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "SignUp",
  props: {
    licenseCode: String,
    alias: String,
    name: String,
    username: String,
    password: String,
    passwordRepeat: String,
    gmail: String
  },
  computed: {
    specializationListIndexed() {
      return this.specializationList.filter(x => x.toLowerCase().includes(this.searchBarSpecialization.toLowerCase()))
    }
  },
  data() {
    return {
      passwordMatch: null,
      aliasFound: '',
      usernameFound: '',
      loadingUsername: false,
      loadingAlias: false,
      specializationsSelected: [],
      specializationList: this.$store.getters.getSpecializationList,
      searchBarSpecialization: '',
      errMsg: '',
      searchTimeoutUsername: null,
      searchTimeoutAlias: null
    };
  },
  methods: {
    async usernameFindTimeout() {
      if (this.searchTimeoutUsername) {
        clearTimeout(this.searchTimeoutUsername)
        this.searchTimeoutUsername = null
      }
      this.searchTimeoutUsername = setTimeout(this.usernameFinder, 500)
    },
    async aliasFindTimeout() {
      if (this.searchTimeoutAlias) {
        clearTimeout(this.searchTimeoutAlias)
        this.searchTimeoutAlias = null
      }
      this.searchTimeoutAlias = setTimeout(this.aliasFinder, 500)
    },
    async usernameFinder() {
      this.loadingUsername = true
      await axios.post('/api/doctor/check_username', {
        username: this.username
      }).then(response => {
        this.usernameFound = response.data
      })
      if (await this.username == '') {
        this.usernameFound = ''
      }
      this.loadingUsername = false
    },
    async aliasFinder() {
      this.loadingAlias = true
      await axios.post('/api/doctor/check_alias', {
        alias: this.alias
      }).then(response => {
        this.aliasFound = response.data
      })
      if (await this.alias == '') {
        this.aliasFound = ''
      }
      this.loadingAlias = false
    },
    async create(e) {
      //password, alias and username checks
      if ((await this.password) !== this.passwordRepeat) {
        this.passwordMatch = "password do not match";
        if (await this.alias) {
          if (this.aliasFound == '' || this.aliasFound) {
            await e.preventDefault();
          }
        }
        if (await this.username) {
          if (this.usernameFound == '' || this.usernameFound) {
            await e.preventDefault();
          }
        }
        await e.preventDefault();
      } else {
        this.passwordMatch = null;

        if (await this.alias) {
          if (this.aliasFound == '' || this.aliasFound) {
            await e.preventDefault();
          }
        }
        if (await this.username) {
          if (this.usernameFound == '' || this.usernameFound) {
            await e.preventDefault();
          }
        }
      }
      //if no errors, proceed to POST
      if (await this.password === this.passwordRepeat &&
        !this.aliasFound &&
        !this.usernameFound
      ) {
        try {
          await axios.post("/api/doctor", {
            alias: this.alias,
            licenseNo: this.licenseCode,
            name: this.name,
            gmail: this.gmail,
            specialist: this.specializationsSelected,
            username: this.username,
            password: this.password,
          });

          await this.$store.commit("imgSuccess", true)
        } catch (err) {
          this.errMsg = err
        }
      }
    },
    selectSpecialization(specialization) {
      if (!this.specializationsSelected.find(x => x === specialization)) {
        this.specializationsSelected.push(specialization);
      }
    },
    undoSpecialization(specialization) {
      this.specializationsSelected = this.specializationsSelected.filter(x => x !== specialization)
    }
  },
};
</script>

<style scoped>
@media (max-width: 991.98px) {
  .container {
    width: 100% !important;
  }
}
</style>
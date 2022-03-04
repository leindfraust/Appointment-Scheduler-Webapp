<template>
  <section class="section" style="background-color: whitesmoke;">
    <div
      class="container box animate__animated animate__fadeInLeft"
      style="margin: auto; width: 50%"
    >
      <!-- I know it sucks, having a form action for only image upload while separating a post with axios for the document, but shit works so I guess it's okay.-->
      <form action="/api/imgUploadAdmin" method="post" enctype="multipart/form-data">
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <label class="label">License code:</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  v-model="licenseCode"
                  placeholder="license code"
                  required
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Alias</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  v-model="alias"
                  placeholder="alias"
                  name="alias"
                  required
                />
              </div>
              <p class="subtitle has-text-danger">{{ aliasEvaluate }}</p>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="field-body">
            <div class="field">
              <label class="label">Full Name</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  v-model="name"
                  placeholder="Last name, First name, Extension name, Middle name"
                  required
                />
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
              <div class="control">
                <input class="input" type="text" v-model="username" placeholder="username" required />
              </div>
              <p class="subtitle has-text-danger">{{ usernameEvaluate }}</p>
            </div>
            <div class="field">
              <label class="label">Gmail</label>
              <div class="control">
                <input class="input" type="email" v-model="gmail" placeholder="gmail" required />
              </div>
              <p class="subtitle has-text-danger">{{ usernameEvaluate }}</p>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  class="input"
                  type="password"
                  v-model="password"
                  placeholder="password"
                  required
                />
              </div>
              <p class="subtitle has-text-danger">{{ passwordMatch }}</p>
            </div>
            <div class="field">
              <label class="label">Repeat Password</label>
              <div class="control">
                <input
                  class="input"
                  type="password"
                  v-model="passwordRepeat"
                  placeholder="repeat password"
                  required
                />
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
                <input
                  class="input"
                  type="text"
                  v-model="searchBarSpecialization"
                  placeholder="Search"
                />
              </div>
              <div style="max-height: 20em; overflow: auto">
                <div
                  class="panel-block"
                  v-for="(specializations, index) in specializationListIndexed"
                  :key="index"
                  :value="specializations"
                >
                  <a @click="selectSpecialization(specializations)">{{ specializations }}</a>
                </div>
              </div>
            </nav>
          </div>
          <div class="column">
            <label class="label">Selected</label>
            <div class="columns is-multiline">
              <div
                class="column"
                id="selectedSpecializations"
                style="max-height: 26em; overflow: auto"
              >
                <button
                  v-for="(specialist, index) in specializationsSelected"
                  type="button"
                  :key="index"
                  class="button is-light"
                  style="margin: 5px;"
                >
                  {{ specialist }}&nbsp;
                  <span
                    class="has-text-danger"
                    @click="undoSpecialization(specialist)"
                  >X</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="has-text-right">
          <button
            type="submit"
            class="button is-primary"
            @click="create"
            :disabled="hospitalsSelected == '' || specializationsSelected == ''"
          >Create account</button>
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
      aliasConfirm: null,
      usernameConfirm: null,
      aliasEvaluate: null,
      usernameEvaluate: null,
      evaluateData: null,
      specializationsSelected: [],
      specializationList: this.$store.getters.getSpecializationList,
      searchBarSpecialization: '',
    };
  },
  async mounted() {
    await axios
      .get("/api/admin")
      .then((response) => (this.evaluateData = response.data));
    await axios.get("/api/manager").then(response => this.hospitals = response.data)
  },
  methods: {
    async create(e) {
      this.aliasConfirm = this.evaluateData.find((x) => x.alias === this.alias);
      this.usernameConfirm = this.evaluateData.find(
        (x) => x.username === this.username
      );
      if (
        this.password === this.passwordRepeat &&
        this.aliasEvaluate == null &&
        this.usernameEvaluate == null
      ) {
        await axios.post("/api/admin", {
          alias: this.alias,
          licenseNo: this.licenseCode,
          name: this.name,
          gmail: this.gmail,
          specialist: this.specializationsSelected,
          username: this.username,
          password: this.password,
        });
        await this.$store.commit("imgSuccess", true)
      } else {
        if ((await this.password) !== this.passwordRepeat) {
          this.passwordMatch = "password do not match";
          await e.preventDefault();
        } else {
          this.passwordMatch = null;
        }
        if (await this.alias) {
          if (typeof this.aliasConfirm == "undefined") {
            this.aliasEvaluate = null;
          } else if ((await this.aliasConfirm.alias) === this.alias) {
            this.aliasEvaluate = "alias already taken";
            await e.preventDefault();
          }
        }
        if (await this.username) {
          if (typeof this.usernameConfirm == "undefined") {
            this.usernameEvaluate = null;
          } else if ((await this.usernameConfirm.username) === this.username) {
            this.usernameEvaluate = "username already taken";
            await e.preventDefault();
          }
        }
      }
    },
    selectSpecialization(specialization) {
      if (!this.specializationsSelected.find(x => x.specialist === specialization)) {
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
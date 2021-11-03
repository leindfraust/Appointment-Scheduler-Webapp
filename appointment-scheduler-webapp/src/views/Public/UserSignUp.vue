<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="field">
        <p class="control">
          <label class="label">Full Name:</label>
          <input class="input" type="text" placeholder="fullname" v-model="fullname" required />
        </p>

        <p class="control">
          <label class="label">Age:</label>
          <input class="input" type="number" placeholder="age" v-model="age" required />
        </p>

        <br>
        <p class="control">
          <label class="radio">
            <input type="radio" name="sex" @click="sexMale"/>
            Male
          </label>
          <label class="radio">
            <input type="radio" name="sex" @click="sexFemale"/>
            Female
          </label>
        </p>
        <br>

        <p class="control">
          <label class="label">ContactNumber:</label>
          <input
            class="input"
            type="number"
            placeholder="contact number"
            v-model="contactNum"
            required
          />
        </p>

        <p class="control">
          <label class="label">Gmail(Optional):</label>
          <input class="input" type="email" placeholder="gmail" v-model="gmail" required />
        </p>

        <p class="control">
          <label class="label">Province:</label>
          <input class="input" type="text" placeholder="province" v-model="province" required />
        </p>

        <p class="control">
          <label class="label">City or Municipality:</label>
          <input class="input" type="text" placeholder="City/Municipality" v-model="city" required />
        </p>

        <p class="control">
          <label class="label">Username:</label>
          <input class="input" type="text" placeholder="username" v-model="username" required />
        </p>
        <p class="subtitle has-text-danger">{{ usernameEvaluate }}</p>

        <p class="control">
          <label class="label">Password:</label>
          <input class="input" type="password" placeholder="password" v-model="password" required />
        </p>
        <p class="subtitle has-text-danger">{{ passwordMatch }}</p>

        <p class="control">
          <label class="label">Repeat Password:</label>
          <input
            class="input"
            type="password"
            placeholder="repeat password"
            v-model="passwordRepeat"
            required
          />
        </p>
        <p class="subtitle has-text-danger">{{ passwordMatch }}</p>
      </div>

      <div class="control">
        <button class="button is-primary" @click="signup">SignUp</button>
      </div>
    </div>
  </section>
</template>
<script>
import axios from 'axios'

export default {
  username: "UserSignUp",
  props: {
    fullname: String,
    age: Number,
    contactNum: Number,
    gmail: String,
    province: String,
    city: String,
    username: String,
    password: String,
    passwordRepeat: String
  },
  data() {
    return {
      sex: null,
      evaluateData: null,
      usernameConfirm: null,
      usernameEvaluate: null,
      passwordMatch: null
    }
  },
  async mounted() {
    await axios
      .get("/api/user")
      .then((response) => (this.evaluateData = response.data));
  },
  methods: {
    sexMale() {
      this.sex = "Male"
    },
    sexFemale() {
      this.sex = "Female"
    },
    async signup() {
      this.usernameConfirm = this.evaluateData.find(x => x.username === this.username)

      if (
        this.password === this.passwordRepeat &&
        this.usernameEvaluate == null
      ) {
        await axios.post("/api/user", {
          username: this.username,
          password: this.password,
          name: this.fullname,
          age: this.age,
          sex: this.sex,
          contactNum: this.contactNum,
          gmail: this.gmail,
          province: this.province,
          city: this.city,
        });
        await this.$router.push("/user/login");
      } else {
        if ((await this.password) !== this.passwordRepeat) {
          this.passwordMatch = "password do not match";
          await e.preventDefault();
        } else {
          this.passwordMatch = null;
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
    }
  }
}
</script>
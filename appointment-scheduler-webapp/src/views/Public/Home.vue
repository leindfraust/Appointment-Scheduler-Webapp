<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img
          src="https://bulma.io/images/bulma-logo.png"
          width="112"
        />
      </a>

      <a
        role="button"
        class="navbar-burger"
        :class="{'is-active': isActive}"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbar"
        @click="navbar"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbar" class="navbar-menu" :class="{'is-active': isActive}">
      <div class="navbar-end">
        <a class="navbar-item">About</a>

        <a class="navbar-item">Services</a>
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary" href="/user/signup">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light" href="/user/login">Log in</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-gapless">
          <div class="column">
            <h1 class="title">Healing takes time, and asking for help is a courageous step.</h1>
            <figure class="image is-16by9">
              <img src="../../assets/images/istockphoto_1213515925_612x612_removebg_preview_1.png" />
            </figure>
          </div>
          <div class="column has-text-centered">
            <button class="button" style="font-size: 24px; margin-top: 25%; border-radius: 25px; color: #126782">GET STARTED</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: "Home",
  data(){
    return {
      isActive: false
    }
  },
  methods: {
    navbar() {
      this.isActive = !this.isActive
    }
  }
};
</script>

<style scoped>
.hero{
  background: linear-gradient(
    180deg,
    rgba(171, 196, 255, 0) 11.59%,
    rgba(142, 179, 227, 0.331896) 35.73%,
    rgba(102, 155, 188, 0.79) 65.94%
  ) !important;
}
</style>
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "vue-cli",
      bundler: "webpack",
      proxy: {
        "/api": {
          target: "http://localhost:5000",
        },
        "/session": {
          target: "http://localhost:5000",
        },
      },
    },
  },
});

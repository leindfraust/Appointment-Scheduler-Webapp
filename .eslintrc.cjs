module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:cypress/recommended",
    "plugin:import/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": "off",
    "import/extensions": [
      "error",
      {
        "js": "always",
        "jsx": "always",
        "ts": "always",
        "tsx": "always",
        "mjs": "always"
      }
    ],
    "import/no-unresolved": [
      "error",
      {
        "ignore": [
          "^[a-z-]+$"
        ]
      }
    ],
    "import/no-named-as-default": "off"
  }
}

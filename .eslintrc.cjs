/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'prettier',
    'plugin:vue/vue3-recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: {
          max: 6
        },
        multiline: {
          max: 1
        }
      }
    ],
    'vue/singleline-html-element-content-newline': ['off'],
    'vue/html-self-closing': ['off']
  }
}

'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  STEVE: '"SteveP"',
  VUE_APP_API_KEY: '"AIzaSyBJ9GTol9kE4_-mr7cUHapEaStQhaFkkvE"',
  VUE_APP_AUTH_DOMAIN: '"notebook-690fa.firebaseapp.com"',
  VUE_APP_DB_URL: '"https://notebook-690fa.firebaseio.com"',
  VUE_APP_PROJECT_ID: '"notebook-690fa"',
  VUE_APP_STORAGE_BUCKET: '"notebook-690fa.appspot.com"',
  VUE_APP_MESSAGING_SENDER_ID: '"335365073021"'
})

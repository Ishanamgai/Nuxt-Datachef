import colors from 'vuetify/es5/util/colors'

// eslint-disable-next-line
const contentful = require('contentful')

const contentfulClient = contentful.createClient({
  space: 'oet8rv1vvj34',
  accessToken: 'EeMoRJQi0QB6ebLzpEEmCQ9gVHcUs0KF0VDqlM-O-bQ',
})

export default {

  env: {
    apiUrl: process.env.API_URL,
    appName: process.env.APP_NAME || 'DataChef',
    appLocale: process.env.APP_LOCALE || 'en',
  },

  generate: {
    routes () {
      return Promise.all([
        contentfulClient.getEntries({
          content_type: 'blogPost',
        }),
      ]).then(([blogEntries]) => {
        return [...blogEntries.items.map(entry => entry.fields.slug)]
      })
    },
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'DataChef',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // '~assets/scss/colors.scss',
  css: ['~/assets/scss/index.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-session.js', mode: 'client' },
    { src: '~/plugins/tiptap-vuetify', mode: 'client' },
    '~/plugins/contentful',
    '~/plugins/posts',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: ['~/components', '~/components/global'],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/gtm',
    '@nuxtjs/markdownit',
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  gtm: {
    id: 'GTM-WDL4756',
  },

  markdownit: {
    injected: true,
  },

  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    // baseURL: 'https://api.datachef.io',
    // baseURL: 'https://api.datachef.io',
    baseURL: process.env.API_URL
  },

  auth: {
    strategies: {
      google: {
        clientId: '101297198048-ikfh66vfvo20p8oms96hmfbpjs0ccsvj.apps.googleusercontent.com',
        codeChallengeMethod: '',
        responseType: 'code',
        endpoints: {
          token: process.env.API_URL + '/social-login/google/',
          userInfo: process.env.API_URL + '/auth/user/',
        },
      },
    },
  },

  // styleResources: {
  //   scss: ['./assets/scss/*.scss']
  // },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#7957d5',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: '#7957d5',
          accent: colors.grey.lighten3,
          secondary: colors.amber.lighten3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vuetify/lib', 'tiptap-vuetify'],
  },
}

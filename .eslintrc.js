module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    // 'comma-dangle': ['error', 'always-multiline'],
    // 'vue/no-unused-components': ['warn'],
    // 'vue/no-v-html': 0,
    // 'vue/multi-word-component-names': 0,
    // 'no-unused-vars': ['warn'],
    // 'no-unreachable': ['warn'],
    // 'vue/no-unused-vars': ['warn'],
    // 'import/newline-after-import': ['warn'],
    // 'vue/padding-line-between-blocks': 'warn',
    // 'vue/max-attributes-per-line': ['warn', { singleline: 10 }],
  },
  globals: {
    window: 'writable',
    mapboxgl: 'writable',
  },
}

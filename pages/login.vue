<template>
  <div>
    <v-row>
      <v-col cols="12" lg="6" class="d-none d-lg-block">
        <img
          style="margin-top:5%;"
          :src="require('../assets/data-observability.png')"
          class="v-responsive"
        >
      </v-col>
      <v-col cols="12" lg="6">
        <div style="padding-top:20%;">
          <section class="hero">
            <div class="hero-body">
              <p class="text-h3">
                Welcome back!
              </p>
              <p class="subtitle-1">
                Sign in using the same Gmail account you used when creating your DataChef account.
              </p>
              <br>
              <v-btn x-large depressed color="orange darken-2" class="white--text" @click="loginWithGoogle()">
                <v-icon class="mr-3">
                  mdi-google
                </v-icon>
                Sign In with Google
              </v-btn>
            </div>
          </section>
          <section class="section" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  methods: {
    loginWithGoogle () {
      this.$auth.loginWith('google')
      this.$gtm.push({ event: 'dc__signin_google' })
    },
  },
}
</script>

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
                Document & visualize Snowflake with <span style="font-family: Pacifico;color:#7957d5; font-weight:normal">DataChef</span>
              </p>
              <p class="subtitle-1">
                DataChef enables data engineers, B.I. developers, and data analysts to discuss, document and visualize metadata from your Snowflake data warehouse. Scroll down to learn more and watch a video demo.
              </p>
              <br>
              <v-btn x-large depressed color="orange darken-2" class="white--text" @click="loginWithGoogle()">
                <v-icon class="mr-3">
                  mdi-google
                </v-icon>
                Sign Up with Google
              </v-btn>
            </div>
          </section>
          <section class="section" />
        </div>
      </v-col>
    </v-row>
    <v-divider class="my-10" />
    <p class="text-h4 text-center pt-10 pb-10">
      Facilitate data discussions & documentation in context
    </p>
    <v-row>
      <v-col cols="12" lg="6">
        <v-card elevation="2" class="mb-10">
          <video width="100%" controls poster="https://datachef-public.s3.us-west-004.backblazeb2.com/datachef-30-second-demo.mov">
            <source src="https://datachef-public.s3.us-west-004.backblazeb2.com/datachef-30-second-demo.mov" type="video/mp4"></source>
            Your browser does not support HTML video.
          </video>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6">
        <section class="hero">
          <div class="hero-body">
            <p class="px-5 my-5">
              <ul>
                <li>Analyze rich metadata about your tables and columns</li>
                </br>
                <li>Discuss and document your tables and columns all within context</li>
                </br>
                <li>Document relationships between tables and columns and generate Entity Relationship Diagrams (ERDs)</li>
              </ul>
            </p>
          </div>
        </section>
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

<template>
  <v-row>
    <v-col cols="12" lg="6" class="pt-11 mt-11">
      <h1 class="text-h3">
        Welcome, {{ $auth.user.first_name }}
      </h1>
      <p class="py-2 my-2">
        Thanks for signing up for DataChef. We hope to make your
        day-to-day data work just a little bit easier.
      </p>
      <br>
      <h1 class="text-h5 my-2">
        What's in V1
      </h1>
      <p>
        This first release enables what we believe should be at the core of
        every data team: an internal knowledge repository for your company's data.
        To learn more about V1, read the post
        <a href="/blog/hello-world">Hello World: Introducing DataChef</a>.
      </p>
      <p>Otherwise, jump right in!</p>
      <v-btn
        to="/connections"
        depressed
        x-large
        dark
        color="orange darken-2"
      >
        Get Started: Connect Your Data
      </v-btn>
    </v-col>
    <v-col cols="12" lg="6" class="pt-6 mt-6">
      <section class="hero">
        <v-card class="pa-2 ma-5">
          <v-card-title class="text-h4">
            Feedback
          </v-card-title>
          <v-card-text>
            <p>What do you like? What do you dislike? What features would you find useful?</p>
            <p class="font-weight-bold">
              We want to hear it all!
            </p>
            <p>
              <v-btn
                target="_blank"
                color="grey lighten-2"
                depressed
                block
                href="https://twitter.com/intent/tweet?text=Hey%20%40DataChef_io,%20here%27s%20what%20I%20think..."
              >
                <v-icon class="pr-3">
                  mdi-twitter
                </v-icon>
                Tweet @DataChef_io
              </v-btn>
            </p>
            <p>
              <v-btn
                target="_blank"
                color="grey lighten-2"
                depressed
                block
                href="mailto:info@datachef.io?subject=Feedback"
              >
                <v-icon class="pr-3">
                  mdi-email
                </v-icon>
                Email info@datachef.io
              </v-btn>
            </p>
          </v-card-text>
        </v-card>

        <v-card class="pa-2 ma-5">
          <v-card-title class="text-h4">
            Support
          </v-card-title>
          <v-card-text>
            <p>
              Having an issue? Let us know how we can help!
            </p>
            <v-btn
              target="_blank"
              color="grey lighten-2"
              depressed
              block
              :href="'https://form.jotform.com/213208178554053?email=' + $auth.user.email"
            >
              Contact Support
            </v-btn>
          </v-card-text>
        </v-card>
      </section>
    </v-col>
  </v-row>
</template>

<script>
export default {

  middleware: 'auth',

}
</script>

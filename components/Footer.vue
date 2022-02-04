<template>
  <v-footer app class="grey lighten-3 text-caption">
    <v-row class="my-1 d-flex justify-center">
      <div class="px-12">
        &copy; {{ new Date().getFullYear() }} datachef.io
      </div>
      <div class="px-12">
        <v-btn x-small text to="/blog">
          Blog
        </v-btn>
        <v-btn x-small text to="/terms">
          Terms
        </v-btn>
        <v-btn x-small text to="/privacy">
          Privacy
        </v-btn>
      </div>
      <div class="px-12">
        Made with <v-icon class="px-1" x-small color="red lighten-3">
          mdi-heart
        </v-icon> in NY
      </div>
    </v-row>
  </v-footer>
</template>

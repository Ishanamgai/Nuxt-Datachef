<template>
  <section class="container">
    <v-row class="mb-6" align="center">
      <v-col sm="12" md="6">
        <h1 class="text-h2 pt-8 pb-2 deep-purple--text">
          {{ post.fields.title }}
        </h1>
        <h2 class="text-h4">
          by {{ post.fields.author.fields.name }}
        </h2>
      </v-col>
      <v-col sm="12" md="6">
        <v-img
          :lazy-src="post.fields.heroImage.fields.file.url"
          :src="post.fields.heroImage.fields.file.url"
        />
      </v-col>
    </v-row>
    <v-divider class="py-1 my-4" />
    <article v-html="$md.render(post.fields.body)" />
    <v-card
      elevation="2"
      class="pa-5 my-10"
    >
      <v-card-title class="font-italic">
        Posted by {{ post.fields.author.fields.name }}, {{ post.fields.author.fields.title }} @
        {{ post.fields.author.fields.company }}
      </v-card-title>
      <v-card-text v-html="$md.render(post.fields.author.fields.shortBio)" />
      <v-card-actions>
        <v-btn
          v-if="post.fields.author.fields.twitter"
          :href="'https://twitter.com/' + post.fields.author.fields.twitter"
          target="_blank"
          depressed
        >
          <v-icon class="pr-1">
            mdi-twitter
          </v-icon>
          @{{ post.fields.author.fields.twitter }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </section>
</template>

<script>
export default {
  data () {
    return {
      slug: this.$route.params.slug,
    }
  },
  head () {
    return {
      title: this.post.fields.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.fields.description,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.post.fields.title,
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'article',
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.post.fields.heroImage.fields.file.url,
        },
      ],
    }
  },
  computed: {
    post () {
      const post = this.$store.state.posts.filter(
        el => el.fields.slug === this.slug,
      )
      return post[0]
    },
  },
}
</script>

<template>
  <div>
    <v-card
      v-for="(post, index) in posts"
      :key="index"
      elevation="2"
      class="ma-5 pa-2"
    >
      <v-card-title class="text-h4 pb-5">
        {{ post.fields.title }}
      </v-card-title>
      <v-card-subtitle class="subtitle-1">
        Published on <span class="font-weight-bold">{{ post.fields.publishDate }}</span> by <span class="font-weight-bold">{{ post.fields.author.fields.name }}</span>
      </v-card-subtitle>
      <v-card-text v-html="$md.render(post.fields.description)" />
      <v-card-actions class="ma-5">
        <v-row>
          <v-btn
            dark
            depressed
            color="deep-purple"
            :to="'/blog/' + post.fields.slug"
          >
            Read this post
          </v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Blog',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Read the latest from the DataChef team.',
        },
      ],
    }
  },
  computed: {
    posts () {
      return this.$store.state.posts
    },
  },
}
</script>

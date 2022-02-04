<template>
  <div>
    <div>
      <!--
      <v-row>
        <v-col>
          <h2 class="text-h5">
            <v-icon color="grey lighten-1" large>
              mdi-chat
            </v-icon>
            {{ objectName }}
          </h2>
        </v-col>
      </v-row>
      -->
      <v-row class="my-1">
        <v-col>
          <template v-for="(comment, index) in comments">
            <Comment
              :key="index"
              :comment="comment"
              :active="comment.id === activeComment"
              :deleting-id="deletingId"
              @update-comment="update($event)"
              @calcel-update-comment="activeComment = null"
              @save-comment="save($event)"
              @delete-comment="remove"
            />
          </template>
        </v-col>
      </v-row>
    </div>
    <div class="pt-2">
      <v-row class="d-flex mb-2">
        <v-col>
          <client-only>
            <div class="d-flex align-end">
              <tiptap-vuetify
                v-model="content"
                placeholder="Start typing your comment here..."
                :extensions="extensions"
              />
              <div>
                <v-btn
                  class="comment white--text ml-4"
                  large
                  @click="add()"
                >
                  Add Comment
                </v-btn>
              </div>
            </div>
            <template #placeholder>
              <div>
                <v-progress-linear
                  color="deep-purple accent-4"
                  indeterminate
                  rounded
                  height="4"
                />
              </div>
            </template>
          </client-only>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  History,
} from 'tiptap-vuetify'
import Comment from './Comment'

export default {
  components: { TiptapVuetify, Comment },

  props: {
    id: { type: String, required: true },
    objectName: { type: String, required: true },
  },

  data: () => ({
    activeComment: '',
    extensions: [
      History,
      Blockquote,
      Link,
      Bold,
      Italic,
      Underline,
      Strike,
      ListItem,
      BulletList,
      OrderedList,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3],
          },
        },
      ],
      Code,
    ],
    // starting editor's content
    content: '',
    deletingId: null,
  }),

  computed: {
    emptyComment () {
      return this.$store.state.comments.isComment
    },

    comments () {
      return this.$store.state.comments.comments
    },
  },

  mounted () {
    this.getComments()
  },

  methods: {
    ...mapActions('comments', [
      'updateComment',
      'loadComments',
      'createComment',
      'deleteComment',
    ]),

    update ({ id }) {
      this.activeComment = id
    },

    async save ({ id, text }) {
      await this.updateComment({ id, text, objectId: this.id })
      if (this.$store.state.comments.updateComment) {
        this.activeComment = null
      }
    },

    getComments () {
      this.loadComments(this.id)
    },

    async add () {
      await this.createComment({ id: this.id, text: this.content })
      if (this.emptyComment) {
        this.content = ''
      }
    },

    async remove (comment) {
      this.deletingId = comment.id
      try {
        await this.deleteComment(comment.id)
      } catch (e) {
        //
      }
      this.deletingId = null
    },
  },
}
</script>

<style lang="scss">
.comment {
  background-color: $app-primary !important;
}
.tiptap-vuetify-editor.comment-editor {
  .ProseMirror {
    min-height: 100px;
    margin: 10px !important;
  }
}
</style>

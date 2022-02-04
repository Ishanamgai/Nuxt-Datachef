<template>
  <div>
    <div
      class="d-flex justify-start align-start individual-comment pt-5 pb-5"
      @mouseover="onHover()"
      @mouseleave="onLeave()"
    >
      <!--
      TODO FIXME - temporarily hardcode with user icon;
      replace with user avatar when this is available
      -->
      <v-avatar color="deep-purple" rounded>
        <v-icon large dark>
          mdi-account-circle
        </v-icon>
      </v-avatar>
      <div class="ml-4 comment-box">
        <template v-if="active">
          <div class="w-full d-flex justify-end mb-2 comment-actions">
            <v-btn
              :loading="!isUpdate"
              small
              color="green"
              class="mr-1 white--text"
              depressed
              @click="saveComment(comment.id, content)"
            >
              Save Changes
            </v-btn>
            <v-btn small depressed @click="$emit('calcel-update-comment')">
              Cancel
            </v-btn>
          </div>
        </template>
        <div v-if="isHover" class="d-flex justiy-space-between w-full editHover comment-actions">
          <div>
            <v-btn-toggle>
              <v-btn
                v-if="!active"
                small
                @click="editComment(comment.id, comment.text)"
              >
                <v-icon small color="grey darken-2">
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn
                v-if="!active"
                small
                :loading="deletingId === comment.id"
                @click="$emit('delete-comment', comment)"
              >
                <v-icon small color="grey darken-2">
                  mdi-delete
                </v-icon>
              </v-btn>
            </v-btn-toggle>
          </div>
        </div>
        <v-alert
          v-if="!saveLoading || !active"
          shaped
          light
          class="mb-0 mr-4"
          color="grey lighten-3"
          v-html="comment.text"
        />
        <tiptap-vuetify
          v-else
          v-model="content"
          class="mr-2"
          :extensions="extensions"
        />
        <div>
          <span class="font-weight-bold caption">
            {{ comment.user.first_name }} {{ comment.user.last_name }}
          </span>
          <span class="pl-3 caption grey--text">
            {{ dateTime(comment.created) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
import { filters } from '~/utils/utils'

export default {
  components: {
    TiptapVuetify,
  },
  props: {
    comment: {
      type: Object,
      default: () => {},
    },
    active: {
      type: Boolean,
      default: null,
    },
    deletingId: {
      type: String,
      default: null,
    },
  },
  data () {
    return {
      activeComment: '',
      content: '',
      saveLoading: false,
      isHover: false,
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
    }
  },
  computed: {
    isUpdate () {
      return this.$store.state.comments.updateComment
    },
  },
  watch: {
    'comment.text' (newVal, oldVal) {
      if (newVal) {
        this.saveLoading = false
      }
    },
  },
  methods: {
    onHover () {
      if (this.$auth.$state.user.email === this.comment.user.email) {
        this.isHover = true
      } else {
        this.isHover = false
      }
    },
    onLeave () {
      this.isHover = false
    },
    dateTime (date) {
      return filters.filteredDate(date)
    },
    editComment (id, text) {
      this.$emit('update-comment', { id })
      this.content = text
      this.saveLoading = true
    },
    saveComment (id, text) {
      // this.$store.commit('comments/setUpdateComment', false)
      this.$emit('save-comment', { id, text })
      this.content = text
    },
  },
}
</script>

<style lang="scss">
.comment-box {
  position: relative;

  .comment-actions {
    position: absolute;
    top: -35px;
    right: 15px;
  }
}

.hoverChip {
  display: flex;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  line-height: 30px;
}
</style>

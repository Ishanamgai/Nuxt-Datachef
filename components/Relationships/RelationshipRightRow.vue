<template>
  <v-row class="my-1">
    <v-col cols="6">
      <ColumnsAutocomplete ref="columns" v-model="form.key_left_id" />
    </v-col>
    <v-col cols="2">
      <v-autocomplete
        v-model="form.relationship"
        clearable
        label="Relationship"
        :items="['ONE_TO_ONE', 'ONE_TO_MANY', 'MANY_TO_MANY']"
      />
    </v-col>
    <v-col cols="2">
      <v-text-field
        disabled
        :value="rightColName"
      />
    </v-col>
    <v-col cols="2">
      <v-btn
        v-if="!relationship"
        large
        depressed
        dark
        color="deep-purple"
        :disabled="!form.key_left_id"
        :loading="loading"
        @click="onCreate"
      >
        <v-icon left>
          mdi-plus
        </v-icon>
        Add Reverse Relationship
      </v-btn>
      <v-btn
        v-if="formChanged"
        large
        depressed
        dark
        color="deep-purple"
        :loading="updating"
        @click="onUpdate"
      >
        <v-icon>
          mdi-content-save
        </v-icon>
      </v-btn>
      <v-btn
        v-if="relationship"
        large
        depressed
        dark
        color="red"
        :loading="loading"
        @click="onDelete"
      >
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import ColumnsAutocomplete from '@/components/Relationships/ColumnsAutocomplete'

const initialForm = {
  relationship: 'ONE_TO_MANY',
  key_left_id: '',
}

export default {
  components: { ColumnsAutocomplete },

  props: {
    accountId: { type: String, required: true },
    keyRightId: { type: String, required: true },
    rightColName: { type: String, default: '' },
    relationship: { type: Object, default: null },
  },

  data: () => ({
    form: { ...initialForm },
    loading: false,
    updating: false,
  }),

  computed: {
    formChanged () {
      return this.relationship &&
        (this.relationship.key_left_id !== this.form.key_left_id || this.relationship.relationship !== this.form.relationship)
    },
  },

  watch: {
    relationship () {
      this.fillForm()
    },
  },

  mounted () {
    this.fillForm()
  },

  methods: {
    ...mapActions({
      createRelationship: 'createSnowflakeRelationship',
      updateRelationship: 'updateSnowflakeRelationship',
      deleteRelationship: 'deleteSnowflakeRelationship',
    }),

    fillForm () {
      if (this.relationship) {
        this.form = { key_left_id: this.relationship.key_left_id, relationship: this.relationship.relationship }
        this.$refs.columns.pushColumn(this.relationship.key_left)
      }
    },

    async onCreate () {
      this.loading = true
      try {
        await this.createRelationship({
          accountId: this.$route.params.accountId,
          form: { ...this.form, key_right_id: this.keyRightId },
          filterKey: 'right',
        })
        this.form = { ...initialForm }
      } catch (e) {
        console.error(e) // eslint-disable-line
      }
      this.loading = false
    },

    async onUpdate () {
      this.updating = true
      try {
        await this.updateRelationship({
          accountId: this.$route.params.accountId,
          form: { ...this.form, key_left_id: this.keyLeftId },
          relId: this.relationship.id,
          filterKey: 'right',
        })
      } catch (e) {
        console.error(e) // eslint-disable-line
      }
      this.$forceUpdate()
      this.updating = false
    },

    async onDelete () {
      this.loading = true
      try {
        await this.deleteRelationship({
          accountId: this.$route.params.accountId,
          relId: this.relationship.id,
          filterKey: 'right',
        })
      } catch (e) {
        console.error(e) // eslint-disable-line
      }
      this.loading = false
    },
  },
}
</script>

<template>
  <v-autocomplete
    :value="value"
    clearable
    label="Related Column"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    no-filter
    @input="v => $emit('input', v)"
  >
    <template #no-data>
      <v-list-item>
        <v-list-item-title>
          Search for a <strong>column name</strong>...
        </v-list-item-title>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  props: {
    value: { type: String, default: '' },
  },

  data: () => ({
    columns: [],
    isLoading: false,
    search: null,
  }),

  computed: {
    items () {
      return this.columns.map(c => ({ value: c.id, text: `${c.database_name} > ${c.table_name} > ${c.name}` }))
    },
  },

  watch: {
    search: debounce(async function (val) {
      const selected = this.items.find(c => c.text === val)
      if (!val || selected) { return }
      this.isLoading = true

      try {
        const res = await this.$axios.get(`/integrations/snowflake/accounts/${this.$route.params.accountIdId}/databases/${this.$route.params.dbId}/getAllColumns/`, { params: { search: val } })
        this.columns = res.data.results
      } catch (e) {
        console.error(e) //eslint-disable-line
      }
      this.isLoading = false
    }, 300),
  },

  methods: {
    pushColumn (col) {
      this.columns.push(col)
    },
  },
}
</script>

<template>
  <div>

    <section class="mt-8">
      <!-- Show progress bar if state "LOADING" = True -->
      <v-progress-linear
        v-if="loading"
        color="deep-purple accent-4"
        indeterminate
        rounded
        height="4"
        />
      <v-data-table
        v-else
        :items="suggestions"
        :headers="headers"
        class="elevation-2"
        :single-select="singleSelect"
        show-select
        >
        <template #[`item.actions`]="{ item }">
            <v-tooltip bottom open-delay=500>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  small
                  color="green"
                  v-bind="attrs"
                  v-on="on"
                  >
                  <v-icon>mdi-check</v-icon>
                </v-btn>
              </template>
              <span>Approve and apply this suggestion</span>
            </v-tooltip>
            <v-tooltip bottom open-delay=500>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  small
                  color="red"
                  v-bind="attrs"
                  v-on="on"
                  >
                  <v-icon>mdi-window-close</v-icon>
                </v-btn>
              </template>
              <span>Decline this suggestion</span>
            </v-tooltip>
            <v-btn icon small color="grey">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
        </template>
      </v-data-table>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: 'auth',

  data () {
    return {
      dialog: {},
      singleSelect: false,
      selected: [],
      isLoading: false,
      hasMobileCards: true,
      enabled: null,
      search: null,
      headers: [
        { text: 'Suggestion', value: 'get_type_display', width: '15%' },
        { text: 'Confidence', value: 'confidence', width: '10%' },
        { text: 'Notes', value: 'notes', width: '20%' },
        { text: 'Record Info', value: 'record_data', width: '20%' },
        { text: 'Status', value: 'get_status_display', width: '20%' },
        { text: '', value: 'actions', width: '15%' },
      ],
      suggestions: [
        {
          get_type_display: 'Delete Junk',
          confidence: '100%',
          notes: 'Known SPAM domain',
          record_data: 'dslyvesteri5@youku.com',
          get_status_display: 'Awaiting review',
        },
        {
          get_type_display: 'Delete Junk',
          confidence: '100%',
          notes: 'Known SPAM domain',
          record_data: '3jljfjl3f@gmial.com',
          get_status_display: 'Awaiting review',
        },
        {
          get_type_display: 'Enhance Record',
          confidence: '100%',
          notes: 'Update Address, City, State, Postal Code, Country',
          record_data: 'Address → 227 Madison Avenue; City → New York; State: NY; Postal Code → 11743; Country → United States',
          get_status_display: 'Awaiting review',
        },
        {
          get_type_display: 'Merge Records',
          confidence: '100%',
          notes: 'Two records have the same email address',
          record_data: 'cwitchardbb@homestead.com',
          get_status_display: 'Awaiting review',
        },
        {
          get_type_display: 'Merge Records',
          confidence: '98%',
          notes: 'Two records have very similar email addresses',
          record_data: 'joe+test@datachef.io, joe@datachef.io',
          get_status_display: 'Awaiting review',
        },
      ],
    }
  },

  // computed: {
  //  ...mapState({
  //    data: 'suggestions',
  //    loading: 'loading',
  //  }),
  // },

  // mounted () {
  //  this.$store.dispatch('getSuggestions')
  // },
}
</script>

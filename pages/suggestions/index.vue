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
        :items="data"
        :headers="headers"
        class="elevation-2"
        :single-select="singleSelect"
        show-select
      >
        // temporarily hardcode to return email; in the future, this will be //
        dependent on the TYPE of suggestion.
        <template #[`item.record_data`]="{ item }">
          {{ item.record_data.email }}
        </template>
        <template #[`item.actions`]="{ item }">
          <v-tooltip bottom open-delay="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                color="green"
                v-bind="attrs"
                v-on="on"
                v-on:click="approve(item)"
              >
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </template>
            <span>Approve this suggestion</span>
          </v-tooltip>
          <v-tooltip bottom open-delay="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon small color="red" v-bind="attrs" v-on="on" v-on:click="decline(item)">
                <v-icon>mdi-window-close</v-icon>
              </v-btn>
            </template>
            <span>Decline this suggestion</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  middleware: "auth",

  data() {
    return {
      dialog: {},
      suggestions: null,
      singleSelect: false,
      selected: [],
      isLoading: false,
      hasMobileCards: true,
      enabled: null,
      search: null,
      headers: [
        { text: "Suggestion", value: "get_type_display", width: "15%" },
        { text: "Notes", value: "notes", width: "20%" },
        { text: "Record Info", value: "record_data", width: "20%" },
        { text: "Status", value: "get_status_display", width: "20%" },
        { text: "", value: "actions", width: "15%" },
      ],
    };
  },

  computed: {
    ...mapState({
      data: "suggestions",
      loading: "loading",
    }),
  },

  methods: {
    approve: function (item) {
      this.$store.dispatch("updateSuggestionApproved", item.id);
    },
    decline: function (item) {
      this.$store.dispatch("updateSuggestionDeclined", item.id);
    },
  },

  mounted() {
    this.$store.dispatch("getSuggestions");
  },
};
</script>

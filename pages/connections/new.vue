<template>
  <div>
    <section class="section is-small">
      <div class="columns">
        <div class="column">
          <v-breadcrumbs large>
            Connect Account
          </v-breadcrumbs>
        </div>
        <div class="column" align="right">
          <!-- empty -->
        </div>
      </div>
    </section>
    <section class="section is-small">
      <v-container fluid>
        <v-row no-gutters>
          <v-col
            v-for="(item, key) of items"
            :key="item.title"
            cols="4"
          >
            <v-card
              elevation="2"
              class="ma-2 mt-5"
              max-width="350"
            >
              <v-card-title>
                <v-icon class="pr-3">
                  {{ item.icon }}
                </v-icon>
                {{ item.title }}
              </v-card-title>
              <v-card-text>
                <v-row class="mx-0">
                  <div class="mb-8 font-italic" span="font-size: 14px">
                    {{ item.subtitle }}
                  </div>
                </v-row>
                <v-divider class="mx-4" />
                <div class="pt-5 text">
                  {{ item.notes }}
                </div>
              </v-card-text>

              <v-card-actions class="align-center">
                <!-- open dialog for Snowflake, else standard button -->
                <v-btn
                  v-if="item.is_snowflake"
                  color="deep-purple white--text"
                  depressed
                  :disabled="item.is_disabled"
                  block
                  @click.stop="snowflake_dialog = true"
                >
                  {{ item.button_text }}
                </v-btn>

                <v-btn
                  v-else
                  depressed
                  color="deep-purple white--text"
                  :to="item.href"
                  :disabled="item.is_disabled"
                  block
                >
                  {{ item.button_text }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <v-dialog
      v-model="snowflake_dialog"
      max-width="50%"
    >
      <v-card>
        <v-card-title class="text-h5">
          <v-icon>mdi-snowflake</v-icon>
          Connect Snowflake
        </v-card-title>

        <v-card-text>
          Your password is encrypted. Data Chef will <strong>never</strong> download a copy of your data. We access Snowflake to profile your data and to monitor for changes.

          <v-container>
            <v-form ref="form" v-model="valid">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="accountName"
                    label="Account Name*"
                    hint="This is the value between 'https://' and 'snowflakecomputing.com' in your Snowflake URL. Example: If your Snowflake URL is https://123-xyz-aws.snowflakecomputing.com then your account name is '123-xyz-aws'."
                    persistent-hint
                    name="accountName"
                    required
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="snowflakeUsername"
                    :rules="[v => !!v || 'Username is required']"
                    label="Username*"
                    name="username"
                    required
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="snowflakePassword"
                    :rules="[v => !!v || 'Password is required']"
                    label="Password*"
                    name="password"
                    type="password"
                    required
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            x-large
            depressed
            @click="snowflake_dialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            x-large
            depressed
            color="green white--text"
            @click="createAccount()"
          >
            Save Account
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="isSnackbar"
      top
      color="primary"
    >
      <v-icon>
        mdi-check
      </v-icon>
      Account successfully created!
    </v-snackbar>
  </div>
</template>

<script>
export default {
  middleware: 'auth',

  data () {
    return {
      valid: false,
      snowflakeUsername: '',
      snowflakePassword: '',
      accountName: '',
      snowflake_dialog: false,
      items: [
        {
          title: 'Snowflake',
          subtitle: 'Snowflake, Inc.',
          icon: 'mdi-snowflake',
          href: 'https://msa49312.us-east-1.snowflakecomputing.com/oauth/authorize?client_id=rJVaykzudUBnxHndVNXGarq9NQY=&response_type=code&redirect_uri=http://localhost:8000/snowflake_callback',
          button_text: 'Connect Snowflake',
          notes: 'Requires username and password to connect.',
          is_disabled: false,
          is_snowflake: true,
        },
        {
          title: 'Redshift',
          subtitle: 'Amazon Web Services',
          icon: 'mdi-aws',
          href: 'https://google.com',
          button_text: 'Coming Soon',
          notes: 'Connection via OAuth.',
          is_disabled: true,
          is_snowflake: false,
        },
        {
          title: 'Salesforce CRM',
          subtitle: 'Salesforce.com',
          icon: 'mdi-salesforce',
          href: 'https://google.com',
          button_text: 'Coming Soon',
          notes: 'Connection via OAuth.',
          is_disabled: true,
          is_snowflake: false,
        },
        {
          title: 'Looker',
          subtitle: 'Google',
          icon: 'mdi-google',
          href: 'https://google.com',
          button_text: 'Coming Soon',
          notes: 'Connection via OAuth',
          is_disabled: true,
          is_snowflake: false,
        },
        {
          title: 'Tableau',
          subtitle: 'Salesforce.com',
          icon: 'mdi-salesforce',
          href: 'https://google.com',
          button_text: 'Coming Soon',
          notes: 'Connection via OAuth',
          is_disabled: true,
          is_snowflake: false,
        },
      ],
    }
  },
  computed: {
    isSnackbar () {
      return this.$store.state.updatedAccount
    },
    organizationId () {
      return this.$store.state.organization.id
    },
  },
  mounted () {
    this.$store.dispatch('getOrganization')
  },
  methods: {
    async createAccount () {
      const formData = new FormData()
      formData.append('organization_id', this.organizationId)
      formData.append('username', this.snowflakeUsername)
      formData.append('password', this.snowflakePassword)
      formData.append('name', this.accountName)
      this.$refs.form.validate()
      if (this.valid) {
        try {
          const response = await this.$axios.post(
            '/integrations/snowflake/accounts/',
            formData,
          )
          this.$store.commit('setUpdatedAccount', true)
          this.snowflake_dialog = false
          console.log(response, 'create account')
        } catch (err) {}
      }
      if (!this.snowflake_dialog) {
        this.$store.commit('setUpdatedAccount', false)
        this.$router.push('metadata')
      }
    },
  },
}
</script>

<template>
  <div elevation="2">
    <v-simple-table>
      <template #default>
        <thead>
          <tr>
            <th v-for="(head, idx) in header" :key="idx" class="text-left text-capitalize">
              {{ head }}
            </th>
            <th v-if="table === 'accounts'" />
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in body" :key="item.id">
            <td v-for="(i, idx) in fields" :key="idx">
              {{ item[i] || item["data"][i] }}
            </td>
            <td>
              <v-btn
                small
                depressed
                class="text-capitalize"
                @click="exploreAction(item)"
              >
                {{ btnText }}
              </v-btn>
            </td>
            <td v-if="table === 'accounts'">
              <!--
              <v-btn icon>
                <v-icon> mdi-delete </v-icon>
              </v-btn>
              -->
              <v-btn icon @click="showDialog(item)">
                <v-icon> mdi-pencil </v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-dialog v-model="dialog" max-width="50%">
      <v-card>
        <v-card-title class="text-h5">
          <v-icon>mdi-snowflake</v-icon>
          Connect Snowflake
        </v-card-title>

        <v-card-text>
          Your password is encrypted. Data Chef will
          <strong>never</strong> download a copy of your data. We access
          Snowflake to profile your data and to monitor for changes.

          <v-container>
            <v-form ref="form" v-model="valid">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    :value="snowFlake.name"
                    label="Account Name*"
                    hint="This is the value between 'https://' and 'snowflakecomputing.com' in your Snowflake URL. Example: If your Snowflake URL is https://123-xyz-aws.snowflakecomputing.com then your account name is '123-xyz-aws'."
                    persistent-hint
                    name="name"
                    required
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="snowFlake.userName"
                    :rules="[v => !!v || 'Username is required']"
                    label="Username*"
                    name="username"
                    required
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="snowFlake.password"
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

          <v-btn large @click="dialog = false">
            Cancel
          </v-btn>

          <v-btn
            :loading="btnLoading && !dialog"
            large
            color="primary white--text"
            @click="update()"
          >
            Update
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
      Account successfully updated!
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  props: {
    header: {
      type: Array,
      required: true,
      default: () => ([]),
    },
    table: {
      type: String,
    },
    fields: {
      type: Array,
      required: true,
    },
    body: {
      type: Array,
      required: true,
      default: () => [],
    },
    btnText: {
      type: String,
      required: false,
    },
  },
  data () {
    return {
      valid: true,
      btnLoading: false,
      dialog: false,
      snackbar: false,
      accountId: '',
      snowFlake: {
        name: '',
        organization_id: '',
        userName: '',
        password: '',
      },
    }
  },

  computed: {
    isSnackbar () {
      return this.snackbar
    },
  },

  methods: {
    ...mapActions(['updateAccount']),

    exploreAction (item) {
      this.$emit('exploreData', item)
    },

    showDialog (item) {
      this.dialog = true
      this.snowFlake.name = item.name
      this.snowFlake.userName = item.username
      this.snowFlake.organization_id = item.organization_id
      this.accountId = item.id
    },

    async update () {
      this.$refs.form.validate()
      if (this.valid) {
        this.btnLoading = true
        await this.updateAccount({
          userName: this.snowFlake.userName,
          password: this.snowFlake.password,
          id: this.accountId,
        })
        this.dialog = false
        this.snackbar = true
      }
    },
  },
}
</script>

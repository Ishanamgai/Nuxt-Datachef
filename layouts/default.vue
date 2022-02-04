<template>
  <v-app light>
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.mobile"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      color="white"
    >
      <div v-if="$auth.loggedIn">
        <v-container fluid>
          <v-row no-gutters>
            <v-list>
              <v-list-item
                v-for="(item, i) in auth_items"
                :key="i"
                :to="item.to"
                router
                exact
              >
                <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-row>
        </v-container>
      </div>
      <div v-else>
        <v-container fluid>
          <v-row no-gutters>
            <v-list>
              <v-list-item
                v-for="(item, i) in unauth_items"
                :key="i"
                :to="item.to"
                router
                exact
              >
                <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-row>
        </v-container>
      </div>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="clipped"
      fixed
      flat
      elevation="2"
      color="white"
      app
    >
      <v-app-bar-nav-icon v-if="$vuetify.breakpoint.mobile" @click.stop="drawer = !drawer" />

      <!-- MAIN NAVBAR -->
      <v-toolbar-title class="overflow-visible mr-5" style="cursor:pointer;" @click="$router.push('/signup')">
        <span style="font-family: Pacifico; color: #7957d5">DataChef</span>
      </v-toolbar-title>
      <div v-if="!$vuetify.breakpoint.mobile">
        <div v-if="$auth.loggedIn">
          <v-btn v-for="(item, index) in auth_items" :key="index" :to="item.to" text v-text="item.title" />
        </div>
        <div v-else>
          <v-btn v-for="(item, index) in unauth_items" :key="index" :to="item.to" text v-text="item.title" />
        </div>
      </div>

      <v-spacer />

      <!-- if the user is logged in, show a button to open profile info -->
      <div v-if="$auth.loggedIn">
        <!--
        TODO FIXME - add this when Global Search is available
        <v-btn text>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        -->
        <v-chip outlined>
          <v-icon left>
            mdi-account
          </v-icon>
          {{ $auth.user.email }}
        </v-chip>
      </div>

      <div v-else>
        <v-btn color="deep-purple" class="white--text mx-1" depressed to="/signup">
          Sign Up
        </v-btn>
        <v-btn text class="mx-1" to="/login">
          Log in
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from '~/components/Footer'

export default {
  components: { Footer },

  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      auth_items: [
        { title: 'Home', to: '/' },
        { title: 'Suggestions', to: '/suggestions' },
        { title: 'Connections', to: '/connections' },
      ],
      unauth_items: [
        {
          title: 'Blog',
          to: '/blog',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
    }
  },
  computed: {
    isLogin () {
      return this.$auth.$state.loggedIn
    },
  },

  mounted () {
    this.$store.dispatch('getSnowflakeAccounts')
  },
}
</script>

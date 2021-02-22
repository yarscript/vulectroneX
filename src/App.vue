<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <span> | </span>
      <router-link to="/about">About</router-link>
      <span v-if="is_user_init"> | </span>
      <router-link
          v-bind:to="'/user/' + this.user"
          v-if="is_user_init"
      >User
      </router-link>
      <span> | </span>
      <a
          href="#"
          v-if="is_logged_in"
          @click="logout"
      >Logout</a>

      <router-link
          to="/login"
          v-else
      >Login
      </router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters }      from "vuex";
import { ipcRenderer }     from "@/electron/ipcRenderer";


export default {
  name      : "App",

  data() {
    return {
      isElectron     : process.env.IS_ELECTRON, // true || undefined
    }
  },

  mounted: function () {
    // let res = electron.ipcRenderer.sendSync('synchronous-message', 'ping')
    // console.log('App.vue pung res =====>>>', res);
  },

  created() {
    if (this.$store.getters.is_logged_in && !this.$store.getters.is_user_init) {
      this.$store.dispatch('constructUser')
    }
    if (this.isElectron) {
      ipcRenderer(this);
    }
  },

  computed: {
    ...mapGetters([
      'user', 'is_logged_in', 'is_user_init'
    ]),

    // user() {
    //   return this.$store.getters.user
    // },
    //
    // isLogged() {
    //   return this.$store.getters.is_logged_in;
    // }
  },
  methods : {
    logout: function () {
      this.$store.dispatch('logout')
      this.$store.dispatch('destructUser')
      this.$router.push('/login')
    },
    // isLogged: function () {
    //   console.log('isLogged call');
    //   return this.$store.getters.is_logged_in;
    // }
  }
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

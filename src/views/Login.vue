<template>
  <div>
    <!--    <form class="login" @submit.prevent="login">-->
    <!--      <h1>Sign in</h1>-->
    <!--      <label>-->
    <!--        Email-->
    <!--        <input required v-model="email" type="email" placeholder="Name"/>-->
    <!--      </label>-->
    <!--      <label>-->
    <!--        Password-->
    <!--        <input required v-model="password" type="password" placeholder="Password"/>-->
    <!--      </label>-->
    <!--      <hr/>-->
    <!--      <button type="submit" class="btn btn-primary">Login</button>-->
    <!--    </form>-->
    <b-form @submit.prevent="login">
      <div>
        <b-form-input
            type="email"
            name="email"
            placeholder="email"
            v-model="email"
        >
        </b-form-input>
      </div>

      <div>
        <b-form-input
            type="password"
            name="password"
            placeholder="password"
            v-model="password"
        >
        </b-form-input>
      </div>

      <hr/>

      <b-button
          type="submit"
          class="btn btn-primary"
      >Login
      </b-button>
    </b-form>
  </div>
</template>

<script>
// import { ipcRenderer } from 'electron';
// const { desktopCapturer } = require('electron')
import { mapActions } from "vuex";


export default {
  name: "Login",
  data() {
    return {
      email   : '',
      password: '',
    }
  },
  methods: {
    ...mapActions([
        'login',
        'constructUser'
    ]),
    async login() {
      const [ $self, email, password ] = [ this, this.email, this.password ];

      await $self.$store.dispatch('login', { email, password })
      const user = await $self.$store.dispatch('constructUser')

      if (user?.user_uuid) {
        await $self.$router.push('/user/dashboard')
      }
    }
  }
}
</script>

<style scoped>

</style>

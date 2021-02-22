<template>
  <div class="user">
    <h2>User {{ this.user.first_name + ' ' + this.user.last_name }}</h2>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "User",
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods : {}
}
</script>

<style scoped>

</style>

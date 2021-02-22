<template>
  <div>
    <h3>User Dashboard Works!</h3>
    <button @click.prevent="runTracker"
            class="btn"
            :class="isTracingRun ? 'btn-primary' : 'btn-outline-primary'"
    >Start
    </button>
    <button
        @click="stopTracker"
        class="btn btn-outline-primary"
    >Stop
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";


export default {
  name   : "UserDashboard",
  data() {
    return {
      screening      : null,
      screenshot_path: '/Users/user/www/front/electron-vue/public/screenshots/',
    }
  },
  computed: {
    ...mapGetters([
        'isTracingRun'
    ])
  },
  methods: {
    runTracker(event) {
      if (this.isTracingRun) return;
      this.$store.dispatch('startTracking')
      event.preventDefault()
    },
    stopTracker(e) {
      this.$store.dispatch('stopTracking')
    }
  }
}
</script>

<style scoped>

</style>

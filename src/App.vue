<template>
  <div id="app">
    <router-view/>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import axios from 'axios'


import '@/assets/css/app.scss'

// problem's style
import '@/assets/css/components/problem-tag-selector.scss'


export default {
  name: 'App',
  components: {
    // fab
  },
  data() {
    return {}
  },
  // vue progressbar
  mounted () {
    this.$Progress.finish();
  },
  created () {
    this.$Progress.start()
    this.$router.beforeEach((to, from, next) => {
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        this.$Progress.parseMeta(meta)
      }
      this.$Progress.start()
      next()
    })
    this.$router.afterEach((to, from) => {
      this.$Progress.finish()
    })
  }
}
</script>

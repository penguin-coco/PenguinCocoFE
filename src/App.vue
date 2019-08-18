<template>
  <div id="app">
    <router-view/>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import axios from 'axios'

import '@/assets/fontawesome-free-5.0.13/web-fonts-with-css/css/fontawesome-all.min.css'
import '@/assets/css/material-icon.scss'

import '@/assets/css/basic.scss'
import '@/assets/css/layout.scss'
import '@/assets/css/content/problem-section.scss'
import '@/assets/css/content/judged-section.scss'

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

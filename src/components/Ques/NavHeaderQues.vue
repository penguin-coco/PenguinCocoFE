<template>
<div>
  <header id="navbar" style="background-color: white; box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);">
    <div class="logo" style="background-color: #303133;">
      <router-link to="/ques/index"> <img id="admin-logo" src="/static/logo/penguin-edge.png"></router-link>
    </div>
  </header>
  <div class="space"></div>
</div>
</template>

<script>
import '@/assets/css/nav/navbar.scss'

export default {
  data() {
    return {}
  },
  mounted() {
  },
  methods: {
    
  }
}
</script>

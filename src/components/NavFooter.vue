<template>
<div>
  <footer id="footer">
    <p>penguin coco &copy; {{ new Date().getFullYear() }}</p>
  </footer>
</div>
</template>

<script>

export default {
  data() {
    return {}
  },
  components: {}
}
</script>

<style>
#footer {
  padding-right: 40px;
  line-height: 50px;
  text-align: center;
  background-color: #f5f5f5;
  color: #606266;
}
  
#footer p {
  margin: 0px;
}
</style>

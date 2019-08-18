<template>
<div>
  <footer id="student-footer">
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
#student-footer {
  padding-right: 40px;
  line-height: 50px;
  text-align: center;
  background-color: #f5f5f5;
  color: #606266;
}

#student-footer p {
  margin: 0px;
}
</style>

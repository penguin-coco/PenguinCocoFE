<template>
<div>
  <div class="penguin-error-page">
    <div class="error-main">
      <img class="error-img" :src="imgSrc">
      <div class="error-code">403</div>
      <div class="back-original-page" @click="backHistory">👽 權限不足！點我回去原本的星球吧！</div>
    </div>
    <footer class="error-footer">penguin coco</footer>
  </div>
  
</div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  computed: {
    imgSrc() {
      let list = [
        'https://i.imgur.com/IXhYXlI.png',
        'https://i.imgur.com/Fm2k4CA.png',
        'https://i.imgur.com/aq8ORWP.png',
        'https://i.imgur.com/D79IkKf.png',
        'https://i.imgur.com/HTgMA2y.png'
      ]
      return list[Math.floor(Math.random() * Math.floor(5))]
    }
  },
  methods: {
    backHistory() {
      this.$router.go(-1);
    }
  }
}
</script>
<template>
<div>
  <div class="renovation">
    <div class="error-main">
      <img :src="imgSrc">
      <div class="text">404</div>
    </div>
  </div>
  <footer id="error-footer">CSIM OJ</footer>
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
  }
}
</script>

<style scoped>
  .renovation {
    height: 100vh;
    position: relative;
  }

  .error-main {
    text-align: center;
    position: absolute;
    top: calc(50% - 100px);
    left: calc(50% - 75px);
  }

  .error-main img {
    width: 150px;
    border-radius: 25px;
  }

  .error-main .text {
    font-size: 30px;
    font-weight: bold;
    margin-top: 20px;
  }

  #error-footer {
    width: 100%;
    text-align: center;
    position: fixed;
    bottom: 20px;
    color: #909399;
    font-weight: bold;
    transition: all .3s ease;
  }

  #error-footer:hover {
    color: #409EFF;
  }
</style>

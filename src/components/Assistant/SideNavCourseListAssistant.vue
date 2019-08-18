<template>
<div>
  <el-menu :default-active="$route.path" class="side-navbar" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
    <el-menu-item index="/assistant/courseList">
      <i class="fas fa-list"></i>
      <span slot="title">課程列表</span>
    </el-menu-item>
    <el-menu-item @click="toQuesBank">
      <i class="fas fa-book"></i>
      <span slot="title">題庫系統</span>
    </el-menu-item>
  </el-menu>
</div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  methods: {
    toQuesBank() {
      window.open('/ques/index', '_blank');
    }
  }
}
</script>

<style>
  .el-menu-item [class^=fas] {
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 15px;
    vertical-align: middle;
  }
</style>

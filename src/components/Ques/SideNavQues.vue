<template>
<div>
  <el-menu :default-active="$route.path" class="side-navbar" background-color="#303133" text-color="#fff" active-text-color="#ffd04b" router>
    <el-menu-item index="/ques/index">
      <i class="fas fa-list"></i>
      <span slot="title">題目列表</span>
    </el-menu-item>
    <el-menu-item index="/ques/newProblem">
      <i class="el-icon-menu"></i>
      <span slot="title">新增題目</span>
    </el-menu-item>
  </el-menu>
</div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  }
}
</script>

<style scoped>
  .el-menu-item [class^=fas] {
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 15px;
    vertical-align: middle;
  }
</style>

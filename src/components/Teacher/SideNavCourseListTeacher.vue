<template>
<div>
  <el-menu :default-active="$route.path" class="side-navbar" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
    <el-menu-item index="/teacher/courseList">
      <i class="fas fa-list"></i>
      <span slot="title">課程列表</span>
    </el-menu-item>
    <el-menu-item index="/teacher/newCourse">
      <i class="el-icon-menu"></i>
      <span slot="title">新增課程</span>
    </el-menu-item>
    <el-menu-item index="/teacher/editCourse">
      <i class="fas fa-user"></i>
      <span slot="title">編輯課程</span>
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
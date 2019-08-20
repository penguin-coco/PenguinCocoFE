<template>
<div>
  <el-menu :default-active="$route.path" class="side-navbar" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
    <el-menu-item :index="problemsDataIndex">
      <i class="fas fa-list"></i>
      <span slot="title">題目列表</span>
    </el-menu-item>
    <el-menu-item :index="newProblemIndex">
      <i class="el-icon-menu"></i>
      <span slot="title">新增題目</span>
    </el-menu-item>
    <el-menu-item :index="studentManageIndex">
      <i class="fas fa-user"></i>
      <span slot="title">學生管理</span>
    </el-menu-item>
    <el-menu-item :index="studentsDataIndex">
      <i class="el-icon-document"></i>
      <span slot="title">學生資訊</span>
    </el-menu-item>
    <el-menu-item :index="feedbackIndex">
      <i class="el-icon-edit"></i>
      <span slot="title">意見回饋</span>
    </el-menu-item>
  </el-menu>
</div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      problemsDataIndex: '',
      newProblemIndex: '',
      studentManageIndex: '',
      studentsDataIndex: '',
      feedbackIndex: ''
    }
  },
  mounted() {
    this.problemsDataIndex = '/assistant/'+this.$route.params.courseName+'/problemsData';
    this.newProblemIndex = '/assistant/'+this.$route.params.courseName+'/newProblem';
    this.studentManageIndex = '/assistant/'+this.$route.params.courseName+'/studentManage';
    this.studentsDataIndex = '/assistant/'+this.$route.params.courseName+'/studentsData';
    this.feedbackIndex = '/assistant/'+this.$route.params.courseName+'/feedback';
  }
}
</script>
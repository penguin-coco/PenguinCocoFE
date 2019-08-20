<template>
<div>
  <header id="navheader-teacher">
    <div class="logo">
      <router-link :to="courseIndex"><img src="/static/logo/penguin-edge.png"></router-link>
    </div>
    <div class="courseName">{{ this.$store.state.course.courseInfo.courseName }}</div>
    <el-menu class="oj-menu" mode="horizontal" router>
      <el-menu-item index="/teacher/courseList">課程列表</el-menu-item>
      <el-button @click="logout" type="primary" round size="small" class="hidden-xs-only">Logout</el-button>
      <el-button @click="logout" type="primary" round size="small" class="hidden-sm-only"><i class="fas fa-sign-out-alt"></i></el-button>
    </el-menu>
  </header>
  <div class="space"></div>
</div>
</template>

<script>
import {apiLogout} from '@/apis/base.js'

export default {
  data() {
    return {
      courseIndex: ''
    }
  },
  mounted() {
    this.setLogoRoute();
  },
  methods: {
    setLogoRoute() { // 設定logo的路由
      if(this.$store.state.course.courseInfo.courseName!=''){
        this.courseIndex = '/teacher/'+this.$store.state.course.courseInfo.courseName+'/index';
      } else {
        this.courseIndex = '/teacher/courseList';
      }
    },
    logout() {
      apiLogout().then((response) => {
        let res = response.data;
        if (res.status == '200') {
          this.$router.push('/login');
          this.$store.commit('cleanUserInfo'); // 清空vuex userInfo
        }
      });
    },
    // cleanCourseInfo() {
    //   this.$store.commit('cleanCourseInfo');
    // }
  }
}
</script>

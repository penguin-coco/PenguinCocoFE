<template>
<div>
  <header id="navheader-student">
    <div class="logo">
      <router-link :to="courseIndex"><img src="/static/logo/penguin.png"></router-link>
    </div>
    <div class="courseName">{{ this.$store.state.course.courseInfo.courseName }}</div>
    <el-menu class="oj-menu" :default-active="$route.path" mode="horizontal" router>
      <el-menu-item index="/student/courseList" @click="cleanCourseInfo">課程列表</el-menu-item>
      <el-button @click="logout" type="primary" round size="small" class="hidden-xs-only">Logout</el-button>
      <el-button @click="logout" type="primary" round size="small" class="hidden-sm-only"><i class="fas fa-sign-out-alt"></i></el-button>
    </el-menu>
  </header>
</div>
</template>

<script>
import {apiLogout} from '@/apis/base.js'

export default {
  data() {
    return {
      courseInfo: {},
      courseIndex: '',
      scorePanelIndex: '',
      myPageIndex: ''
    }
  },
  mounted() {
    this.courseIndex = '/student/'+this.$route.params.courseName+'/index';
    this.scorePanelIndex = '/student/'+this.$route.params.courseName+'/scorePanel';
    this.myPageIndex = '/student/'+this.$route.params.courseName+'/mypage';
  },
  methods: {
    logout() {
      apiLogout().then((response) => {
        let res = response.data;
        if (res.status == '200') {
          this.$router.push('/login');
          this.$store.commit('cleanUserInfo'); // 清空vuex userInfo
        }
      });
    },
    cleanCourseInfo() {
      this.$store.commit('cleanCourseInfo');
    }
  }
}
</script>
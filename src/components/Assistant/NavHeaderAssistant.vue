<template>
<div>
  <header id="navbar" style="background-color: white; box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);">
    <div class="logo" style="background-color: #545c64;">
      <router-link :to="courseIndex"><img src="/static/logo/penguin-edge.png"></router-link>
    </div>
    <div class="courseName">{{ this.$store.state.course.courseInfo.courseName }}</div>
    <el-menu class="oj-menu" mode="horizontal" style="border-bottom: none;" router>
      <el-menu-item index="/assistant/courseList" @click="cleanCourseInfo">課程列表</el-menu-item>
      <el-button @click="logout" type="primary" round size="small" class="hidden-xs-only">Logout</el-button>
      <el-button @click="logout" type="primary" round size="small" class="hidden-sm-only"><i class="fas fa-sign-out-alt"></i></el-button>
    </el-menu>
  </header>
  <div class="space"></div>
</div>
</template>

<script>
import {apiLogout} from '@/apis/base.js'

import '@/assets/css/nav/navbar.scss'

export default {
  data() {
    return {
      navbarBoxShadow: '',
      navbarBGC: 'rgba(0,0,0,0)',
      activeIndex: '0',
      scroll: '',
      courseIndex: ''
    }
  },
  mounted() {
    this.setLogoRoute();
    // navbar
    // this.navController();
    // window.addEventListener('scroll', this.navController);
  },
  methods: {
    // navController() {
    //   this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
    //
    //   if (this.scroll == '0') {
    //     this.navbarBoxShadow = '';
    //     this.navbarBGC = 'rgba(0,0,0,0)';
    //   } else {
    //     this.navbarBoxShadow = "0 1px 5px 0 rgba(0, 0, 0, 0.1)";
    //     this.navbarBGC = '#FFF';
    //   }
    // },
    setLogoRoute() { // 設定logo的路由
      if(this.$store.state.course.courseInfo.courseName!=''){
        this.courseIndex = '/assistant/'+this.$store.state.course.courseInfo.courseName+'/index';
      } else {
        this.courseIndex = '/assistant/courseList';
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
    cleanCourseInfo() {
      this.$store.commit('cleanCourseInfo');
    }
  }
}
</script>

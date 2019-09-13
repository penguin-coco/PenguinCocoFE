<template>
<div>
  <header id="navheader-admin">
    <div class="logo">
      <router-link :to="adminIndex"><img src="/static/logo/penguin-edge.png"></router-link>
    </div>
    <el-menu class="oj-menu" :default-active="$route.path" mode="horizontal" router>
      <el-button @click="logout" type="primary" round size="small" class="hidden-xs-only penguin-logout-btn">登出</el-button>
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
      adminIndex: '',
    }
  },
  mounted() {
    this.adminIndex = '/admin/index';
  },
  methods: {
    logout() {
      apiLogout().then((response) => {
        let res = response.data;
        if (res.status == '200') {
          this.$router.push('/login');
        }
      });
    }
  }
}
</script>
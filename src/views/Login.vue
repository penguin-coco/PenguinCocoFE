<template>
<div @keyup.enter="login" >
  <header id="navbar" style="height:100px;">
    <div class="logo" style="margin-top:50px; margin-left:4.3%; border-right:none;">
      <img src="/static/logo/penguin-edge.png">
    </div>
  </header>
  <el-row id="login-section">
    <!-- 左半部 -->
    <el-col class="left" :span="14">
      <div class="stars">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="moon">
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div class="title-wrapper">
        <div class="title">
          <p style="color: white; margin-bottom: 15px;">An Amazing </p>
          <p style="color: white; margin-top: 23px;">Online Judge System</p>
        </div>
      </div>

      <div class="author">
        <p>Powered by <span style="color:#E6A23C;"> <img width="12" src="/static/favicon/favicon.png"> Penguin Tech. </span> &copy; {{ new Date().getFullYear() }}</p>
      </div>
    </el-col>

    <!-- 右半部 -->
    <el-col class="right" :span="10">
      <div class="login-wrapper">
        <el-form class="login-form" :model="loginForm" status-icon label-width="40px" v-loading="loading" element-loading-text="登入中" label-position="top">
          <el-row>
            <el-col :span="18" :offset="3">
              <p class="greet">Welcome !</p>
              <p class="title">Penguin Coco</p>
              <el-form-item label="Account" prop="account">
                <el-input v-model="loginForm.account" placeholder="帳號"></el-input>
              </el-form-item>
              <el-form-item label="Password" prop="password">
                <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密碼" show-password></el-input>
              </el-form-item>
              <el-row style="padding-bottom: 30px; margin-top:50px;">
                <el-col :span="24">
                  <el-button class="login-btn" round type="primary" @click="login">登入</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
import {apiLogin, apiCheckLogin} from '@/apis/base.js'

import NavFooter from '@/components/NavFooter.vue'

import '@/assets/css/nav/navbar.scss'
import '@/assets/css/rwd.scss'

export default {
  components: {
    NavFooter
  },
  data() {
    // login-form
    return {
      // navbar
      navbarBoxShadow: '',
      navbarBGC: 'rgba(0,0,0,0)',
      scroll: '',
      // login form
      loginForm: {
        account: '',
        password: ''
      },
      loading: false
    }
  },
  mounted() {
    // navbar
    window.addEventListener('scroll', this.navController);
    // checkLogin
    this.checkLogin();
  },
  methods: {
    // navbar
    navController() {
      this.scroll = document.documentElement.scrollTop || document.body.scrollTop;

      if (this.scroll == '0') {
        this.navbarBoxShadow = '';
        this.navbarBGC = 'rgba(0,0,0,0)';
      } else {
        this.navbarBoxShadow = "0 1px 5px 0 rgba(0, 0, 0, 0.1)";
        this.navbarBGC = '#FFF';
      }
    },
    // login form
    login() {
      if (this.loginForm.account == '') {
        this.$message.error('請填寫帳號！');
      } else if (this.loginForm.password == '') {
        this.$message.error('請填寫密碼！');
      } else {
        this.loading = true;
        let self = this;

        apiLogin({
          account: this.loginForm.account,
          password: this.loginForm.password
        }).then((response) => {
          let res = response.data;
          if (res.status == "200") {
            // 記錄到state.user
            this.$store.commit('initUserInfo', {
              account: this.loginForm.account,
              auth: res.result
            });

            if (res.result == 'student') {
              this.$router.push("/student/courseList");
            } else if (res.result == 'teacher') {
              this.$router.push("/teacher/courseList");
            } else if (res.result == 'assistant') {
              this.$router.push("/assistant/courseList");
            } else if (res.result == 'admin') {
              this.$router.push("/admin/index");
            } 
          } else {
            this.loading = false;
            this.$message.error('帳號或密碼錯誤！');
          }
        }).catch(function(error) {
          self.loading = false;
          self.$message.error('登入失敗');
          console.log(error);
        });
      }
    },
    checkLogin() {
      apiCheckLogin().then((response) => {
        let res = response.data;
        if (res.status == "200") {
          if (res.result.authority == 'student') {
            this.$router.push("/student/courseList");
          } else if (res.result.authority == 'admin') {
            this.$router.push("/admin/index");
          } else if (res.result.authority == 'teacher') {
            this.$router.push("/teacher/courseList");
          } else if (res.result.authority == 'assistant') {
            this.$router.push("/assistant/courseList");
          }
        }
      });
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/partial/moonlight.scss';

#login-section {
  height: 100vh;
  width: 100vw;

  // 左半部
  .left {
    height: 100vh;
    background-color: #0E182F;
    position: relative;

    // moonlight
    @include stars;
    @include moon;

    .title-wrapper {
      margin-top: 20%;
      margin-left: 10%;

      .title {
        font-size: 55px;
        font-weight: 600;
        font-family: 'Roboto', sans-serif;
      }
    }

    .author {
      font-family: 'Roboto', sans-serif;
      position: fixed;
      left: 6%;
      bottom: 15%;
      color: white;
    }
  }

  // 右半部
  .right {
    height: 100vh;
    background-color: #fff;

    .login-wrapper {
      font-family: 'Roboto', sans-serif;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .login-form {
        .el-input {
          width: 80%;
        }

        .el-form-item__label {
          padding-bottom: 0px;
        }
        
        .el-input__inner {
          border: rgba(0,0,0,0);
          background-color: #EFF0F3;
          border-radius: 0px;
          color: black;
        }
      }

      .greet {
        color: #0277BD;
        margin-bottom: 0px;
        font-size: 18px;
      }

      .title {
        color: #303133;
        font-size: 40px;
        font-weight: 600;
        margin-top: 0px;
        margin-bottom: 45px;
      }

      .login-btn {
        width: 140px;
        height: 45px;
        font-family: 'Roboto', sans-serif;
        font-size: 11px;
        letter-spacing: 2.5px;
        font-weight: 500;
        color: #000;
        background-color: #fff;
        border: none;
        border-radius: 45px;
        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease 0s;
        cursor: pointer;
        outline: none;
        margin-top: 30px;

        &:hover {
          background-color: #039BE5;
          color: #fff;
          transform: translateY(-7px);
        }
      }
    }
  }
}
</style>

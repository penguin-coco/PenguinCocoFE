<template>
<div>
<el-container>
  <el-header>
    <nav-header-student></nav-header-student>
  </el-header>

  <el-container>
    <el-aside width="200px">
      <side-nav-student></side-nav-student>
    </el-aside>

    <el-container class="main-container" id="studentIndex-mypage">
      <el-main>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="8" class="user-section">
            <el-card shadow="hover" style="height: 286px;">
              <div class="penguin-content-header border-bottom-none mb-1">
                <span class="gentle-content-title">{{ $t('student.myPage.personalInfo') }}</span>
                <div class="float-right mr-3">
                  <el-dropdown trigger="click" @command="dropdownCmd">
                    <span class="el-dropdown-link">
                      <i class="el-icon-more fs-20"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item icon="el-icon-paperclip" command="0">{{ $t('student.myPage.changePwd') }}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
              <div class="user-data">
                <i class="fas fa-user-circle" style="font-size: 80px;"></i>
                <p class="name">{{ user.name }}</p>
                <el-row>
                  <el-col class="text-right" :span="12">
                    <span class="account">{{ user.studentId }}</span>&nbsp;&nbsp;&nbsp;
                    <span class="fs-15" style="font-size:15px; color:#DCDFE6;">|</span>
                  </el-col> 
                  <el-col :span="12" style="text-align:left;">&nbsp;&nbsp;&nbsp;
                    <span class="class">{{ user.class }}</span>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-col>

          <el-col :xs="24" :sm="8" class="answer-section">
            <el-card shadow="hover" style="height: 286px;">
              <div class="penguin-content-header border-bottom-none mb-1">
                <span class="gentle-content-title">{{ $t('student.myPage.answerStatus') }}</span>
              </div>
              <div class="flex-row-center">
                <el-progress type="circle" :percentage="donePercent"></el-progress>
              </div>
              <el-row class="mt-3" justify="center">
                <el-col :span="24">
                  <el-col class="text-center" :span="8">
                    <span class="done">{{ $t('student.myPage.solved') }}</span>&nbsp;&nbsp;&nbsp;
                    <span class="num">{{ user.doneNum }}</span>
                  </el-col> 
                  <el-col class="text-center" :span="8">
                    <span class="undo">{{ $t('student.myPage.todo') }}</span>&nbsp;&nbsp;&nbsp;
                    <span class="num">{{ user.undoNum }}</span>
                  </el-col>
                  <el-col class="text-center" :span="8">
                    <span class="best">{{ $t('student.myPage.best') }}</span>&nbsp;&nbsp;&nbsp;
                    <span class="num">{{user.bestNum}}</span>
                  </el-col> 
                </el-col>
              </el-row>
            </el-card>
          </el-col>

          <el-col :xs="24" :sm="8" class="system-section">
            <el-card shadow="hover" style="height: 286px;">
              <div class="penguin-content-header border-bottom-none mb-1">
                <span class="gentle-content-title">{{ $t('student.myPage.systemSetting') }}</span>
              </div>
              <el-row class="mt-3" justify="center">
                <el-form class="ml-10" :model="systemForm">
                  <el-form-item :label="$t('student.myPage.language')">
                    <el-radio-group v-model="systemForm.lang" @change="changeSysLang">
                      <el-radio :label="$t('student.myPage.zh_tw')"></el-radio>
                      <el-radio :label="$t('student.myPage.en')"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
      
      <el-footer>
        <nav-footer-student></nav-footer-student>
      </el-footer>
    </el-container>
  </el-container>

  <change-pwd-drawer :visible="pwdDrawerVisible" @onChangeVisible="onChangePwdDrawerVisible"></change-pwd-drawer>
</el-container>
</div>
</template>

<script>
import {studentCheckLogin} from '@/apis/_checkLogin.js'
import {apiStudInfo} from '@/apis/student.js'

import NavHeaderStudent from '@/components/Student/NavHeaderStudent.vue'
import SideNavStudent from '@/components/Student/SideNavStudent.vue'
import NavFooterStudent from '@/components/Student/NavFooterStudent.vue'
import ChangePwdDrawer from '@/components/Student/ChangePwdDrawer'

export default {
  components: {
    NavHeaderStudent,
    SideNavStudent,
    NavFooterStudent,
    ChangePwdDrawer
  },
  mounted() {
    studentCheckLogin();
    this.getStudentInfo();
  },
  data() {
    return {
      user: {
        name: '',
        studentId: '',
        class: '',
        bestNum: '',
        undoNum: '',
        doneNum: '',
        correctNum: '',
        errorNum: '',
      },
      // percentage
      donePercent: 0,
      // drawer
      pwdDrawerVisible: false,
      // set system
      systemForm: {
        lang: this.$i18n.locale=='zh_TW'?'繁體中文':'English'
      }
    }
  },
  methods: {
    getStudentInfo() {
      apiStudInfo({
        courseId: this.$store.state.course.courseInfo.courseId
      }).then((response) => {
        let res = response.data;
        if(res.status=='200') {
          this.user.name = res.result.name;
          this.user.studentId = res.result.account;
          this.user.class = res.result.studentClass;
          this.user.bestNum = res.result.bestCodeNum;
          this.user.undoNum = res.result.undoNum;
          this.user.doneNum = res.result.doneNum;
          this.user.correctNum = res.result.correctNum;
          this.user.errorNum = res.result.incorrectNum;

          this.setDonePercent();
        }
      });
    },
    // user-section dropdown
    dropdownCmd(cmd) {
      if (cmd == '0') {
        this.pwdDrawerVisible = true;
      }
    },
    // drawer
    onChangePwdDrawerVisible(val) {
      this.pwdDrawerVisible = val;
    },
    // percentage
    setDonePercent() {
      let total = parseInt(this.user.doneNum) + parseInt(this.user.undoNum);
      this.donePercent =  Math.round(parseInt(this.user.doneNum)/total*100);
    },
    changeSysLang() {
      if (this.systemForm.lang=='繁體中文' || this.systemForm.lang=='Traditional Chinese') {
        this.systemForm.lang = '繁體中文';
        this.$i18n.locale = 'zh_TW';
      } else if (this.systemForm.lang=='英文' || this.systemForm.lang=='en') {
        this.systemForm.lang = 'English';
        this.$i18n.locale = 'en';
      }
    }
  }
}
</script>

<style lang="scss">
/* 個人資料 */
#studentIndex-mypage .user-section {
  .el-dropdown {
    height: 29px;
  }

  .el-dropdown-link {
    transition: all .5s ease;
    cursor: pointer;

    &:hover {
      color: #409EFF;
    }
  }

  .user-data {
    width: 100%;
    text-align: center;
    padding-bottom: 20px;
    
    .name {
      font-size: 30px;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .account {
      font-size: 15px;
      color: #909399;
    }

    .class {
      font-size: 15px;
      color: #909399;
    }
  }

}


/* 作答資訊 */
#studentIndex-mypage .answer-section {
  .done {
    font-size: 12px;
    color: #67C23A;
  }

  .undo {
    font-size: 12px;
    color: #F56C6C;
  }

  .best {
    font-size: 12px;
    color: #E6A23C;
  }

  .num {
    font-size: 18px;
  }
}

</style>
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
              <div class="items-nav">
                <span class="item-span">個人資料</span>
                <div class="item-float-right">
                  <el-dropdown trigger="click" @command="dropdownCmd">
                    <span class="el-dropdown-link">
                      <i class="el-icon-more" style="font-size: 20px;"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item icon="el-icon-paperclip" command="0">更改密碼</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
              <div class="user-data">
                <i class="fas fa-user-circle" style="font-size: 80px; "></i>
                <p class="name">{{user.name}}</p>
                <el-row>
                  <el-col :span="12" style="text-align:right;">
                    <span class="account">{{user.studentId}}</span>&nbsp;&nbsp;&nbsp;
                    <span style="font-size:15px; color:#DCDFE6;">|</span>
                  </el-col> 
                  <el-col :span="12" style="text-align:left;">&nbsp;&nbsp;&nbsp;
                    <span class="class">{{user.class}}</span>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-col>

          <el-col :xs="24" :sm="8" class="answer-section">
            <el-card shadow="hover" style="height: 286px;">
              <div class="items-nav">
                <span class="item-span">作答資訊</span>
              </div>
              <div class="center">
                <el-progress type="circle" :percentage="donePercent"></el-progress>
              </div>
              <el-row style="margin-top: 16px;" justify="center">
                <el-col :span="24">
                  <el-col :span="8" style="text-align:center;">
                    <span class="done">已完成</span>&nbsp;&nbsp;&nbsp;
                    <span class="num">{{user.doneNum}}</span>
                  </el-col> 
                  <el-col :span="8" style="text-align:center;">
                    <span class="undo">未完成</span>&nbsp;&nbsp;&nbsp;
                    <span class="num">{{user.undoNum}}</span>
                  </el-col>
                  <el-col :span="8" style="text-align:center;">
                    <span class="best">最佳解答</span>&nbsp;&nbsp;&nbsp;
                    <span class="num">{{user.bestNum}}</span>
                  </el-col> 
                </el-col>
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
      // drawer
      pwdDrawerVisible: false
    }
  },
  computed: {
    donePercent() {
      let total = parseInt(this.user.doneNum)+parseInt(this.user.undoNum);
      return Math.round(parseInt(this.user.doneNum)/total*100);
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
  }
}
</script>

<style lang="scss">
/* items-nav */
#studentIndex-mypage .items-nav {
  width: 95%;
  backgroud-color: white;
  border-bottom: none;
  margin-bottom: 5px;
}

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
<template>
<div>
  <el-drawer
    :title="$t('student.myPage.changePwd')"
    :visible.sync="myVisible"
    direction="ltr"
    id="changePwd-drawer"
    ref="drawer"
    >
    <div class="drawer__content">
      <el-form :model="form" label-position="top" style="height: 95%;">
        <el-form-item :label="$t('base.account')">
          <el-input class="width-80" v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item :label="$t('student.myPage.oriPwd')">
          <el-input class="width-80" v-model="form.oriPassword"></el-input>
        </el-form-item>
        <el-form-item :label="$t('student.myPage.newPwd')">
          <el-input class="width-80" v-model="form.newPassword"></el-input>
        </el-form-item>
      </el-form>
      <div class="drawer__footer">
        <el-row class="width-100" :gutter="20">
          <el-col :span="12">
            <el-button class="width-100 text-center" @click="closeDrawer">{{ $t('base.cancel') }}</el-button>
          </el-col>
          <el-col :span="12">
            <el-button class="width-100 text-center" type="primary" @click="changePassword">{{ $t('base.ok') }}</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-drawer>
</div>
</template>

<script>
import {apiChangePassword} from '@/apis/student.js'

export default {
  components: {},
  props: ['visible'],
  data() {
    return {
      myVisible: this.visible,
      // 改密碼的表單
      form: {
        account: '',
        oriPassword: '',
        newPassword: ''
      }
    }
  },
  watch: {
    visible(val) {
      this.myVisible = val;
    },
    myVisible(val) {
      this.$emit('onChangeVisible', val)
    }
  },
  methods: {
    closeDrawer() {
      this.myVisible = false;
    },
    changePassword() {
      if (this.form.account == '') {
        this.$message.error('請輸入帳號！');
      } else if (this.form.oriPassword == '') {
        this.$message.error('請輸入原密碼！');
      } else if (this.form.newPassword == '') {
        this.$message.error('請輸入新密碼！');
      } else {
        apiChangePassword({
          account: this.form.account,
          oriPassword: this.form.oriPassword,
          newPassword: this.form.newPassword
        }).then((response) => {
          let res = response.data;
          if(res.status=='200') {
            this.$message({
              message: '更改密碼完成！',
              type: 'success'
            });
            this.myVisible = false;
            this.form.account = '';
            this.form.oriPassword = '';
            this.form.newPassword = '';
          } else {
            this.$message.error('帳號或密碼錯誤！');
          }
        });
      }
    }
  }
}
</script>

<style>
#changePwd-drawer .drawer__content {
  padding: 30px;
  /* display: flex;
  flex-direction: column; */
  height: 100%;
}

#changePwd-drawer .drawer__footer {
  /* display: flex; */
}

#changePwd-drawer .drawer__footer button {
  /* display: flex; */
}

#changePwd-drawer .el-form .el-form-item .el-form-item__label {
  padding-bottom: 0px;
}
</style>
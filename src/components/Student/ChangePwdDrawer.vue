<template>
<div>
  <el-drawer
    title="更改密碼"
    :visible.sync="myVisible"
    direction="ltr"
    id="changePwd-drawer"
    ref="drawer"
    >
    <div class="drawer__content">
      <el-form :model="form" label-position="top">
        <el-form-item label="帳號">
          <el-input v-model="form.account" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="原密碼">
          <el-input v-model="form.oriPassword" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="新密碼">
          <el-input v-model="form.newPassword" style="width: 80%;"></el-input>
        </el-form-item>
      </el-form>
      <div class="drawer__footer">
        <el-button @click="closeDrawer">取 消</el-button>
        <el-button type="primary" @click="changePassword">確 定</el-button>
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
  display: flex;
  flex-direction: column;
  height: 100%;
}

#changePwd-drawer .drawer__footer {
  display: flex;
}

#changePwd-drawer .drawer__footer button {
  display: flex;
}

#changePwd-drawer .el-form .el-form-item .el-form-item__label {
  padding-bottom: 0px;
}
</style>
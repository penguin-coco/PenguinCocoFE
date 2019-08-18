<template>
<div>
  <el-menu :default-active="$route.path" style="height: calc(100vh - 60px); overflow: initial;" router>
    <el-menu-item :index="problemIndex">
      <i class="el-icon-menu"></i>
      <span slot="title">題目列表</span>
    </el-menu-item>
    <el-menu-item :index="scorePanelIndex">
      <i class="el-icon-document"></i>
      <span slot="title">成績面板</span>
    </el-menu-item>
    <el-menu-item :index="mypageIndex">
      <i class="el-icon-setting"></i>
      <span slot="title">個人中心</span>
    </el-menu-item>
    <el-menu-item @click="showRankDialog">
      <i class="el-icon-trophy-1"></i>
      <span slot="title">排行榜</span>
    </el-menu-item>
    <el-menu-item @click="sendFeedback">
      <i class="el-icon-edit"></i>
      <span slot="title">意見回饋</span>
    </el-menu-item>
  </el-menu>

  <rank-dialog :visible="rankDialogVisible" @onChangeVisible="onChangeRankDialogVisible"></rank-dialog>
</div>
</template>

<script>
import {apiAddFeedback} from '@/apis/feedback.js'

import RankDialog from '@/components/MgmtContent/RankDialog'

export default {
  components: {
    RankDialog
  },
  data() {
    return {
      problemIndex: '/student/'+this.$route.params.courseName+'/index',
      scorePanelIndex: '/student/'+this.$route.params.courseName+'/scorePanel',
      mypageIndex: '/student/'+this.$route.params.courseName+'/myPage',
      // rank dialog
      rankDialogVisible: false,
    }
  },
  methods: {
    // rank dialog
    showRankDialog() {
      this.rankDialogVisible = true;
    },
    onChangeRankDialogVisible(val) {
      this.rankDialogVisible = val;
    },
    // feedback
    sendFeedback() {
      this.$prompt('請輸入對系統的建議', '系統回饋', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        inputType: 'textarea'
      }).then(({
        value
      }) => {
        apiAddFeedback({
          courseId: this.$store.state.course.courseInfo.courseId,
          content: value
        }).then((response) => {
          let res = response.data;
          if (res.status == '200') {
            this.$message({
              type: 'success',
              message: '已經收到您的回饋！'
            });
          } else {
            this.$message({
              type: 'error',
              message: '傳送回饋失敗 :('
            });
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消輸入'
        });
      });
    },
  }
}
</script>
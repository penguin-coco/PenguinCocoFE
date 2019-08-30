<template>
<div>
  <el-menu :default-active="$route.path" style="height: calc(100vh - 60px); overflow: initial;" router>
    <el-menu-item :index="problemIndex">
      <i class="el-icon-menu"></i>
      <span slot="title">{{ $t('student.header.problemList') }}</span>
    </el-menu-item>
    <el-menu-item :index="scorePanelIndex">
      <i class="el-icon-document"></i>
      <span slot="title">{{ $t('student.header.scorePanel') }}</span>
    </el-menu-item>
    <el-menu-item :index="mypageIndex">
      <i class="el-icon-setting"></i>
      <span slot="title">{{ $t('student.header.myPage') }}</span>
    </el-menu-item>
    <el-menu-item @click="showRankDialog">
      <i class="el-icon-trophy-1"></i>
      <span slot="title">{{ $t('student.header.rank') }}</span>
    </el-menu-item>
    <el-menu-item @click="sendFeedback">
      <i class="el-icon-edit"></i>
      <span slot="title">{{ $t('student.header.feedback') }}</span>
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
      this.$prompt(this.$i18n.t('student.feedback.modalTitle'), this.$i18n.t('student.header.feedback'), {
        confirmButtonText: this.$i18n.t('base.ok'),
        cancelButtonText: this.$i18n.t('base.cancel'),
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
              message: this.$i18n.t('student.feedback.getFeedback')
            });
          } else {
            this.$message({
              type: 'error',
              message: this.$i18n.t('student.feedback.errorFeedback')
            });
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$i18n.t('student.feedback.cancelFeedback')
        });
      });
    },
  }
}
</script>
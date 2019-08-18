<template>
<div>
  <div style="margin-top: 50px; text-align: center;">
    <el-form :model="courseData" label-position="top">
      <el-form-item label="課程名稱">
        <el-input v-model="courseData.courseName" style="width: 50%;"></el-input>
      </el-form-item>
      <el-form-item label="課程學期 (ex. 108上)">
        <el-input v-model="courseData.semester" style="width: 50%;"></el-input>
      </el-form-item>
    </el-form>
  </div>
  <el-button-group style="float: right;">
    <el-button type="primary" icon="el-icon-arrow-left" v-if="step!=1">上一步</el-button>
    <el-button type="primary" @click="nextStep">下一步<i class="el-icon-arrow-right el-icon--right"></i></el-button>
  </el-button-group>
</div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      step: 1,
      courseData: {
        courseName: '',
        semester: ''
      }
    }
  },
  methods: {
    nextStep() {
      if (this.courseData.courseName == '') {
        this.$message.error('請輸入課程名稱！');
      } else if (this.courseData.semester == '') {
        this.$message.error('請輸入課程學期！');
      } else {
        this.$emit('goNext1To2', this.courseData, this.step);
      }
    }
  }
}
</script>
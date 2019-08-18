<template>
<div>
  <el-container>
    <el-header>
      <nav-header-teacher></nav-header-teacher>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <side-nav-course-list-teacher></side-nav-course-list-teacher>
      </el-aside>
      <el-container>
        <el-main>
          <page-name-breadcrumb pageName="新增課程" :isBreadcrumb="false"></page-name-breadcrumb>
          <el-row class="box-square">
            <!-- 步驟條 start -->
            <el-steps :active="step" align-center>
              <el-step title="步驟 1" description="新增課程內容"></el-step>
              <el-step title="步驟 2" description="加入學生進課程"></el-step>
              <el-step title="步驟 3" description="加入助教進課程"></el-step>
            </el-steps>
            <!-- 步驟條 end -->
            <el-col :span="20" :offset="2">
              <!-- 步驟欄位 start -->
              <teacher-new-course-step1 v-if="step==1" @goNext1To2="getNext1To2"></teacher-new-course-step1>
              <teacher-new-course-step2 v-if="step==2" @goLast2To1="getLast2to1" @goNext2To3="getNext2To3"></teacher-new-course-step2>
              <teacher-new-course-step3 v-if="step==3" @goLast3To2="getLast3to2" @submit="submit"></teacher-new-course-step3>
            </el-col>
          </el-row>
        </el-main>
        <el-footer>
          <nav-footer></nav-footer>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</div>
</template>

<script>
import {teacherCheckLogin} from '@/apis/_checkLogin.js'
import {apiCreateCourse} from '@/apis/teacher.js'

import NavHeaderTeacher from '@/components/Teacher/NavHeaderTeacher'
import SideNavCourseListTeacher from '@/components/Teacher/SideNavCourseListTeacher'
import PageNameBreadcrumb from '@/components/MgmtContent/PageNameBreadcrumb'
import NavFooter from '@/components/NavFooter'
import TeacherNewCourseStep1 from '@/components/Teacher/TeacherNewCourseStep1'
import TeacherNewCourseStep2 from '@/components/Teacher/TeacherNewCourseStep2'
import TeacherNewCourseStep3 from '@/components/Teacher/TeacherNewCourseStep3'

export default {
  components: {
    NavHeaderTeacher,
    SideNavCourseListTeacher,
    PageNameBreadcrumb,
    NavFooter,
    TeacherNewCourseStep1,
    TeacherNewCourseStep2,
    TeacherNewCourseStep3
  },
  data() {
    return {
      step: 1,
      courseData: {
        courseName: '',
        semester: '',
        studentClass: '',
        taList: [] 
      }
    }
  },
  mounted() {
    teacherCheckLogin();
  },
  methods: {
    // step1 to step2
    getNext1To2(data, step) {
      this.courseData.courseName = data.courseName;
      this.courseData.semester = data.semester;
      this.step = step+1;
    },
    // step2 to step1
    getLast2to1(step) {
      this.step = step-1;
    },
    // step2 to step3
    getNext2To3(data, step) {
      this.step = step+1;
      this.courseData.studentClass = data[0];
    },
    // step3 to step2
    getLast3to2(step) {
      this.step = step-1;
    },
    submit(data) {
      this.courseData.taList = data;

      apiCreateCourse({
        courseName: this.courseData.courseName,
        semester: this.courseData.semester,
        studentClass: this.courseData.studentClass,
        taList: this.courseData.taList
      }).then((response) => {
        let res = response.data;
        if (res.status == '200') {
          this.$message({
            type: 'success',
            message: '新增課程成功!'
          });
        }
        this.step = 1;
        this.courseData = {
          courseName: '',
          semester: '',
          studentClass: '',
          taList: [] 
        }
      });
    }
  }
}
</script>

<style>
.child-view {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(50px, 0);
  transform: translate(50px, 0);
}
.slide-right-enter,
.slide-left-leave-active
 {
  opacity: 0;
  -webkit-transform: translate(-50px, 0);
  transform: translate(-50px, 0);
}

</style>

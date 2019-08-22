<template>
<div>
  <el-container>
    <el-header>
      <nav-header-teacher></nav-header-teacher>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <side-nav-course-index-teacher></side-nav-course-index-teacher>
      </el-aside>
      <el-container class="main-container">
        <el-main>
          <page-name-breadcrumb pageName="意見回饋"></page-name-breadcrumb>
          <el-row class="penguin-box">
            <el-col :span="20" :offset="2">
              <el-table :data="feedbackTableData" height="70vh" style="width: 100%;">
                <el-table-column prop="account" label="學號" width="180">
                </el-table-column>
                <el-table-column prop="date" label="日期" width="180">
                </el-table-column>
                <el-table-column prop="content" label="意見回饋">
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>

          <nav-footer></nav-footer>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</div>
</template>

<script>
import {teacherCheckLogin} from '@/apis/_checkLogin.js'
import {apiGetCourseFeedbacks} from '@/apis/feedback.js'

import NavHeaderTeacher from '@/components/Teacher/NavHeaderTeacher'
import SideNavCourseIndexTeacher from '@/components/Teacher/SideNavCourseIndexTeacher'
import PageNameBreadcrumb from '@/components/MgmtContent/PageNameBreadcrumb'
import NavFooter from '@/components/NavFooter'

export default {
  components: {
    NavHeaderTeacher,
    SideNavCourseIndexTeacher,
    PageNameBreadcrumb,
    NavFooter
  },
  data() {
    return {
      feedbackTableData: []
    }
  },
  mounted() {
    teacherCheckLogin();
    this.getStudentFeedback();
  },
  methods: {
    getStudentFeedback() {
      apiGetCourseFeedbacks({
        courseId: this.$store.state.course.courseInfo.courseId
      }).then((response)=> {
        let res = response.data;
        if(res.status=='200') {
          this.feedbackTableData = res.result;
        } else {
          console.log(res.msg);
        }
      });
    }
  }
}
</script>

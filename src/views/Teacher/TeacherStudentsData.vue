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
          <page-name-breadcrumb pageName="學生資訊"></page-name-breadcrumb>
          <students-data-section :data="tableData" :formThead="formThead" :loading="loading"></students-data-section>
          <nav-footer></nav-footer>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</div>
</template>

<script>
import {teacherCheckLogin} from '@/apis/_checkLogin.js'
import {apiGetStudentsData} from '@/apis/course.js'

import NavHeaderTeacher from '@/components/Teacher/NavHeaderTeacher'
import PageNameBreadcrumb from '@/components/MgmtContent/PageNameBreadcrumb'
import SideNavCourseIndexTeacher from '@/components/Teacher/SideNavCourseIndexTeacher'
import NavFooter from '@/components/NavFooter'
import StudentsDataSection from '@/components/MgmtContent/StudentsDataSection'

import '@/assets/css/backstage/studentsData.scss'

export default {
  components: {
    NavHeaderTeacher,
    PageNameBreadcrumb,
    SideNavCourseIndexTeacher,
    NavFooter,
    StudentsDataSection
  },
  data() {
    return {
      // formThead
      formThead: '',
      // table
      loading: false,
      tableData: [],
    }
  },
  mounted() {
    teacherCheckLogin();
    this.getStudentsData();
  },
  methods: {
    getStudentsData() {
      this.loading = true;

      apiGetStudentsData({
        courseId: this.$store.state.course.courseInfo.courseId
      }).then((response) => {
        let res = response.data;
        if (res.status == '200') {
          this.tableData = res.result;
          
          // formThead
          this.formThead = this.tableData[0].problems.map(v => {
            return v.name
          });

          this.loading = false;
        }
      });
    },
  }
}
</script>
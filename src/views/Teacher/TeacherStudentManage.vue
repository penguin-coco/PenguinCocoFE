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
          <page-name-breadcrumb pageName="學生管理"></page-name-breadcrumb>
          <student-manage-section></student-manage-section>
          <nav-footer></nav-footer>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</div>
</template>

<script>
import {teacherCheckLogin} from '@/apis/_checkLogin.js'

import NavHeaderTeacher from '@/components/Teacher/NavHeaderTeacher'
import PageNameBreadcrumb from '@/components/MgmtContent/PageNameBreadcrumb'
import SideNavCourseIndexTeacher from '@/components/Teacher/SideNavCourseIndexTeacher'
import StudentManageSection from '@/components/MgmtContent/StudentManageSection'
import NavFooter from '@/components/NavFooter'

export default {
  components: {
    NavHeaderTeacher,
    PageNameBreadcrumb,
    SideNavCourseIndexTeacher,
    StudentManageSection,
    NavFooter
  },
  mounted() {
    teacherCheckLogin();
  }
}
</script>
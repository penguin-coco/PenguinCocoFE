<template>
<div>
  <el-container>
    <el-header>
      <nav-header-assistant></nav-header-assistant>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <side-nav-course-index-assistant></side-nav-course-index-assistant>
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
import {assistantCheckLogin} from '@/apis/_checkLogin.js'

import NavHeaderAssistant from '@/components/Assistant/NavHeaderAssistant'
import PageNameBreadcrumb from '@/components/MgmtContent/PageNameBreadcrumb'
import SideNavCourseIndexAssistant from '@/components/Assistant/SideNavCourseIndexAssistant'
import StudentManageSection from '@/components/MgmtContent/StudentManageSection'
import NavFooter from '@/components/NavFooter'

export default {
  components: {
    NavHeaderAssistant,
    PageNameBreadcrumb,
    SideNavCourseIndexAssistant,
    StudentManageSection,
    NavFooter
  },
  mounted() {
    assistantCheckLogin();
  }
}
</script>
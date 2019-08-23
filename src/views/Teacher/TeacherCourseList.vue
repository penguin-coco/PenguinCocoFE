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
      <el-container class="main-container">
        <el-main>
          <page-name-breadcrumb pageName="課程列表" :isBreadcrumb="false"></page-name-breadcrumb>
          <el-row class="penguin-box border-radius-none">
            <course-list :data="courseList"></course-list>
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
import {apiTrCourseList} from '@/apis/teacher.js'

import NavHeaderTeacher from '@/components/Teacher/NavHeaderTeacher'
import SideNavCourseListTeacher from '@/components/Teacher/SideNavCourseListTeacher'
import PageNameBreadcrumb from '@/components/MgmtContent/PageNameBreadcrumb'
import NavFooter from '@/components/NavFooter'
import CourseList from '@/components/MgmtContent/CourseList.vue'

export default {
  components: {
    NavHeaderTeacher,
    SideNavCourseListTeacher,
    PageNameBreadcrumb,
    NavFooter,
    CourseList
  },
  data() {
    return {
      courseList: []
    }
  },
  mounted() {
    teacherCheckLogin();
    this.getCourses();
  },
  methods: {
    getCourses() {
      apiTrCourseList().then((response)=> {
        let res = response.data;
        if(res.status=="200") {
          this.courseList = res.result;
        }
      });
    }
  }
}
</script>

<template>
<div>
  <el-container>
    <el-header>
      <nav-header-assistant></nav-header-assistant>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <side-nav-course-list-assistant></side-nav-course-list-assistant>
      </el-aside>
      <el-container class="main-container">
        <el-main>
          <page-name-breadcrumb pageName="課程列表" :isBreadcrumb="false"></page-name-breadcrumb>
          <el-row class="penguin-box">
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
import axios from 'axios'
import {assistantCheckLogin} from '@/apis/_checkLogin.js'
import {apiAsstCourseList} from '@/apis/assistant.js'

import NavHeaderAssistant from '@/components/Assistant/NavHeaderAssistant'
import SideNavCourseListAssistant from '@/components/Assistant/SideNavCourseListAssistant'
import PageNameBreadcrumb from '@/components/MgmtContent/PageNameBreadcrumb'
import NavFooter from '@/components/NavFooter'
import CourseList from '@/components/MgmtContent/CourseList.vue'

export default {
  components: {
    NavHeaderAssistant,
    SideNavCourseListAssistant,
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
    assistantCheckLogin();
    this.getCourses();
  },
  methods: {
    getCourses() {
      apiAsstCourseList().then((response)=> {
        let res = response.data;
        if(res.status=="200") {
          this.courseList = res.result;
        }
      });
    }
  }
}
</script>
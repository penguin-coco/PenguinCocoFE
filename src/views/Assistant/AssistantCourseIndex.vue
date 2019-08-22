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
          <page-name-breadcrumb :pageName="this.$store.state.course.courseInfo.courseName" :isBreadcrumb="false"></page-name-breadcrumb>
          <el-row class="penguin-box">
            <el-row :gutter="25">
              <el-col :span="8" v-for="item in oprateList" :key="item" style="margin-bottom: 15px;">
                <a href="javascript:void(0);" @click="toProblemsData(item)" style="text-decoration: none;">
                  <el-card shadow="hover">{{ item }}</el-card>
                </a>
              </el-col>
            </el-row>
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
import {assistantCheckLogin} from '@/apis/_checkLogin.js'

import NavHeaderAssistant from '@/components/Assistant/NavHeaderAssistant'
import SideNavCourseIndexAssistant from '@/components/Assistant/SideNavCourseIndexAssistant'
import PageNameBreadcrumb from '@/components/MgmtContent/PageNameBreadcrumb'
import NavFooter from '@/components/NavFooter'

export default {
  components: {
    NavHeaderAssistant,
    SideNavCourseIndexAssistant,
    PageNameBreadcrumb,
    NavFooter
  },
  data() {
    return {
      oprateList: ['題目列表', '新增題目', '學生管理', '學生資訊', '意見回饋']
    }
  },
  mounted() {
    assistantCheckLogin();
  },
  methods: {
    toProblemsData(item) {
      let baseLink = '/assistant/'+this.$store.state.course.courseInfo.courseName+'/';

      if(item=='題目列表') {
        this.$router.push(baseLink+'problemsData');
      } else if (item=='新增題目') {
        this.$router.push(baseLink+'newProblem');
      } else if (item=='學生管理') {
        this.$router.push(baseLink+'studentManage');
      } else if (item=='學生資訊') {
        this.$router.push(baseLink+'studentsData');
      } else if (item=='意見回饋') {
        this.$router.push(baseLink+'feedback');
      }
    }
  }
}
</script>
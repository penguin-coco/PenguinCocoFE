<template>
<div>
  <nav-header-student-plain :isCourseList="false"></nav-header-student-plain>
  <div class="space"></div>
  <el-row>
    <el-col :span="20" :offset="2" class="penguin-box box-shadow-heavy">
      <div class="penguin-content-header">
        <div class="content-title">我的課程</div>
      </div>
      <course-list :data="courseList"></course-list>
    </el-col>
  </el-row>
  <nav-footer></nav-footer>
</div>
</template>

<script>
import {studentCheckLogin} from '@/apis/_checkLogin.js'
import {apiStudCourseList} from '@/apis/student.js'

import NavHeaderStudentPlain from '@/components/Student/NavHeaderStudentPlain'
import NavFooter from '@/components/NavFooter.vue'
import CourseList from '@/components/MgmtContent/CourseList.vue'

export default {
  components: {
    NavHeaderStudentPlain,
    NavFooter,
    CourseList
  },
  data() {
    return {
      courseList: []
    }
  },
  mounted() {
    studentCheckLogin();
    this.getCourses();
  },
  methods: {
    getCourses() {
      apiStudCourseList().then((response)=> {
        let res = response.data;
        if(res.status=="200") {
          this.courseList = res.result;
        }
      });
    }
  }
}
</script>

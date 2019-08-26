import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import StudentCourseList from '@/views/Student/StudentCourseList' 
import StudentIndex from '@/views/Student/StudentIndex'
import StudentScorePanel from '@/views/Student/StudentScorePanel'
import StudentMypage from '@/views/Student/StudentMypage'
import StudentCoding from '@/views/Student/StudentCoding'

import TeacherCourseList from '@/views/Teacher/TeacherCourseList'
import TeacherNewCourse from '@/views/Teacher/TeacherNewCourse'
import TeacherEditCourse from '@/views/Teacher/TeacherEditCourse'
import TeacherCourseIndex from '@/views/Teacher/TeacherCourseIndex'
import TeacherProblemsData from '@/views/Teacher/TeacherProblemsData'
import TeacherNewProblem from '@/views/Teacher/TeacherNewProblem'
import TeacherStudentManage from '@/views/Teacher/TeacherStudentManage'
import TeacherStudentsData from '@/views/Teacher/TeacherStudentsData'
import TeacherFeedback from '@/views/Teacher/TeacherFeedback'

import AssistantCourseList from '@/views/Assistant/AssistantCourseList'
import AssistantCourseIndex from '@/views/Assistant/AssistantCourseIndex'
import AssistantProblemsData from '@/views/Assistant/AssistantProblemsData'
import AssistantNewProblem from '@/views/Assistant/AssistantNewProblem'
import AssistantStudentManage from '@/views/Assistant/AssistantStudentManage'
import AssistantStudentsData from '@/views/Assistant/AssistantStudentsData'
import AssistantFeedback from '@/views/Assistant/AssistantFeedback'

import QuesIndex from '@/views/Ques/QuesIndex'
import QuesNewProblem from '@/views/Ques/QuesNewProblem'

import ErrorPage403 from '@/components/Error/ErrorPage403.vue'
import ErrorPage404 from '@/components/Error/ErrorPage404.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Root',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/student/courseList',
      name: 'StudentCourseList',
      component: StudentCourseList
    },
    {
      path: '/student/:courseName/index',
      name: 'StudentIndex',
      component: StudentIndex
    },
    {
      path: '/student/:courseName/scorePanel',
      name: 'StudentScorePanel',
      component: StudentScorePanel
    },
    {
      path: '/student/:courseName/mypage',
      name: 'StudentMypage',
      component: StudentMypage
    },
    {
      path: '/student/:courseName/coding',
      name: 'StudentCoding',
      component: StudentCoding
    },
    {
      path: '/teacher/courseList',
      name: 'TeacherCourseList',
      component: TeacherCourseList
    },
    {
      path: '/teacher/newCourse',
      component: TeacherNewCourse
    },
    {
      path: '/teacher/editCourse',
      name: 'TeacherEditCourse',
      component: TeacherEditCourse
    },
    {
      path: '/teacher/:courseName/index',
      component: TeacherCourseIndex
    },
    {
      path: '/teacher/:courseName/problemsData',
      component: TeacherProblemsData
    },
    {
      path: '/teacher/:courseName/newProblem',
      component: TeacherNewProblem
    },
    {
      path: '/teacher/:courseName/studentManage',
      component: TeacherStudentManage
    },
    {
      path: '/teacher/:courseName/studentsData',
      component: TeacherStudentsData
    },
    {
      path: '/teacher/:courseName/feedback',
      component: TeacherFeedback
    },
    {
      path: '/assistant/courseList',
      name: 'AssistantCourseList',
      component: AssistantCourseList
    },
    {
      path: '/assistant/:courseName/index',
      component: AssistantCourseIndex
    },
    {
      path: '/assistant/:courseName/problemsData',
      component: AssistantProblemsData
    },
    {
      path: '/assistant/:courseName/newProblem',
      component: AssistantNewProblem
    },
    {
      path: '/assistant/:courseName/studentManage',
      component: AssistantStudentManage
    },
    {
      path: '/assistant/:courseName/studentsData',
      component: AssistantStudentsData
    },
    {
      path: '/assistant/:courseName/feedback',
      component: AssistantFeedback
    },
    {
      path: '/ques/index',
      component: QuesIndex
    },
    {
      path: '/ques/newProblem',
      component: QuesNewProblem
    },
    {
      name: '403',
      path: '/error/403',
      component: ErrorPage403
    },
    {
      name: '404',
      path: '*',
      component: ErrorPage404
    },
  ]
})

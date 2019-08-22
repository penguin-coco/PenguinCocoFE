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
          <!-- table problem data -->
          <table-problem-data :problemData="tableData" :tableLoading='loading' @refreshProblemsData="refreshProblemsData" @showViewProblemDialog="showViewProblemDialog" @showEditProblemDialog="showEditProblemDialog" @showDoStatusDialog="showDoStatusDialog" ></table-problem-data>

          <nav-footer></nav-footer>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
  
  <!-- view problem dialog -->
  <view-problem-dialog :visible="viewProblemDialogVisible" :loading="viewProblemLoading" :data="problemData" @onChangeVisible="onChangeViewProblemDialogVisible"></view-problem-dialog>

  <!-- edit problem dialog -->
  <edit-problem-dialog :visible="editProblemDialogVisible" :data="editProblemData" @onChangeVisible="onChangeEditProblemDialogVisible" @refreshData="refreshProblemsData">
  </edit-problem-dialog>

  <!-- do status dialog -->
  <do-status-problem-dialog :visible="doStatusDialogVisible" :status="doInfoDialogStatus" :data="doStatusData" @onChangeVisible="onChangeDoStatusDialogVisible" :problemName="doInfoDialogPName"></do-status-problem-dialog>
  
</div>
</template>

<script>
import {teacherCheckLogin} from '@/apis/_checkLogin.js'
import {apiGetProblems, apiGetInfo} from '@/apis/problem.js'
import {apiGetStudentsData} from '@/apis/course.js'

import DateUtil from '@/utils/DateUtil.js'
import problemStateMixin from '@/mixins/problemState.mixin.js'

import NavHeaderTeacher from '@/components/Teacher/NavHeaderTeacher'
import SideNavCourseIndexTeacher from '@/components/Teacher/SideNavCourseIndexTeacher'
import PageNameBreadcrumb from '@/components/MgmtContent/PageNameBreadcrumb'
import NavFooter from '@/components/NavFooter'
import TableProblemData from '@/components/MgmtProblem/TableProblemData'
import ViewProblemDialog from '@/components/MgmtProblem/ViewProblemDialog'
import EditProblemDialog from '@/components/MgmtProblem/EditProblemDialog'
import DoStatusProblemDialog from '@/components/MgmtProblem/DoStatusProblemDialog'

export default {
  components: {
    NavHeaderTeacher,
    SideNavCourseIndexTeacher,
    PageNameBreadcrumb,
    NavFooter,
    TableProblemData,
    ViewProblemDialog,
    EditProblemDialog,
    DoStatusProblemDialog
  },
  data() {
    return {
      // table
      tableData: [],
      loading: false,
      // viewProblem dialog
      viewProblemDialogVisible: false,
      problemData: {
        'id': '',
        'judged': null,
        'name': '',
        'rate': null,
        'type': '',
        'category': '',
        'tag': [],
        'deadline': '',
        'description': '',
        'inputDesc': '',
        'outputDesc': '',
        'testCases': [],
        'correctNum': null,
        'incorrectNum': null
      },
      // edit problem dialog
      editProblemDialogVisible: false,
      editProblemData: {
        'id': '',
        'name': '',
        'type': '',
        'category': '',
        'tag': [],
        'deadline': '',
        'description': '',
        'inputDesc': '',
        'outputDesc': '',
        'testCases': [],
        'keyword': [],
        'pattern': []
      },
      // do status dialog
      studentData: [], // getStudentsData
      doStatusDialogVisible: false,
      doInfoDialogPName: '',
      doInfoDialogStatus: '',
      viewProblemLoading: false
    }
  },
  computed: {
    doStatusData() {
      // TODO 使用PID判別
      let data = this.studentData;
      let flag = this.doInfoDialogStatus;
      let tempTableData = [];
      for (let i = 0; i < data.length; i++) {
        let id = data[i].studentId;
        let name = data[i].studentName;
        let problems = data[i].problems;
        // 已作答的狀況
        if (flag == 'done') {
          for (let j = 0; j < problems.length; j++) {
            if (problems[j].historyCode!=0) {
              if (problems[j].name==this.doInfoDialogPName && problems[j].historyCode.slice(-1)[0].score!='未作答') {
                let obj = {
                  studentId: id,
                  studentName: name,
                  score: problems[j].historyCode.slice(-1)[0].score,
                  code: problems[j].historyCode.slice(-1)[0].code
                };
                tempTableData.push(obj)
              }
            }
          }
        } else if (flag == 'undo') { // 未作答的狀況
          for (let j = 0; j < problems.length; j++) {
            if (problems[j].name==this.doInfoDialogPName && problems[j].historyCode.length==0) {
              let obj = {
                studentId: id,
                studentName: name,
                score: '未作答'
              };
              tempTableData.push(obj)
            }
          }
        }
      }
      return tempTableData
    }
  },
  mounted() {
    teacherCheckLogin();
    this.getProblemsData();
    this.getStudentsData();
  },
  methods: {
    getProblemsData() {
      this.loading = true;

      apiGetProblems({
        courseId: this.$store.state.course.courseInfo.courseId
      }).then((response) => {
        let res = response.data;
        if (res.status == '200') {
          this.tableData = res.result;
          this.loading = false;
        }
      });
    },
    getStudentsData() {
      apiGetStudentsData({
        courseId: this.$store.state.course.courseInfo.courseId
      }).then((response) => {
        let res = response.data;
        if (res.status == '200') {
          this.studentData = res.result;
        }
      });
    },
    // ProblemTableData component
    showViewProblemDialog(problemId) {
      this.viewProblemLoading = true;
      apiGetInfo({
        problemId: problemId
      }).then((response) => {
        let res = response.data;
        if (res.status == '200') {
          this.problemData.id = problemId;
          this.problemData.name = res.result.name;
          this.problemData.type = res.result.type;
          this.problemData.category = res.result.category;
          this.problemData.tag = res.result.tag;
          this.problemData.deadline = res.result.deadline;
          this.problemData.description = res.result.description;
          this.problemData.inputDesc = res.result.inputDesc;
          this.problemData.outputDesc = res.result.outputDesc;
          this.problemData.testCases = res.result.testCases;
          this.problemData.correctNum = parseInt(res.result.correctNum);
          this.problemData.incorrectNum = parseInt(res.result.incorrectNum);
        }
      });
      this.viewProblemLoading = false;
      this.viewProblemDialogVisible = true;
    },
    onChangeViewProblemDialogVisible(val) {
      this.viewProblemDialogVisible = val;
    },
    refreshProblemsData() {
      this.getProblemsData();
    },
    // EditTableData component
    showEditProblemDialog(editProblemData) {
      this.editProblemData = editProblemData;
      this.editProblemDialogVisible = true;
    },
    onChangeEditProblemDialogVisible(val) {
      this.editProblemDialogVisible = val;
    },
    // do status
    onChangeDoStatusDialogVisible(val) {
      this.doStatusDialogVisible = val;
    },
    showDoStatusDialog(problemName, status) {
      this.doInfoDialogPName = problemName;
      this.doInfoDialogStatus = status;
      this.doStatusDialogVisible = true;
    }
  }
}
</script>

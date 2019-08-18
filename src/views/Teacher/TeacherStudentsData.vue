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
          <div class="box-square">
            <el-input class='filterInput' v-model='filterQuery' placeholder='請輸入學號或姓名' clearable><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
            <el-table :data="tableFiltered.slice((currentPage-1)*pagesize, currentPage*pagesize)" border style="width: 100%" ref="studentsTable" v-loading="loading">
              <el-table-column fixed prop="studentId" label="學號" width="120"></el-table-column>
              <el-table-column fixed label="姓名" width="120">
                <template slot-scope="scope">
                  <a class="id-hyperlink" href="javascript:void(0)" @click="studentInfo(scope.row.studentId, scope.row.studentName)">{{ scope.row.studentName }}</a>
                </template>
              </el-table-column>
              <el-table-column fixed prop="studentClass" label="系級" width="120"></el-table-column>
              <el-table-column :key="index" v-for="(problem, index) in formThead " :label="problem" width="120">
                <template slot-scope="scope">
                  <span>{{ scope.row.problems[index].historyCode.length!=0?scope.row.problems[index].historyCode.slice(-1)[0].score:'未作答' }}</span>
                </template>
              </el-table-column>
            </el-table>
            <div style="text-align: center;margin-top: 30px;">
              <el-pagination background layout="prev, pager, next" :total="total" @current-change="currentChange" :page-size="pagesize"></el-pagination>
            </div>
            <el-row>
              <el-col :span="4" :offset="20">
                <el-button id="tocsv-btn" type="success" @click="exportCsv">匯出成績 <i class="fas fa-file-excel"></i></el-button>
              </el-col>
            </el-row>
          </div>

          <nav-footer></nav-footer>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
  <!-- 學生做題資訊 dialog start -->
  <el-dialog :visible.sync="dialogFormVisible" @close="clearFilter">
    <el-row id="student-dialog">
      <el-col :span="20" :offset="2">
        <div class="items-nav">
          <div class="item">{{ dialogStudentName }}</div>{{ dialogStudentId }}
        </div>
        <el-row>
          <el-col :span="11" class="statistic-block" style="background-color: #3498DB;">
            <div class="statistic">{{ dialogStudentDoRate }}%</div>
            <div class="title">作答率</div>
          </el-col>
          <el-col :span="11" :offset="1" class="statistic-block" style="background-color: #A569BD;">
            <div class="statistic">{{ dialogStudentCorrectRate }}%</div>
            <div class="title">正確率</div>
          </el-col>
        </el-row>
        <el-table max-height="250" :data="dialogStudentData" @filter-change="handleFilterChange" ref="table" style="width: 100%; margin-top: 20px; margin-bottom: 20px;">
          <el-table-column prop="name" label="題目名稱">
          </el-table-column>
          <el-table-column prop="type" label="題目類型" :filters="[{text: '作業', value: '作業'}, {text: '練習題', value: '練習題'}, {text: '討論題', value: '討論題'}]" :filter-method="typeFilterHandler">
          </el-table-column>
          <el-table-column prop="score" label="成績" :filters="[{text: '100', value: '100.0'}, {text: '0', value: '0.0'}, {text: '未作答', value: '未作答'}]" :filter-method="scoreFilterHandler">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogFormVisible=false">確 定</el-button>
    </div>
  </el-dialog>
  <!-- 學生做題資訊 dialog end -->
</div>
</template>

<script>
import {teacherCheckLogin} from '@/apis/_checkLogin.js'
import {apiGetStudentsData} from '@/apis/course.js'

import NavHeaderTeacher from '@/components/Teacher/NavHeaderTeacher'
import SideNavCourseIndexTeacher from '@/components/Teacher/SideNavCourseIndexTeacher'
import PageNameBreadcrumb from '@/components/MgmtContent/PageNameBreadcrumb'
import NavFooter from '@/components/NavFooter'

import '@/assets/css/backstage/studentsData.scss'

import {
  CsvExport
} from '@/utils/CsvExport.js'

export default {
  components: {
    NavHeaderTeacher,
    SideNavCourseIndexTeacher,
    PageNameBreadcrumb,
    NavFooter
  },
  data() {
    return {
      // formThead
      formThead: '',
      // pagination
      total: 0,
      tableHeight: null,
      pagesize: 10,
      currentPage:1,
      // table
      loading: false,
      tableData: [],
      // changeTableWidth
      tableFlag: 1,
      filterQuery: '',
      // dialogForm
      filterList: [],
      dialogFormVisible: false,
      dialogStudentId: '',
      dialogStudentName: '',
      dialogStudentDoRate: '0',
      dialogStudentCorrectRate: '0'
    }
  },
  mounted() {
    teacherCheckLogin();
    this.getStudentsData();
    this.countTableHeight();
  },
  computed: {
    tableFiltered() {
      let oriTable = this.tableData;
      let filteredTable = [];

      if (this.filterQuery == '') {
        // pagination
        this.total = oriTable.length;
        return oriTable
      } else {
        for (let i = 0; i < oriTable.length; i++) {
          if (oriTable[i].studentId.includes(this.filterQuery) || oriTable[i].studentName.includes(this.filterQuery)) {
            filteredTable.push(oriTable[i]);
          }
        }
        // pagination
        this.total = filteredTable.length;
        this.currentPage = 1;
        return filteredTable
      }
    },
    dialogStudentData() {
      let problemsList = [];
      let resultList = [];
      let data = this.tableData;
      for (let i = 0; i < data.length; i++) {
        if (this.dialogStudentId == data[i].studentId) {
          problemsList = data[i].problems;

          // 計算 dialogStudentCorrectRate
          let correct = 0;
          let incorrect = 0;
          for (let j = 0; j < problemsList.length; j++) {
            if (problemsList[j].historyCode.length > 0) {
              if (problemsList[j].historyCode.slice(-1)[0].score == 100) {
                correct++;
              } else if (problemsList[j].historyCode.slice(-1)[0].score == 0) {
                incorrect++;
              }
            }
          }
          this.dialogStudentCorrectRate = ((correct / (correct + incorrect)) * 100).toFixed(1);

          // 計算 dialogStudentDoRate
          let done = 0;
          let undo = 0;
          for (let j = 0; j < problemsList.length; j++) {
            if (problemsList[j].historyCode.length == 0) {
              undo++;
            } else {
              done++;
            }
          }
          this.dialogStudentDoRate = ((done / (done + undo)) * 100).toFixed(1);

          // 處理score
          for(let i=0; i<problemsList.length; i++) {
            let obj = {
              'name': problemsList[i].name,
              'type': problemsList[i].type,
              'score': problemsList[i].historyCode.length!=0?problemsList[i].historyCode.slice(-1)[0].score:'未作答'
            }
            resultList.push(obj);
          }
          break;
        }
      }
      return resultList
    }
  },
  methods: {
    countTableHeight() {
      let screenHeight = window.screen.height;
      
      if (screenHeight>=800 && screenHeight<1200) this.pagesize=10;
      else if (screenHeight>=1200 && screenHeight<1600) this.pagesize=15;
    },
    currentChange(currentPage) {
      this.currentPage = currentPage;
    },
    getStudentsData() {
      this.loading = true;

      apiGetStudentsData({
        courseId: this.$store.state.course.courseInfo.courseId
      }).then((response) => {
        let res = response.data;
        if (res.status == '200') {
          this.tableData = res.result;
          this.loading = false;

          // formThead
          this.formThead = this.tableData[0].problems.map(v => {
            return v.name
          });
        }
      });
    },
    exportCsv() {
      // 取fields
      let fields = [];
      let table = this.$refs['studentsTable'].$children;
      table.forEach((el) => {
        fields.push(el.label);
      });

      // 取data
      let data = [];
      this.tableData.forEach((el) => {
        var temp = {
          "學號": el.studentId,
          "姓名": el.studentName,
          "班級": el.studentClass
        }

        let len = el.problems.length;
        for (var i = 0; i < len; i++) {
          if (el.problems[i].historyCode.length > 0) {
            temp[el.problems[i].name] = el.problems[i].historyCode.slice(-1)[0].score;
          } else {
            temp[el.problems[i].name] = '未作答';
          }
        }

        data.push(temp);
      });

      let Today = new Date();
      let filename = Today.getFullYear() + "-" + (Today.getMonth()+1) + "-" + Today.getDate();
      CsvExport(fields, data, filename);
    },
    studentInfo(studentId, studentName) {
      this.dialogStudentId = studentId;
      this.dialogStudentName = studentName;
      this.dialogFormVisible = true;
    },
    typeFilterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    scoreFilterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    handleFilterChange(val) {
      this.filterList = val;
    },
    clearFilter() {
      this.$refs.table.clearFilter(this.filterList);
    }
  }
}
</script>
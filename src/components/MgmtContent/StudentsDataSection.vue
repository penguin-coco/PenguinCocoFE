<template>
<div>
  <section class="box-square">
    <el-input class='filter-input' v-model='filterQuery' placeholder='請輸入學號或姓名' clearable><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
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
    <div style="text-align:center; margin-top:30px;">
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="currentChange" :page-size="pagesize"></el-pagination>
    </div>
    <el-row>
      <el-col :span="4" :offset="20">
        <el-button class="tocsv-btn" type="success" @click="exportCsv">匯出成績 <i class="fas fa-file-excel"></i></el-button>
      </el-col>
    </el-row>
  </section>

  <student-do-info-dialog :visible="studentDoInfoDilaogVisible" :data="data" :id="dialogStudentId" :name="dialogStudentName" @onChangeVisible="onChangeStudentDoInfoDilaogVisible"></student-do-info-dialog>
</div>
</template>

<script>
import {CsvExport} from '@/utils/CsvExport.js'

import StudentDoInfoDialog from '@/components/MgmtContent/StudentDoInfoDialog.vue'

export default {
  props: ['data', 'formThead', 'loading'],
  components: {
    StudentDoInfoDialog
  },
  mounted() {
    this.countTableHeight();
  },
  data() {
    return {
      // table filter
      filterQuery: '',
      // pagination
      total: 0,
      tableHeight: null,
      pagesize: 10,
      currentPage:1,
      // student do info dialog
      studentDoInfoDilaogVisible: false,
      dialogStudentId: '',
      dialogStudentName: '',
    }
  },
  computed: {
    tableFiltered() {
      let oriTable = this.data;
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
    exportCsv() {
      // 取fields
      let fields = [];
      let table = this.$refs['studentsTable'].$children;
      table.forEach((el) => {
        fields.push(el.label);
      });

      // 取data
      let tempData = [];
      this.data.forEach((el) => {
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

        tempData.push(temp);
      });

      let Today = new Date();
      let filename = Today.getFullYear() + "-" + (Today.getMonth()+1) + "-" + Today.getDate();
      CsvExport(fields, tempData, filename);
    },
    // student do info dialog
    studentInfo(studentId, studentName) {
      this.dialogStudentId = studentId;
      this.dialogStudentName = studentName;
      this.studentDoInfoDilaogVisible = true;
    },
    onChangeStudentDoInfoDilaogVisible(val) {
      this.studentDoInfoDilaogVisible = val;
    },
  }
}
</script>
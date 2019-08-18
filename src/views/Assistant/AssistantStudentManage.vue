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
          <div class="box-square">
            <el-row :gutter="20">
              <el-col :span="12" style="border-right: 1px #E4E7ED dashed;">
                <el-table class="studentDataTable" ref="multipleTable" :data="studentData" tooltip-effect="dark" height="70vh" @selection-change="handleSelectionChange" v-loading="dataLoading">
                  <el-table-column type="selection" width="55">
                  </el-table-column>
                  <el-table-column prop="studentId" label="學號">
                  </el-table-column>
                  <el-table-column prop="name" label="姓名">
                  </el-table-column>
                  <el-table-column prop="class" label="系級">
                  </el-table-column>
                </el-table>
                <el-button type="primary" @click="newOneStudentDialogVisible=true" style="float: left; margin-top: 10px;">新增</el-button>
                <div class="operating-btns">
                  <el-button @click="toggleSelection()">取消選取</el-button>
                  <el-button type="danger" :disabled="deleteFlag" @click="delSelectedStudent">刪除</el-button>
                </div>
              </el-col>
              <el-col class="uploadCsvCol" :span="12">
                <!-- FIXME: txt -->
                <el-upload class="upload-demo" ref="upload" drag :action="action" accept=".csv" :on-success="handleSuccess" :file-list="fileList" :limit="limitFileNum" :on-exceed="onexceedFunction">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">將csv文件拖到此處，或<em>點擊上傳</em></div>
                  <div class="el-upload__tip" slot="tip">只能上傳csv文件，且不超過500kb
                    <a href="javascript:void(0);" @click="csvFormatAlert" style="color: #909399;"><i class="el-icon-info"></i></a>
                  </div>
                </el-upload>
              </el-col>
            </el-row>
          </div>

          <nav-footer></nav-footer>
        </el-main>
      </el-container>
    </el-container>
  </el-container>

  <!-- newOneStudentDialog start -->
  <el-dialog title="新增學生" :visible.sync="newOneStudentDialogVisible">
    <el-row>
      <el-col :span="20" :offset="2">
        <el-form :model="newOneStudentForm">
          <el-form-item label="學生帳號 (學號)" style="margin-bottom: 5px;">
            <el-input v-model="newOneStudentForm.account"></el-input>
          </el-form-item>
          <div class="operating-btns" style="margin-bottom: 20px;">
            <el-button @click="newOneStudentDialogVisible=false">取消</el-button>
            <el-button type="primary" @click="addNewOneStudent">確定</el-button>
          </div>
        </el-form>
      </el-col>
    </el-row>
  </el-dialog>
  <!-- newOneStudentDialog end -->

  <!-- confirmCsvDialog start -->
  <el-dialog title="確認學生名單" :visible.sync="confirmCsvDialogVisible" @close="cancelUpload">
    <el-row>
      <el-col :span="20" :offset="2">
        <el-table :data="csvFileData" style="margin-bottom: 15px;" height="336">
          <el-table-column property="account" label="帳號"></el-table-column>
          <el-table-column property="name" label="姓名"></el-table-column>
          <el-table-column property="studentClass" label="系級"></el-table-column>
        </el-table>
        <div class="operating-btns" style="margin-bottom: 20px;">
          <el-button type="danger" @click="cancelUpload">取消</el-button>
          <el-button type="primary" @click="addCsvStudent">確定新增</el-button>
        </div>
      </el-col>
    </el-row>
  </el-dialog>
  <!-- confirmCsvDialog end -->
</div>
</template>

<script>
import {assistantCheckLogin} from '@/apis/_checkLogin.js'
import {apiGetStudentsData} from '@/apis/course.js'
import {apiAsstDeleteStudentList,apiAsstAddStudentList} from '@/apis/assistant.js'

import Papa from 'papaparse'

import NavHeaderAssistant from '@/components/Assistant/NavHeaderAssistant'
import PageNameBreadcrumb from '@/components/MgmtContent/PageNameBreadcrumb'
import SideNavCourseIndexAssistant from '@/components/Assistant/SideNavCourseIndexAssistant'
import NavFooter from '@/components/NavFooter'

export default {
  components: {
    NavHeaderAssistant,
    PageNameBreadcrumb,
    SideNavCourseIndexAssistant,
    NavFooter
  },
  data() {
    return {
      studentData: [],
      dataLoading: false,
      deleteSelection: [],
      // new one student dialog
      newOneStudentDialogVisible: false,
      newOneStudentForm: {
        account: ''
      },
      // upload csv
      action: 'https://jsonplaceholder.typicode.com/posts/',
      limitFileNum: 1,
      fileList: [],
      confirmCsvDialogVisible: false,
      csvFileData: [] // 被上傳的csv data
    }
  },
  computed: {
    deleteFlag() {
      if (this.deleteSelection.length == 0) {
        return true
      } else {
        return false
      }
    }
  },
  mounted() {
    assistantCheckLogin();
    this.getStudentsData();
  },
  methods: {
    getStudentsData() {
      this.dataLoading = true;

      apiGetStudentsData({
        courseId: this.$store.state.course.courseInfo.courseId
      }).then((response) => {
        let res = response.data;
        if (res.status == '200') {
          let temp = [];
          for (let i = 0; i < res.result.length; i++) {
            let obj = {
              studentId: res.result[i].studentId,
              name: res.result[i].studentName,
              class: res.result[i].studentClass
            }
            temp.push(obj);
          }
           this.studentData = temp;
        }
        this.dataLoading = false;
      });
    },
    handleSelectionChange(val) {
      this.deleteSelection = val;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    delSelectedStudent() {
      this.$confirm('確認是否刪除被選擇的學生名單?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let delID = []
        for (let i = 0; i < this.deleteSelection.length; i++) {
          delID.push(this.deleteSelection[i].studentId);
        }

        apiAsstDeleteStudentList({
          courseId: this.$store.state.course.courseInfo.courseId,
          accountList: delID
        }).then((response)=> {
          let res = response.data;
          if (res.status == '200') {
            this.$message({
              type: 'success',
              message: '刪除成功!'
            });
            this.getStudentsData();
          } else {
            this.$message.error('刪除失敗！');
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消刪除'
        });
      });
    },
    // FIXME: upload csv then parse
    handleSuccess(res, file, fileList) {
      let self = this;
      // parse local csv file
      let data = Papa.parse(file.raw, {
        header: true,
        complete(results) {
          // 檢測csv是否符合格式
          let keys = Object.keys(results.data[0]);
          if (keys.sort().toString() == ["account"].sort().toString()) {
            self.csvFileData = results.data;
            self.confirmCsvDialogVisible = true;
          } else {
            self.$message.error('Csv檔不符合格式！');
            self.$refs.upload.clearFiles();
          }
        },
        error(err, file, inputElem, reason) {
          self.$message.error('上傳失敗: ' + reason);
        }
      });
    },
    onexceedFunction(files, fileList) {
      let filename = files[0].name;
      this.$message.error(filename + ' 上傳失敗，只能傳送一份檔案！');
    },
    cancelUpload() {
      this.confirmCsvDialogVisible = false;
      this.$refs.upload.clearFiles();
      this.csvFileData = [];
    },
    addNewOneStudent() {
      let tempList = [this.newOneStudentForm.account];

      apiAsstAddStudentList({
        courseId: this.$store.state.course.courseInfo.courseId,
        accountList: tempList
      }).then((response) => {
        let res = response.data;
        if(res.status == '200') {
          this.$message({
            type: 'success',
            message: '新增學生成功!'
          });
          this.newOneStudentForm = {
            account: ''
          }
          this.newOneStudentDialogVisible=false;
          this.getStudentsData();
        } else {
          this.$message.error('找不到此學號的學生！');
        }
      });
    },
    addCsvStudent() {
      // TODO: api
      // append csvFileData
      console.log(this.csvFileData);
    },
    csvFormatAlert() {
      this.$alert('account, name, studentClass', 'Csv欄位格式', {
        dangerouslyUseHTMLString: true
      });
    }
  }
}
</script>

<style>
.studentDataTable {
  width: 100%;
}

.operating-btns {
  float: right;
  margin-top: 10px;
}

.uploadCsvCol {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 70vh;
  text-align: center;
}
</style>

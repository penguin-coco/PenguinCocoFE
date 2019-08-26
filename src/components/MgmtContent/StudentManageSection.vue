<template>
<div>
  <div class="penguin-box border-radius-none">
    <el-row :gutter="20">
      <el-col :span="12" style="border-right: 1px #E4E7ED dashed;">
        <el-table class="width-100" ref="multipleTable" :data="studentData" tooltip-effect="dark" height="70vh" @selection-change="handleSelectionChange" v-loading="dataLoading">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="studentId" label="學號">
          </el-table-column>
          <el-table-column prop="name" label="姓名">
          </el-table-column>
          <el-table-column prop="class" label="系級">
          </el-table-column>
        </el-table>
        <el-button class="float-left mt-2" type="primary" @click="newOneStudentDialogVisible=true">新增</el-button>
        <div class="float-right mt-2">
          <el-button @click="toggleSelection()">取消選取</el-button>
          <el-button type="danger" :disabled="deleteFlag" @click="delSelectedStudent">刪除</el-button>
        </div>
      </el-col>
      <el-col class="flex-col-center height-70-vh text-center" :span="12">
        <el-upload class="upload-demo" ref="upload" drag :action="action" accept=".csv" :on-success="handleSuccess" :file-list="fileList" :limit="limitFileNum" :on-exceed="onexceedFunction">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">將csv文件拖到此處，或<em>點擊上傳</em></div>
          <div class="el-upload__tip" slot="tip">只能上傳csv文件，且不超過500kb
            <a class="text-secondary" href="javascript:void(0);" @click="csvFormatAlert"><i class="el-icon-info"></i></a>
          </div>
        </el-upload>
      </el-col>
    </el-row>

    <!-- newOneStudentDialog start -->
    <el-dialog title="新增學生" :visible.sync="newOneStudentDialogVisible">
      <el-row>
        <el-col :span="20" :offset="2">
          <el-form :model="newOneStudentForm">
            <el-form-item class="mb-1" label="學生帳號 (學號)">
              <el-input v-model="newOneStudentForm.account"></el-input>
            </el-form-item>
            <div class="float-right mt-2 mb-4">
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
          <el-table class="mb-3" :data="csvFileData" height="336">
            <el-table-column property="account" label="帳號"></el-table-column>
            <el-table-column property="name" label="姓名"></el-table-column>
            <el-table-column property="studentClass" label="系級"></el-table-column>
          </el-table>
          <div class="float-right mt-2 mb-4">
            <el-button type="danger" @click="cancelUpload">取消</el-button>
            <el-button type="primary" @click="addCsvStudent">確定新增</el-button>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- confirmCsvDialog end -->
  </div>
</div>
</template>

<script>
import {apiGetStudentsData} from '@/apis/course.js'
import {apiTrDeleteStudentList, apiTrAddStudentList} from '@/apis/teacher.js'
import {apiAsstDeleteStudentList, apiAsstAddStudentList} from '@/apis/assistant.js'
import {apiAccountInfo} from '@/apis/student.js'

import Papa from 'papaparse'

export default {
  components: {},
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
    // assistantCheckLogin();
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

        if (this.$store.state.user.userInfo.authority == 'teacher') {
          apiTrDeleteStudentList({
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
        } else if (this.$store.state.user.userInfo.authority == 'assistant') {
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
        }
        
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
            let csvStudAccountList = results.data;

            let accountList = [];
            csvStudAccountList.forEach((stud) => {
              accountList.push(stud.account);
            });

            // 取得使用者詳細名單
            apiAccountInfo(accountList).then((response) => {
              res = response.data;
              if (res.status == '200') {
                self.csvFileData = res.result;
              }
            });

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
    trAddStudent(studAccountList) {
      apiTrAddStudentList({
        courseId: this.$store.state.course.courseInfo.courseId,
        accountList: studAccountList
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
          this.newOneStudentDialogVisible = false;
          this.confirmCsvDialogVisible = false;
          this.getStudentsData();
        } else {
          this.$message.error('找不到此學號的學生！');
        }
      });
    },
    asstAddStudent(studAccountList) {
      apiAsstAddStudentList({
        courseId: this.$store.state.course.courseInfo.courseId,
        accountList: studAccountList
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
          this.newOneStudentDialogVisible = false;
          this.confirmCsvDialogVisible = false;
          this.getStudentsData();
        } else {
          this.$message.error('找不到此學號的學生！');
        }
      });
    },
    addNewOneStudent() {
      let tempList = [this.newOneStudentForm.account];

      if (this.$store.state.user.userInfo.authority == 'teacher') {
        this.trAddStudent(tempList);
      } else if (this.$store.state.user.userInfo.authority == 'assistant') {
        this.asstAddStudent(tempList);
      }
    },
    addCsvStudent() {
      let accountList = [];
      this.csvFileData.forEach((stud) => {
        accountList.push(stud.account);
      });
      this.asstAddStudent(accountList);
    },
    csvFormatAlert() {
      this.$alert('account', 'Csv欄位格式', {
        dangerouslyUseHTMLString: true
      });
    }
  }
}
</script>
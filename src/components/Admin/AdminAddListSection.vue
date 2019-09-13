<template>
<div>
  <div class="penguin-box border-radius-none">
    <el-row :gutter="20">
      <el-col :span="12" style="border-right: 1px #E4E7ED dashed;">
        <el-table class="width-100" ref="multipleTable" :data="tableData" tooltip-effect="dark" height="70vh" @selection-change="handleSelectionChange" v-loading="dataLoading">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column v-for="(item, index) in tableSchema" :key='index+1' :prop="item.prop" :label="item.label"></el-table-column>
        </el-table>
        <el-button class="float-left mt-2" type="primary" @click="newOneDialogVisible=true">新增</el-button>
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

    <!-- newOneDialog start -->
    <el-dialog :title="newOneDialogTitle" :visible.sync="newOneDialogVisible">
      <el-row>
        <el-col :span="20" :offset="2">
          <el-form>
            <el-form-item v-if="newOneStudentForm.class!=undefined" class="mb-1" label="班級">
              <el-input v-model="newOneStudentForm.class"></el-input>
            </el-form-item>
            <el-form-item v-if="newOneStudentForm.account==''" class="mb-1" label="帳號">
              <el-input v-model="newOneStudentForm.account"></el-input>
            </el-form-item>
            <el-form-item v-if="newOneStudentForm.name==''" class="mb-1" label="姓名">
              <el-input v-model="newOneStudentForm.name"></el-input>
            </el-form-item>
            <div class="float-right mt-5 mb-4">
              <el-button @click="newOneDialogVisible=false">取消</el-button>
              <el-button type="primary" @click="addOnePerson">確定</el-button>
            </div>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- newOneDialog end -->
  </div>
</div>
</template>

<script>
import {apiAccountInfo} from '@/apis/student.js'

import Papa from 'papaparse'

export default {
  components: {},
  props: ['mode'],
  data() {
    return {
      // set table
      tableSchema: [],
      // table data $ state
      tableData: [],
      dataLoading: false,
      deleteSelection: [],
      // new one student dialog
      newOneDialogVisible: false,
      newOneDialogTitle: '',
      newOneFormLabel: '',
      newOneStudentForm: {},// FIXME:
      // upload csv
      action: 'https://jsonplaceholder.typicode.com/posts/',
      limitFileNum: 1,
      fileList: [],
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
    this.setTableItems();
    this.setNewOneDialog();
    this.getTableData();
  },
  methods: {
    // set table
    setTableItems() {
      if (this.mode == 'teacher') {
        this.tableSchema = [{
          prop: 'account',
          label: '帳號'
        }, {
          prop: 'name',
          label: '姓名'
        }];
      } else if (this.mode == 'ta') {
        this.tableSchema = [{
          prop: 'account',
          label: '帳號'
        }, {
          prop: 'name',
          label: '姓名'
        }];
      } else if (this.mode == 'student') {
        this.tableSchema = [{
          prop: 'class',
          label: '班級'
        }, {
          prop: 'account',
          label: '帳號'
        }, {
          prop: 'name',
          label: '姓名'
        }];
      }
    },
    // set dialog
    setNewOneDialog() {
      if (this.mode == 'teacher') {
        this.newOneDialogTitle = '新增老師名單';

        // set form
        this.newOneStudentForm = {
          account: '',
          name: ''
        }
      } else if (this.mode == 'ta') {
        this.newOneDialogTitle = '新增助教名單';
        this.newOneStudentForm = {
          account: '',
          name: ''
        }
      } else if (this.mode == 'student') {
        this.newOneDialogTitle = '新增學生名單';
        this.newOneStudentForm = {
          class: this.$route.query.className,
          account: '',
          name: ''
        }
      }
    },
    // api
    getTableData() {
      this.dataLoading = true;

      if (this.mode == 'teacher') {
        // TODO: get teacher list api

        this.tableData = [{
          account: '108078516',
          name: '蘇靖軒'
        }];
      } else if (this.mode == 'ta') {
        // TODO: get ta list api

        this.tableData = [{
          account: '108078516',
          name: '蹦助教'
        }];
      } else if (this.mode == 'student') {
        // TODO: get student list api
        let className = this.$route.query.className;
        console.log(className);

        this.tableData = [{
          class: '108資處',
          account: '04156147',
          name: '蹦尼尼'
        }];
      }

      this.dataLoading = false;
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
      this.$confirm('確認是否刪除被選擇的名單?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let delID = []
        for (let i = 0; i < this.deleteSelection.length; i++) {
          delID.push(this.deleteSelection[i].studentId);
        }

        // TODO: admin delete student => 依照身份
        // apiTrDeleteStudentList({
        //   courseId: this.$store.state.course.courseInfo.courseId,
        //   accountList: delID
        // }).then((response)=> {
        //   let res = response.data;
        //   if (res.status == '200') {
        //     this.$message({
        //       type: 'success',
        //       message: '刪除成功!'
        //     });
        //     this.getTableData();
        //   } else {
        //     this.$message.error('刪除失敗！');
        //   }
        // });
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消刪除'
        });
      });
    },
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
      this.$refs.upload.clearFiles();
      this.csvFileData = [];
    },
    addOnePerson() {
      let tempList = [this.newOneStudentForm.account];

      // TODO: admin add person list => 依照身份
      // apiAsstAddStudentList({
      //   courseId: this.$store.state.course.courseInfo.courseId,
      //   accountList: studAccountList
      // }).then((response) => {
      //   let res = response.data;
      //   if(res.status == '200') {
      //     this.$message({
      //       type: 'success',
      //       message: '新增學生成功!'
      //     });
      //     this.newOneStudentForm = {
      //       account: ''
      //     }
      //     this.newOneDialogVisible = false;
      //     this.confirmCsvDialogVisible = false;
      //     this.getTableData();
      //   } else {
      //     this.$message.error(res.msg);
      //   }
      // }).catch((error) => {
      //   this.$message.error('新增學生錯誤');
      // });
    },
    addCsvStudent() {
      let accountList = [];
      this.csvFileData.forEach((stud) => {
        accountList.push(stud.account);
      });

      // TODO: add list
    },
    csvFormatAlert() {
      this.$alert('account', 'Csv欄位格式', {
        dangerouslyUseHTMLString: true
      });
    }
  }
}
</script>
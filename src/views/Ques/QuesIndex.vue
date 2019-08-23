<template>
<div>
  <el-container>
    <el-header>
      <nav-header-ques></nav-header-ques>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <side-nav-ques></side-nav-ques>
      </el-aside>
      <el-container>
        <el-main class="main-container">
          <page-name-breadcrumb pageName="題目列表" :isBreadcrumb="false"></page-name-breadcrumb>
          <div class="penguin-box border-radius-none">
            <!-- search select -->
            <el-select class="problem-tag-selector" v-model="problemTagValue" multiple filterable allow-create default-first-option placeholder="請選擇題目標籤">
              <el-option-group
                v-for="group in quesTagOptions"
                :key="group.label"
                :label="group.label">
                <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
            <el-table :data="tableFiltered" style="width: 100%" v-loading="tableLoading">
              <el-table-column label="題目 ID" prop="id"></el-table-column>
              <el-table-column label="題目名稱">
                <template slot-scope="scope">
                  <a class="hyperlink" href="javascript:void(0)" @click="getProblemInfo(scope.row)">{{ scope.row.name }}</a>
                </template>
              </el-table-column>
              <el-table-column label="題目類型" prop="category"></el-table-column>
              <el-table-column label="標籤">
                <template slot-scope="scope">
                  <span v-for="t in scope.row.tag" style="margin-right: 5px;">
                    <el-tag>{{t}}</el-tag>
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">編輯</el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">刪除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="text-center mt-6">
            <el-pagination background layout="prev, pager, next" :total="total" @current-change="currentChange"></el-pagination>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
  
  <!-- view problem dialog start -->
  <el-dialog :visible.sync="problemDialogVisible" v-loading="problemDialogLoading">
    <section >
      <el-row class="penguin-problem">
        <el-col :span="20" :offset="2">
          <div class="problem-header">
            <span class="name" v-text="quesData.name"></span>
            <span class="id" v-text="quesData.id"></span>
            <span class="tags" v-for="tag in quesData.tag">
              <el-tag size="small">{{ tag }}</el-tag>
            </span>
          </div>
          <hr>
          <div class="problem-info">
            <div class="title">Description</div>
            <div id="markdown-editor">
              <vue-markdown class="content" :source="quesData.description"></vue-markdown>
            </div>
          </div>
          <div class="problem-info">
            <div class="title">Input</div>
            <div class="content change-line" v-text="quesData.inputDesc"></div>
          </div>
          <div class="problem-info">
            <div class="title">Output</div>
            <div class="content change-line" v-text="quesData.outputDesc"></div>
          </div>
          <el-row v-for="(sample, index) in quesData.testCases" :key="index">
            <el-col :xs="24" :sm="12">
              <div class="problem-info">
                <div class="title">Sample Input {{index+1}}</div>
                <div class="content">
                  <el-input type="textarea" readonly autosize placeholder="請輸入内容" v-model="sample.inputSample" resize="none">
                  </el-input>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12">
              <div class="problem-info">
                <div class="title">Sample Output {{index+1}}</div>
                <div class="content">
                  <el-input type="textarea" readonly autosize placeholder="請輸入内容" v-model="sample.outputSample" resize="none">
                  </el-input>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </section>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="problemDialogVisible=false">確 定</el-button>
    </div>
  </el-dialog>
  <!-- view problem dialog end -->

  <!-- edit problem dialog start -->
  <el-dialog id="editProblemDialog" :visible.sync="editProblemDialogVisible" v-loading="editProblemDialogLoading">
    <el-form>
      <el-row>
        <el-col :span="20" :offset="2">
          <el-form-item label="題目作答類型">
            <el-radio-group v-model="editProblemData.category">
              <el-radio label="輸入輸出" border>輸入輸出</el-radio>
              <el-radio label="輸入寫檔" border>輸入寫檔</el-radio>
              <el-radio label="讀檔輸出" border>讀檔輸出</el-radio>
              <el-radio label="讀檔寫檔" border>讀檔寫檔</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" :offset="2">
          <!-- TAGs -->
          <el-form-item label="題目標籤">
            <el-tag :key="tag" v-for="tag in editProblemData.tag" closable :disable-transitions="false" @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-autocomplete class="input-new-tag" v-if="inputVisible" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" v-model="inputValue" popper-class="my-autocomplete" :fetch-suggestions="querySearch" @select="handleSelect">
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
              </template>
            </el-autocomplete>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </el-form-item>
          <!-- TAGs -->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="2">
          <el-form-item label="題目名稱">
            <el-input v-model="editProblemData.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" :offset="2">
          <el-form-item label="題目說明">
            <el-input type="textarea" rows="5" resize="vertical" v-model="editProblemData.description"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9" :offset="2">
          <el-form-item label="輸入說明">
            <el-input type="textarea" rows="5" resize="vertical" v-model="editProblemData.inputDesc"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item label="輸出說明">
            <el-input type="textarea" rows="5" resize="vertical" v-model="editProblemData.outputDesc"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(sample, index) in editProblemData.testCases" :key="index">
        <el-col :span="9" :offset="2">
          <el-form-item>
            <span slot="label">輸入範例{{index+1}} (Input Sample{{index+1}})</span>
            <el-input type="textarea" rows="5" resize="vertical" v-model="sample.inputSample"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item>
            <span slot="label">輸出範例{{index+1}} (Output Sample{{index+1}})</span>
            <el-input type="textarea" rows="5" resize="vertical" v-model="sample.outputSample"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="2">
          <p style="color: #F56C6C; margin-top: 0px;">注意！ 最後一項範例會作為隱藏範例，學生題目中看不見！</p>
        </el-col> 
      </el-row>
      <el-row>
        <el-col :span="24" :offset="2">
          <el-button size="small" type="primary" plain @click="addSample">+ 新增範本</el-button>
          <el-button size="small" type="danger" plain @click="delSample">- 移除範本</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editProblemDialogVisible=false">取 消</el-button>
      <el-button type="primary" @click="editProblem">確 定</el-button>
    </div>
  </el-dialog>
  <!-- edit problem dialog end -->
</div>
</template>

<script>
import {quesbankCheckLogin} from '@/apis/_checkLogin.js'
import {apiGetAllProblem, apiGetProblemInfo, apiDeleteProblem, apiEditProblem} from '@/apis/problemBank.js'

import problemStateMixin from '@/mixins/problemState.mixin.js'

import NavHeaderQues from '@/components/Ques/NavHeaderQues'
import SideNavQues from '@/components/Ques/SideNavQues'
import PageNameBreadcrumb from '@/components/MgmtContent/PageNameBreadcrumb'
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    NavHeaderQues,
    SideNavQues,
    PageNameBreadcrumb,
    VueMarkdown
  },
  mixins: [problemStateMixin],
  data() {
    return {
      tableLoading: false,
      quesList: [],
      // pagination
      total: 0,
      pagesize: 10,
      currentPage: 1,
      // problemDialog
      problemDialogVisible: false,
      problemDialogLoading: false,
      quesData: {},
      // editProbleDialog
      editProblemDialogVisible: false,
      editProblemDialogLoading: false,
      editProblemData: {
        'id': '',
        'name': '',
        'type': '',
        'category': '',
        'tag': [],
        'description': '',
        'inputDesc': '',
        'outputDesc': '',
        'testCases': []
      },
      // tags
      inputVisible: false,
      inputValue: '',
      autoCompleteTags: [],
      // tag selector
      problemTagValue: []
    }
  },
  mounted() {
    quesbankCheckLogin();
    this.getAllProblem();
    this.autoCompleteTags = this.problemTag;
  },
  computed: {
    tableFiltered() {
      let oriTable = this.quesList;
      let filteredTable = [];

      if (this.problemTagValue.length==0) {
        this.total= oriTable.length; // pagination
        return oriTable;
      } else {
        for (let i=0; i<oriTable.length; i++) {
          // and關係
          // let theSet = new Set(oriTable[i].tag); // 此題tag的set
          // let intersect = this.problemTagValue.filter(x => theSet.has(x)); // problemTagValue與theSet的交集
          // if (this.problemTagValue.sort().toString()==intersect.sort().toString()) { // 比對problemTagValue跟交集的array是否相同
          //   filteredTable.push(oriTable[i]);
          // }

          // or關係
          let theSet = new Set(oriTable[i].tag); // 此題tag的set
          let intersect = this.problemTagValue.filter(x => theSet.has(x)); // problemTagValue與theSet的交集
          if (intersect.length > 0) {
            filteredTable.push(oriTable[i]);
          }
        }
        this.total= filteredTable.length; // pagination
        return filteredTable;
      }
    },
  },
  methods: {
    currentChange(currentPage) {
      this.currentPage = currentPage;
    },
    getAllProblem() {
      apiGetAllProblem().then((response) => {
        let res = response.data;
        if (res.status == '200') {
          this.quesList = res.result;
        }
      });
    },
    getProblemInfo(data) {
      apiGetProblemInfo({
        id: data.id
      }).then((response) => {
        let res = response.data;
        if (res.status == '200') {
          this.quesData = res.result;
          this.quesData.id = data.id;
        }
      });
      this.problemDialogVisible = true;
    },
    handleEdit(index, data) {
      this.$confirm('確認是否要編輯此題目？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'info',
        center: true
      }).then(() => {
        apiGetProblemInfo({
          id: data.id
        }).then((response) => {
          let res = response.data;
          if (res.status == '200') {
            this.editProblemData = res.result;
            this.editProblemData.id = data.id;
          }
        });
        this.editProblemDialogVisible = true;
      }).catch((err) => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    handleDelete(index, data) {
      this.$confirm('確認是否要刪除此題目？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'info',
        center: true
      }).then(() => {
        this.tableLoading = true;

        apiDeleteProblem({
          id: data.id
        }).then((response) => {
          let res = response.data;
          if (res.status == '200') {
            this.$message({
              type: 'success',
              message: '刪除成功!'
            });
            this.getAllProblem();
            this.tableLoading = false;
          }
        });
      }).catch((err) => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    addSample() {
      let obj = {
        'inputSample': '',
        'outputSample': ''
      }
      this.editProblemData.testCases.push(obj);
    },
    delSample() {
      this.editProblemData.testCases.pop();
    },
    editProblem() {
      if (this.editProblemData.name == '') {
        this.$message.error('請填寫題目名稱！');
      } else if (this.editProblemData.category == '') {
        this.$message.error('請選定題目作答類型！');
      } else if (this.editProblemData.tag.length == 0) {
        this.$message.error('請至少選擇一個標籤！');
      } else if (!(this.editProblemData.tag.includes('Java')||this.editProblemData.tag.includes('Python'))) {
        this.$message.error('請選擇一種程式語言標籤！');
      } else if (this.editProblemData.description == '') {
        this.$message.error('請填寫題目說明！');
      } else if (this.editProblemData.inputDesc == '') {
        this.$message.error('請填寫題目輸入說明！');
      } else if (this.editProblemData.outputDesc == '') {
        this.$message.error('請填寫題目輸出說明！');
      } else if (this.editProblemData.testCases.length == 0) {
        this.$message.error('請填寫題目輸入範例！');
      } else if (this.editProblemData.testCases.length == 1) {
        this.$message.error('請至少填寫兩組題目輸入範例！');
      } else {
        this.editProblemLoading = true;
        apiEditProblem({
          id: this.editProblemData.id,
          name: this.editProblemData.name,
          category: this.editProblemData.category,
          tag: this.editProblemData.tag,
          description: this.editProblemData.description,
          inputDesc: this.editProblemData.inputDesc,
          outputDesc: this.editProblemData.outputDesc,
          testCases: this.editProblemData.testCases
        }).then((response) => {
          let res = response.data;
          if (res.status == '200') {
            this.$message({
              type: 'success',
              message: '編輯題目成功!'
            });
            this.editProblemData = {
              'id': '',
              'name': '',
              'type': '',
              'category': '',
              'tag': [],
              'description': '',
              'inputDesc': '',
              'outputDesc': '',
              'testCases': []
            }
            this.editProblemDialogVisible = false;
            this.editProblemLoading = false;
            this.getAllProblem();
          } else {
            this.editProblemLoading = false;
            this.$message.error(res.msg);
          }
        });
      }
    },
    // tags control methods
    handleClose(tag) {
      this.editProblemData.tag.splice(this.editProblemData.tag.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.editProblemData.tag.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    // tags autocomplete
    querySearch(queryString, cb) {
      var autoCompleteTags = this.autoCompleteTags;
      var results = queryString ? autoCompleteTags.filter(this.createFilter(queryString)) : autoCompleteTags;
      // 調用 callback 返回建議列表的數據
      cb(results);
    },
    createFilter(queryString) {
      return (tag) => {
        return (tag.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.editProblemData.tag.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
  }
}
</script>
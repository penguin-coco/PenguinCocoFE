<template>
<div>
  <el-dialog id="problemBankDialog" title="題庫列表" :visible.sync="myVisible" width="70vw" @close="closeDialog">
    <!-- search select -->
    <div v-if="viewProblemActive==false">
      <el-select class="mb-2 width-30" v-model="problemTagValue" multiple filterable allow-create default-first-option placeholder="請選擇題目標籤">
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
      <el-table class="width-100" :data="tableFiltered.slice((currentPage-1)*pagesize,currentPage*pagesize)">
        <el-table-column label="題目 ID" prop="id"></el-table-column>
        <el-table-column label="題目名稱" prop="name"></el-table-column>
        <el-table-column label="題目類型" prop="category"></el-table-column>
        <el-table-column label="標籤">
          <template slot-scope="scope">
            <span v-for="t in scope.row.tag" style="margin-right: 5px;">
              <el-tag>{{t}}</el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="135">
          <template slot-scope="scope">
            <el-button size="mini" class="pr-2 pl-2" @click="viewProblem(scope.row)">檢視</el-button>
            <el-button size="mini" class="pr-2 pl-2" type="primary" @click="importProblem(scope.row.id)">匯入</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="text-center mt-6 pb-6">
        <el-pagination background layout="prev, pager, next" :total="total" @current-change="currentChange"></el-pagination>
      </div>
    </div>

    <section class="pb-10" v-else>
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
          <el-row>
            <el-button class="float-right" type="primary" @click="importProblem('')">匯 入</el-button>
            <el-button class="float-right mr-4" @click="viewProblemActive=false">返 回</el-button>
          </el-row>
        </el-col>
      </el-row>
    </section>
  </el-dialog>
</div>
</template>

<script>
import {apiGetProblemInfo} from '@/apis/problemBank.js'

import VueMarkdown from 'vue-markdown'

import problemStateMixin from '@/mixins/problemState.mixin.js'

export default {
  components: {
    VueMarkdown
  },
  props: ['visible', 'data'],
  mixins: [problemStateMixin],
  data() {
    return {
      myVisible: this.visible,
      viewProblemActive: false, // 預覽題庫裡面題目的flag(false表沒預覽)
      selectedProblemId: '', // 在題庫中被選中即將匯入的題目id
      quesData: [], // 題庫預覽的資料
      // problemTag
      problemTagValue: [],
      // pagination
      total: 0,
      pagesize: 10,
      currentPage: 1,
    }
  },
  computed: {
    tableFiltered() {
      let oriTable = this.data;
      let filteredTable = [];

      if (this.problemTagValue.length == 0) {
        this.total = oriTable.length; // pagination
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
        this.total = filteredTable.length; // pagination
        return filteredTable;
      }
    },
  },
  watch: {
    visible(val) {
      this.myVisible = val;
    },
    myVisible(val) {
      this.$emit('onChangeVisible', val)
    }
  },
  methods: {
    closeDialog() {
      this.myVisible = false;
      this.viewProblemActive = false; // 返回到題庫列表
      this.selectedProblemId  = '';
    },
    // pagination
    currentChange(currentPage) {
      this.currentPage = currentPage;
    },
    // 預覽題庫題目
    viewProblem(data) {
      apiGetProblemInfo({
        id: data.id
      }).then((response) => {
        let res = response.data;
        if (res.status == '200') {
          this.quesData = res.result;
          this.quesData.id = data.id;
        }
      })
      this.selectedProblemId = data.id;
      this.viewProblemActive = true;
    },
    // 匯入題庫題目
    importProblem(id) {
      if (id == '') { // 透過檢視題目匯入
      } else {
        this.selectedProblemId = id;
      }
      this.$emit('importProblem', this.selectedProblemId);
    }
  }
}
</script>
<template>
<div>
  <el-dialog id="editProblemDialog" :visible.sync="myVisible" v-loading="loading" @close="closeDialog">
    <el-form>
      <el-row>
        <el-col :span="20" :offset="2">
          <el-form-item label="題目作答類型">
            <el-radio-group v-model="data.category">
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
            <el-tag :key="tag" v-for="tag in data.tag" closable :disable-transitions="false" @close="handleClose(tag)">
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
            <el-input v-model="data.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-form-item label="題目類型">
            <el-select v-model="data.type" @change="changeProblemType" placeholder="請選擇類型" style="width: 100%;">
              <el-option  v-for="item in problemType" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-form-item label="題目期限">
            <el-date-picker type="date" placeholder="選擇繳交期限" v-model="data.deadline" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- TODO: pattern -->
      <el-row>
        <el-col :span="20" :offset="2" style="margin-bottom: 20px;">
          <el-form-item label="指定程式片段 (Pattern)" style="margin-bottom: 5px;">
            <el-input v-model="pattern.pat" maxlength="15" placeholder="請輸入一段指定的程式碼" style="width: 100%; margin-bottom: 10px;" v-for="(pattern, index) in data.pattern" :key="index"></el-input>
          </el-form-item>
          <el-button size="small" type="primary" plain @click="addPattern">+ 新增pattern</el-button>
          <el-button size="small" type="danger" plain @click="delPattern">- 移除pattern</el-button>
        </el-col>
      </el-row>
      <!-- TODO: pattern -->
      <el-row>
        <el-col :span="20" :offset="2">
          <el-form-item label="題目說明">
            <el-input type="textarea" rows="5" resize="vertical" v-model="data.description"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9" :offset="2">
          <el-form-item label="輸入說明">
            <el-input type="textarea" rows="5" resize="vertical" v-model="data.inputDesc"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item label="輸出說明">
            <el-input type="textarea" rows="5" resize="vertical" v-model="data.outputDesc"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(sample, index) in data.testCases" :key="index">
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
      <!-- FIXME: 討論題：選取批改配對 start-->
      <el-row v-if="data.type=='討論題'">
        <el-col :span="20" :offset="2" style="margin-bottom: 15px;">
          <el-divider content-position="center">討論題：選取批改配對</el-divider>
          <!-- NOTE: 190724 不需用 -->
          <!-- <p>指定一人須批改幾位同學：
            <el-input-number v-model="discussNum" controls-position="right" @change="discussNumChange" :min="1" :max="10" size="small" :disabled="discussIsLock"></el-input-number>
            <el-button size="mini" style="margin-left: 20px;" type="primary" @click="discussNumLock">確定</el-button>
            <el-button size="mini" type="danger" @click="discussNumUnlock">更改</el-button>
          </p> -->
          <el-cascader-panel v-loading="discussLoading" v-model="discussValue" :options="discussOptions" :props="discussProps" style="height:350px;"></el-cascader-panel>
        </el-col>
      </el-row>
      <!-- 討論題：選取批改配對 end -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="editProblem">確 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import axios from 'axios'

import DateUtil from '@/utils/DateUtil.js'
import GeneralUtil from '@/utils/GeneralUtil.js'
import problemStateMixin from '@/mixins/problemState.mixin.js'

export default {
  components: {},
  props: ['visible', 'data'],
  mixins: [problemStateMixin],
  data() {
    return {
      loading: false,
      myVisible: this.visible,
      // tags
      inputVisible: false,
      inputValue: '',
      autoCompleteTags: [],
      // 討論題：指定批改者
      discussLoading: false,
      discussStudsList: [], // 學生學號名單
      discussNum: 0,
      discussNowFocus: '', // 目前正在選的學號
      discussNumControl: {}, // {學號:count}
      discussIsLock: false,
      discussValue: [], // 選取配對的名單(pairs)
      discussProps: { 
        multiple: true
      },
      discussOptions: []
    }
  },
  watch: {
    visible(val) {
      this.myVisible = val;
    },
    myVisible(val) {
      this.$emit('onChangeVisible', val)
    }
  },
  mounted() {
    this.autoCompleteTags = this.problemTag; // tags
  },
  methods: {
    closeDialog() {
      this.myVisible = false;
      this.discussOptions = []; // 討論題
    },
    addSample() {
      let obj = {
        'inputSample': '',
        'outputSample': ''
      }
      this.data.testCases.push(obj);
    },
    delSample() {
      this.data.testCases.pop();
    },
    addPattern() {
      let obj = { 'pat': '' };
      this.data.pattern.push(obj);
    },
    delPattern() {
      this.data.pattern.pop();
    },
    editProblem() {
      if (this.data.name == '') {
        this.$message.error('請填寫題目名稱！');
      } else if (this.data.type == '') {
        this.$message.error('請選擇題目類型！');
      } else if (this.data.category == '') {
        this.$message.error('請選定題目作答類型！');
      } else if (this.data.tag.length == 0) {
        this.$message.error('請至少選擇一個標籤！');
      } // 至少要有java, py的tag
        else if (!(this.data.tag.includes('Java')||this.data.tag.includes('Python'))) {
        this.$message.error('請選擇一種程式語言標籤！');
      } else if (this.data.deadline == '') {
        this.$message.error('請選定截止日期！');
      } else if (this.data.description == '') {
        this.$message.error('請填寫題目說明！');
      } else if (this.data.inputDesc == '') {
        this.$message.error('請填寫題目輸入說明！');
      } else if (this.data.outputDesc == '') {
        this.$message.error('請填寫題目輸出說明！');
      } else if (this.data.testCases.length == 0) {
        this.$message.error('請填寫題目輸入範例！');
      } else if (this.data.testCases.length == 1) {
        this.$message.error('請至少填寫兩組題目輸入範例！');
      } else {
        this.loading = true;

        // 取出pattern
        let patternArray = [];
        if (this.data.pattern.length==1 && this.data.pattern[0].pat=='') {
          patternArray = [];
        } else {
          this.data.pattern.forEach((element) => {
            patternArray.push(element.pat);
          });
        }

        axios.post('/api/problem/editProblem', {
          problemId: this.data.id,
          name: this.data.name,
          type: this.data.type,
          category: this.data.category,
          tag: this.data.tag,
          deadline: DateUtil.formatDate(this.data.deadline),
          description: this.data.description,
          inputDesc: this.data.inputDesc,
          outputDesc: this.data.outputDesc,
          testCases: this.data.testCases,
          keyword: this.data.keyword,
          pattern: patternArray
        }).then((response) => {
          let res = response.data;
          if (res.status == '200') {
            this.$message({
              type: 'success',
              message: '編輯題目成功!'
            });

            // 討論題
            if (this.data.type == '討論題') {
              // [[correctAccount, correctedAccount]]轉成[{correctAccount, correctedAccount}]
              let discussValueObject = []; // [{correctAccount, correctedAccount}]
              this.discussValue.forEach((element) => {
                let object = {
                  correctAccount: element[0],
                  correctedAccount: element[1]
                }
                discussValueObject.push(object);
              });

              axios.post('/api/team/createTeam', {
                problemId: res.result.problemId,
                pairs: discussValueObject
              }).then((response) => {
                let res = response.data;
                if (res.status == 200) {
                  this.discussOptions = [];
                  console.log('建立team成功！');
                }
              });
            }

            this.myVisible = false;
            this.loading = false;
            this.$emit('refreshData');
          } else {
            this.loading = false;
            this.$message.error(res.msg);
          }
        }).catch(function (error) {
          console.log(error);
        });
      }
    },
    // tags control methods
    handleClose(tag) {
      this.data.tag.splice(this.data.tag.indexOf(tag), 1);
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
        this.data.tag.push(inputValue);
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
        this.data.tag.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    // 討論題
    getStudsList() {
      axios.get('/api/student/allStud', {
        params: {
          courseId: this.$store.state.course.courseInfo.courseId
        }
      }).then((response) => {
        let res = response.data;
        if (res.status == '200') {
          this.discussStudsList = res.result;
        }
      });

      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve(true);
        }, 1000);
      });
    },
    changeProblemType() {
      // 如果是討論題，就載入學生學號，去做討論題的批改配對
      if (this.data.type == '討論題') {
        this.discussLoading = true;
        this.getStudsList().then((value) => {
          if(value == true) {
            // 載入指定者學號進discussOptions
            this.discussStudsList.forEach((element) => {
              let obj = {
                value: element,
                label: element
              }
              this.discussOptions.push(obj);

              // 載入每個人的學號進discussNumControl, 做每個人選取數量的控制
              this.discussNumControl[element] = 0;
            });

            // 載入被指定者到discussOptions的各obj內，且不包含自己
            this.discussOptions.forEach((ele, idx) => {
              let [...tempStuList] = this.discussStudsList;
              // tempStuList.push(ele.value);
              let noMyselfList = GeneralUtil.removeInArray(tempStuList, ele);
              
              let children = [];
              this.discussOptions[idx].children = [];

              noMyselfList.forEach((ele) => {
                let obj = {
                  value: ele,
                  label: ele
                }
                this.discussOptions[idx].children.push(obj);
              });
            });
            this.discussLoading = false;
          }
        }).catch(function (error) {
          console.log(error);
        });
      } else { // 不是討論題
        this.discussOptions = [];
      }
    },
  }
}
</script>

<style>
#editProblemDialog .el-dialog {
  width: 70vw;
}

/* tag style */
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.overview {
  transition: all .3s ease;
}

.overview:hover {
  color: #409EFF;
  cursor: pointer;
}
</style>

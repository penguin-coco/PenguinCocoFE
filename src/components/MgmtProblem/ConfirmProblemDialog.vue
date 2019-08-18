<template>
<div>
  <el-dialog id="confirmProblemDialog" title="確認題目" :visible.sync="myVisible" v-loading="loading" @close="closeDialog">
    <el-form>
      <el-row>
        <el-col :span="20" :offset="2">
          <el-form-item label="題目作答類型">
            <el-radio-group v-model="data.category" disabled>
              <el-radio label="輸入輸出" border style="margin-right: 5px;">輸入輸出</el-radio>
              <el-radio label="輸入寫檔" border style="margin-right: 5px;">輸入寫檔</el-radio>
              <el-radio label="讀檔輸出" border style="margin-right: 5px;">讀檔輸出</el-radio>
              <el-radio label="讀檔寫檔" border style="margin-right: 5px;">讀檔寫檔</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" :offset="2">
          <!-- TAGs -->
          <el-form-item label="題目標籤" class="mr-10-label">
            <el-tag :key="tag" v-for="tag in data.tag">
              {{tag}}
            </el-tag>
          </el-form-item>
          <!-- TAGs -->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="2">
          <el-form-item label="題目名稱">
            <el-input v-model="data.name" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-form-item label="題目類型">
            <el-input v-model="data.type" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-form-item label="題目期限">
            <el-input v-model="data.previewDate" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- pattern -->
      <el-row>
        <el-col :span="20" :offset="2">
          <el-form-item label="指定程式片段 (Pattern)">
            <el-input v-model="pattern.pat" readonly maxlength="15" style="width: 100%; margin-bottom: 10px;" v-for="(pattern, index) in data.pattern" :key="index"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" :offset="2">
          <el-form-item label="題目說明">
            <el-input type="textarea" rows="3" resize="none" v-model="data.description" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9" :offset="2">
          <el-form-item label="輸入說明">
            <el-input type="textarea" rows="3" resize="none" v-model="data.inputDesc" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="1">
          <el-form-item label="輸出說明">
            <el-input type="textarea" rows="3" resize="none" v-model="data.outputDesc" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(sample, index) in data.testCases" :key="index">
        <el-col :span="9" :offset="2">
          <el-form-item>
            <span slot="label">輸入範例{{index+1}} (Input Sample{{index+1}})</span>
            <el-input type="textarea" rows="3" resize="none" v-model="sample.inputSample" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9" :offset="1">
          <el-form-item>
            <span slot="label">輸出範例{{index+1}} (Output Sample{{index+1}})</span>
            <el-input type="textarea" rows="3" resize="none" v-model="sample.outputSample" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="2">
          <p style="color: #F56C6C; margin-top: 0px;">注意！ 最後一項範例會作為隱藏範例，學生題目中看不見！</p>
        </el-col> 
      </el-row>
      <el-row v-if="data.type=='討論題'">
        <el-col :span="20" :offset="2">
          <!-- Tree -->
          <p>討論題：選取批改配對</p>
          <el-tree class="discussTree" :data="data.previewDiscussTreeData"></el-tree>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="newProblem">確 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {apiAddProblem} from '@/apis/problem.js'
import {apiCreateTeam} from '@/apis/team.js'

import DateUtil from '@/utils/DateUtil.js'


export default {
  components: {},
  props: ['visible', 'data'],
  data() {
    return {
      loading: false, // loading
      myVisible: this.visible,
      // preview tree data
      previewDiscussTreeData: [] // 確認題目的選學生配對部分
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
  methods: {
    closeDialog() {
      this.myVisible = false;
    },
    newProblem() {
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
        
        apiAddProblem({
          courseId: this.$store.state.course.courseInfo.courseId,
          name: this.data.name,
          type: this.data.type,
          category: this.data.category,
          tag: this.data.tag,
          description: this.data.description,
          deadline: this.data.previewDate,
          inputDesc: this.data.inputDesc,
          outputDesc: this.data.outputDesc,
          testCases: this.data.testCases,
          keyword: [],
          pattern: patternArray
        }).then((response) => {
          let res = response.data;
          if (res.status == '200') {
            this.$message({
              type: 'success',
              message: '新增題目成功!'
            });
            
            // 討論題
            if (this.data.type == '討論題') {
              // [[correctAccount, correctedAccount]]轉成[{correctAccount, correctedAccount}]
              let discussValueObject = []; // [{correctAccount, correctedAccount}]
              this.data.discussValue.forEach((element) => {
                let object = {
                  correctAccount: element[0],
                  correctedAccount: element[1]
                }
                discussValueObject.push(object);
              });

              apiCreateTeam({
                problemId: res.result.problemId,
                pairs: discussValueObject
              }).then((response) => {
                let res = response.data;
                if (res.status == 200) {
                  console.log('建立team成功！');
                }
              });
            }

            this.$emit('refreshProblemData');

            this.myVisible = false;
            this.loading = false;
          } else {
            this.loading = false;
            this.$message.error(res.msg);
          }
        }).catch((error) => {
          this.loading = false;
          this.$message.error('新增題目失敗！');
          console.log(error);
        });
      }
    },
  }
}
</script>

<style scoped>
#confirmProblemDialog .el-loading-mask {
  height: 160% !important;
}

#confirmProblemDialog .mr-10-label .el-form-item__label {
  margin-right: 10px;
}

#confirmProblemDialog .discussTree {
  border: 1px solid #DCDFE6;
  border-radius: 4px;
  height: 200px;
  overflow-y: scroll;
  margin-bottom: 15px;
}
</style>
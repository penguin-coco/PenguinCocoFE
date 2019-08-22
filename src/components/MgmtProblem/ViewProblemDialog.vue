<template>
<div>
  <el-dialog id="viewProblemDialog" :visible.sync="myVisible" v-loading="loading">
    <el-row class="penguin-problem">
      <el-col :span="20" :offset="2">
        <div class="problem-header">
          <span class="name" v-text="data.name"></span>
          <span class="id" v-text="data.id"></span>
          <span class="tags" v-for="tag in data.tag">
            <el-tag size="small">{{ tag }}</el-tag>
          </span>
          <span class="type" v-text="data.type"></span>
          <span class="deadline" v-text="data.deadline"></span>
        </div>
        <hr>
        <div class="problem-info">
          <div class="title">Description</div>
          <div id="markdown-editor">
            <vue-markdown class="content" :source="data.description"></vue-markdown>
          </div>
        </div>
        <div class="problem-info">
          <div class="title">Input</div>
          <div class="content change-line" v-text="data.inputDesc"></div>
        </div>
        <div class="problem-info">
          <div class="title">Output</div>
          <div class="content change-line" v-text="data.outputDesc"></div>
        </div>

        <el-row v-for="(sample, index) in data.testCases" :key="index">
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
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="myVisible=false">確 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    VueMarkdown
  },
  props: ['visible', 'loading', 'data'],
  data() {
    return {
      myVisible: this.visible
    }
  },
  watch: {
    visible(val) {
      this.myVisible = val;
    },
    myVisible(val) {
      this.$emit('onChangeVisible', val)
    }
  }
}
</script>

<style>
#viewProblemDialog .el-dialog {
  width: 70vw;
}
</style>

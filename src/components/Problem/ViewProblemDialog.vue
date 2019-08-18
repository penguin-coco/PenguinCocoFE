<template>
<div>
  <el-dialog id="viewProblemDialog" :visible.sync="problemDialogVisible" v-loading="loading">
    <section id="problem-section">
      <el-row>
        <el-col :span="20" :offset="2">
          <div class="problem-name">
            <span v-text="problemData.name"></span>
            <span v-text="problemData.id" style="font-size: 16px; color: #909399; font-weight: 500;"></span>
            <span class="type" v-text="problemData.type"></span>
            <span class="deadline" v-text="problemData.deadline"></span>
          </div>
          <hr>
          <div class="problem-info">
            <div class="title">Description</div>
            <div id="markdown-editor">
              <vue-markdown class="content" :source="problemData.description"></vue-markdown>
            </div>
          </div>
          <div class="problem-info">
            <div class="title">Input</div>
            <div class="content change-line" v-text="problemData.inputDesc"></div>
          </div>
          <div class="problem-info">
            <div class="title">Output</div>
            <div class="content change-line" v-text="problemData.outputDesc"></div>
          </div>

          <el-row v-for="(sample, index) in problemData.testCases" :key="index">
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
</div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    VueMarkdown
  },
  props: ['problemDialogVisible', 'problemData'],
  computed: {
    
  },
  data() {
    return {
      visibleFlag: this.problemDialogVisible
      // visible: false
    }
  },
  watch: {
    problemDialogVisible(val) {
      this.visibleFlag = val;
    }
  },
  methods: {
    closeDialog() {
      this.visible = false;
    }
  }
}
</script>
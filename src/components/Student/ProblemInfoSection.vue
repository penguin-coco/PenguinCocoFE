<template>
<div>
  <el-row>
    <el-col :span="22" :offset="1">
      <el-alert class="mb-3" effect="dark" v-if="data.type=='討論題'"
        title="討論題 - 學生互評"
        type="success"
        description="送出此題程式碼後，需要批改同學的程式碼並給分！">
      </el-alert>
      <el-alert class="mb-3" effect="dark" v-if="showPatternFlag"
        title="Pattern - 程式須包含指定片段"
        type="warning"
        description="題目說明欄中的Pattern，指定了同學在寫程式碼時，必須包含的程式片段(Pattern)，否則將會無法送出成績！">
      </el-alert>
    </el-col>
  </el-row>

  <!-- problem info section -->
  <el-row>
    <el-col class="penguin-box penguin-problem box-shadow-heavy" :span="22" :offset="1">
      <div class="problem-header">
        <span class="name" v-text="data.name"></span>
        <el-rate class="rate" allow-half v-model="data.rate" @change="changeRate" :disabled="data.judged!=true"></el-rate>
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
        <div class="content change-line" v-text="data.input"></div>
      </div>
      <div class="problem-info">
        <div class="title">Output</div>
        <div class="content change-line" v-text="data.output"></div>
      </div>
      <el-row v-for="(item, index) in data.testCases.slice(0, data.testCases.length-1)" :key="index">
        <el-col :xs="24" :sm="12">
          <div class="problem-info">
            <div class="title">Sample Input {{index+1}}
              <a style="cursor: pointer" @click="copy(item.inputSample)"><i class="el-icon-document"></i></a>
            </div>
            <div class="content">
              <el-input type="textarea" readonly autosize v-model="item.inputSample"  placeholder="請輸入內容" resize="none">
              </el-input>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12">
          <div class="problem-info">
            <div class="title">Sample Output {{index+1}}</div>
            <div class="content">
              <el-input type="textarea" readonly autosize v-model="item.outputSample1" placeholder="請輸入內容" resize="none">
              </el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="data.pattern.length>0">
        <el-col>
          <div class="problem-info">
            <div class="title" style="color: #E6A23C;">程式指定片段 Pattern(注意！程式碼必須包含這些程式片段！)</div>
            <div class="content">
              <el-input type="textarea" readonly autosize :value="pat" resize="none" v-for="(pat, index) in data.pattern" :key="index" style="margin-bottom: 12px;"></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  
</div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    VueMarkdown
  },
  props: ['data'],
  data() {
    return {}
  },
  computed: {
    showPatternFlag() {
      if (this.data.pattern.length>0) return true;
      else false;
    }
  },
  methods: {
    changeRate(rateScore) {
      axios.post('/api/student/updateRate', {
        problemId: this.problem.id,
        rate: rateScore
      }).then((response) => {
        let res = response.data;
        if (res.status == '200') {
          // pass
        }
      });
    },
  }
}
</script>
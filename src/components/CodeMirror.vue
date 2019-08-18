<template>
<div>
  <section id="codemirror-section" v-if="problem.judged==false">
    <el-row>
      <el-col :span="20" :offset="2" class="box" v-loading="judging" element-loading-text="批改中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="coding-block">
          <div class="setting">
            <span>Language:</span>
            <el-select v-model="nowLang" @change="changeNowLang" size="8px">
              <el-option v-for="item in languages" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
            <span style="margin-left: 10px;">Theme:</span>
            <el-select v-model="nowTheme" @change="changeNowTheme" size="8px">
              <el-option v-for="item in themes" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </div>
          <codemirror :value="code" :options="options" ref="myEditor"></codemirror>
          <el-button type="primary" @click="submitCode">submit</el-button>
        </div>
      </el-col>
    </el-row>
  </section>
</div>
</template>

<script>
import axios from 'axios'
import {
  codemirror
} from 'vue-codemirror-lite'

import "codemirror/mode/clike/clike.js"
import "codemirror/mode/python/python.js"
import "codemirror/addon/mode/overlay.js"
import "codemirror/addon/edit/matchbrackets.js"
// fold gutter
import "codemirror/addon/fold/foldcode.js"
import "codemirror/addon/fold/foldgutter.js"
import "codemirror/addon/fold/brace-fold.js"
import "codemirror/addon/fold/indent-fold.js"
import "codemirror/addon/fold/foldgutter.css"
// theme
import "codemirror/theme/solarized.css"
import "codemirror/theme/monokai.css"
import "codemirror/theme/material.css"
// animated
import "@/assets/animated/animate.css"

var codes = {
  'text/x-java': `public class HelloWorld {
      public static void main(String[] args) {
          System.out.println("Hello! World!");
      }
  }`,
  'text/x-python': 'int'
}

export default {
  components: {
    codemirror
  },
  props: ['problem'],
  data() {
    return {
      mode: "text/x-java",
      nowLang: 'Java',
      languages: ['Java', 'Python'],
      theme: 'default',
      nowTheme: 'Default',
      themes: ['Default', 'Solarized', 'Monokai', 'Material'],
      // judging
      judging: false,
    }
  },
  computed: {
    code() {
      return codes[this.mode]
    },
    options() {
      return {
        mode: this.mode,
        theme: this.theme,
        tabSize: 4,
        lineNumbers: true,
        matchBrackets: true, // 括號匹配
        smartIndent: true, // 自動縮排
        viewportMargin: Infinity,
        extraKeys: {
          'Ctrl-Space': 'autocomplete'
        },
        // 代碼折疊
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        // judging
        judging: false,
      }
    }
  },
  methods: {
    // code mirror
    changeNowLang(lang) {
      if (lang == 'Java') {
        this.nowLang = 'Java';
        this.mode = 'text/x-java';
        // console.log('Change lang to' + lang);
      } else if (lang == 'Python') {
        this.nowLang = 'Python';
        this.mode = 'text/x-python';
        // console.log('Change lang to' + lang);
      }
    },
    changeNowTheme(theme) {
      if (theme == 'Default') {
        this.nowTheme = theme;
        this.theme = 'default';
      } else if (theme == 'Solarized') {
        this.nowTheme = theme;
        this.theme = 'solarized';
      } else if (theme == 'Monokai') {
        this.nowTheme = theme;
        this.theme = 'monokai';
      } else if (theme == 'Material') {
        this.nowTheme = theme;
        this.theme = 'material';
      }
    },
    // submit code
    submitCode() {
      this.$confirm('確認是否要提交代碼？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'info',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '提交成功!'
        });

        this.judging = true;
        axios.post('/api/judge/judgeCode', {
          problemID: this.problem.id,
          code: this.code,
          language: stringObject.toUpperCase(this.nowLang)
        }).then((response) => {
          let res = response.data;
          if(res.status=='200') {
            
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        });
      });
    },
  }
}
</script>

<!-- my code mirror -->
<style src="@/assets/css/code-mirror.scss"></style>

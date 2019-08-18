<template>
<div>
  <!-- 1. 程式碼 -->
  <codemirror :options="options" :value="data.code" :ref="'discussCodeMirror'+this.index" :style="{'font-size': fontSize+'px', 'padding-bottom': '20px'}" :tabIndex="tabIndex"></codemirror>
  <!-- 2. 給分 -->
  <el-row class="block">
    <el-col :span="24">
      <span class="small-title">指標1. 程式正確性</span>
    </el-col>
    <el-col :span="23" :offset="1" style="margin-top: 15px;">
      <el-col :span="2" class="item-label" style="margin-top: 6px;">分數</el-col>
      <el-col :span="22">
        <el-slider v-model="data.correctValue.score" show-input :step="1" :max="5" show-stops :disabled="disabled"></el-slider>
      </el-col>
    </el-col>
    <el-col :span="23" :offset="1" style="margin-top: 15px;">
      <el-col :span="2" class="item-label">評論</el-col>
      <el-col :span="22">
        <el-input type="textarea" rows="2" resize="vertical" v-model="data.correctValue.comment" :disabled="disabled"></el-input>
      </el-col>
    </el-col>
  </el-row>
  <el-row class="block">
    <el-col :span="24">
      <span class="small-title">指標2. 程式可讀性</span>
    </el-col>
    <el-col :span="23" :offset="1" style="margin-top: 15px;">
      <el-col :span="2" class="item-label" style="margin-top: 6px;">分數</el-col>
      <el-col :span="22">
        <el-slider v-model="data.readValue.score" show-input :step="1" :max="5" show-stops :disabled="disabled"></el-slider>
      </el-col>
    </el-col>
    <el-col :span="23" :offset="1" style="margin-top: 15px;">
      <el-col :span="2" class="item-label">評論</el-col>
      <el-col :span="22">
        <el-input type="textarea" rows="2" resize="vertical" v-model="data.readValue.comment" :disabled="disabled"></el-input>
      </el-col>
    </el-col>
  </el-row>
  <el-row class="block">
    <el-col :span="24">
      <span class="small-title">指標3. 技巧運用</span>
    </el-col>
    <el-col :span="23" :offset="1" style="margin-top: 15px;">
      <el-col :span="2" class="item-label" style="margin-top: 6px;">分數</el-col>
      <el-col :span="22">
        <el-slider v-model="data.skillValue.score" show-input :step="1" :max="5" show-stops :disabled="disabled"></el-slider>
      </el-col>
    </el-col>
    <el-col :span="23" :offset="1" style="margin-top: 15px;">
      <el-col :span="2" class="item-label">評論</el-col>
      <el-col :span="22">
        <el-input type="textarea" rows="2" resize="vertical" v-model="data.skillValue.comment" :disabled="disabled"></el-input>
      </el-col>
    </el-col>
  </el-row>
  <el-row class="block">
    <el-col :span="24">
      <span class="small-title">指標4. 程式完整性</span>
    </el-col>
    <el-col :span="23" :offset="1" style="margin-top: 15px;">
      <el-col :span="2" class="item-label" style="margin-top: 6px;">分數</el-col>
      <el-col :span="22">
        <el-slider v-model="data.completeValue.score" show-input :step="1" :max="5" show-stops :disabled="disabled"></el-slider>
      </el-col>
    </el-col>
    <el-col :span="23" :offset="1" style="margin-top: 15px;">
      <el-col :span="2" class="item-label">評論</el-col>
      <el-col :span="22">
        <el-input type="textarea" rows="2" resize="vertical" v-model="data.completeValue.comment" :disabled="disabled"></el-input>
      </el-col>
    </el-col>
  </el-row>
  <el-row class="block">
    <el-col :span="24">
      <span class="small-title">指標5. 總和評分</span>
    </el-col>
    <el-col :span="23" :offset="1" style="margin-top: 15px;">
      <el-col :span="2" class="item-label" style="margin-top: 6px;">分數</el-col>
      <el-col :span="22">
        <el-slider v-model="data.wholeValue.score" show-input :step="1" :max="5" show-stops :disabled="disabled"></el-slider>
      </el-col>
    </el-col>
    <el-col :span="23" :offset="1" style="margin-top: 15px;">
      <el-col :span="2" class="item-label">評論</el-col>
      <el-col :span="22">
        <el-input type="textarea" rows="2" resize="vertical" v-model="data.wholeValue.comment" :disabled="disabled"></el-input>
      </el-col>
    </el-col>
  </el-row>
  <el-row class="block">
    <el-col :span="24">
      <span class="small-title">總評論</span>
    </el-col>
    <el-col :span="23" :offset="1" style="margin-top: 15px;">
      <el-input type="textarea" rows="2" resize="vertical" v-model="data.comment" :disabled="disabled"></el-input>
    </el-col>
  </el-row>
</div>
</template>

<script>
import {codemirror} from 'vue-codemirror-lite'

export default {
  components: {
    codemirror
  },
  props: {
    data: Array,
    index: 0,
    disabled: false,
    lang: String,
    tabIndex: 0
  },
  // props: ['data', 'index', 'disabled', 'lang', 'tabIndex'],
  data() {
    return {
      mode: "text/x-java",
      theme: 'default',
      fontSize: 16
    }
  },
  mounted() {
    this.setCodemirrorOptions();
  },
  watch: {
    tabIndex() {
      let refName = 'discussCodeMirror'+this.tabIndex;
      this.$nextTick(() => {
        // this.$refs[refName].value = this.data.code;
        var self = this;
        setTimeout(function() {
          self.$refs[refName].editor.refresh();
        }, 1);
      });
    }
  },
  computed: {
    options() {
      return {
        mode: this.mode,
        theme: this.theme,
        indentUnit: 4, // 縮進單位
        tabSize: 4,
        lineNumbers: true,
        matchBrackets: true, // 括號匹配
        smartIndent: true, // 自動縮排
        autoCloseBrackets: true, // 括號補全
        viewportMargin: Infinity,
        gutter: true,
        fixedGutter: true,
        extraKeys: {
          'Ctrl-Space': 'autocomplete'
        },
        showCursorWhenSelecting: true, // 反白時顯示鼠標位置
        // 代碼折疊
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        readOnly: true // 唯讀
      }
    }
  },
  methods: {
    setCodemirrorOptions() {
      // 設定語言
      if (this.lang == 'Java') {
        this.mode = 'text/x-java';
      } else if (this.lang == 'Python') {
        this.mode = 'text/x-python';
      }

      // 處理顯示問題
      let refName = 'discussCodeMirror'+this.index;
      this.$nextTick(() => {
        this.$refs[refName].value = this.data.code;
        var self = this;
        setTimeout(function() {
          self.$refs[refName].editor.refresh();
        }, 1);
      });
    }
  }
}
</script>
<template>
<div>
  <!-- 用於ProblemsData, 查看已做題及未做題的資訊 -->
  <el-dialog :visible.sync="myVisible" @close="doInfoDialogActiveStudentCode=false;">
    <el-row v-if="doInfoDialogActiveStudentCode==false">
      <el-col :span="20" :offset="2">
        <div class="penguin-content-header">
          <div class="content-title">{{ problemName }}</div>
        </div>
        <el-table class="width0-100 mb-12" max-height="336" :data="data">
          <el-table-column prop="studentId" label="學生學號">
          </el-table-column>
          <el-table-column prop="studentName" label="學生姓名"></el-table-column>
          <el-table-column prop="score" label="成績"></el-table-column>
          <el-table-column v-if="status=='done'" label="程式碼">
            <template slot-scope="scope">
              <span><a class="text-primary text-clean" @click="seeStudentCode(scope.row)" href="javascript:void(0)"><i class="fas fa-code"></i> 檢視</a></span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row v-if="doInfoDialogActiveStudentCode">
      <el-col>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>
            <a class="text-clean" href="javascript:void(0)" @click="doInfoDialogActiveStudentCode=false">{{problemName}}</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{doInfoDianlogNowStudentId}} {{doInfoDianlogNowStudentName}}</el-breadcrumb-item>
        </el-breadcrumb>
        <codemirror class="mt-4" v-model="doInfoDianlogNowStudentCode" :options="options"></codemirror>
        <a class="hyperlink float-right mt-2" @click="copy(doInfoDianlogNowStudentCode)"><i class="el-icon-document"></i>複製代碼</a>
      </el-col>
    </el-row>
  </el-dialog>
</div>
</template>

<script>
import { codemirror } from 'vue-codemirror-lite'
import GeneralUtil from '@/utils/GeneralUtil.js'

export default {
  components: {
    codemirror
  },
  props: ['visible', 'data', 'status', 'problemName'],
  data() {
    return {
      myVisible: this.visible,
      doInfoDialogActiveStudentCode: false, // 是否正在檢視學生的code
      doInfoDianlogNowStudentId: '', // 當下檢視的學生的學號
      doInfoDianlogNowStudentName: '', // 當下檢視的學生的姓名
      doInfoDianlogNowStudentCode: '', // 當下檢視的學生code
      // codemirror options
      options: {
        mode: 'text/x-java',
        theme: 'default',
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
        readOnly: 'nocursor'
      },
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
    seeStudentCode(data) {
      this.doInfoDianlogNowStudentId = data.studentId;
      this.doInfoDianlogNowStudentName = data.studentName;
      this.doInfoDianlogNowStudentCode = data.code;
      this.doInfoDialogActiveStudentCode = true;
    },
    copy(s) {
      // 複製功能
      GeneralUtil.copy(s);
      // success msg
      this.$message({
        message: '複製成功',
        type: 'success'
      });
    }
  }
}
</script>
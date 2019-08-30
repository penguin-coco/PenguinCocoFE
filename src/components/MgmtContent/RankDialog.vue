<template>
<div>
  <el-dialog :visible.sync="myVisible" @close="closeDialog">
    <el-row>
      <el-col :span="20" :offset="2">
        <div class="radio-button-container" style="width: 100%; text-align: center;">
          <el-radio-group v-model="radio" style="margin-bottom: 20px" @change="radioChangeHandler">
            <el-radio-button :label="$t('student.rank.correctRank')"></el-radio-button>
            <el-radio-button :label="$t('student.rank.bestRank')"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="correctRank-block" v-if="correctRankFlag">
          <div class="penguin-content-header">
            <div class="content-title">{{ $t('student.rank.correctTitle') }}</div>
          </div>
          <el-table class="width-100 mb-12" max-height="350" :data="correctRankData">
            <el-table-column prop="rank" :label="$t('student.rank.rank')" width="80%">
            </el-table-column>
            <el-table-column prop="account" :label="$t('student.rank.account')">
            </el-table-column>
            <el-table-column prop="name" :label="$t('student.rank.name')"></el-table-column>
            <el-table-column prop="correctNum" :label="$t('student.rank.correctNum')"></el-table-column>
          </el-table>
        </div>
        <div class="bestCodeRank-block" v-if="bestCodeRankFlag">
          <div class="penguin-content-header">
            <div class="content-title">{{ $t('student.rank.bestTitle') }}</div>
          </div>
          <el-table class="width-100 mb-12" max-height="350" :data="bestCodeRankData">
            <el-table-column prop="rank" :label="$t('student.rank.rank')" width="80%">
            </el-table-column>
            <el-table-column prop="account" :label="$t('student.rank.account')">
            </el-table-column>
            <el-table-column prop="name" :label="$t('student.rank.name')"></el-table-column>
            <el-table-column prop="bestCodeNum" :label="$t('student.rank.bestNum')"></el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </el-dialog>
</div>
</template>

<script>
import {apiCorrectRank, apiBestCodeRank} from '@/apis/rank.js'

export default {
  components: {},
  props: ['visible'],
  mounted() {
    this.getCorrectRank();
    this.getBestCodeRank();
  },
  data() {
    return {
      myVisible: this.visible,
      // rank
      radio: this.$i18n.locale=='zh_TW'?'正確題數':'Correct',
      correctRankFlag: true,
      bestCodeRankFlag: false,
      correctRankData: [],
      bestCodeRankData: []
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
      this.radio = this.$i18n.locale=='zh_TW'?'正確題數':'correct number';
    },
    radioChangeHandler(label) {
      if(label=='正確題數' || label=='Correct') {
        this.correctRankFlag = true;
        this.bestCodeRankFlag = false;
      } else if(label=='最佳解答' || label=='Best') {
        this.correctRankFlag = false;
        this.bestCodeRankFlag = true;
      }
    },
    getCorrectRank() {
      apiCorrectRank({
        courseId: this.$store.state.course.courseInfo.courseId
      }).then((response)=> {
        let res = response.data;
        if(res.status=='200') {
          this.correctRankData = res.result;
        }
      });
    },
    getBestCodeRank() {
      apiBestCodeRank({
        courseId: this.$store.state.course.courseInfo.courseId
      }).then((response)=> {
        let res = response.data;
        if(res.status=='200') {
          this.bestCodeRankData = res.result;
        }
      });
    }
  }
}
</script>
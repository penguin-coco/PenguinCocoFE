<template>
<div>
  <el-dialog :visible.sync="myVisible" @close="closeDialog">
    <el-row>
      <el-col :span="20" :offset="2">
        <div class="radio-button-container" style="width: 100%; text-align: center;">
          <el-radio-group v-model="radio" style="margin-bottom: 20px" @change="radioChangeHandler">
            <el-radio-button label="正確題數"></el-radio-button>
            <el-radio-button label="最佳解答"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="correctRank-block" v-if="correctRankFlag">
          <div class="items-nav">
            <div class="item">正確題數排行</div>
          </div>
          <el-table max-height="350" :data="correctRankData" style="width: 100%; margin-bottom: 60px;">
            <el-table-column prop="rank" label="名次" width="80%">
            </el-table-column>
            <el-table-column prop="account" label="學生學號">
            </el-table-column>
            <el-table-column prop="name" label="學生姓名"></el-table-column>
            <el-table-column prop="correctNum" label="正確題數"></el-table-column>
          </el-table>
        </div>
        <div class="bestCodeRank-block" v-if="bestCodeRankFlag">
          <div class="items-nav">
            <div class="item">最佳解答數排行</div>
          </div>
          <el-table max-height="350" :data="bestCodeRankData" style="width: 100%; margin-bottom: 60px;">
            <el-table-column prop="rank" label="名次" width="80%">
            </el-table-column>
            <el-table-column prop="account" label="學生學號">
            </el-table-column>
            <el-table-column prop="name" label="學生姓名"></el-table-column>
            <el-table-column prop="bestCodeNum" label="最佳題數"></el-table-column>
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
      radio: '正確題數',
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
      this.radio = '正確題數';
    },
    radioChangeHandler(label) {
      if(label=='正確題數') {
        this.correctRankFlag = true;
        this.bestCodeRankFlag = false;
      } else if(label=='最佳解答') {
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
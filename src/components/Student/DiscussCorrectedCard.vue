<template>
<div>
  <el-col :span="11" v-for="stud in data" :key="stud.studentAccount" style="margin: 10px;">
    <el-card class="box-card" style="margin-top: 15px; " shadow="hover">
      <div class="text item">
        <el-row class="block border-dashed">
          <el-col :span="6">
            <span class="small-title">程式正確性</span>
          </el-col>
          <el-col :span="14">
            <el-slider class="correct-slider" :step="1" :max="5" v-model="stud.correctValue.score" :disabled="true"></el-slider>
          </el-col>
          <el-col :span="4">
            <p class="score">{{stud.correctValue.score}}</p>
          </el-col>
          <el-col :span="18" :offset="6" style="margin-top: 5px;">
            <el-input readonly type="textarea" :rows="2" resize="none" v-model="stud.correctValue.comment"></el-input>
          </el-col>
        </el-row>
        <el-row class="block border-dashed">
          <el-col :span="6">
            <span class="small-title">程式可讀性</span>
          </el-col>
          <el-col :span="14">
            <el-slider class="correct-slider" :step="1" :max="5" v-model="stud.readValue.score" :disabled="true"></el-slider>
          </el-col>
          <el-col :span="4">
            <p class="score">{{stud.readValue.score}}</p>
          </el-col>
          <el-col :span="18" :offset="6" style="margin-top: 5px;">
            <el-input readonly type="textarea" :rows="2" resize="none" v-model="stud.readValue.comment"></el-input>
          </el-col>
        </el-row>
        <el-row class="block border-dashed">
          <el-col :span="6">
            <span class="small-title">技巧運用</span>
          </el-col>
          <el-col :span="14">
            <el-slider class="correct-slider" :step="1" :max="5" v-model="stud.skillValue.score" :disabled="true"></el-slider>
          </el-col>
          <el-col :span="4">
            <p class="score">{{stud.skillValue.score}}</p>
          </el-col>
          <el-col :span="18" :offset="6" style="margin-top: 5px;">
            <el-input readonly type="textarea" :rows="2" resize="none" v-model="stud.skillValue.comment"></el-input>
          </el-col>
        </el-row>
        <el-row class="block border-dashed">
          <el-col :span="6">
            <span class="small-title">程式完整性</span>
          </el-col>
          <el-col :span="14">
            <el-slider class="correct-slider" :step="1" :max="5" v-model="stud.completeValue.score" :disabled="true"></el-slider>
          </el-col>
          <el-col :span="4">
            <p class="score">{{stud.completeValue.score}}</p>
          </el-col>
          <el-col :span="18" :offset="6" style="margin-top: 5px;">
            <el-input readonly type="textarea" :rows="2" resize="none" v-model="stud.completeValue.comment"></el-input>
          </el-col>
        </el-row>
        <el-row class="block border-dashed">
          <el-col :span="6">
            <span class="small-title">綜合評分</span>
          </el-col>
          <el-col :span="14">
            <el-slider class="correct-slider" :step="1" :max="5" v-model="stud.wholeValue.score" :disabled="true"></el-slider>
          </el-col>
          <el-col :span="4">
            <p class="score">{{stud.wholeValue.score}}</p>
          </el-col>
          <el-col :span="18" :offset="6" style="margin-top: 5px;">
            <el-input readonly type="textarea" :rows="2" resize="none" v-model="stud.wholeValue.comment"></el-input>
          </el-col>
        </el-row>
        <el-row class="block">
          <el-col :span="6">
            <span class="small-title">總評論</span>
          </el-col>
          <el-col :span="18" style="margin-top: 5px;">
            <el-input readonly type="textarea" :rows="2" resize="none" v-model="stud.comment"></el-input>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </el-col>
</div>
</template>

<script>
export default {
  components: {},
  props: ['data'],
  data() {
    return {}
  }
}
</script>
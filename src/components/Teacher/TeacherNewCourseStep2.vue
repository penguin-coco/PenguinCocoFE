<template>
<div>
  <div style="margin-top: 50px; margin-bottom: 30px;">
    <el-transfer style="display: flex; align-items: center; justify-content: center;"
      filterable
      :titles="['未加入班級', '已加入班級']"
      filter-placeholder="請輸入班級名稱"
      v-model="value"
      :data="data"
      @change="handleChange">
    </el-transfer>
  </div>
  <el-button-group style="float: right;">
    <el-button type="primary" icon="el-icon-arrow-left" v-if="step!=1" @click="lastStep">上一步</el-button>
    <el-button type="primary" @click="nextStep">下一步<i class="el-icon-arrow-right el-icon--right"></i></el-button>
  </el-button-group>
</div>
</template>

<script>
import axios from 'axios'

export default {
  components: {},
  data() {
    return {
      step: 2,
      data: [],
      value: []
    }
  },
  mounted() {
    this.getStudentClassList();
  },
  methods: {
    getStudentClassList() {
      let tempData = [];

      axios.get('/api/teacher/studentClassList').then((response) => {
        let res = response.data;
        let self = this;
        if(res.status == "200") {
          res.result.forEach((className) => {
            self.data.push({
              label: className,
              key: className
            });
          });
        }
      });
    },
    handleChange() {
      if (this.value.length>1) {
        this.$message.error('只能選取一個班級');
        this.value = [];
      }
    },
    lastStep() {
      this.$emit('goLast2To1', this.step);
    },
    nextStep() {
      if (this.value.length == 0) {
        this.$message.error('請選擇至少一個班級！');
      } else {
        this.$emit('goNext2To3', this.value, this.step);
      }
    }
  }
}
</script>
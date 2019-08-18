<template>
<div>
  <div style="margin-top: 50px; margin-bottom: 30px;">
    <el-transfer style="display: flex; align-items: center; justify-content: center;"
      filterable
      :titles="['未加入助教', '已加入助教']"
      filter-placeholder="請輸入助教名稱"
      v-model="value"
      :data="data"
      @change="handleChange"
      >
    </el-transfer>
  </div>
  <el-button-group style="float: right;">
    <el-button type="primary" icon="el-icon-arrow-left" v-if="step!=1" @click="lastStep">上一步</el-button>
    <el-button type="primary" @click="submit">完成<i class="el-icon-arrow-right el-icon--right"></i></el-button>
  </el-button-group>
</div>
</template>

<script>
import axios from 'axios'

export default {
  components: {},
  data() {
    return {
      step: 3,
      data: [],
      value: []
    }
  },
  mounted() {
    this.getAssistantList();
  },
  methods: {
    getAssistantList() {
      let tempData = []
      axios.get('/api/teacher/assistantList').then((response) => {
        let res = response.data;
        let self = this;
        if(res.status == "200") {
          console.log(res.result);
          res.result.forEach((item) => {
            self.data.push({
              label: item.assistantName,
              key: item.assistantId
            });
          });
        }
      });
    },
    handleChange() {
      // console.log(this.value);
    },
    lastStep() {
      this.$emit('goLast3To2', this.step);
    },
    submit() {
      this.$emit('submit', this.value);
    }
  }
}
</script>
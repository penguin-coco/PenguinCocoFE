<template>
<div>
  <el-dialog :visible.sync="myVisible" @close="clearFilter" id="student-do-info-dialog">
    <el-row>
      <el-col :span="20" :offset="2">
        <div class="items-nav">
          <div class="item">{{ name }}</div>{{ id }}
        </div>
        <el-row>
          <el-col :span="11" class="statistic-block" style="background-color: #3498DB;">
            <div class="statistic">{{ dialogStudentDoRate }}%</div>
            <div class="title">作答率</div>
          </el-col>
          <el-col :span="11" :offset="1" class="statistic-block" style="background-color: #A569BD;">
            <div class="statistic">{{ dialogStudentCorrectRate }}%</div>
            <div class="title">正確率</div>
          </el-col>
        </el-row>
        <el-table class="mt-4 mb-0 width-100" max-height="250" :data="dialogStudentData" @filter-change="handleFilterChange" ref="table" style="width: 100%;">
          <el-table-column prop="name" label="題目名稱">
          </el-table-column>
          <el-table-column prop="type" label="題目類型" :filters="[{text: '作業', value: '作業'}, {text: '練習題', value: '練習題'}, {text: '討論題', value: '討論題'}]" :filter-method="typeFilterHandler">
          </el-table-column>
          <el-table-column prop="score" label="成績" :filters="[{text: '100', value: '100.0'}, {text: '0', value: '0.0'}, {text: '未作答', value: '未作答'}]" :filter-method="scoreFilterHandler">
          </el-table-column>
        </el-table>

        <el-button class="mt-4 float-right" type="primary" @click="myVisible=false">確 定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</div>
</template>

<script>
export default {
  components: {},
  props: ['visible', 'data', 'id', 'name'],
  data() {
    return {
      myVisible: this.visible,
      filterList: [],
      dialogFormVisible: false,
      dialogStudentDoRate: '0',
      dialogStudentCorrectRate: '0'
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
  computed: {
    dialogStudentData() {
      let problemsList = [];
      let resultList = [];
      let data = this.data;
      for (let i = 0; i < data.length; i++) {
        if (this.id == data[i].studentId) {
          problemsList = data[i].problems;

          // 計算 dialogStudentCorrectRate
          let correct = 0;
          let incorrect = 0;
          for (let j = 0; j < problemsList.length; j++) {
            if (problemsList[j].historyCode.length > 0) {
              if (problemsList[j].historyCode.slice(-1)[0].score == 100) {
                correct++;
              } else if (problemsList[j].historyCode.slice(-1)[0].score == 0) {
                incorrect++;
              }
            }
            
          }
          this.dialogStudentCorrectRate = ((correct / (correct + incorrect)) * 100).toFixed(1);

          // 計算 dialogStudentDoRate
          let done = 0;
          let undo = 0;
          for (let j = 0; j < problemsList.length; j++) {
            if (problemsList[j].historyCode.length == 0) {
              undo++;
            } else {
              done++;
            }
          }
          this.dialogStudentDoRate = ((done / (done + undo)) * 100).toFixed(1);

          // 處理score
          for(let i=0; i<problemsList.length; i++) {
            let obj = {
              'name': problemsList[i].name,
              'type': problemsList[i].type,
              'score': problemsList[i].historyCode.length!=0?problemsList[i].historyCode.slice(-1)[0].score:'未作答'
            }
            resultList.push(obj);
          }
          break;
        }
      }
      return resultList
    }
  },
  methods: {
    typeFilterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    scoreFilterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    handleFilterChange(val) {
      this.filterList = val;
    },
    clearFilter() {
      this.$refs.table.clearFilter(this.filterList);
    }
  }
}
</script>

<style lang="scss">
#student-do-info-dialog {
  .statistic-block {
    height: 100px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .statistic-block .title {
    color: white;
  }

  .statistic-block .statistic {
    color: white;
    font-weight: bold;
    margin-bottom: 12px;
    font-size: 30px;
  }
}

</style>
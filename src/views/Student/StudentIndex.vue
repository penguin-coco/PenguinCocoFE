<template>
<div>
<el-container>
  <el-header>
    <nav-header-student></nav-header-student>
  </el-header>

  <el-container>
    <el-aside width="200px">
      <side-nav-student></side-nav-student>
    </el-aside>

    <el-container class="main-container" id="studentIndex-section">
      <el-row class="header">
        <el-col :span="24">
          <div class="left-action-bar d-inline-block">
            <el-select v-model="modeValue" @change="changeMode">
              <el-option label="可作答" value="undo"></el-option>
              <el-option label="已完成" value="done"></el-option>
            </el-select>
            <el-input v-model="nameFilterValue" class="filterInput" placeholder='請輸入題目名稱' clearable><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
          </div>
          <div class="right-action-bar float-right">
            <el-button type="primary" plain icon="el-icon-s-operation" size="small" style="margin-top:8px;" @click="showFilterSection">filter</el-button>
          </div>

          <transition name="el-zoom-in-top" @leave="leaveTransition">
            <el-row class="filter-section" v-if="isFilterShow">
              <!-- TODO: tag filter func -->
              <el-col :span="8" class="item">
                <span class="item-title">題目標籤</span>
                <el-select class="width-80" v-model="problemTagValue" multiple filterable allow-create default-first-option disabled placeholder="功能尚未開放">
                  <el-option-group
                    v-for="group in quesTagOptions"
                    :key="group.label"
                    :label="group.label">
                    <el-option
                      v-for="item in group.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-option-group>
                </el-select>
              </el-col>
              <el-col :span="8" class="item">
                <span class="item-title">選擇題型</span>
                <el-select class="width-80" v-model="typeValue">
                  <el-option v-for="item in studIndexProblemType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-col>
              <el-col :span="8" class="item">
                <span class="item-title">排序方式</span>
                <el-select class="width-80" v-model="sortValue" clearable>
                  <el-option label="難易度" value="rate"></el-option>
                  <el-option label="繳交期限" value="deadline"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </transition>
        </el-col>
      </el-row>

      <el-main class="pt-0">
        <el-row class="problem-card-section" v-if="problemsFiltered.length>0" v-loading="problemSectionLoading" :gutter="25">
          <el-col :span="24" >
            <transition-group name="slide-fade">
              <el-col class="problem-card" v-for="problem in problemsFiltered" :key="problem.problemId" :xs="24" :sm="12" :md="8" :lg="6">
                <a href="javascript:void(0);" @click="doProblem(problem.problemId)">
                  <el-card class="card" shadow="hover">
                    <span class="problem-name ellipsis">{{ problem.name }}
                      {{problem.tag}}
                      <el-tag class="tag" effect="plain">Java</el-tag>
                    </span>
                    <div class="bottom clearfix">
                      <el-rate class="rate" disabled :value="parseInt(problem.rate)"></el-rate>
                      <Countdown v-if="dateDiff(todayDate, problem.deadline)<1" :deadline="deadlineParse(problem.deadline)"></Countdown>
                      <div v-if="dateDiff(todayDate, problem.deadline)>=1" class="time">{{ problem.deadline }}</div>
                    </div>
                    <div class="type">{{ problem.type }}</div>
                  </el-card>
                </a>
              </el-col>
            </transition-group>
          </el-col>
        </el-row>

        <el-row class="none-problem" v-if="modeValue=='undo' && problemsFiltered.length==0 && problemSectionLoading==false">
          <p><img width="25"src="/static/favicon/favicon.png"> &nbsp; 全部題目都完成了喔！ 可以切換到 <span style="color:#1565C0;">已完成</span> 去查看！</p>
        </el-row>
      </el-main>

      <el-footer>
        <nav-footer-student></nav-footer-student>
      </el-footer>
    </el-container>
    
  </el-container>
</el-container>
</div>
</template>

<script>
import {studentCheckLogin} from '@/apis/_checkLogin.js'
import {apiProblemInfo} from '@/apis/student.js'

import Countdown from 'vuejs-countdown'
import DateUtil from '@/utils/DateUtil.js'
import problemStateMixin from '@/mixins/problemState.mixin.js'

import NavHeaderStudent from '@/components/Student/NavHeaderStudent.vue'
import SideNavStudent from '@/components/Student/SideNavStudent.vue'
import NavFooterStudent from '@/components/Student/NavFooterStudent.vue'

export default {
  components: {
    NavHeaderStudent,
    SideNavStudent,
    NavFooterStudent,
    Countdown
  },
  mixins: [problemStateMixin],
  mounted() {
    studentCheckLogin();
    this.getProblemData();
  },
  data() {
    return {
      // 可作答&已作答 selector
      modeValue: 'undo',
      nameFilterValue: '', // 題目id或題目名稱搜索
      // filter-section(filter題目的區塊)
      isFilterShow: false,
      problemTagValue: [], // 題目標籤
      typeValue: '全部',
      sortValue: '',
      // problem card section
      problemSectionLoading: false,
      problemData: [],
    }
  },
  computed: {
    problemsFiltered() {
      let problemData = this.problemData;

      // 過濾輸入題目名稱
      if (this.nameFilterValue == '' ) {
        // pass
      } else {
        let filteredTable = [];
        for (let i = 0; i < problemData.length; i++) {
          if (problemData[i].name.includes(this.nameFilterValue)) {
            filteredTable.push(problemData[i]);
          }
        }
        return filteredTable; // 題目名稱的過濾最優先return
      }

      // TODO: 過濾tag
      if (this.problemTagValue.length==0) {
        // pass
      } else {
        for (let i=0; i<problemData.length; i++) {
          // or關係
          let filteredTable = [];
          let theSet = new Set(problemData[i].tag); // 此題tag的set
          let intersect = this.problemTagValue.filter(x => theSet.has(x)); // problemTagValue與theSet的交集
          if (intersect.length > 0) {
            filteredTable.push(problemData[i]);
          }
        }
        this.problemData = filteredTable;
      }

      // 過濾題目類型(type)
      if (this.typeValue == '全部') {
        // pass
      } else {
        let templist = [];
        problemData.forEach((item) => {
          if (item.type == this.typeValue) templist.push(item);
        });
        problemData = templist;
      }

      // 過濾排序方式
      if (this.sortValue == '') {
        // pass
      } else if (this.sortValue == '難易度') {
        let rateList = problemData.sort((a, b) => {
          return a.rate > b.rate ? 1 : -1;
        });
        problemData = rateList;
      } else if (this.sortValue == '繳交日期') {
        let deadlineList = problemData.sort((a, b) => {
          return (Date.parse(a.deadline)).valueOf() > (Date.parse(b.deadline)).valueOf() ? 1 : -1;
        });
        problemData = rateList;
      }
          
      return problemData;
    },
    todayDate() {
      return DateUtil.getTodayDate()
    },
  },
  methods: {
    getProblemData() {
      this.problemSectionLoading = true;

      let isJudge = false;
      if (this.modeValue == 'undo') {
        isJudge = false;
      } else if (this.modeValue == 'done') {
        isJudge = true;
      }
      
      apiProblemInfo({
        courseId: this.$store.state.course.courseInfo.courseId,
        type: this.typeValue,
        isJudge: isJudge
      }).then((response) => {
        let res = response.data;
        if (res.status=='200') {
          this.problemSectionLoading = false;
          this.problemData = res.result;
        }
      });
    },
    // header mode
    changeMode() {
      this.getProblemData();
    },
    // filter-section
    leaveTransition(el, done) { // leave transition
      done();
    },
    showFilterSection() {
      this.isFilterShow = !this.isFilterShow;
    },
    // problem card section
    dateDiff(sDate1, sDate2) { // 兩日期天數差
      return DateUtil.dateDiff(sDate1, sDate2)
    },
    deadlineParse(deadline) { // 把deadline+1天
      return DateUtil.nextDayDate(deadline)
    },
    // go to problem
    doProblem(problemId) {
      this.$router.push('/student/'+ this.$store.state.course.courseInfo.courseName +'/coding?problemId=' + problemId);
    },
  }
}
</script>


<style lang="scss">
/* header */
#studentIndex-section .header {
  padding: 20px;
  padding-bottom: 0px;

  .course-name {
    font-size: 30px;
    color: #3F51B5;
  }

  .left-action-bar {
    height: 60px;

    .el-select {
      width: 110px;
      margin-right: 20px;

      .el-input { 
        font-size: 25px;
      }

      .el-input__inner {
        border: rgba(0,0,0,0);
        background-color: rgba(0,0,0,0);
        color: #1565C0;
        padding-left: 0px;
      }
    }

    .filterInput {
      width: 250px;
      
      .el-input__inner {
        border: rgba(0,0,0,0);
        background-color: #EFF0F3;
        color: #909399;
      }
    }
  }

  .filter-section {
    background-color: white;
    border-radius: 5px;
    margin-bottom: 18px;

    .item {
      padding-top: 20px;
      padding-left: 20px;
      padding-bottom: 20px;

      .item-title {
        display:block;
        font-size:14px;
        color:#909399;
        margin-bottom: 10px;
      }
    }
  }

}

/* mainProblems-section */
#studentIndex-section .problem-card-section {
  .el-col {
    padding-bottom: 30px;
  }

  .count-label {
    color: #909399;
    height: 52px;
    padding-left: 20px !important;
    padding-bottom: 0px;
    line-height: 52px;
  }

  .el-loading-mask {
    background-color: rgba(0, 0, 0, 0);
  }

  .problem-card {
    a {
      min-height: 200px;
      text-decoration: none;
    }

    .card {
      height: 11vw;
      position: relative;
      transition: all ease 0.3s;
    }

    .tag {
      height: 16px;
      line-height: 16px;
      padding: 0 3px;
      font-size: 10px;
      margin-left: 5px;
    }

    .rate .el-rate__item i {
      font-size: 20px;
    }

    .problem-name {
      font-size: 17px;
      height: 25px;
      line-height: 25px;
      display: block;
      margin-bottom: 10px;
      text-decoration: none;
      outline: none;
    }

    .time {
      position: absolute;
      right: 15px;
      bottom: 19px;
      color: #888888;
      font-size: 12px;
    }

    .type {
      position: absolute;
      bottom: 19px;
      left: 20px;
      color: #888888;
      font-size: 13px;
    }

    .vuejs-countdown {
      position: absolute;
      bottom: 10px;
      right: 15px;

      li::after {
        font-size: 10px !important;
        color: #F56C6C;
        margin-right: 0px;
      }

      p.digit {
        font-size: 10px;
        color: #F56C6C;
      }

      p.text {
        font-size: 10px;
        color: #F56C6C;
        transform: scale(.7);
      }
    }
  }
}

#studentIndex-section .none-problem {
  height: 100%;
  padding: 0px;
  margin: 0px;
  font-size: 25px;
  color: #909399;
  display:flex;
  flex-direction: column;
  justify-content: center;
  
  p {
    text-align: center;
  }
}

</style>
<template>
<div>
  <el-row id="courseList-section">
    <el-col :span="20" :offset="2" v-for="course in data" :key="course.id" style="padding-bottom: 30px;">
      <a href="javascript:void(0);" @click="goCourse(course.courseName)" style="text-decoration: none;">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span style="font-size: 20px;"> {{course.courseName}} </span>
          </div>
          <div style="padding: 5px;">
            <span v-if="$store.state.user.userInfo.authority=='student'" style="padding-bottom: 5px;">Teacher：{{course.teacherName}} </span>
            <div class="bottom clearfix">
              <time class="semester"> {{course.semester}} </time>
              <el-button type="text" class="button">
                前往課程<i class="el-icon-caret-right"></i>
              </el-button>
            </div>
          </div>
        </el-card>
      </a>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  components: {},
  props: ['data'],
  data() {
    return {}
  },
  methods: {
    goCourse(courseName) {
      this.data.forEach((element) => {
        if(element.courseName == courseName) {
          this.$store.commit('initCourseInfo', element);
        }
      });

      this.$router.push('/'+this.$store.state.user.userInfo.authority+'/'+ courseName +'/index');
    }
  }
}
</script>

<style scoped>
#courseList-section .el-card {
  /* height: 130px; */
  height: 12vw;
  position: relative;
  transition: all ease 0.3s;
}

#courseList-section .el-card .title {
  height: 22px;
  line-height: 22px;
  display: block;
  margin-bottom: 15px;
  text-decoration: none;
  outline: none;
}

#courseList-section .el-card .semester {
  font-size: 13px;
  color: #999;
}

#courseList-section .el-card button {
  position: absolute;
  bottom: 5px;
  right: 15px;
}

#courseList-section .el-card .type {
  position: absolute;
  bottom: 19px;
  left: 20px;
  color: #888888;
  font-size: 10px;
}

#courseList-section .el-card .button a {
  text-decoration: none;
  color: #409EFF;
}
</style>
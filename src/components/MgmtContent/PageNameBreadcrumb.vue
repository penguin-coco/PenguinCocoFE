<template>
<div>
  <el-row class="penguin-backstage-header">
    <span class="backstage-title">{{ pageName }}</span>
    <div class="backstage-breadcrumb" v-if="isBreadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/'+ this.$store.state.user.userInfo.authority +'/'+ this.$store.state.course.courseInfo.courseName +'/index' }">{{this.$store.state.course.courseInfo.courseName}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ pageName }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </el-row>
</div>
</template>

<script>
export default {
  components: {},
  props: {
    pageName: '',
    isBreadcrumb: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  }
}
</script>
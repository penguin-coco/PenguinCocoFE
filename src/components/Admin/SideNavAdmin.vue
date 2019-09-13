<template>
<div>
  <el-menu :default-active="$route.path" style="height: calc(100vh - 60px); overflow: initial;" router>
    <el-menu-item-group>
      <template slot="title">新增名單</template>
      <el-menu-item :index="addTeacherList">
        <i class="el-icon-s-custom"></i>
        <span slot="title">新增老師</span>
      </el-menu-item>
      <el-menu-item :index="addTAList">
        <i class="el-icon-lollipop"></i>
        <span slot="title">新增助教</span>
      </el-menu-item>
      <el-menu-item :index="classList">
        <i class="el-icon-sugar"></i>
        <span slot="title">新增學生</span>
      </el-menu-item>
    </el-menu-item-group>

    <el-menu-item-group>
      <template slot="title">課程資訊</template>
      <el-menu-item :index="courseInfo">
        <i class="el-icon-orange"></i>
        <span slot="title">開課資訊</span>
      </el-menu-item>
    </el-menu-item-group>
  </el-menu>
</div>
</template>

<script>
import {apiAddFeedback} from '@/apis/feedback.js'

import RankDialog from '@/components/MgmtContent/RankDialog'

export default {
  components: {
    RankDialog
  },
  data() {
    return {
      addTeacherList: '/admin/addTeacherList',
      addTAList: '/admin/addTAList',
      classList: '/admin/classList',
      courseInfo: '/admin/courseInfo'
    }
  },
  methods: {
   
  }
}
</script>
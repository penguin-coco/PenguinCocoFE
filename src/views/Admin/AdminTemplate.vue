<template>
<div>
<el-container>
  <el-header>
    <nav-header-admin></nav-header-admin>
  </el-header>

  <el-container>
    <el-aside width="200px">
      <side-nav-admin></side-nav-admin>
    </el-aside>
  </el-container>

  <el-container>

    <el-footer></el-footer>
  </el-container>
</el-container>
</div>
</template>

<script>
import NavHeaderAdmin from '@/components/Admin/NavHeaderAdmin.vue'
import SideNavAdmin from '@/components/Admin/SideNavAdmin.vue'

export default {
  components: {
    NavHeaderAdmin,
    SideNavAdmin
  },
  data() {
    return {}
  }
}
</script>
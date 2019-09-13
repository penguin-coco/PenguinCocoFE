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
    <el-container class="main-container">
      <el-main>
        <page-name-breadcrumb pageName="新增老師名單" :isBreadcrumb="false"></page-name-breadcrumb>
        <admin-add-list-section mode="teacher"></admin-add-list-section>
        <nav-footer></nav-footer>
      </el-main>
    </el-container>
  </el-container>

</el-container>
</div>
</template>

<script>
import NavHeaderAdmin from '@/components/Admin/NavHeaderAdmin.vue'
import SideNavAdmin from '@/components/Admin/SideNavAdmin.vue'
import PageNameBreadcrumb from '@/components/MgmtContent/PageNameBreadcrumb'
import AdminAddListSection from '@/components/Admin/AdminAddListSection.vue'
import NavFooter from '@/components/NavFooter'

export default {
  components: {
    NavHeaderAdmin,
    SideNavAdmin,
    PageNameBreadcrumb,
    AdminAddListSection,
    NavFooter
  },
  data() {
    return {}
  }
}
</script>
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
        <!-- breadcrumb start -->
        <el-row class="penguin-backstage-header">
          <span class="backstage-title">新增學生名單</span>
          <div class="backstage-breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/admin/classList' }">新增學生名單</el-breadcrumb-item>
              <el-breadcrumb-item>{{ className }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-row>
        <!-- breadcrumb end -->
        <admin-add-list-section mode="student"></admin-add-list-section>
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
    return {
      className: this.$route.query.className
    }
  }
}
</script>
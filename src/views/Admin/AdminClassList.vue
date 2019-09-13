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
        <page-name-breadcrumb pageName="新增學生名單" :isBreadcrumb="false"></page-name-breadcrumb>
        
        <div class="penguin-box border-radius-none">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-row>
                <el-col><el-button type="warning" round icon="el-icon-plus" size="medium" @click="newClass">新增班級</el-button></el-col>
              </el-row>

              <el-row class="mt-6" :gutter="20">
                <el-col :span="6" v-for="item in classList" :key="item.className" >
                  <a href="javascript:void(0);" @click="goAddStudentList(item.className)" style="text-decoration:none;">
                    <el-card class="class-card" shadow="hover">
                      <div class="p-1">
                        <span class="class-name">{{ item.className }}</span>
                        <div class="class-stud-num">
                          <span class="text">班級人數</span>
                          <span class="num">{{ item.classSize }}</span>
                          <span class="text">人</span>
                        </div>
                      </div>
                    </el-card>
                  </a>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>

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
      classList: [{
        className: '108資處',
        classSize: 12
      }]
    }
  },
  methods: {
    newClass() {
      this.$prompt('班級名稱', '新增班級', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        // TODO: api new class

        this.$message({
          type: 'success',
          message: value + ' 班級新增成功！'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消輸入'
        });       
      });
    },
    goAddStudentList(className) {
      this.$store.commit('setSelectedClass', className);
      this.$router.push({path:'/admin/addStudentList', query: { className }});
    },
  }
}
</script>


<style lang="scss">
  .class-card {
    margin-bottom: 30px;

    &:hover {
      cursor: pointer;
    }

    .class-name {
      display: inline-block;
      font-size: 20px;
    }

    .class-stud-num {
      margin-top: 10px;

      .text {
        font-size: 12px;
        margin-right: 10px;
        color: #909399;
      }

      .num {
        margin-right: 5px;
      }
    }
  }
</style>

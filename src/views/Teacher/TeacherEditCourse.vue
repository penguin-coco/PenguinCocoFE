<template>
<div>
  <el-container>
    <el-header>
      <nav-header-teacher></nav-header-teacher>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <side-nav-course-list-teacher></side-nav-course-list-teacher>
      </el-aside>
      <!-- 編輯課程 -->
      <el-container class="main-container">
        <el-main>
          <page-name-breadcrumb pageName="編輯課程" :isBreadcrumb="false"></page-name-breadcrumb>
          <el-row class="box-square" id="teacherEditCourse-section">
            <el-col :span="12" :key="item.courseId" style="padding-right: 23px; padding-bottom: 30px;" v-for="item in courseList">
              <el-card class="box-card" shadow="hover">
                <div slot="header" class="clearfix">
                  <span class="title">{{ item.courseName }}</span>
                  <span class="courseId">
                    <span class="id">課程ID</span>{{ item.courseId }}
                  </span>
                  <el-button type="text" class="edit-button" @click="editCourse(item)">
                    編輯課程<i class="el-icon-edit"></i>
                  </el-button>
                  <el-button type="text" class="del-button" @click="delCourse(item.courseId)">
                    刪除課程<i class="el-icon-close"></i>
                  </el-button>
                </div>
                <div class="text item marbtm">
                  <span class="item-title">課程學期(semester)</span>
                  <span class="item-content">{{ item.semester }}</span>
                </div>
                <div class="text item marbtm">
                  <el-row>
                    <el-col :md="3">
                      <span class="item-title">班級(class)</span>
                    </el-col>
                    <el-col :md="18" style="overflow-x: scroll;">
                      <el-tag v-for="clas in item.class" :key="clas" style="height: 25px; line-height: 25px; margin-bottom:8px; z-index:1px; margin-right: 8px;">{{ clas }}</el-tag>
                    </el-col>
                  </el-row>
                </div>
                <div class="text item">
                  <span class="item-title">助教(TA)</span>
                  <span class="item-content" v-for="ta in item.taList" :key="ta" style="margin-right:10px;">{{ ta.assistantName }}</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-main>
        <el-footer>
          <nav-footer></nav-footer>
        </el-footer>

        <!-- edit course dialog start -->
        <el-dialog title="編輯課程" :visible.sync="editCourseDialogVisible" id="editCourseDialog" @close="cancelEdit">
          <el-form ref="form" :model="editCourseForm" label-width="80px" style="padding-bottom:25px;">
            <el-form-item label="課程名稱">
              <el-input v-model="editCourseForm.courseName" style="width: 90%;"></el-input>
            </el-form-item>
            <el-form-item label="課程名稱">
              <el-input v-model="editCourseForm.semester" style="width: 90%;"></el-input>
            </el-form-item>
            <el-form-item label="助教名單">
              <el-transfer
                filterable
                :titles="['未加入助教', '已加入助教']"
                filter-placeholder="請輸入助教名稱"
                v-model="editCourseForm.taList"
                :data="allTaList"
                @change="handleChange">
              </el-transfer>
            </el-form-item>
            <el-form-item>
              <el-button class="func-btn" type="danger" @click="cancelEdit">取消</el-button>
              <el-button class="func-btn" type="primary" style="margin-right: 20px;" @click="summitEdit">確定</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!-- edit course dialog start -->
      </el-container>
    </el-container>
  </el-container>
</div>
</template>

<script>
import {teacherCheckLogin} from '@/apis/_checkLogin.js'
import {apiTrCourseList, apiAssistantList} from '@/apis/teacher.js'
import {apiEditCourse, apiDelCourse} from '@/apis/course.js'

import NavHeaderTeacher from '@/components/Teacher/NavHeaderTeacher'
import SideNavCourseListTeacher from '@/components/Teacher/SideNavCourseListTeacher'
import PageNameBreadcrumb from '@/components/MgmtContent/PageNameBreadcrumb'
import NavFooter from '@/components/NavFooter'

export default {
  components: {
    NavHeaderTeacher,
    SideNavCourseListTeacher,
    PageNameBreadcrumb,
    NavFooter
  },
  data() {
    return {
      courseList: [], // 所有課程
      // editCourse Dialog
      editCourseDialogVisible: false,
      editCourseForm: {
        courseId: '',
        courseName: '',
        semester: '',
        taList: []
      },
      allTaList: []
    }
  },
  mounted() {
    teacherCheckLogin();
    this.getCourseList();
  },
  methods: {
    getCourseList() {
      apiTrCourseList().then((response) => {
        let res = response.data;
        if (res.status == '200') {
          this.courseList = res.result;
        }
      });
    },
    getAllTaList() { // 取得未被指派的助教名單
    apiAssistantList().then((response) => {
        let res = response.data;
        if (res.status=='200') {
          res.result.forEach((ta) => {
            let obj = {
              label: ta.assistantName,
              key: ta.assistantId
            }
            this.allTaList.push(obj);
          });
        }
      });
    },
    // editCourse
    editCourse(item) {
      this.getAllTaList();

      let taListJustId = [];
      item.taList.forEach((ta) => {
        taListJustId.push(ta.assistantId);
      });

      this.editCourseForm = {
        courseId: item.courseId,
        courseName: item.courseName,
        semester: item.semester,
        taList: taListJustId
      }

      this.editCourseDialogVisible = true;
    },
    summitEdit() {
      apiEditCourse({
        courseId: this.editCourseForm.courseId,
        courseName: this.editCourseForm.courseName,
        semester: this.editCourseForm.semester,
        taList: this.editCourseForm.taList
      }).then((response) => {
        let res = response.data;
        if (res.status == '200') {
          this.$message({
            type: 'success',
            message: '編輯成功!'
          });
          this.editCourseDialogVisible = false;
          this.getCourseList();
        }
      });
    },
    handleChange() {
      console.log(this.editCourseForm.taList);
    },
    cancelEdit() {
      this.editCourseDialogVisible = false;

      this.editCourseForm = {
        courseId: '',
        courseName: '',
        semester: '',
        taList: []
      }
      this.allTaList = [];
    },
    // delCourse
    delCourse(courseId) {
      this.$confirm('確認是否要刪除課程', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        apiDelCourse({
          courseId: courseId
        }).then((response) => {
          let res = response.data;
          if (res.status == '200') {
            this.getCourseList();
            this.$message({
              type: 'success',
              message: '刪除成功!'
            });
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  }
}
</script>

<style>
#teacherEditCourse-section .el-card {
  position: relative;
}

#teacherEditCourse-section .el-card .courseId {
  margin-right: 5px;
  position: absolute;
  right: 13px;
  top: 23px;
  color: #303133;
}

#teacherEditCourse-section .el-card .courseId .id {
  font-size: 13px;
  padding-right: 5px;
  color: #909399;
}

#teacherEditCourse-section .el-card .title {
  font-size: 20px;
  color: #303133;
}

#teacherEditCourse-section .el-card .marbtm {
  margin-bottom: 10px;
}

#teacherEditCourse-section .el-card .edit-button {
  position: absolute;
  bottom: 43px;
  right: 15px;
  z-index: 100;
}

#teacherEditCourse-section .el-card .del-button {
  color: #F56C6C;
  position: absolute;
  bottom: 10px;
  right: 15px;
}

#teacherEditCourse-section .el-card .item .item-title {
  margin-right: 10px;
  color: #909399;
  font-size: 15px;
  font-weight: 200;
}

#teacherEditCourse-section .el-card .item .item-content {
  color: #303133;
  overflow: scroll;
}

#teacherEditCourse-section .el-card .el-tag {
  display: inline;
}

/* editCourseDialog */

#editCourseDialog .el-transfer {
  padding-top: 10px;
}

#editCourseDialog .el-transfer .el-transfer__buttons {
  padding: 0 20px;
}

#editCourseDialog .func-btn {
  float: right;
  margin-right: 43px;
}

#editCourseDialog .el-form-item__label {
  margin-right:10px;
}

</style>

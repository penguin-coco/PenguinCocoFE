<template>
<div>
  <el-row style="background-color: #0E182F; height:100vh; overflow:auto;">
    <header id="version-header">
      <div class="logo">
        <img src="/static/logo/penguin-edge.png">
        <span class="fs-20 text-white ml-4">版本紀錄</span>
      </div>
    </header>
    <el-col class="mb-5" :span="16" :offset="4">
      <el-timeline id="version-timeline">
        <el-timeline-item v-for="item in versions" :key="item.timestamp" :timestamp="item.timestamp" placement="top">
          <el-card class="mt-4">
            <el-tag type="primary" effect="dark" size="small">{{ item.tag }}</el-tag>
            <vue-markdown class="pb-1" :source="item.content"></vue-markdown>
          </el-card>
        </el-timeline-item>
      </el-timeline>

      <footer class="text-center width-100 text-white">
        <p>penguin coco</p>
      </footer>
    </el-col>
  </el-row>
</div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    VueMarkdown
  },
  data() {
    return {
      versions: [{
        timestamp: '2019/8/16',
        tag: 'v 1.0.0',
        content: `## Penguin Coco 誕生
R.I.P CSIM OJ`
      }, {
        timestamp: '2019/8/22',
        tag: 'v 1.0.1',
        content: `## Penguin內部重整
* 修正
  1. 重構程式碼
* 待更新
  1. 老師評論討論題功能預先設計`
      }, {
        timestamp: '2019/8/23',
        tag: 'v 1.0.2',
        content: `## Penguin Coco 新UI 全新登場！
* 新增
  1. UI/UX全面重新設計
  2. APIs 統一管理
  3. scss 管理頁面style
  4. StudentCoding：此題作答狀況使用fixed btn呈現 pie chart
* 待更新
  1. 權限處理
  2. 討論題：老師評分學生程式碼
  3. 新增學生：完善excel匯入學生部分`
      }, {
        timestamp: '2019/8/26',
        tag: 'v 1.0.3',
        content: `## 更安全、更強大
* 新增
  1. 權限控制 & 登入超時處理
  2. 學生首頁：題目tag filter功能開放
  3. 老師、助教透過csv匯入學生功能
  4. 討論題：老師評論學生功能`
      }]
    }
  }
}
</script>

<style lang="scss">
#version-header {
  margin-bottom: 30px;

  .logo {
    margin-top: 50px;
    margin-left: 6%;
    border-right: none;
  }

  img {
    margin-top: 8px;
    width: 135px;
  }
}

#version-timeline .el-timeline-item__timestamp {
  color: white;
  font-size: 15px;
}
</style>
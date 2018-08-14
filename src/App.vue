<template>
  <div id="app">
    <!-- 整体容器 -->
    <el-container style="height: 100%; border: 1px solid #eee">
      <!-- 左侧菜单栏 -->
      <el-aside width="200px" height="700px" style="background-color: rgb(238, 241, 246)">
        <NavMenu/>
      </el-aside>
      <!-- 右侧容器 -->
      <el-container>
        <!-- 顶部内容 -->
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>
        <!-- 主体内容 -->
        <el-main>
          <CacheFlush/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import NavMenu from './components/NavMenu.vue'
  import CacheFlush from './components/CacheFlush.vue'

  export default {
    name: 'app',
    components: {
      NavMenu,
      CacheFlush
    },
    data() {

    }
  }
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>

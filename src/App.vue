<template>
  <div id="app">
    <!-- 整体容器 -->
    <el-container style="height: 100%; border: 1px solid #eee">
      <!-- 左侧菜单栏 -->
      <el-aside width="200px" style="height: 900px;background-color: white;">
        <nav-menu @listenMenuChange="updateMainComponent"/>
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
          <div v-if="menuId == 'orderverMock'">
            <orderver-mock/>
          </div>
          <div v-else-if="menuId == 'queryRedisCache'">
            <query-redis-cache/>
          </div>
          <div v-else-if="menuId == 'promiseCache'">
            <cache-flush/>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  /*左侧菜单栏*/
  import navMenu from './components/NavMenu.vue'
  /*订单中间件mock数据*/
  import orderverMock from './components/OrderverMock'
  import CacheFlush from './components/CacheFlush.vue'
  import queryRedisCache from './components/QueryRedisCache'

  export default {
    name: 'app',
    components: {
      navMenu,
      CacheFlush,
      orderverMock,
      queryRedisCache
    },
    data() {
      return {
        menuId: '',
      }
    },
    methods: {
      /*根据菜单选中显示不同的component*/
      updateMainComponent(menuId) {
        this.menuId = menuId;
      }
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

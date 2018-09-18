<template>
  <el-menu :default-openeds="['1']" :unique-opened=true>
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-message"></i>履约数据</template>
      <el-menu-item-group>
        <el-menu-item index="1-1" @click="switchMenu('orderverMock')">订单中间件mock</el-menu-item>
        <el-menu-item index="1-2" @click="switchMenu('queryRedisCache')">缓存查询</el-menu-item>
        <el-menu-item index="1-3" @click="switchMenu('promiseCache')">promise缓存</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-42">
        <template slot="title">选项2</template>
        <el-menu-item index="1-2-1">选项2-1</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-setting"></i>工具</template>
      <el-menu-item-group>
        <el-menu-item index="2-1" @click="switchMenu('sendpayTool')">Sendpay工具</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    name: "NavMenu",
    data() {
      return {}
    },
    methods: {
      switchMenu(menuId) {
        this.$emit("listenMenuChange", menuId);
      }
    },
  };
</script>

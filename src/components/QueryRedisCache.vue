<template>
  <div>
    <el-form :inline="true" v-model="redisInfo" class="demo-form-inline">
      <el-form-item label="缓存key">
        <el-input placeholder="请输入缓存key" v-model="redisInfo.key" clearable/>
      </el-form-item>
      <el-form-item label="缓存host">
        <el-select v-model="redisInfo.host" :key="host" filterable clearable placeholder="请选择">
          <el-option :label="'192.168.159.86'" :value="'192.168.159.86'"></el-option>
          <el-option :label="'192.168.101.66'" :value="'192.168.101.66'"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import ElFormItem from "element-ui/packages/form/src/form-item";
  import ElInput from "element-ui/packages/input/src/input";
  import ElButton from "element-ui/packages/button/src/button";
  import $ from 'jquery';

  export default {
    components: {
      ElButton,
      ElInput,
      ElFormItem
    },
    name: "QueryRedisCache",
    data() {
      return {
        redisInfo: {
          key: '',
          host: ''
        },
        orderverMockList: []
      }
    },
    mounted() {
    },
    methods: {
      // 查询
      onSubmit() {
        console.log(this.form.orderId);
        this.$ajax.post("/api/orderverMock/getOrderverMock.json", this.qs.stringify({
          orderId: this.form.orderId,
          groupName: this.form.groupName
        }))
          .then(res => {
            console.log(res);
            this.orderverMockList = res.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
    }
  };
</script>

<style>
  .createTime .updateTime {
    display: none;
  }

  .createUser:hover .createTime {
    display: block;
  }
  .updateUser:hover .updateTime {
    display: block;
  }
</style>

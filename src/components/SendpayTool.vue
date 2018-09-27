<template>
  <div>
    SendPay：
    <el-input placeholder="请输入sendpay" v-model="orgSendPay" clearable style="width: 50%"/>
    请输入要查看位数：
    <el-input placeholder="查看哪一位？" v-model="orgSendPay" clearable style="width: 20%"/>
  </div>
</template>

<script>
  import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";

  export default {
    components: {ElInput},
    name: "SendpayTool",
    data() {
      return {
        orgSendPay: ''
      }
    },
    mounted() {
    },
    methods: {
    }
  };
</script>

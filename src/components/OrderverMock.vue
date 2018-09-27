<template>
    <div>
        <el-form :inline="true" v-model="form" class="demo-form-inline">
            <el-form-item label="订单号">
                <el-input placeholder="请输入订单号" v-model="form.orderId" clearable/>
            </el-form-item>
            <el-form-item label="分组">
                <el-input placeholder="请输入所属分组" v-model="form.groupName" clearable/>
            </el-form-item>
            <el-form-item label="备注">
                <el-input placeholder="请输入备注关键词" v-model="form.comment" clearable/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            &nbsp;&nbsp;
            <el-button type="primary" icon="el-icon-plus" round @click="addDialog"/>
        </el-form>
        <el-table :data="orderverMockList">
            <el-table-column prop="orderId" label="订单号" width="140" align="center"/>
            <el-table-column prop="orderType" label="订单类型" width="60" align="center"/>
            <el-table-column label="配/仓" width="80" align="center">
                <template slot-scope="scope">
                    {{scope.row.dcId}}/{{scope.row.storeId}}
                </template>
            </el-table-column>
            <el-table-column label="四级地址" width="110" align="center">
                <template slot-scope="scope">
                    {{scope.row.provinceId}}/{{scope.row.cityId}}/{{scope.row.countyId}}/{{scope.row.townId}}
                </template>
            </el-table-column>
            <el-table-column label="是否预约" width="60" align="center">
                <template slot-scope="scope">
                    {{scope.row.sendPay.charAt(34) == 0 ? '否' : '是' }}({{scope.row.sendPay.charAt(34)}})
                </template>
            </el-table-column>
            <el-table-column prop="sendPay" label="sendPay" width="90" align="center" show-overflow-tooltip/>
            <el-table-column label="carXml" width="120" align="center">
                <template slot-scope="scope">
                    <el-button size="small" round @click="showOrderCarXml('carXml', scope.row)">查看/修改</el-button>
                </template>
            </el-table-column>
            <el-table-column label="orderXml" width="120" align="center">
                <template slot-scope="scope">
                    <el-button size="small" round @click="showOrderCarXml('orderXml', scope.row)">查看/修改</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="groupName" label="分组" width="90" align="center" show-overflow-tooltip/>
            <el-table-column prop="comment" label="备注" align="center" show-overflow-tooltip/>
            <el-table-column label="创建人" width="90" align="center" class="createUser">
                <template slot-scope="scope">
                    <span>{{scope.row.createUser}}</span>
                    <!--<span class="createTime">{{scope.row.createTime}}</span>-->
                </template>
            </el-table-column>
            <!--<el-table-column label="修改人" width="90" align="center">-->
            <!--<template slot-scope="scope">-->
            <!--{{scope.row.updateUser}}-->
            <!--<br/>-->
            <!--({{scope.row.updateTime}})-->
            <!--</template>-->
            <!--</el-table-column>-->
        </el-table>

        <!-- 新建 -->
        <el-dialog title="新增orderver Mock数据" :visible.sync="addDialogVisible">
            <el-form :model="addForm">
                <el-form-item label="orderXml">
                    <el-input v-model="addForm.orderXml" placeholder="请输入orderXml" type="textarea" :rows="2"/>
                </el-form-item>
                <el-form-item label="carXml" type="textarea" :rows="2">
                    <el-input v-model="addForm.carXml" placeholder="请输入carXml" type="textarea" :rows="2"/>
                </el-form-item>
                <el-form-item label="所属分组">
                    <el-input v-model="addForm.groupName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="功能描述">
                    <el-input v-model="addForm.comment" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addOrderverMock">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 查看orderXml 和 carXml -->
        <el-dialog :title="updateXmlTitle" :visible.sync="updateOrderXmlVisible">
            <el-form :model="updateForm">
                <el-form-item label="orderXml" v-if="xmlType == 'orderXml'">
                    <el-input v-model="updateForm.orderXml" placeholder="请输入orderXml" type="textarea" :rows="15"/>
                </el-form-item>
                <el-form-item label="carXml" v-else>
                    <el-input v-model="updateForm.carXml" placeholder="请输入carXml" type="textarea" :rows="15"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateOrderXmlVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateOrderverMock">确 定</el-button>
            </div>
        </el-dialog>
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
        name: "CacheFlush",
        data() {
            return {
                form: {
                    orderId: '',
                    groupName: '',
                    comment: ''
                },
                addForm: {
                    groupName: '',
                    orderXml: '',
                    carXml: '',
                    comment: ''
                },
                updateForm: {
                    orderId: '',
                    carXml: '',
                    orderXml: ''
                },
                orderverMockList: [],
                addDialogVisible: false, // 新增记录dialog
                xmlType: '',
                updateOrderXmlVisible: false, // carXml 和 orderXml 修改框
            }
        },
        computed: {
            updateXmlTitle: function () {
                return this.xmlType == "orderXml" ? "查看/修改OrderXml" : "查看/修改CarXml";
            }
        },
        mounted() {
        },
        methods: {
            // 查询
            onSubmit() {
                console.log(this.form.orderId);
                this.$ajax.post(this.api + "/orderverMock/getOrderverMock.json", {
                    orderId: this.form.orderId,
                    groupName: this.form.groupName,
                    comment: this.form.comment
                })
                    .then(res => {
                        console.log(res);
                        this.orderverMockList = res.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            addDialog() {
                this.addForm.groupName = '';
                this.addForm.orderXml = '';
                this.addForm.carXml = '';
                this.addForm.comment = '';
                this.addDialogVisible = true
            },
            // 新增记录
            addOrderverMock() {
                this.$ajax.post(this.api + "/orderverMock/addOrderverMock.json", {
                    groupName: this.addForm.groupName,
                    carXml: this.addForm.carXml,
                    orderXml: this.addForm.orderXml,
                    comment: this.addForm.comment
                })
                    .then(res => {
                        var result = res.data;
                        console.log(result);
                        if (result.resultCode == 200) {
                            this.addDialogVisible = false;
                            this.showMessage(true, "添加成功！");
                        } else {
                            this.showMessage(false, "添加失败！" + result.resultMessage);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        this.showMessage(false, "程序异常，请重试!");
                    });
            },
            // 新增记录
            updateOrderverMock() {
                this.$ajax.post(this.api + "/orderverMock/updateOrderverMock.json", {
                    orderId: this.updateForm.orderId,
                    carXml: this.updateForm.carXml,
                    orderXml: this.updateForm.orderXml,
                })
                    .then(res => {
                        var result = res.data;
                        console.log(result);
                        if (result.resultCode == 200) {
                            this.updateOrderXmlVisible = false;
                            this.showMessage(true, "修改成功！");
                        } else {
                            this.showMessage(false, "修改失败！" + result.resultMessage);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        this.showMessage(false, "程序异常，请重试!");
                    });
            },
            // 展示orderXml内容
            showOrderCarXml(type, row) {
                this.updateForm.orderId = row.orderId;
                this.updateForm.orderXml = row.orderXml;
                this.updateForm.carXml = row.carXml;
                this.xmlType = type;
                this.updateOrderXmlVisible = true; // 显示修改框
                console.log(this.updateForm.orderId);
            },
            //提示消息
            showMessage(isSuccess, message) {
                this.$alert(message, '提示', {
                    confirmButtonText: '确定',
                    type: isSuccess ? 'success' : 'warning',
                });
            }
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

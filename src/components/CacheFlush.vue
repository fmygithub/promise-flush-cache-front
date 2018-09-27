<template>
    <div>

        <el-form :inline="true" v-model="searchOption" class="demo-form-inline">
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                        <el-form-item label="请选择缓存类型">
                            <el-select v-model="searchOption.cacheType" :key="searchOption.cacheType" filterable
                                       @change="changeCacheType" clearable placeholder="--请选择--">
                                <el-option v-for="item in cacheTypeOptions"
                                           :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="请选择redis">
                            <el-select v-model="searchOption.redisHost" :key="searchOption.redisHost" filterable
                                       @change="changeCacheType" clearable placeholder="--请选择--">
                                <el-option v-for="item in redisHostOptions" :key="item.value"
                                           :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">刷新</el-button>
                        </el-form-item>
                    </div>
                    <hr/>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark" v-if="showMovementParam">
                        <el-form-item label="首物流节点">
                            <el-select v-model="searchOption.startNodeId" :key="searchOption.startNodeId" filterable
                                       clearable placeholder="--请选择--">
                                <el-option v-for="item in logisticsNodes" :key="item.id"
                                           :label="item.id + '-' + item.nodeName" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="末物流节点">
                            <el-select v-model="searchOption.endNodeId" :key="searchOption.endNodeId" filterable
                                       clearable placeholder="--请选择--">
                                <el-option v-for="item in logisticsNodes" :key="item.id"
                                           :label="item.id + '-' + item.nodeName" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="发车周期" v-if="showDepartCalendarParam">
                            <el-date-picker
                                v-model="searchOption.dateRange"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>

            <div v-if="showScheduleSendPayParam">
                <el-select v-model="provinceId" :key="provinceId"
                           filterable clearable placeholder="请选择" @change="getBaseAreaByParentId($event, 'province')">
                    <el-option
                        v-for="item in provinceOptions"
                        :key="item.area_id"
                        :label="item.area_id + '-' + item.area_name"
                        :value="item.area_id">
                    </el-option>
                </el-select>
                <el-select v-model="cityId" :key="cityId"
                           filterable clearable placeholder="请选择" @change="getBaseAreaByParentId($event, 'city')">
                    <el-option
                        v-for="item in cityOptions"
                        :key="item.area_id"
                        :label="item.area_id + '-' + item.area_name"
                        :value="item.area_id">
                    </el-option>
                </el-select>
                <el-select v-model="countyId" :key="countyId"
                           filterable clearable placeholder="请选择" @change="getBaseAreaByParentId($event, 'county')">
                    <el-option
                        v-for="item in countyOptions"
                        :key="item.area_id"
                        :label="item.area_id + '-' + item.area_name"
                        :value="item.area_id">
                    </el-option>
                </el-select>
                <el-select v-model="townId" :key="townId"
                           filterable clearable placeholder="请选择" @change="getBaseAreaByParentId($event, 'town')">
                    <el-option
                        v-for="item in townOptions"
                        :key="item.area_id"
                        :label="item.area_id + '-' + item.area_name"
                        :value="item.area_id">
                    </el-option>
                </el-select>
            </div>
        </el-form>
    </div>
</template>

<script>
    import ElFormItem from "element-ui/packages/form/src/form-item";
    import ElOption from "element-ui/packages/select/src/option";

    export default {
        components: {
            ElOption,
            ElFormItem},
        name: "CacheFlush",
        data() {
            return {
                cacheTypeOptions: [
                    {
                        value: 'movementCache',
                        label: 'movement缓存'
                    },
                    {
                        value: 'routeCache',
                        label: '干支线路由缓存'
                    },
                    {
                        value: 'departCalendarCache',
                        label: '发车日历缓存'
                    },
                    {
                        value: 'routeDetailCache',
                        label: '路由详情缓存'
                    }
                ],
                redisHostOptions: [
                    {
                        value: '192.168.159.86',
                        label: '192.168.159.86'
                    },
                    {
                        value: '192.168.101.66',
                        label: '192.168.101.66(自动化)'
                    },
                    {
                        value: '192.168.109.65',
                        label: '192.168.109.65'
                    }
                ],
                showScheduleSendPayParam: false,
                showMovementParam: false,
                showDepartCalendarParam: false,
                searchOption: {
                    cacheType: '',
                    redisHost: '',
                    startNodeId: '',
                    endNodeId: '',
                    dateRange: []
                },
                logisticsNodes: [],
                provinceOptions: [],
                cityOptions: [],
                countyOptions: [],
                townOptions: [],
                provinceId: '',
                cityId: '',
                countyId: '',
                townId: ''
            }
        },
        mounted() {
            this.getBaseAreaByParentId("0", "default");
            this.changeCacheType();
            this.getAllLogisticsNodes();
        },
        methods: {
            // 切换缓存类型
            changeCacheType() {
                this.showScheduleSendPayParam = false;
                this.showMovementParam = false;
                this.showDepartCalendarParam = false;
                if (this.searchOption.cacheType == 'movementCache') {
                    this.showMovementParam = true;
                } else if (this.searchOption.cacheType == 'routeCache') {
                    this.showMovementParam = true;
                } else if (this.searchOption.cacheType == 'departCalendarCache') {
                    this.showMovementParam = true;
                    this.showDepartCalendarParam = true;
                } else if (this.searchOption.cacheType == 'routeDetailCache') {
                    this.showMovementParam = true;
                    this.showDepartCalendarParam = true;
                }
            },
            // 查询所有的物流节点
            getAllLogisticsNodes() {
                this.$ajax.get(this.api + "/baseData/queryLogisticNode.json", {})
                    .then(res => {
                        console.log(res);
                        this.logisticsNodes = res.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            // 级联查询四级地址
            getBaseAreaByParentId(parentId, type) {
                if (parentId == '') return;
                this.$ajax.get(this.api + "/baseData/queryBaseArea.json", {
                    params: {
                        parentId: parentId
                    }
                })
                    .then(res => {
                        console.log(res);
                        switch (type) {
                            case "province":
                                this.cityOptions = res.data;
                                this.countyOptions = [];
                                this.townOptions = [];
                                this.cityId = '';
                                this.countyId = '';
                                this.townId = '';
                                break;
                            case "city":
                                this.countyOptions = res.data;
                                this.townOptions = [];
                                this.countyId = '';
                                this.townId = '';
                                break;
                            case "county":
                                this.townOptions = res.data;
                                this.townId = '';
                                break;
                            default:
                                this.provinceOptions = res.data;
                                this.cityId = '';
                                this.countyId = '';
                                this.townId = '';
                                break;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            onSubmit() {
                console.log(this.searchOption.dateRange);
            }
        },
        //刷新缓存
        submitFlushCache() {
            this.$ajax.post(this.api + "/baseData/getOrderverMock.json", {
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
        }
    };
</script>

<template>
  <div>
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
</template>

<script>
  export default {
    components: {},
    name: "CacheFlush",
    data() {
      return {
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
    },
    methods: {
      // 级联查询四级地址
      getBaseAreaByParentId(parentId, type) {
        if (parentId == '') return;
        this.$ajax.get("/api/baseData/queryBaseArea.json", {
            params: {
              parentId: parentId
            }
          })
          .then(res => {
            console.log(res);
            switch(type) {
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
    }
  };
</script>

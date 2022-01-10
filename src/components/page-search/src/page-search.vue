<template>
  <div class="page-search">
    <ly-from v-bind="SearchFromConfig" v-model="formData">
      <template #header>
        <h1 class="header">SpringBoot</h1>
      </template>
      <template #footer>
        <div class="btn">
          <el-button>
            <el-icon style="vertical-align: middle">
              <CircleClose />
            </el-icon>
            <span style="vertical-align: middle">重置</span>
          </el-button>
          <el-button type="primary">
            <el-icon style="vertical-align: middle">
              <Search />
            </el-icon>
            <span style="vertical-align: middle">搜索</span>
          </el-button>
        </div>
      </template>
    </ly-from>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LyFrom from '@/components/el-form'
import { CircleClose, Search } from '@element-plus/icons-vue'

export default defineComponent({
  props: {
    SearchFromConfig: {
      type: Object,
      require: true
    }
  },
  components: { LyFrom, CircleClose, Search },
  setup() {
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })
    return {
      formData
    }
  }
})
</script>

<style lang="less" scoped>
.page-search {
  background: white;
  padding: 10px 0;
  box-sizing: border-box;
  margin-top: 15px;
  .btn {
    padding-right: 12px;
    .el-button {
      height: 35px;
      padding: 5px 20px;
    }
  }
}
.header {
  color: rgb(100, 192, 210);
  font-size: 26px;
  text-align: center;
}
.btn {
  text-align: right;
}
</style>

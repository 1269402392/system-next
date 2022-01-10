<template>
  <div class="page-search">
    <ly-from v-model="formData" v-bind="SearchFromConfig">
      <template #header>
        <h1 class="header">SpringBoot</h1>
      </template>
      <template #footer>
        <div class="btn">
          <el-button @click="resetClick">
            <el-icon style="vertical-align: middle">
              <CircleClose />
            </el-icon>
            <span style="vertical-align: middle">重置</span>
          </el-button>
          <el-button type="primary" @click="queryClick">
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
  emits: ['handleReset', 'handleQuery'],
  setup(props, { emit }) {
    const formData: any = ref({})
    for (const item of props.SearchFromConfig?.formItems) {
      formData.value[`${item.field}`] = ''
    }

    const resetClick = () => {
      for (const item of props.SearchFromConfig?.formItems) {
        formData.value[`${item.field}`] = ''
      }
      emit('handleReset')
    }
    const queryClick = () => {
      emit('handleQuery', formData.value)
    }
    return {
      formData,
      resetClick,
      queryClick
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

<template>
  <div class="page-content">
    <div class="content">
      <Table
        :listData="dataList"
        v-model:pageInfo="pageInfo"
        :listCount="dataCount"
        v-bind="TableContentConfig"
        @selectionChange="selectionChange"
      >
        <template #header>
          <div class="header-box">
            <h4>{{ TableContentConfig.title }}</h4>
            <div class="btns">
              <el-button size="small">
                <el-icon><Refresh /></el-icon>
                <span>刷新</span>
              </el-button>
              <el-button size="small" type="success">新增用户</el-button>
            </div>
          </div>
        </template>
        <template #enable="scope">
          <el-tag size="small">
            {{ scope.row.enable === 1 ? '可用' : '禁用' }}
          </el-tag>
        </template>
        <template #createAt="scope">
          <strong>{{ $filter.formatTime(scope.row.createAt) }}</strong>
        </template>
        <template #updateAt="scope">
          <strong>{{ $filter.formatTime(scope.row.updateAt) }}</strong>
        </template>
        <template #handler>
          <div class="btns">
            <el-button size="mini">
              <el-icon><Edit /></el-icon>
              <span>修改</span>
            </el-button>
            <el-button size="mini" type="danger">
              <el-icon><Delete /></el-icon>
              <span>删除</span>
            </el-button>
          </div>
        </template>
      </Table>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { Delete, Edit, Refresh } from '@element-plus/icons-vue'
import { useStore } from '@/store'
import Table from '@/components/table/src/Table.vue'

export default defineComponent({
  name: 'page-content',
  props: {
    TableContentConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      require: true
    }
  },
  components: {
    Edit,
    Delete,
    Table,
    Refresh
  },
  setup(props) {
    const selectionChange = (value: any) => {
      console.log(value)
    }

    const pageInfo = ref({ currentPage: 1, pageSize: 3 })

    watch(pageInfo, () => getDataList(), {
      deep: true
    })

    const store = useStore()
    const getDataList = (queryInfo: any = {}) => {
      console.log('@@', queryInfo)
      store.dispatch('systemModule/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getDataList()

    const dataList = computed(() =>
      store.getters['systemModule/getDataList'](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters['systemModule/getListCount'](props.pageName)
    )
    return {
      selectionChange,
      getDataList,
      dataList,
      dataCount,
      pageInfo
    }
  }
})
</script>

<style lang="less" scoped>
.page-content {
  border-top: 10px solid rgba(233, 238, 243, 1);
  box-sizing: border-box;
  background: white;
  padding: 10px 0;
  margin-top: 10px;
  .content {
    padding: 10px;
  }
}
/deep/.el-table .el-table__cell {
  padding: 5px 0;
}

.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
</style>

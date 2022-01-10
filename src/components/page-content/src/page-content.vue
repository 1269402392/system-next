<template>
  <div class="page-content">
    <div class="content">
      <Table
        :listData="dataList"
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
            <el-button type="danger" size="mini">
              <el-icon><Delete /></el-icon>
              <span>删除</span>
            </el-button>
          </div>
        </template>
        <template #footer>
          <el-pagination
            class="pagination"
            v-model:currentPage="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </template>
      </Table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { Edit, Delete, Refresh } from '@element-plus/icons-vue'
import { useStore } from '@/store'
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
    Refresh
  },
  setup(props) {
    const selectionChange = (value: any) => {
      console.log(value)
    }

    const store = useStore()
    store.dispatch('systemModule/getPageListAction', {
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    const dataList = computed(() =>
      store.getters['systemModule/getDataList'](props.pageName)
    )

    return {
      selectionChange,
      dataList
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
.pagination {
  text-align: right;
  margin: 8px 0;
}

.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
</style>

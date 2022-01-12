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
        <!-- 头部插槽 -->
        <template #header>
          <div class="header-box">
            <h4>{{ TableContentConfig.title }}</h4>
            <div class="btns">
              <el-button size="small">
                <el-icon><Refresh /></el-icon>
                <span>刷新</span>
              </el-button>
              <el-button
                v-if="isCreate"
                size="small"
                type="success"
                @click="handleNewClick"
                >新增用户</el-button
              >
            </div>
          </div>
        </template>
        <!-- 指定插槽内容 -->
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

        <!-- 动态插槽 -->
        <template v-for="item in otherPropSlot" :key="item.prop" #[item.slotName]="scope">
          <slot :name="item.prop" :row="scope.row"></slot>
        </template>

        <!-- 操作列插槽 -->
        <template #handler="scope">
          <div class="btns">
            <el-button v-if="isUpdate" size="mini" @click="handleEditClick(scope.row)">
              <el-icon><Edit /></el-icon>
              <span>修改</span>
            </el-button>
            <el-button
              v-if="isDelete"
              size="mini"
              type="danger"
              @click="deleteClick(scope.row)"
            >
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
import { usePermission } from '@/hooks/usePermission'

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
  emits: ['handleEdit', 'handleNew'],
  setup(props, { emit }) {
    // 多选选择
    const selectionChange = (value: any) => {
      console.log(value)
    }
    // 创建分页信息
    const pageInfo = ref({ currentPage: 1, pageSize: 3 })

    watch(pageInfo, () => getDataList(), {
      deep: true
    })

    // 查找动态插槽(展示图片插槽等)
    const otherPropSlot = props.TableContentConfig?.propList.filter((item: any) => {
      return item.slotName === 'imgUrl'
    })

    // 从Vuex获取表格数据
    const dataList = computed(() =>
      store.getters['systemModule/getDataList'](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters['systemModule/getListCount'](props.pageName)
    )

    // 获取用户操作权限
    const isCreate = usePermission(props.pageName as string, 'create')
    const isUpdate = usePermission(props.pageName as string, 'update')
    const isDelete = usePermission(props.pageName as string, 'delete')
    const isQuery = usePermission(props.pageName as string, 'query')

    // 提交网络请求
    const store = useStore()
    const getDataList = (queryInfo: any = {}) => {
      if (!isQuery) return
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

    // 删除/修改/添加
    const deleteClick = ({ id }: any) => {
      store.dispatch('systemModule/deleteDataAction', {
        pageName: props.pageName,
        id: id
      })
    }
    const handleEditClick = (row: any) => {
      emit('handleEdit', row)
    }
    const handleNewClick = () => {
      emit('handleNew')
    }
    return {
      selectionChange,
      getDataList,
      deleteClick,
      handleNewClick,
      handleEditClick,
      dataList,
      dataCount,
      pageInfo,
      otherPropSlot,
      isCreate,
      isDelete,
      isUpdate
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

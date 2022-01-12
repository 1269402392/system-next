<template>
  <div class="table">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-table
      :border="true"
      :data="listData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="treeProps"
    >
      <el-table-column v-if="showSelectColumn" align="center" type="selection" width="60">
      </el-table-column>

      <el-table-column
        v-if="showIndexColumn"
        align="center"
        label="序号"
        type="index"
        width="70"
      ></el-table-column>

      <template v-for="(propItem, index) in propList" :key="index">
        <el-table-column :align="'center'" show-overflow-tooltip v-bind="propItem">
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <div v-if="showFooter" class="footer">
      <slot name="footer">
        <el-pagination
          v-model:currentPage="currentPage"
          :page-size="pageInfo.pageSize"
          :page-sizes="[3, 5, 8]"
          :total="listCount"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { ITableType } from '../type'

export default defineComponent({
  name: 'Table',
  props: {
    listData: {
      type: Array,
      required: true
    },
    listCount: {
      type: Number,
      default: 0
    },
    pageInfo: {
      type: Object,
      default: () => ({ currentPage: 1, pageSize: 10 })
    },
    propList: {
      type: Array as PropType<ITableType[]>,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    treeProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectionChange', 'update:pageInfo'],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }
    const currentPage = ref(0)
    const handleSizeChange = (pageSize: number) => {
      emit('update:pageInfo', { ...props.pageInfo, pageSize })
    }
    const handleCurrentChange = (currentPage: number) => {
      emit('update:pageInfo', { ...props.pageInfo, currentPage })
    }
    return {
      currentPage,
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style lang="less" scoped>
/deep/.el-tag {
  cursor: pointer;
}
.el-pagination {
  text-align: right;
  margin: 8px 0;
}
/deep/.el-tooltip {
}
</style>

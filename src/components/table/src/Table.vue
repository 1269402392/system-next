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
    >
      <el-table-column v-if="showSelectCloumn" align="center" type="selection" width="60">
      </el-table-column>
      <el-table-column
        v-if="showIndexCloumn"
        align="center"
        label="序号"
        type="index"
        width="70"
      ></el-table-column>
      <template v-for="(propItem, index) in propList" :key="index">
        <el-table-column :align="'center'" v-bind="propItem">
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ITableType } from '../type'

export default defineComponent({
  name: 'Table',
  props: {
    listData: {
      type: Array,
      required: true
    },
    propList: {
      type: Array as PropType<ITableType[]>,
      required: true
    },
    showIndexCloumn: {
      type: Boolean,
      default: false
    },
    showSelectCloumn: {
      type: Boolean,
      default: false
    }
  },
  emits: ['selectionChange'],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }
    return { handleSelectionChange }
  }
})
</script>

<style lang="less" scoped>
/deep/.el-tag {
  cursor: pointer;
}
</style>

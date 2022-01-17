<template>
  <div class="role">
    <page-search :SearchFromConfig="SearchFromConfig" />
    <page-content
      :TableContentConfig="TableContentConfig"
      pageName="role"
      @handleEdit="handleEdit"
      @handleNew="handleNew"
    />
    <page-modal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfig"
      :otherInfo="otherInfo"
      page-name="role"
    >
      <!--  向默认插槽插入树状图  -->
      <div class="menu-tree">
        <el-tree
          ref="treeRef"
          :data="menus"
          :props="{ children: 'children', label: 'name' }"
          node-key="id"
          show-checkbox
          :default-expanded-keys="defaultKeys"
          @check="treeNodeClick"
        ></el-tree>
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, nextTick } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import { ElTree } from 'element-plus'
import { SearchFromConfig } from './config/search.config'
import { TableContentConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageModal } from '@/hooks/usePageModal'

import { menuToKeys } from '@/utils/map-menus'

export default defineComponent({
  name: 'role',
  setup() {
    const treeRef = ref<InstanceType<typeof ElTree>>()
    const defaultKeys = ref([]) // 默认树节点展开的数组

    const store = useStore()
    const menus = computed(() => store.state.menuList)
    const editCbFn = (row: any) => {
      nextTick(() => {
        const keys: number[] = menuToKeys(row.menuList)
        treeRef.value?.setCheckedKeys(keys, false)
      })
    }
    const [pageModalRef, defaultInfo, handleEdit, handleNew] = usePageModal(
      undefined,
      editCbFn
    )
    // 收集树状图的节点信息传递给子组件进行上传
    const otherInfo = ref({})

    const treeNodeClick = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    return {
      TableContentConfig,
      SearchFromConfig,
      modalConfig,
      pageModalRef,
      defaultInfo,
      menus,
      otherInfo,
      treeRef,
      defaultKeys,
      handleEdit,
      handleNew,
      treeNodeClick
    }
  },
  components: {
    PageSearch,
    PageContent,
    PageModal
  }
})
</script>

<style lang="less" scoped>
.menu-tree {
  margin-left: 30px;
}
</style>

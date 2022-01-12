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
          :data="menus"
          :props="{ children: 'children', label: 'name' }"
          node-key="id"
          show-checkbox
          @check="treeNodeClick"
        ></el-tree>
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { SearchFromConfig } from './config/search.config'
import { TableContentConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageModal } from '@/hooks/usePageModal'

export default defineComponent({
  name: 'role',
  setup() {
    const store = useStore()
    const menus = computed(() => store.state.menuList)
    const [pageModalRef, defaultInfo, handleEdit, handleNew] = usePageModal()
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

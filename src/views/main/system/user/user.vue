<template>
  <div class="user">
    <page-search
      :SearchFromConfig="SearchFromConfig"
      @handleQuery="handleQuery"
      @handleReset="handleReset"
    />
    <page-content
      ref="contentRef"
      :TableContentConfig="TableContentConfig"
      pageName="users"
      @handleEdit="handleEdit"
      @handleNew="handleNew"
    />
    <page-modal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfigRef"
      pageName="users"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { SearchFromConfig } from './config/search.config'
import { TableContentConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import { usePageContent } from '@/hooks/usePageContent'
import { usePageModal } from '@/hooks/usePageModal'
import { useStore } from '@/store'

export default defineComponent({
  name: 'users',
  setup() {
    // 搜索hooks
    const [contentRef, handleQuery, handleReset] = usePageContent()

    // 是否显示密码输入框回调
    const newCbFn = () => {
      const formItem = modalConfig.formItems.find((item) => item.field === 'password')
      formItem!.isHidden = false
    }
    const editCbFn = () => {
      const formItem = modalConfig.formItems.find((item) => item.field === 'password')
      formItem!.isHidden = true
    }

    // 弹出框hooks
    const [pageModalRef, defaultInfo, handleEdit, handleNew] = usePageModal(
      newCbFn,
      editCbFn
    )

    // 对部门以及角色选择框赋值,使用computed对modalConfig进行监听,发生改变则重新执行函数
    const modalConfigRef = computed(() => {
      const store = useStore()
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.departmentList.map((item) => ({
        title: item.name,
        value: item.id
      }))

      const roleItem = modalConfig.formItems.find((item) => item.field === 'roleId')
      roleItem!.options = store.state.roleList.map((item) => ({
        title: item.name,
        value: item.id
      }))
      return modalConfig
    })

    return {
      SearchFromConfig,
      TableContentConfig,
      modalConfigRef,
      contentRef,
      pageModalRef,
      defaultInfo,
      handleReset,
      handleQuery,
      handleEdit,
      handleNew
    }
  },
  components: {
    PageSearch,
    PageContent,
    PageModal
  }
})
</script>

<style scoped></style>

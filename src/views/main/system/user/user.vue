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
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { SearchFromConfig } from './config/search.config'
import { TableContentConfig } from './config/content.config'
import { usePageContent } from '@/hooks/usePageContent'

export default defineComponent({
  name: 'users',
  setup: function () {
    const [contentRef, handleQuery, handleReset] = usePageContent()

    return {
      SearchFromConfig,
      TableContentConfig,
      contentRef,
      handleReset,
      handleQuery
    }
  },
  components: {
    PageSearch,
    PageContent
  }
})
</script>

<style scoped></style>

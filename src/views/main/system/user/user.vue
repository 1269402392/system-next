<template>
  <div class="user">
    <page-search :SearchFromConfig="SearchFromConfig" />
    <page-content pageName="users" :TableContentConfig="TableContentConfig" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { SearchFromConfig } from './config/search.config'
import { TableContentConfig } from './config/content.config'

export default defineComponent({
  name: 'users',
  setup() {
    const currentPage = ref(4)

    const handleSizeChange = (value: number) => {
      console.log(value)
    }
    const handleCurrentChange = (value: number) => {
      console.log(value)
    }
    return {
      SearchFromConfig,
      TableContentConfig,
      currentPage,
      handleSizeChange,
      handleCurrentChange
    }
  },
  components: {
    PageSearch,
    PageContent
  }
})
</script>

<style scoped></style>

<template>
  <div class="role">
    <page-search :SearchFromConfig="SearchFromConfig" />
    <page-content pageName="role" :TableContentConfig="TableContentConfig" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { SearchFromConfig } from './config/search.config'
import { TableContentConfig } from './config/content.config'
export default defineComponent({
  name: 'role',
  setup() {
    return {
      TableContentConfig,
      SearchFromConfig
    }
  },
  components: {
    PageSearch,
    PageContent
  }
})
</script>

<style scoped></style>

<template>
  <div class="menu">
    <page-content :TableContentConfig="TableContentConfig" pageName="menu" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageContent from '@/components/page-content'

import { TableContentConfig } from './config/content.config'

export default defineComponent({
  name: 'menu',
  setup() {
    return {
      TableContentConfig
    }
  },
  components: {
    PageContent
  }
})
</script>

<style scoped></style>

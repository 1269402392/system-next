<template>
  <div class="goods">
    <page-content :TableContentConfig="TableContentConfig" pageName="goods">
      <template #imgUrl="scope">
        <div class="demo-image__preview">
          <el-image
            :initial-index="1"
            :preview-src-list="[scope.row.imgUrl]"
            :src="scope.row.imgUrl"
            style="width: 80px"
          >
          </el-image>
        </div>
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageContent from '@/components/page-content'

import { TableContentConfig } from './config/content.config'
export default defineComponent({
  name: 'goods',
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

<style scoped>
.demo-image__preview {
  height: 75px;
}
</style>

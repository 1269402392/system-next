<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="(item, index) in breadcrumb" :key="index">
        <el-breadcrumb-item :to="{ path: item.path }">
          {{ item.title }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadcrumb } from '@/components/nav-breadcrumb/type'

export default defineComponent({
  name: 'el-breadcrumb',
  props: {
    breadcrumb: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped></style>

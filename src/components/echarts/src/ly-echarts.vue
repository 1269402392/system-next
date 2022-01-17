<template>
  <div class="ly-echarts">
    <div ref="echartsDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, withDefaults, defineProps, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import { useEcharts } from '@/hooks/useEcharts'

const echartsDivRef = ref<HTMLElement>()
const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)
onMounted(() => {
  const { setOptions } = useEcharts(echartsDivRef.value!)
  watchEffect(() => setOptions(props.options))
})
</script>

<style lang="less" scoped></style>

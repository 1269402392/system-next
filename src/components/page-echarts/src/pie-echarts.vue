<template>
  <div class="page-echarts">
    <ly-echarts :options="options" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import LyEcharts from '@/components/echarts'
import { IEchartsDataType } from '@/components/page-echarts/type'

export default defineComponent({
  name: 'page-echarts',
  props: {
    pieData: {
      type: Object as PropType<IEchartsDataType[]>,
      require: true
    }
  },
  setup(props) {
    const options = computed(() => ({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'horizontal',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: props.pieData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }))
    return {
      options
    }
  },
  components: {
    LyEcharts
  }
})
</script>

<style lang="less" scoped></style>

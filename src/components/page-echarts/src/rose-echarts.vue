<template>
  <div class="rose-echarts">
    <ly-echarts :options="options" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import lyEcharts from '@/components/echarts'
import { IEchartsDataType } from '@/components/page-echarts/type'

export default defineComponent({
  name: 'rose-echarts',
  props: {
    roseData: {
      type: Object as PropType<IEchartsDataType[]>,
      require: true
    }
  },
  setup(props) {
    const options = computed(() => ({
      legend: {
        orient: 'horizontal',
        left: 'left'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: '类别数据',
          type: 'pie',
          radius: [20, 90],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 5
          },
          data: props.roseData
        }
      ]
    }))
    return {
      options
    }
  },
  components: {
    lyEcharts
  }
})
</script>

<style lang="less" scoped></style>

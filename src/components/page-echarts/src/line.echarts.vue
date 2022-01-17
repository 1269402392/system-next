<template>
  <div class="line-echarts">
    <ly-echarts :options="options"></ly-echarts>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import lyEcharts from '@/components/echarts'
export default defineComponent({
  name: 'line-echarts',
  props: {
    xLabels: {
      type: Array,
      require: true
    },
    values: {
      type: Array,
      require: true
    }
  },
  setup(props) {
    console.log('line', props)

    const options = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: props.xLabels
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: props.values,
          type: 'line',
          areaStyle: {}
        }
      ]
    }
    return { options }
  },
  components: {
    lyEcharts
  }
})
</script>

<style lang="less" scoped></style>

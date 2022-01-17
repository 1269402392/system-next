<template>
  <div class="line-echarts">
    <ly-echarts :options="options" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LyEcharts from '@/components/echarts'
import * as echarts from 'echarts'
export default defineComponent({
  name: 'bar-echarts',
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
    const options = {
      xAxis: {
        data: props.xLabels,
        axisLabel: {
          inside: true,
          color: '#fff'
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        z: 10
      },
      yAxis: {
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#999'
        }
      },
      dataZoom: [
        {
          type: 'inside'
        }
      ],
      series: [
        {
          type: 'bar',
          showBackground: true,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ])
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' }
              ])
            }
          },
          data: props.values
        }
      ]
    }
    return { options, LyEcharts }
  }
})
</script>

<style lang="less" scoped></style>

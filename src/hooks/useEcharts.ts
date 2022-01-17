import * as echarts from 'echarts'

export function useEcharts(el: HTMLElement) {
  const echartsInstance = echarts.init(el)

  const setOptions = (options: echarts.EChartsOption) => {
    echartsInstance.setOption(options)
  }

  const setResize = () => {
    echartsInstance.resize()
  }

  window.addEventListener('resize', () => {
    echartsInstance.resize()
  })

  return {
    echartsInstance,
    setOptions,
    setResize
  }
}

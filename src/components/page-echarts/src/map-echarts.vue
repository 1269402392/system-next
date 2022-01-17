<template>
  <div class="map" ref="mapRef"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import axios from 'axios'
export default defineComponent({
  name: '',
  setup() {
    const mapRef = ref<HTMLElement>()

    onMounted(async () => {
      // 秋雁南飞：
      // 此版本通过设置geoindex && seriesIndex: [1] 属性来实现geo和map共存，来达到hover散点和区域显示tooltip的效果
      // 默认情况下，map series 会自己生成内部专用的 geo 组件。但是也可以用这个 geoIndex 指定一个 geo 组件。这样的话，map 和 其他 series（例如散点图）就可以共享一个 geo 组件了。并且，geo 组件的颜色也可以被这个 map series 控制，从而用 visualMap 来更改。
      // 当设定了 geoIndex 后，series-map.map 属性，以及 series-map.itemStyle 等样式配置不再起作用，而是采用 geo 中的相应属性。
      // http://echarts.baidu.com/option.html#series-map.geoIndex
      // 并且加了pin气泡图标以示数值大小
      // // 全局变量区:参考江西绿色金融（谢谢：本来想用闭包实现接口数据调用，没时间了）
      // 本图作者：参考秋雁南飞的《投票统计》一图，网址：http://gallery.echartsjs.com/editor.html?c=xrJU-aE-LG
      const chinaData = await axios.get('/map/china.json')
      const myChart = echarts.init(mapRef.value!)
      echarts.registerMap('china', chinaData.data)

      let mapName = 'china'
      let data = [
        { name: '北京', value: 177 },
        { name: '天津', value: 42 },
        { name: '河北', value: 102 },
        { name: '山西', value: 81 },
        { name: '内蒙古', value: 47 },
        { name: '辽宁', value: 67 },
        { name: '吉林', value: 82 },
        { name: '黑龙江', value: 66 },
        { name: '上海', value: 24 },
        { name: '江苏', value: 92 },
        { name: '浙江', value: 114 },
        { name: '安徽', value: 109 },
        { name: '福建', value: 116 },
        { name: '江西', value: 91 },
        { name: '山东', value: 119 },
        { name: '河南', value: 137 },
        { name: '湖北', value: 116 },
        { name: '湖南', value: 114 },
        { name: '重庆', value: 91 },
        { name: '四川', value: 125 },
        { name: '贵州', value: 62 },
        { name: '云南', value: 83 },
        { name: '西藏', value: 9 },
        { name: '陕西', value: 80 },
        { name: '甘肃', value: 56 },
        { name: '青海', value: 10 },
        { name: '宁夏', value: 18 },
        { name: '新疆', value: 67 },
        { name: '广东', value: 123 },
        { name: '广西', value: 59 },
        { name: '海南', value: 14 }
      ]
      let geoCoordMap: any = {}

      /*获取地图数据*/
      myChart.showLoading()
      let mapFeatures = echarts.getMap(mapName).geoJson.features
      myChart.hideLoading()
      mapFeatures.forEach(function (v: any) {
        // 地区名称
        let name = v.properties.name
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp
      })
      let max = 480,
        min = 9 // todo
      let maxSize4Pin = 100,
        minSize4Pin = 20
      let convertData = function (data: any) {
        let res = []
        for (let i = 0; i < data.length; i++) {
          let geoCoord = geoCoordMap[data[i].name]
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            })
          }
        }
        return res
      }
      const option = {
        tooltip: {
          trigger: 'item'
        },
        visualMap: {
          show: true,
          min: 0,
          max: 200,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true,
          seriesIndex: [1],
          inRange: {
            color: ['#00467F', '#A5CC82'] // 蓝绿
          }
        },

        geo: {
          type: 'map',
          show: true,
          map: 'china',
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#031525',
              borderColor: '#3B5077'
            },
            emphasis: {
              areaColor: '#2B91B7'
            }
          }
        },
        series: [
          {
            name: '散点',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data)
          },
          {
            type: 'map',
            map: mapName,
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#fff'
                }
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#3B5077'
              },
              emphasis: {
                areaColor: '#2B91B7'
              }
            },
            animation: false,
            data: data
          },
          {
            name: '点',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin', //气泡
            symbolSize: function (val: any) {
              let a = (maxSize4Pin - minSize4Pin) / (max - min)
              let b = minSize4Pin - a * min
              b = maxSize4Pin - a * max
              return a * val[2] + b
            },
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#fff',
                  fontSize: 9
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#F62157' //标志颜色
              }
            },
            zlevel: 6,
            data: convertData(data)
          }
        ]
      }
      myChart.setOption(option)
    })
    return {
      mapRef
    }
  }
})
</script>

<style lang="less" scoped>
.map {
  width: 500px;
  height: 350px;
}
</style>

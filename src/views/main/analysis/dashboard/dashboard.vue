<template>
  <div class="dashboard">
    <el-row :gutter="10" class="content-top">
      <el-col :span="7">
        <ly-card title="分类商品数量(饼图)">
          <pie-echarts :pieData="pieData" />
        </ly-card>
      </el-col>
      <el-col :span="10">
        <ly-card title="不同城市商品销量">
          <map-echarts />
        </ly-card>
      </el-col>
      <el-col :span="7">
        <ly-card title="分类商品数量(玫瑰图)">
          <rose-echarts :roseData="pieData" />
        </ly-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <ly-card title="分类商品的销量">
          <line-echarts v-bind="lineData" />
        </ly-card>
      </el-col>
      <el-col :span="12">
        <ly-card title="分类商品的收藏">
          <bar-echarts v-bind="barData" />
        </ly-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import LyCard from '@/components/ly-card'
import {
  PieEcharts,
  RoseEcharts,
  LineEcharts,
  BarEcharts,
  MapEcharts
} from '@/components/page-echarts'

export default defineComponent({
  name: 'dashboard',
  setup() {
    const store = useStore()
    store.dispatch('dashboardModule/getDashboardDataAction')
    // 获取饼图的数据
    const pieData = computed(() => {
      return store.state.dashboardModule.categoryGoodsCount.map((item) => ({
        name: item.name,
        value: item.goodsCount
      }))
    })
    // 获取分类商品的数据(折线图)
    const lineData = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []

      const categoryGoodsSale = store.state.dashboardModule.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }

      return {
        xLabels,
        values
      }
    })

    // 获取商品收藏的数据(柱状图)
    const barData = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []

      const categoryGoodsFaver = store.state.dashboardModule.categoryGoodsFavor
      for (const item of categoryGoodsFaver) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }

      return {
        xLabels,
        values
      }
    })

    return {
      pieData,
      lineData,
      barData,
      LineEcharts
    }
  },
  components: {
    LyCard,
    PieEcharts,
    RoseEcharts,
    LineEcharts,
    BarEcharts,
    MapEcharts
  }
})
</script>

<style scoped>
.content-top {
  margin: 10px 0;
}
</style>

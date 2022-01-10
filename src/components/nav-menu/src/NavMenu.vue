<template>
  <div class="nav-menu">
    <div class="logo">
      <img :class="{ logoSize: collapse }" src="~@/assets/img/logo.svg" />
      <span :class="{ titleLate: collapse }" class="title">故河十九年春</span>
    </div>
    <el-menu
      :collapse="collapse"
      :default-active="defaultValue"
      active-text-color="#0a60bd"
      background-color="#0c2135"
      class="el-menu-vertical"
      text-color="#b7bdc3"
      unique-opened
    >
      <template v-for="(item, index) in menus" :key="item.id">
        <!-- 二级菜单 -->
        <el-sub-menu :index="item.id + ''">
          <template #title>
            <el-icon>
              <component :is="icons[index]"> </component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="subitem in item.children"
            :key="subitem.id"
            :index="subitem.id + ''"
            @click="itemClick(subitem)"
          >
            <span>{{ subitem.name }}</span>
          </el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { Cpu, DataAnalysis, Eleme, Fries } from '@element-plus/icons-vue'
import router from '@/router'
import { pathMapToMenu } from '@/utils/map-menus'

export default defineComponent({
  name: 'NavMenu.vue',
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const menus = computed(() => store.state.loginModule.userMenus)
    const icons = ['cpu', 'dataAnalysis', 'eleme', 'fries']
    const itemClick = (item: any) => {
      router.push({
        path: item.url ?? '/not-found'
      })
    }
    const menu = pathMapToMenu(menus.value, route.path)
    const defaultValue = ref(menu.id + '')

    return {
      menus,
      icons,
      defaultValue,
      itemClick
    }
  },
  components: {
    Cpu,
    DataAnalysis,
    Eleme,
    Fries
  }
})
</script>

<style lang="less" scoped>
.logoSize {
  width: 123px;
  transition: all 0.8s;
}
.titleLate {
  //transform: translate(-50%, 0);
  right: 125px !important;
  width: 100px;
  display: none;
  transition: all 0.8s;
}
.nav-menu {
  .el-menu {
    border-right: none;
  }
  .is-active {
    background-color: rgba(19, 87, 177, 1);
    > span {
      color: white;
    }
  }
  .logo {
    position: relative;
    height: 60px;
    width: 100%;
    overflow: hidden;
    img {
      position: absolute;
      left: 20px;
      top: 10px;
    }
    .title {
      position: absolute;
      top: 20px;
      right: 25px;
      width: 100px;
      color: white;
    }
  }
}
</style>

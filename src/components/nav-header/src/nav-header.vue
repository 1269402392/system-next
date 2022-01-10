<template>
  <div class="header">
    <el-icon color="red" style="font-size: 25px" @click="handleFoldClick">
      <expand v-if="isFold" />
      <fold v-if="!isFold" />
    </el-icon>

    <div class="content">
      <nav-breadcrumb :breadcrumb="breadcrumb" />
      <nav-drop-down />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { Expand, Fold } from '@element-plus/icons-vue'
import NavDropDown from './user-info.vue'
import NavBreadcrumb from '@/components/nav-breadcrumb'
import { pathMapBreadcrumb } from '@/utils/map-menus'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'nav-header',

  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    const breadcrumb = computed(() => {
      const store = useStore()
      const menus = store.state.loginModule.userMenus
      const route = useRoute()
      return pathMapBreadcrumb(menus, route.path)
    })
    return { isFold, handleFoldClick, breadcrumb }
  },
  components: {
    Expand,
    Fold,
    NavDropDown,
    NavBreadcrumb
  }
})
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  .content {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding-left: 10px;
  }
}
.el-icon {
  cursor: pointer;
}
</style>

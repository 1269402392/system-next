<template>
  <div class="main">
    <el-container>
      <el-aside :width="collapse ? '65px' : '210px'">
        <nav-menu :collapse="collapse" />
      </el-aside>
      <el-container>
        <el-header>
          <nav-header @foldChange="foldChange" />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header'

export default defineComponent({
  name: 'Main',
  setup() {
    const collapse = ref(false)
    const foldChange = (isfFold: boolean) => {
      collapse.value = isfFold
    }
    return { foldChange, collapse }
  },
  components: {
    NavMenu,
    NavHeader
  }
})
</script>

<style lang="less" scoped>
.main {
  height: 100%;
}
.el-header,
.el-footer {
  background-color: rgba(255, 254, 255, 1);
  color: var(--el-text-color-primary);
  height: 50px;
  line-height: 60px;
}

.el-aside {
  background-color: rgba(4, 21, 37, 1);
  color: var(--el-text-color-primary);
  text-align: center;
  transition: width 0.8s;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  //overflow: hidden;
  padding: 0px 10px !important;
  height: 100%;
}

.el-container {
  margin-bottom: 40px;
  height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

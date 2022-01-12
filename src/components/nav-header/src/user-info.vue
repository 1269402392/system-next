<template>
  <div class="dropdown">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          :size="30"
          src="https://q.qlogo.cn/g?b=qq&nk=1269402392&s=100"
        ></el-avatar>
        <span>陆小本</span>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick">
            <el-icon><circle-close /></el-icon>
            <span>退出登陆</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-icon><user /></el-icon>
            <span>用户信息</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ArrowDown, CircleClose, User } from '@element-plus/icons-vue'
import localCache from '@/utils/cache'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'nav-dropdown.vue',
  setup() {
    const router = useRouter()
    const handleExitClick = () => {
      localCache.deleteCache('token')
      router.push('/main')
    }
    return {
      handleExitClick
    }
  },
  components: {
    ArrowDown,
    CircleClose,
    User
  }
})
</script>

<style lang="less" scoped>
.dropdown {
  cursor: pointer;
}
.el-dropdown-link .el-avatar {
  position: relative;
  top: 8px;
  right: 8px;
}
</style>

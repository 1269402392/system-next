<template>
  <div class="login-user">
    <el-form
      ref="formRef"
      :model="user"
      :rules="rules"
      label-position="right"
      label-width="70px"
      style="max-width: 460px"
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="user.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import cache from '@/utils/cache'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'LoginUser',
  setup() {
    const store = useStore()

    const rules = {
      name: [
        {
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 8,
          message: 'Length should be 3 to 8',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 8,
          message: 'Length should be 3 to 8',
          trigger: 'blur'
        }
      ]
    }
    const formRef = ref<InstanceType<typeof ElForm>>()
    const user = reactive({
      name: cache.getCache('name'),
      password: cache.getCache('password')
    })

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (!valid) return
        if (isKeepPassword) {
          cache.setCache('name', user.name)
          cache.setCache('password', user.password)
        } else {
          cache.deleteCache('password')
        }
        store.dispatch('loginModule/loginAction', { ...user })
      })
    }
    return {
      user,
      rules,
      formRef,
      loginAction
    }
  }
})
</script>

<style lang="less" scoped></style>

<template>
  <div class="phone">
    <el-form
      ref="formRef"
      :model="user"
      :rules="rules"
      label-position="right"
      label-width="70px"
      style="max-width: 460px"
    >
      <el-form-item label="手机号" prop="username">
        <el-input v-model="user.phone"></el-input>
      </el-form-item>
      <el-form-item class="code" label="验证码" prop="code">
        <el-input v-model="user.code"></el-input>
        <el-button type="primary">获取验证码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'LoginPhone',
  setup() {
    const store = useStore()
    const rules = {
      username: [
        {
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 11,
          message: 'Length should be 3 to 11',
          trigger: 'blur'
        }
      ],
      code: [
        {
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }
      ]
    }
    const user = reactive({
      phone: '',
      code: ''
    })
    const phoneAction = () => {
      store.dispatch('loginModule/phoneAction')
    }
    return {
      user,
      rules,
      phoneAction
    }
  }
})
</script>

<style lang="less" scoped>
.phone {
  .code {
    .el-button {
      margin-left: 10px;
    }
  }
  /deep/.el-form-item__content {
    display: flex;
  }
}
</style>

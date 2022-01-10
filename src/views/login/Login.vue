<template>
  <div class="login">
    <div class="login-box">
      <h2>故河十九年春</h2>
      <el-tabs v-model="tabValue" stretch type="border-card">
        <el-tab-pane name="user">
          <template #label>
            <span>
              <el-icon><user /></el-icon>
              <strong>账号登录</strong>
            </span>
          </template>
          <login-user ref="userRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <span>
              <el-icon><iphone /></el-icon>
              <strong>手机登录</strong>
            </span>
          </template>
          <login-phone ref="phoneRef" />
        </el-tab-pane>
      </el-tabs>

      <div class="login-control">
        <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
        <el-link type="primary">忘记密码</el-link>
      </div>

      <el-button class="submit" type="primary" @click="submitClick">立即登陆 </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Iphone, User } from '@element-plus/icons-vue'
import LoginUser from './children/LoginUser.vue'
import LoginPhone from '@/views/login/children/LoginPhone.vue'

export default defineComponent({
  setup() {
    const isKeepPassword = ref(true)
    const userRef = ref<InstanceType<typeof LoginUser>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const tabValue = ref('user')
    const submitClick = () => {
      if (tabValue.value === 'user') {
        userRef.value?.loginAction(isKeepPassword.value)
      } else {
        phoneRef.value?.phoneAction()
      }
    }
    return {
      isKeepPassword,
      userRef,
      phoneRef,
      tabValue,
      submitClick
    }
  },
  components: {
    User,
    Iphone,
    LoginUser,
    LoginPhone
  }
})
</script>

<style lang="less" scoped>
.login {
  background: url('../../assets/img/2031007.jpg') no-repeat;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-size: 100% 100%;
  .login-box {
    width: 350px;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    h2 {
      text-align: center;
      margin-bottom: 20px;
      color: white;
    }

    svg {
      position: relative;
      top: 2px;
      left: -3px;
    }

    .login-control {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .submit {
      width: 100%;
    }
  }
}
</style>

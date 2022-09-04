<template>
<div>
  <!-- 导航栏 -->
  <van-nav-bar title="黑马头条-登录"/>
  <!-- 登录表单 -->
  <van-form @submit="onSubmit">
  <van-field
    v-model="userInfo.mobile"
    name="mobile"
    label="手机号"
    placeholder="手机号"
    :rules="[{ required: true, message: '请填写合法手机号' ,pattern: /^1[3456789]\d{9}$/}]"
    required
  />
  <van-field
    v-model="userInfo.code"
    type="password"
    name="code"
    label="密码"
    placeholder="密码"
    :rules="[{ required: true, message: '请填写6位密码' ,pattern:/^\d{6}$/}]"
    required
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit" :loading="isload" loading-text="登录中" :disabled="isload">提交</van-button>
  </div>
</van-form>
</div>
</template>

<script>
import { loginApi } from '@/api/index.js'
import { Notify } from 'vant'
import { setToken } from '@/utils/token.js'
export default {
  name: 'Login-View',
  data () {
    return {
      userInfo: {
        mobile: '13966667788',
        code: '246810' // 246810
      },
      isload: false
    }
  },
  methods: {
    async onSubmit () {
      // console.log('submit', values)
      this.isload = true
      try {
        const { data: res } = await loginApi(this.userInfo)
        // console.log(res)
        Notify({ type: 'success', message: '登录成功' })
        setToken(res.data.token) // 保存token
        localStorage.setItem('refrsh_token', res.data.refresh_token)
        this.$router.replace({ path: '/layout/home' })
      } catch (error) {
        // console.log(error)
        Notify({ type: 'danger', message: '登录失败' })
      }
      this.isload = false
    }
  }

}
</script>

<style lang="less" scoped>

</style>

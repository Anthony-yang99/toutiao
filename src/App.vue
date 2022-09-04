<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
// import { getallChannelsAPI } from '@/api/index.js'
export default {
  name: 'App',
  data () {
    return {}
  },
  async created () {
    // try {
    //   const { data: res } = await getallChannelsAPI()
    //   console.log(res)
    // } catch (err) {
    //   // console.dir(err)
    //   console.log(err)
    // }
  }
}
</script>

<style lang="less" scoped>
</style>

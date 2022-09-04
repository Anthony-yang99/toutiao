<template>
  <div>
    <!-- 导航栏 -->
    <div>
      <van-nav-bar @click-right="onClickRight" fixed>
        <template #left>
          <img class="logo" src="@/assets/toutiao_logo.png" />
        </template>
        <template #right>
          <van-icon name="search" size="0.48rem" color="#fff"  @click="showSearch"/>
        </template>
      </van-nav-bar>
    </div>
    <!-- 标签栏 -->
    <div class="main">
      <van-tabs v-model="active" sticky offset-top="1.22666rem" animated>
        <van-tab
          v-for="item in userChannelList"
          :key="item.id"
          :title="item.name"
          :name="item.id"
        >
          <ArticleList :channelId="active"></ArticleList>
        </van-tab>
      </van-tabs>
      <!-- 编辑频道图标 -->
      <van-icon name="plus" size="0.37333334rem" class="moreChannels"  @click="showPopup"/>
    </div>
    <!-- 标签弹出层 -->
    <van-popup v-model="show" class="tabpopup">
      <channelEdit :userList="userChannelList"
      :unCheckList="unCheckChannelsList"
      @addTabsEV="addChannels"
      @delChannelEV="delChannel"
      @closepopup="closePopup"
      v-model="active"
      ></channelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getuserChannelsAPI, getallChannelsAPI, updateUserChannelAPI, delTheChannelAPI } from '@/api/index.js'
import ArticleList from './components/ArticleList.vue'
import channelEdit from './ChannelEdit.vue'
export default {
  data () {
    return {
      // 用户选择的频道列表
      userChannelList: [],
      // 所有频道列表
      allChannelList: [],
      // 标签栏的标识符
      active: 0,
      // 文章列表
      articleList: [],
      // 标签弹出层显示与否
      show: false
    }
  },
  async created () {
    try {
      // 获取用户频道的请求
      const { data: res } = await getuserChannelsAPI()
      this.userChannelList = res.data.channels
      // console.log(this.userChannelList)
      const { data: res2 } = await getallChannelsAPI()
      this.allChannelList = res2.data.channels
    } catch (error) {
      // console.log(error)
    }
    // this.changeChannel()
  },
  methods: {
    onClickRight () {},
    // 点击标签切换文章列表
    // async changeChannel () {
    //   try {
    //     // 获取文章列表
    //     const res2 = await getAllArticlesAPI({
    //       channel_id: this.active,
    //       timestamp: new Date().getTime()
    //     })
    //     // console.log(res2)
    //     this.articleList = res2.data.data.results
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    // 点击显示弹出层
    showPopup () {
      this.show = true
    },
    // 添加更多的频道
    async addChannels (channelObj) {
      this.userChannelList.push(channelObj)
      const newArr = this.userChannelList.filter(obj => obj.id !== 0)
      const theNewArr = newArr.map((obj, index) => {
        const newObj = { ...obj }
        delete newObj.name
        newObj.seq = index

        return newObj
      })
      await updateUserChannelAPI({
        channels: theNewArr
      })
      // console.log(res)
    },
    // 删除指定频道
    async delChannel (channelObj) {
      const index = this.userChannelList.findIndex(obj => obj.id === channelObj.id)
      this.userChannelList.splice(index, 1)
      await delTheChannelAPI({
        channelId: channelObj.id
      })
      // console.log(res)
    },
    closePopup () {
      this.show = false
    },
    // 显示搜索页面
    showSearch () {
      this.$router.push('/search')
    }
  },
  components: {
    ArticleList,
    channelEdit
  },
  computed: {
    unCheckChannelsList () {
      // 目标：把所有频道里的对象拿出来去用户已选的频道数组里对比，如果不存在就就fliter方法收集到一个新数组中
      const newArr = this.allChannelList.filter(bigObj => {
        const index = this.userChannelList.findIndex(samllObj => {
          return samllObj.id === bigObj.id
        })
        // 如果找到了一样的id,就返回false，不一样就返回true,就把当前正在循环的的大数组中的对象保存到新数组中
        if (index > -1) {
          return false
        } else {
          return true
        }
      })
      // 把收集到的没有重复的对象返回
      return newArr
    }
  }
}
</script>

<style lang="less" scoped>
.logo {
  width: 100px;
  height: 30px;
}
.main {
  padding-top: 46px;
}
// 设置 tabs 容器的样式
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}
.tabpopup{
  width: 100vw;
  height: 100vh;
}
</style>

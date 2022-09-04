<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
      offset="10"
    >
      <ArticleItem
        v-for="item in list"
        :key="item.art_id"
        :art_obj="item"
        @dislike="dislikefn"
        @reportEv="reportEvfn"
        @click.native="clickFn(item.art_id)"
      ></ArticleItem>
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '../../../components/ArticleItem.vue'
import { getAllArticlesAPI, dislikeArticlesAPI, reportArticlesAPI } from '@/api/index.js'
import { Notify } from 'vant'
export default {
  props: {
    channelId: Number
  },
  data () {
    return {
      list: [],
      loading: false, // 是否加载数据
      finished: false, // 数据全部加载完成后就改为true
      theTime: new Date().getTime(), // 用来保存获取过来的下一页的时间戳
      isLoading: false // 是否下拉刷新
    }
  },
  async created () {
    try {
      // 获取文章列表
      const res2 = await getAllArticlesAPI({
        channel_id: this.channelId,
        timestamp: this.theTime
      })
      // console.log(res2)
      this.list = res2.data.data.results
      this.theTime = res2.data.data.pre_timestamp
    } catch (error) {
      // console.log(error)
    }
  },
  methods: {
    // 上拉加载的事件
    async onLoad () {
      const res2 = await getAllArticlesAPI({
        channel_id: this.channelId,
        timestamp: this.theTime
      })
      // console.log(res2)
      this.list = [...this.list, ...res2.data.data.results]
      this.theTime = res2.data.data.pre_timestamp
      this.loading = false
      // 数据全部加载完成后就结束加载
      if (res2.data.data.pre_timestamp === null) {
        this.finished = true
      }
    },
    // 下拉刷新的事件
    async onRefresh () {
      this.list = []
      this.theTime = new Date().getTime()
      const res2 = await getAllArticlesAPI({
        channel_id: this.channelId,
        timestamp: this.theTime
      })
      // console.log(res2)
      this.list = [...this.list, ...res2.data.data.results]
      this.theTime = res2.data.data.pre_timestamp
      this.isLoading = false
    },
    // 反馈不感兴趣的自定义事件
    async dislikefn (artId) {
      await dislikeArticlesAPI(artId)
      Notify({ type: 'success', message: '反馈成功' })
    },
    // 反馈垃圾信息的自定义事件
    async reportEvfn (id, value) {
      await reportArticlesAPI({
        artId: id,
        type: value
      })
      Notify({ type: 'success', message: '举报成功' })
    },
    // 点击文章单元格，跳转文章详情
    clickFn (id) {
      this.$router.push(`/detail?art_id=${id}`)
    }
  },
  components: {
    ArticleItem
  }
}
</script>

<style>
</style>

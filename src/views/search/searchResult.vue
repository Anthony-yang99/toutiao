<template>
  <div>
    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar
        title="搜索结果"
        left-arrow
        @click-left="$router.go(-1)"
        fixed
      />
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
      offset="50"
    >
      <ArticleItem
        v-for="item in artucleList"
        :key="item.art_id"
        :art_obj="item"
        :showIs="false"
        @click.native="clickFn(item.art_id)"
      ></ArticleItem>
    </van-list>
  </div>
</template>

<script>
import { searchResultAPI } from '@/api/index.js'
import ArticleItem from '../../components/ArticleItem.vue'
export default {
  name: 'SearchResult',
  data () {
    return {
      // 页码
      page: 1,
      // 搜索结果保存的数组
      artucleList: [],
      loading: false,
      finished: false
    }
  },
  async created () {
    const { data: res } = await searchResultAPI({
      page: this.page,
      q: this.$route.params.kw
    })
    this.artucleList = res.data.results
  },
  methods: {
    // 上拉加载更多
    async onLoad () {
      if (this.artucleList.length > 0) {
        this.page++
        const { data: res } = await searchResultAPI({
          page: this.page,
          q: this.$route.params.kw
        })
        if (res.data.results.length === 0) {
          this.finished = true
          return
        }
        this.artucleList = [...this.artucleList, ...res.data.results]
        this.loading = false
      }
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

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>

<template>
  <div>
    <!-- Header 区域 -->
    <van-nav-bar
      fixed
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 文章信息区域 -->
    <div class="article-container">
      <!-- 文章标题 -->
      <h1 class="art-title">{{ artObj.title }}</h1>

      <!-- 用户信息 -->
      <van-cell
        center
        :title="artObj.aut_name"
        :label="formData(artObj.pubdate)"
      >
        <template #icon>
          <img :src="artObj.aut_photo" alt="" class="avatar" />
        </template>
        <template #default>
          <div>
            <van-button
              type="info"
              size="mini"
              v-if="artObj.is_followed"
              @click="followedFn(true)"
              >已关注</van-button
            >
            <van-button
              icon="plus"
              type="info"
              size="mini"
              plain
              v-else
              @click="followedFn(false)"
              >关注</van-button
            >
          </div>
        </template>
      </van-cell>

      <!-- 分割线 -->
      <van-divider></van-divider>

      <!-- 文章内容 -->
      <div class="art-content" v-html="artObj.content"></div>

      <!-- 分割线 -->
      <van-divider>End</van-divider>

      <!-- 点赞  attitude 用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞-->
      <div class="like-box">
        <van-button
          icon="good-job"
          type="danger"
          size="small"
          v-if="artObj.attitude === 1"
          @click="likeArt(true)"
          >已点赞</van-button
        >
        <van-button icon="good-job-o" type="danger" plain size="small" v-else @click="likeArt(false)"
          >点赞</van-button
        >
      </div>
    </div>
    <!-- 文章评论 -->
    <div>
      <CommentList></CommentList>
    </div>
  </div>
</template>

<script>
import { articleDetailAPI, userFollowedAPI, userUnFollowedAPI, unLikeArticleAPI, likeArticleAPI } from '@/api/index.js'
import { timeAgo } from '@/utils/date.js'
import CommentList from '@/views/ArticleDetail/CommentList.vue'
export default {
  data () {
    return {
      // 文章详情的对象
      artObj: {}
    }
  },
  async created () {
    const res = await articleDetailAPI({
      artId: this.$route.query.art_id
    })
    this.artObj = res.data.data
  },
  methods: {
    formData: timeAgo,
    // 是否关注的处理函数
    async followedFn (bool) {
      if (bool) {
        // 点击了关注按钮，想要取关
        this.artObj.is_followed = false
        await userUnFollowedAPI({
          userId: this.artObj.aut_id
        })
      } else {
        // 点击未关注按钮，想要关注
        this.artObj.is_followed = true
        await userFollowedAPI({
          userId: this.artObj.aut_id
        })
      }
    },
    // 文章点赞的处理函数
    async likeArt (bool) {
      if (bool) {
        // 点击了已点赞按钮，想要取消
        this.artObj.attitude = 0
        await unLikeArticleAPI({
          artId: this.artObj.art_id
        })
      } else {
        // 点击了未点赞按钮，想要点赞
        this.artObj.attitude = 1
        await likeArticleAPI({
          artId: this.artObj.art_id
        })
      }
    }
  },
  components: {
    CommentList
  }
}
</script>

<style scoped lang="less">
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
  /deep/ img {
    width: 100%;
  }
  /deep/ pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}
</style>

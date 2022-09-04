<template>
  <div>
    <!-- 评论列表 -->
    <div
      class="cmt-list"
      :class="{
        'art-cmt-container-1': isShowBox,
        'art-cmt-container-2': !isShowBox
      }"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="评论到底了"
        @load="onLoad"
        :immediate-check="false"
      >
        <!-- 评论的 Item 项 -->
        <div class="cmt-item" v-for="item in commentArr" :key="item.com_id">
          <!-- 头部区域 -->
          <div class="cmt-header">
            <!-- 头部左侧 -->
            <div class="cmt-header-left">
              <img :src="item.aut_photo" alt="" class="avatar" />
              <span class="uname">{{ item.aut_name }}</span>
            </div>
            <!-- 头部右侧 -->
            <div class="cmt-header-right">
              <van-icon
                name="like"
                size="16"
                color="red"
                v-if="item.is_liking"
                @click="likeFn(true, item)"
              />
              <van-icon
                name="like-o"
                size="16"
                color="gray"
                v-else
                @click="likeFn(false, item)"
              />
            </div>
          </div>
          <!-- 主体区域 -->
          <div class="cmt-body">
            {{ item.content }}
          </div>
          <!-- 尾部区域 -->
          <div class="cmt-footer">{{ timeAgo(item.pubdate) }}</div>
        </div>
      </van-list>
    </div>
    <!-- //发布评论 -->
    <div>
      <!-- 底部添加评论区域 - 1 -->
      <div class="add-cmt-box van-hairline--top" v-if="isShowBox === true">
        <van-icon name="arrow-left" size="0.48rem" @click="$router.back()" />
        <div class="ipt-cmt-div" @click="showCmt">发表评论</div>
        <div class="icon-box">
          <van-badge :content="totalCmt === 0 ? '' : totalCmt" max="99">
            <van-icon
              name="comment-o"
              size="0.53333334rem"
              @click="commentClickFn"
            />
          </van-badge>
          <van-icon name="star-o" size="0.53333334rem" />
          <van-icon name="share-o" size="0.53333334rem" />
        </div>
      </div>

      <!-- 底部添加评论区域 - 2 -->
      <div class="cmt-box van-hairline--top" v-else>
        <textarea
          placeholder="友善评论、理性发言、阳光心灵"
          v-focu
          @blur="blurFn"
          v-model="cmtText"
        ></textarea>
        <van-button
          type="default"
          :disabled="cmtText.length === 0"
          @click="subCmtFn"
          >发布</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import {
  articleCommentAPI,
  commentLikingAPI,
  commentDisLikingAPI,
  commentSendAPI
} from '@/api/index.js'
import { timeAgo } from '@/utils/date.js'
export default {
  data () {
    return {
      // 评论的偏移量
      offset: null,
      // 保存评论的列表
      commentArr: [],
      // 是否显示评论的输入框，默认不显示
      isShowBox: true,
      // 评论的总数
      totalCmt: 0,
      // 保存输入框的内容
      cmtText: '',
      lastId: '',
      loading: false,
      finished: false
    }
  },
  async created () {
    const res = await articleCommentAPI({
      id: this.$route.query.art_id
    })
    // console.log(res)
    this.commentArr = res.data.data.results
    this.totalCmt = res.data.data.total_count
    this.lastId = res.data.data.last_id

    if (res.data.data.results.length === 0) {
      this.finished = true
    }
  },
  methods: {
    timeAgo,
    // 点赞处理函数
    async likeFn (bool, obj) {
      if (bool) {
        // 点击红星，想要取消点赞，显示灰心
        obj.is_liking = false
        await commentDisLikingAPI({
          comId: obj.com_id
        })
      } else {
        // 点击灰心，想要点赞，显示红心
        obj.is_liking = true
        await commentLikingAPI({
          comId: obj.com_id
        })
      }
    },
    // 显示评论输入框
    showCmt () {
      this.isShowBox = false
    },
    // 点击评论图标，把评论第一条滑动到最上面
    commentClickFn () {
      // 这里用js原生写超级麻烦，日后还要学习
      // 真实DOM都在document(所以不再一个vue文件内), 也是可以获取的
      document.querySelector('.like-box').scrollIntoView({
        behavior: 'smooth'
      })
    },
    // 发布评论
    async subCmtFn () {
      // console.log(this.cmtText)
      const res = await commentSendAPI({
        id: this.$route.query.art_id,
        content: this.cmtText
      })

      this.commentArr.unshift(res.data.data.new_obj)
      this.totalCmt++
      this.cmtText = ''
      this.commentClickFn()
    },
    // 输入框失去焦点事件
    blurFn () {
      // 用定时器来异步执行失去焦点事件,最后执行，要不然会在输入框内容未保存时就将输入框销毁了
      setTimeout(() => {
        this.isShowBox = true
      }, 0)
    },
    async onLoad () {
      if (this.commentArr.length > 0) {
        const res = await articleCommentAPI({
          id: this.$route.query.art_id,
          offset: this.lastId
        })
        this.commentArr = [...this.commentArr, ...res.data.data.results]
        this.totalCmt = res.data.data.total_count
        this.lastId = res.data.data.last_id
        if (res.data.data.last_id === null) {
          this.finished = true
        }
        this.loading = false
      } else {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.cmt-list {
  padding: 10px;
  .cmt-item {
    padding: 15px 0;
    + .cmt-item {
      border-top: 1px solid #f8f8f8;
    }
    .cmt-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cmt-header-left {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          background-color: #f8f8f8;
          border-radius: 50%;
          margin-right: 15px;
        }
        .uname {
          font-size: 12px;
        }
      }
    }
    .cmt-body {
      font-size: 14px;
      line-height: 28px;
      text-indent: 2em;
      margin-top: 6px;
      word-break: break-all;
    }
    .cmt-footer {
      font-size: 12px;
      color: gray;
      margin-top: 10px;
    }
  }
}
/*美化 - 文章详情 - 底部的评论页面 */
// 外层容器
.art-cmt-container-1 {
  padding-bottom: 46px;
}
.art-cmt-container-2 {
  padding-bottom: 80px;
}

// 发布评论的盒子 - 1
.add-cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  line-height: 46px;
  padding-left: 10px;
  .ipt-cmt-div {
    flex: 1;
    border: 1px solid #efefef;
    border-radius: 15px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    padding-left: 15px;
    margin-left: 10px;
    background-color: #f8f8f8;
  }
  .icon-box {
    width: 40%;
    display: flex;
    justify-content: space-evenly;
    line-height: 0;
  }
}

.child {
  width: 20px;
  height: 20px;
  background: #f2f3f5;
}

// 发布评论的盒子 - 2
.cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: white;
  textarea {
    flex: 1;
    height: 66%;
    border: 1px solid #efefef;
    background-color: #f8f8f8;
    resize: none;
    border-radius: 6px;
    padding: 5px;
  }
  .van-button {
    height: 100%;
    border: none;
  }
}
</style>

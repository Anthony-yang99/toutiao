<template>
  <div>
    <!-- 一条文章单元格 -->
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ art_obj.title }}</span>
          <!-- 单图 -->
          <img
            v-if="art_obj.cover.type === 1"
            class="thumb"
            alt=""
            v-lazy="art_obj.cover.images[0]"
          />
        </div>
        <!-- 多图 -->
        <div class="thumb-box" v-if="art_obj.cover.type > 1">
          <img
            v-for="(imgUrl, i) in art_obj.cover.images"
            :key="i"
            class="thumb"
            alt=""
            v-lazy="imgUrl"
          />
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <div>
            <span>{{ art_obj.aut_name }}</span>
            <span>{{ art_obj.comm_count }}评论</span>
            <span>{{ formDate(art_obj.pubdate) }}</span>
          </div>
          <!-- 反馈按钮 -->
          <van-icon name="cross" @click.stop="show = true"  v-if="showIs"/>
        </div>
      </template>
    </van-cell>
    <!-- 反馈弹出框 -->
    <van-action-sheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
      :cancel-text="bottom_text"
      get-container="body"
      @cancel="cancelfn"
      @close="closefn"
    />
  </div>
</template>

<script>
// 导入事件处理函数
import { timeAgo } from '@/utils/date.js'
import { firstActions, secondActions } from '@/api/report.js'
export default {
  props: {
    art_obj: Object,
    showIs: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      formDate: timeAgo,
      // 反馈面板的显示与否
      show: false,
      // 反馈面板的显示文字
      actions: firstActions,
      // 反馈面板的下方按钮字体
      bottom_text: '取消'
    }
  },
  methods: {
    // 反馈组件的监听事件
    onSelect (action, item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      // console.log(action, item)
      if (action.name === '反馈垃圾内容') {
        this.actions = secondActions
        this.bottom_text = '返回'
      } else if (action.name === '不感兴趣') {
        this.$emit('dislike', this.art_obj.art_id)
        this.show = false
      } else {
        this.$emit('reportEv', this.art_obj.art_id, action.value)
        this.show = false
      }
    },
    // 反馈面板取消时的监听事件
    cancelfn () {
      // 判断，如果按钮文字是返回则把actions的内容换回一级面板
      if (this.bottom_text === '返回') {
        this.show = true
        this.actions = firstActions
        this.bottom_text = '取消'
      }
    },
    // 反馈面板关闭时的监听事件
    closefn () {
      this.actions = firstActions
      this.bottom_text = '取消'
    }
  }
}
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span {
  margin: 0 3px;
  &:first-child {
    margin-left: 0;
  }
}
/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>

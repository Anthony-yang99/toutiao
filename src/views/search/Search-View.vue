<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon
        name="arrow-left"
        color="white"
        size="0.48rem"
        class="goback"
        @click="$router.back()"
      />
      <!-- 搜索组件 -->
      <van-search
        v-model.trim="kw"
        placeholder="请输入搜索关键词"
        background="#007BFF"
        shape="round"
        v-focu
        @input="inputfn"
        @search="enterFn"
      />
    </div>
    <!-- 搜索建议列表 -->
    <div class="sugg-list" v-if="kw.length !== 0">
      <div
        class="sugg-item"
        v-for="(str, i) in suggestionList"
        :key="i"
        v-html="lightFn(str, kw)"
        @click="clickFn(str)"
      ></div>
    </div>
    <!-- 搜索历史 -->
    <div class="search-history" v-else>
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="delete" class="search-icon"  @click="cleanFn"/>
        </template>
      </van-cell>

      <!-- 历史列表 -->
      <div class="history-list">
        <span class="history-item" v-for="(str,i) in  history" :key="i" @click="hisClickFn(str)">{{str}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { suggestionAPI } from '@/api/index.js'
export default {
  data () {
    return {
      kw: '', // 搜索关键字
      // 保存防抖定时器
      timer: null,
      // 联想建议的数组
      suggestionList: [],
      // 搜索历史
      history: JSON.parse(localStorage.getItem('his')) || []
    }
  },
  methods: {
    // input输入框输入时的监听事件
    inputfn () {
      if (this.kw.length === 0) {
        this.suggestionList = []
      } else {
        // 防抖
        clearTimeout(this.timer)
        this.timer = setTimeout(async () => {
          const { data: res } = await suggestionAPI({
            keyword: this.kw
          })
          this.suggestionList = res.data.options
        }, 1000)
      }
    },
    // 处理搜索建议的高亮
    lightFn (originStr, targat) {
      // originStr:原来的字符串
      // targat：关键字
      const reg = new RegExp(targat, 'i')
      // 要在正则表达式里用变量就不能用语法糖简写，要用上面的方法
      // console.log(originStr, targat)
      if (originStr === null) return
      return originStr.replace(reg, (match) => {
        return `<span style="color:red;">${match}</span>`
      })
    },
    // 确定搜索结果
    enterFn () {
      if (this.kw.length > 0) {
        this.history.push(this.kw)
        // 为了让watch侦听器先执行，还要把路由跳转用定时器包起来
        setTimeout(() => {
          this.$router.push({
            path: `/search_result/${this.kw}`
          })
        }, 0)
      }
    },
    // 点击搜索建议跳转结果
    clickFn (str) {
      this.history.push(str)
      // 为了让watch侦听器先执行，还要把路由跳转用定时器包起来
      setTimeout(() => {
        this.$router.push({
          path: `/search_result/${str}`
        })
      }, 0)
    },
    // 点击历史跳转结果
    hisClickFn (str) {
      this.$router.push({
        path: `/search_result/${str}`
      })
    },
    // 清空搜索记录
    cleanFn () {
      this.history = []
    }
  },
  // 侦听器
  watch: {
    history: {
      deep: true,
      handler () {
        // 一旦history数组发生变化，就把数组转成字符串保存到本地存储
        /**
         *ES6新增两种引用类型（set，map）
         Set：无序不重复的value集合体（无下标）
         特点：传入的数组类型，如果有重复的值，会自动清理掉重复值，返回不重复的set对象
         注意：如果值是对象，则比较的是对象内存地址
         */
        const theSet = new Set(this.history)
        // Set类型对象再转回数组类型
        const arr = Array.from(theSet)
        localStorage.setItem('his', JSON.stringify(arr))
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}
/*搜索建议列表样式 */
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
/**搜索历史 */
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>

<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
      fixed
    />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image
            round
            class="avatar"
            :src="userProfile.photo"
            @click="imgClikFn"
          />
          <!-- file 选择框 -->
          <input
            type="file"
            ref="iptFile"
            v-show="false"
            accept="image/*"
            @change="onFileChange"
          />
        </template>
      </van-cell>
      <van-cell
        title="名称"
        is-link
        :value="userProfile.name"
        @click="nameClickFn"
      />
      <van-cell title="生日" is-link :value="userProfile.birthday"  @click="birthdayClickFn"/>
    </van-cell-group>
    <!-- 修改姓名的弹窗 -->
    <van-dialog
      v-model="show"
      title="标题"
      show-cancel-button
      :beforeClose="beforeCloseFn"
    >
      <input type="text" v-model="oldName" v-focu />
    </van-dialog>
    <!-- 修改生日的弹窗 -->
    <van-popup v-model="popuShow" position="bottom" :style="{ height: '50%' }" round>
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="cancelFn"
        @confirm="confirmFn"
      />
    </van-popup>
  </div>
</template>

<script>
import {
  userPrefileAPI,
  editUserPhotoAPI,
  editUserProfileAPI
} from '@/api/index.js'
import { Notify } from 'vant'
import { formatDate } from '@/utils/date.js'
export default {
  name: 'UserEdit',
  data () {
    return {
      // 用户初始信息
      userProfile: {},
      // 修改姓名的弹窗显示与否
      show: false,
      // 旧的姓名
      oldName: '',
      // 生日修改弹窗显示与否
      popuShow: false,
      // 最小时间
      minDate: new Date(1920, 0, 1),
      // 最大时间
      maxDate: new Date(),
      // 现在时间
      currentDate: new Date()
    }
  },
  async created () {
    const res = await userPrefileAPI()
    this.userProfile = res.data.data
  },
  methods: {
    // 文件选择的函数
    async onFileChange (ev) {
      if (ev.target.files.length === 0) return
      // console.log(ev.target.files[0])
      const theFd = new FormData()
      theFd.append('photo', ev.target.files[0])
      const res = await editUserPhotoAPI(theFd)
      // console.log(res)
      this.userProfile.photo = res.data.data.photo
    },
    // 图片的点击
    imgClikFn () {
      this.$refs.iptFile.click()
    },
    // 修改姓名的点击事件
    nameClickFn () {
      this.show = true
      this.oldName = this.userProfile.name
    },
    /**
     *  关闭前的回调函数，
        调用 done() 后关闭弹窗，
        调用 done(false) 阻止弹窗关闭
     * */
    async beforeCloseFn (action, done) {
      if (action === 'confirm') {
        // 点确定
        const reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,7}$/
        if (reg.test(this.oldName) === true) {
          await editUserProfileAPI({
            name: this.oldName
          })
          this.userProfile.name = this.oldName
          done()
        } else {
          Notify({ type: 'warning', message: '姓名只能是中英文数字组合' })
          done(false)
        }
      } else {
        done()
      }
    },
    // 生日修改点击事件
    birthdayClickFn () {
      this.popuShow = true
      this.currentDate = new Date(this.userProfile.birthday)
    },
    cancelFn () {
      this.popuShow = false
    },
    async confirmFn () {
      await editUserProfileAPI(
        {
          birthday: formatDate(this.currentDate)
        }
      )
      this.userProfile.birthday = formatDate(this.currentDate)
      this.popuShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}
/deep/ .van-dialog__content {
  text-align: center;
  input {
    border: none;
    padding: 0;
    text-align: center;
  }
}
</style>

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userPhoto: 'https://www.com8.cn/wp-content/uploads/2020/09/20200922022838-5f6961562471f.jpg'
  },
  getters: {
  },
  mutations: {
    setUserPhoto (state, value) {
      state.userPhoto = value
    }
  },
  actions: {
  },
  modules: {
  }
})

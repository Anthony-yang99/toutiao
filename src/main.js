import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import '@/vueCompent.js'

Vue.config.productionTip = false

// 定义输入框自动获取焦点的自定义指令
const directivObj = {
  install (Vue) {
    // 自定义指令
    Vue.directive('focu', {
      // el代表指令所在的标签
      inserted (el) {
        // console.log(el)
        // 如果直接是input标签/textarea标签就直接调用focus
        // DOM.nodeName可以获取到元素的名称，都是大写字符串
        if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') {
          el.focus()
        } else {
          // 如果不是input和textarea
          const inp = el.querySelector('input')
          const textArea = el.querySelector('textarea')
          if (inp) inp.focus()
          if (textArea) textArea.focus()
        }
      },
      update (el) {
        if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') {
          el.focus()
        } else {
          // 如果不是input和textarea
          const inp = el.querySelector('input')
          const textArea = el.querySelector('textarea')
          if (inp) inp.focus()
          if (textArea) textArea.focus()
        }
      }
    })
  }
}
Vue.use(directivObj)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

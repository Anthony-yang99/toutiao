import Vue from 'vue'
// 导入vant组件

import {
  NavBar, Form, Field, Button, Tabbar, TabbarItem, Icon, Tab, Tabs,
  Cell, CellGroup, List, PullRefresh, ActionSheet, Popup, Row, Col, Badge, Search, Divider, Tag,
  Image, Dialog, DatetimePicker, Lazyload
} from 'vant'

Vue.use(Lazyload, {
  error: 'https://ts4.cn.mm.bing.net/th?id=OIP-C.FDEMBBkOQq7LnJ7O9esUcQAAAA&w=234&h=212&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2'
})
Vue.use(DatetimePicker)
Vue.use(Dialog)
Vue.use(Image)
Vue.use(Tag)
Vue.use(Divider)
Vue.use(Search)
Vue.use(Row)
Vue.use(Col)
Vue.use(Badge)
Vue.use(Popup)
Vue.use(ActionSheet)
Vue.use(PullRefresh)
Vue.use(List)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Icon)

"use strict";(self["webpackChunkvue_hmtt"]=self["webpackChunkvue_hmtt"]||[]).push([[177],{8114:function(t,s,e){e.r(s),e.d(s,{default:function(){return b}});var i=function(){var t=this,s=t._self._c;return s("div",[s("div",[s("van-nav-bar",{attrs:{fixed:""},on:{"click-right":t.onClickRight},scopedSlots:t._u([{key:"left",fn:function(){return[s("img",{staticClass:"logo",attrs:{src:e(3018)}})]},proxy:!0},{key:"right",fn:function(){return[s("van-icon",{attrs:{name:"search",size:"0.48rem",color:"#fff"},on:{click:t.showSearch}})]},proxy:!0}])})],1),s("div",{staticClass:"main"},[s("van-tabs",{attrs:{sticky:"","offset-top":"1.22666rem",animated:""},model:{value:t.active,callback:function(s){t.active=s},expression:"active"}},t._l(t.userChannelList,(function(e){return s("van-tab",{key:e.id,attrs:{title:e.name,name:e.id}},[s("ArticleList",{attrs:{channelId:t.active}})],1)})),1),s("van-icon",{staticClass:"moreChannels",attrs:{name:"plus",size:"0.37333334rem"},on:{click:t.showPopup}})],1),s("van-popup",{staticClass:"tabpopup",model:{value:t.show,callback:function(s){t.show=s},expression:"show"}},[s("channelEdit",{attrs:{userList:t.userChannelList,unCheckList:t.unCheckChannelsList},on:{addTabsEV:t.addChannels,delChannelEV:t.delChannel,closepopup:t.closePopup},model:{value:t.active,callback:function(s){t.active=s},expression:"active"}})],1)],1)},n=[],a=e(586),l=function(){var t=this,s=t._self._c;return s("div",[s("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.isLoading,callback:function(s){t.isLoading=s},expression:"isLoading"}},[s("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了","immediate-check":!1,offset:"10"},on:{load:t.onLoad},model:{value:t.loading,callback:function(s){t.loading=s},expression:"loading"}},t._l(t.list,(function(e){return s("ArticleItem",{key:e.art_id,attrs:{art_obj:e},on:{dislike:t.dislikefn,reportEv:t.reportEvfn},nativeOn:{click:function(s){return t.clickFn(e.art_id)}}})})),1)],1)],1)},c=[],r=(e(1424),e(6450)),o=e(9971),h={props:{channelId:Number},data(){return{list:[],loading:!1,finished:!1,theTime:(new Date).getTime(),isLoading:!1}},async created(){try{const t=await(0,a.g3)({channel_id:this.channelId,timestamp:this.theTime});this.list=t.data.data.results,this.theTime=t.data.data.pre_timestamp}catch(t){}},methods:{async onLoad(){const t=await(0,a.g3)({channel_id:this.channelId,timestamp:this.theTime});this.list=[...this.list,...t.data.data.results],this.theTime=t.data.data.pre_timestamp,this.loading=!1,null===t.data.data.pre_timestamp&&(this.finished=!0)},async onRefresh(){this.list=[],this.theTime=(new Date).getTime();const t=await(0,a.g3)({channel_id:this.channelId,timestamp:this.theTime});this.list=[...this.list,...t.data.data.results],this.theTime=t.data.data.pre_timestamp,this.isLoading=!1},async dislikefn(t){await(0,a.po)(t),(0,r.Z)({type:"success",message:"反馈成功"})},async reportEvfn(t,s){await(0,a.v7)({artId:t,type:s}),(0,r.Z)({type:"success",message:"举报成功"})},clickFn(t){this.$router.push(`/detail?art_id=${t}`)}},components:{ArticleItem:o.Z}},d=h,u=e(1001),p=(0,u.Z)(d,l,c,!1,null,null,null),m=p.exports,f=function(){var t=this,s=t._self._c;return s("div",[s("van-nav-bar",{attrs:{title:"频道管理"},scopedSlots:t._u([{key:"right",fn:function(){return[s("van-icon",{attrs:{name:"cross",size:"0.37333334rem",color:"white"},on:{click:t.closefn}})]},proxy:!0}])}),s("div",{staticClass:"my-channel-box"},[s("div",{staticClass:"channel-title"},[s("span",[t._v("我的频道 "),s("span",{staticClass:"small-title"},[t._v(" 点击"+t._s(t.isEdit?"删除":"进入")+"频道 ")])]),s("span",{on:{click:t.showEdit}},[t._v(t._s(t.isEdit?"完成":"编辑"))])]),s("van-row",{attrs:{type:"flex"}},t._l(t.userList,(function(e){return s("van-col",{key:e.id,attrs:{span:"6"},on:{click:function(s){return t.delChannel(e)}}},[s("div",{staticClass:"channel-item van-hairline--surround"},[t._v(" "+t._s(e.name)+" "),s("van-badge",{directives:[{name:"show",rawName:"v-show",value:t.isEdit&&0!==e.id,expression:"isEdit && item.id !== 0"}],staticClass:"cross-badge",attrs:{color:"transparent"},scopedSlots:t._u([{key:"content",fn:function(){return[s("van-icon",{staticClass:"badge-icon",attrs:{name:"cross",color:"#cfcfcf",size:"0.32rem"}})]},proxy:!0}],null,!0)})],1)])})),1)],1),s("div",{staticClass:"more-channel-box"},[t._m(0),s("van-row",{attrs:{type:"flex"}},t._l(t.unCheckList,(function(e){return s("van-col",{key:e.id,attrs:{span:"6"},on:{click:function(s){return t.addTab(e)}}},[s("div",{staticClass:"channel-item van-hairline--surround"},[t._v(t._s(e.name))])])})),1)],1)],1)},v=[function(){var t=this,s=t._self._c;return s("div",{staticClass:"channel-title"},[s("span",[t._v("点击添加更多频道：")])])}],C={props:{userList:Array,unCheckList:Array},data(){return{isEdit:!1}},methods:{showEdit(){this.isEdit=!this.isEdit},addTab(t){this.isEdit&&this.$emit("addTabsEV",t)},delChannel(t){this.isEdit?0!==t.id&&this.$emit("delChannelEV",t):(this.$emit("closepopup"),this.$emit("input",t.id))},closefn(){this.$emit("closepopup"),this.isEdit=!1}}},_=C,k=(0,u.Z)(_,f,v,!1,null,"6bd84d9c",null),g=k.exports,w={data(){return{userChannelList:[],allChannelList:[],active:0,articleList:[],show:!1}},async created(){try{const{data:t}=await(0,a._C)();this.userChannelList=t.data.channels;const{data:s}=await(0,a.gX)();this.allChannelList=s.data.channels}catch(t){}},methods:{onClickRight(){},showPopup(){this.show=!0},async addChannels(t){this.userChannelList.push(t);const s=this.userChannelList.filter((t=>0!==t.id)),e=s.map(((t,s)=>{const e={...t};return delete e.name,e.seq=s,e}));await(0,a.YY)({channels:e})},async delChannel(t){const s=this.userChannelList.findIndex((s=>s.id===t.id));this.userChannelList.splice(s,1),await(0,a.ND)({channelId:t.id})},closePopup(){this.show=!1},showSearch(){this.$router.push("/search")}},components:{ArticleList:m,channelEdit:g},computed:{unCheckChannelsList(){const t=this.allChannelList.filter((t=>{const s=this.userChannelList.findIndex((s=>s.id===t.id));return!(s>-1)}));return t}}},y=w,L=(0,u.Z)(y,i,n,!1,null,"201ad230",null),b=L.exports},3018:function(t,s,e){t.exports=e.p+"img/toutiao_logo.d0d391a4.png"}}]);
//# sourceMappingURL=home.d945a318.js.map
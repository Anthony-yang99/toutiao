"use strict";(self["webpackChunkvue_hmtt"]=self["webpackChunkvue_hmtt"]||[]).push([[535],{1795:function(e,t,a){a.r(t),a.d(t,{default:function(){return m}});var s=function(){var e=this,t=e._self._c;return t("div",[t("van-nav-bar",{attrs:{title:"黑马头条-登录"}}),t("van-form",{on:{submit:e.onSubmit}},[t("van-field",{attrs:{name:"mobile",label:"手机号",placeholder:"手机号",rules:[{required:!0,message:"请填写合法手机号",pattern:/^1[3456789]\d{9}$/}],required:""},model:{value:e.userInfo.mobile,callback:function(t){e.$set(e.userInfo,"mobile",t)},expression:"userInfo.mobile"}}),t("van-field",{attrs:{type:"password",name:"code",label:"密码",placeholder:"密码",rules:[{required:!0,message:"请填写6位密码",pattern:/^\d{6}$/}],required:""},model:{value:e.userInfo.code,callback:function(t){e.$set(e.userInfo,"code",t)},expression:"userInfo.code"}}),t("div",{staticStyle:{margin:"16px"}},[t("van-button",{attrs:{round:"",block:"",type:"info","native-type":"submit",loading:e.isload,"loading-text":"登录中",disabled:e.isload}},[e._v("提交")])],1)],1)],1)},o=[],n=(a(1424),a(6450)),r=a(586),l=a(3505),i={name:"Login-View",data(){return{userInfo:{mobile:"13966667788",code:"246810"},isload:!1}},methods:{async onSubmit(){this.isload=!0;try{const{data:e}=await(0,r.lx)(this.userInfo);(0,n.Z)({type:"success",message:"登录成功"}),(0,l.o4)(e.data.token),localStorage.setItem("refrsh_token",e.data.refresh_token),this.$router.replace({path:"/layout/home"})}catch(e){(0,n.Z)({type:"danger",message:"登录失败"})}this.isload=!1}}},u=i,d=a(1001),c=(0,d.Z)(u,s,o,!1,null,"3fa7bb0b",null),m=c.exports}}]);
//# sourceMappingURL=login.8f6cbd8c.js.map
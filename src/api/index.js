// 封装每个接口的请求方法
import axios from '@/utils/request.js'

// 登录的接口
export const loginApi = ({ mobile, code }) => {
  return axios({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

// 所有频道的请求方法
export const getallChannelsAPI = () => {
  return axios({
    url: '/v1_0/channels',
    method: 'GET'
  })
}

// 用户的频道请求，默认不登录会返回后台默认的频道
export const getuserChannelsAPI = () => {
  return axios({
    url: '/v1_0/user/channels',
    method: 'GET'

  })
}
// 更新用户选择的频道
export const updateUserChannelAPI = ({ channels }) => {
  return axios({
    url: '/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels
    }
  })
}

// 关注用户
export const userFollowedAPI = ({ userId }) => {
  return axios({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: userId
    }
  })
}

// 取关用户
export const userUnFollowedAPI = ({ userId }) => {
  return axios({
    url: `/v1_0/user/followings/${userId}`,
    method: 'DELETE'
  })
}

// 获取用户自己的信息
export const getUserInfoAPI = () => {
  return axios({
    url: '/v1_0/user',
    method: 'GET'
  })
}

// 编辑用户信息的信息铺设
export const userPrefileAPI = () => {
  return axios({
    url: '/v1_0/user/profile',
    method: 'GET'
  })
}

// 修改用户头像
export const editUserPhotoAPI = (fd) => {
  return axios({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fd
  })
}

// 修改用户信息
export const editUserProfileAPI = (obj) => {
  return axios({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: obj
  })
}

// 获取刷新token
export const refrshTokenAPI = () => {
  return axios({
    url: '/v1_0/authorizations',
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('refrsh_token')
    }

  })
}

// 删除指定的频道
export const delTheChannelAPI = ({ channelId }) => {
  return axios({
    url: `/v1_0/user/channels/${channelId}`,
    method: 'DELETE'
  })
}

// 获取文章列表
export const getAllArticlesAPI = ({ channel_id, timestamp }) => {
  return axios({
    url: '/v1_0/articles',
    method: 'GET',
    params: {
      channel_id,
      timestamp
    }
  })
}

// 文章反馈面板，不感兴趣
export const dislikeArticlesAPI = (artId) => {
  return axios({
    url: '/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target: artId
    }
  })
}

// 获取文章详情
export const articleDetailAPI = ({ artId }) => {
  return axios({
    url: `/v1_0/articles/${artId}`,
    method: 'GET'
  })
}

// 点赞文章
export const likeArticleAPI = ({ artId }) => {
  return axios({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target: artId
    }
  })
}
// 取消点赞文章
export const unLikeArticleAPI = ({ artId }) => {
  return axios({
    url: `/v1_0/article/likings/${artId}`,
    method: 'DELETE'
  })
}

// 获取文章评论信息
export const articleCommentAPI = ({ id, offset = null, limit = 10 }) => {
  return axios({
    url: '/v1_0/comments',
    method: 'GET',
    params: {
      type: 'a',
      source: id, // 文章id或评论id
      offset,
      limit
    }
  })
}

// 评论 - 点赞
export const commentLikingAPI = ({ comId }) => {
  return axios({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: comId
    }
  })
}
// 评论-取消点赞
export const commentDisLikingAPI = ({ comId }) => {
  return axios({
    url: `/v1_0/comment/likings/${comId}`,
    method: 'DELETE'
  })
}

// 发布评论
export const commentSendAPI = ({ id, content, art_id = null }) => {
  const obj = {
    target: id,
    content
  }
  if (art_id !== null) {
    obj.art_id = art_id
  }
  return axios({
    url: '/v1_0/comments',
    method: 'POST',
    data: obj
  })
}

// 反馈面板，垃圾信息
export const reportArticlesAPI = ({ artId, type }) => {
  return axios({
    url: '/v1_0/article/reports',
    method: 'POST',
    data: {
      target: artId,
      type: type,
      remark: '其他问题的说明，可以在后面再来吧这个功能完善'
    }
  })
}

// 搜索联想建议
export const suggestionAPI = ({ keyword }) => {
  return axios({
    url: '/v1_0/suggestion',
    method: 'GET',
    params: {
      q: keyword
    }
  })
}

// 搜索结果
export const searchResultAPI = ({ page = 1, per_page = 10, q }) => {
  return axios({
    url: '/v1_0/search',
    method: 'GET',
    params: {
      page,
      per_page,
      q
    }
  })
}

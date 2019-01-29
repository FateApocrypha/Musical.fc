import axios from 'axios'
import {
  HOST
} from '../commons/js/config'
export function getRecommendList (updateTime = null){
  let url = ''
  if (updateTime) {
    url = HOST + `/top/playlist/highquality?before=${updateTime}&limit=30`
  } else {
    url = HOST + '/top/playlist/highquality?limit=30'
  }
  return axios.get(url)
}
// 获取单首音乐详情
export function getMusicDetail (id) {
  const url = HOST + `/song/detail?ids=${id}`
  return axios.get(url)
}

// 获取歌单详情
export function getMusicListDetail (id) {
  const url = HOST + `/playlist/detail?id=${id}`
  return axios.get(url)
}

// 获取歌曲链接
export function getMusicUrl (id) {
  const url = HOST + `/song/url?id=${id}`
  return axios.get(url)
}
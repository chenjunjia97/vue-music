import  jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import  axios from 'axios'
//请求推荐页面的数据
export function getRecommend() {

  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)

}

export function getDiscList() {
  const url = '/api/getDiscList'
  const data = Object.assign({}, commonParams, {
    picmid: 1,
    platform: 'yqq.json',
    hostUin: 0,
    sin: 0,
    ein: 19,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSongList(disstid) {
  const url = '/api/getDiscSong'

  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    new_format: 1,
    onlysong: 0,
    platform: 'yqq.json',
    g_tk: 5381,
    hostUin: 0,
    format:'json',
    needNewCode: 0
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

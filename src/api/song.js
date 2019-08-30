import {commonParams} from './config'
import axios from 'axios'


export function getSongDetail(songmid,songid) {
  const url = '/api/getSongDetail'
  const data = Object.assign({}, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq.json',
    g_tk: 5381,
    format: 'json',
    inCharset: 'utf8',
    loginUin: 1120996904,
    data: {"comm":{"ct":24,"cv":0},"songinfo":{"method":"get_song_detail_yqq","param":{"song_type":0,"song_mid":songmid,"song_id":songid},"module":"music.pf_song_detail_svr"}},
    '-': 'getUCGI026778681766340462'
  })

  // return jsonp(url, data)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSongVkey(songmid) {
  const url = '/api/getSongVkey'
  const data = Object.assign({}, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq.json',
    g_tk: 5381,
    format: 'json',
    inCharset: 'utf8',
    loginUin: 1120996904,
    data: {"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"5655257600","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"5655257600","songmid":[songmid],"songtype":[0],"uin":"1120996904","loginflag":1,"platform":"20"}},"comm":{"uin":"1120996904","format":"json","ct":24,"cv":0}},
    '-': 'getplaysongvkey15237941371784092'
  })

  // return jsonp(url, data)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getDiscSongVkey(songmid) {
  const url = '/api/getSongVkey'
  const data = Object.assign({}, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq.json',
    g_tk: 2116745061,
    format: 'json',
    inCharset: 'utf8',
    loginUin: 1120996904,
    data: {"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"5655257600","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"5655257600","songmid":[songmid],"songtype":[0],"uin":"1120996904","loginflag":1,"platform":"20"}},"comm":{"uin":"1120996904","format":"json","ct":24,"cv":0}},
    '-': "getplaysongvkey2895679108157727"
  })

  // return jsonp(url, data)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}


export function getLyric(mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq.json',
    hostUin: 0,
    needNewCode: 0,
    pcachetime: +new Date(),
    inCharset: 'utf8',
    loginUin:0,
    format: 'json',
    '-': 'MusicJsonCallback_lrc',
    g_tk: 2116745061
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

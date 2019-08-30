import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  //https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?
  const data = Object.assign({}, commonParams, {
    g_tk: 2116745061,
    needNewCode: 0,
    platform: 'h5',
    inCharset: "utf8",
    loginUin: 1120996904
  })

  return jsonp(url, data, options)
}

export function search(query, page, zhida, perpage) {
  const url = '/api/getSearch'

  const data = Object.assign({}, commonParams, {
    w: query,
    p: page,
     perpage,
    // n: perpage,
    catZhida: zhida ? 1 : 0,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    format:'json',
    n:20,
    sem: 1,
    aggr: 0,
    remoteplace: 'txt.mqq.all',
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    //console.log(res.data)
    return Promise.resolve(res.data)
  })
}

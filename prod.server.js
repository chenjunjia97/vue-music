var express = require('express')
var config = require('./config/index')
const axios = require('axios')
const app = express()
const apiRoutes = express.Router()

apiRoutes.get('/api/getDiscList', function (req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg' // 原api
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/api/getDiscSong', function (req, res) {
  let disstid = req.query.disstid

  var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg' // 原api
  axios.get(url, {
    headers: {
      referer: `https://y.qq.com/n/yqq/playsquare/${disstid}.html`,
      host: 'y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/api/getSongVkey', function (req, res) {
    var url = 'https://u.y.qq.com/cgi-bin/musicu.fcg' // 原api
    axios.get(url, {
      headers: {
        referer: 'https://u.y.qq.com',
        host: 'u.y.qq.com'
      },
      params: req.query
    }).then((response) => {
      res.json(response.data)
    }).catch((e) => {
      console.log(e)
    })
  })

apiRoutes.get('/api/getSearch', function (req, res) {
    var url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp' // 原api
    axios.get(url, {
      headers: {
        Accept: 'application/json',
        referer: 'https://y.qq.com/m/index.html',
        origin:'https://y.qq.com'
      },
      params: req.query
    }).then((response) => {
      //console.log(response.data)
      res.json(response.data)
    }).catch((e) => {
      console.log(e)
    })
  })

apiRoutes.get('/api/lyric', function (req, res) {
    var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

    axios.get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: req.query
    }).then((response) => {
      var ret = response.data
      if (typeof ret === 'string') {
        var reg = /^\w+\(({[^()]+})\)$/
        var matches = ret.match(reg)
        if (matches) {
          ret = JSON.parse(matches[1])
        }
      }
      res.json(ret)
    }).catch((e) => {
      console.log(e)
    })
  })

app.use(apiRoutes)

app.use(express.static('./dist'))
var PORT = process.env.PORT || config.build.port

module.exports = app.listen(PORT, function (err) {
  if(err){
    console.log(err)
    return
  }
  console.log('listening at http://localhost:' + PORT+ '\n')
})

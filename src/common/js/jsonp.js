import originJSONP from 'jsonp'

export  default function  jsonp(url, data, option) {
  //url地址  data 是query字符串  option 配置
  return new Promise((resolve, reject) => {
         //判断传入的url有没有 data  没有就加个问好同时用param方法
    url += (url.indexOf('?') < 0 ? '?' : '&')+ param(data)

    originJSONP(url, option, (err, data) => {
      //url 是请求的地址里面包括了参数  option 是'jsonpCallback'
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function  param(data) {
    let url = ''
    for (var k in data){
      let value = data[k] !== undefined ?data[k] : ''
      url += `&${k}=${encodeURIComponent(value)}`
    }
    //判断 data是不是空的空的返回空串 否则就返回 a=b&c=d 类型的数据
    return url ? url.substring(1) : ""
  }


import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'

export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
  }
}

export function createSong(musicData, vkey) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url:`http://isure.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?fromtag=66&guid=5655257600&vkey=${vkey}`
  })
}
export function createDiscSong(songlist,vkey) {
  return new Song({
    id: songlist.id,
    mid: songlist.mid,
    singer: filterSinger(songlist.singer),
    name: songlist.name,
    album: songlist.album.name,
    duration: songlist.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${songlist.album.mid}.jpg?max_age=2592000`,
    url:`http://isure.stream.qqmusic.qq.com/C400${songlist.mid}.m4a?fromtag=66&guid=5655257600&vkey=${vkey}`    //根据qq音乐官网获取的url，部分音乐和全部vip音乐已失效
    //根据网上破解的url组合而成的url,可播放低品质的vip音乐
    // url:`http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/M500${songlist.songmid}.mp3?guid=2095717240&vkey=2745AE5CB7EBCCBB309DF3B3EDBA88B05C38CAA8CD390F657313CCD0C0D628EC3B99C661021FC134E75B8845D98FDBD1C127624CFFBCF2F0&uin=0&fromtag=53`
  })
}


function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}


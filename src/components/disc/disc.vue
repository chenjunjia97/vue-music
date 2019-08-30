<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs" ></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {getSongList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import {mapGetters} from 'vuex'
  import {createDiscSong} from 'common/js/song'
  import {getDiscSongVkey} from 'api/song'

  export default {
    computed: {
      title() {
        return this.disc.dissname
      },
      bgImage() {
        return this.disc.imgurl
      },
      ...mapGetters([
        'disc'
      ])
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getSongList()
    },
    methods: {
      _getSongList() {
        if (!this.disc.dissid) {
          this.$router.push('/recommend')
          return
        }
        getSongList(this.disc.dissid).then((res) => {

          if (res.code === ERR_OK) {
             //console.log(res.cdlist[0].songlist)
            // console.log(res.cdlist[0].songlist[0].album)
            this.songs = this._formatSongs(res.cdlist[0].songlist)
          }
        })
      },
      _formatSongs(list) {
        let result = []
        list.forEach((item) => {
          getDiscSongVkey(item.mid).then((res) => {
            //console.log(res)
            const vkey = res.req_0.data.midurlinfo[0].vkey;
            // console.log(vkey)
            if (item.name && item.album.name) {
              result.push(createDiscSong(item, vkey))
            }
          })
        })
       // console.log(result)
        return result
      }
      },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>

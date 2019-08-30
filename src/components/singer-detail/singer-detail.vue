<template>
  <transition name="slide">
    <music-list :songs="songs" :bg-image="bgImage" :title="title"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from 'api/singer'
  import {ERR_OK} from  'api/config'
  import {createSong} from 'common/js/song'
  import {getSongVkey} from "api/song";
  import MusicList from 'components/music-list/music-list'

  export default {

    data (){
      return {
          songs:[]
      }
    },

  computed: {
    //点击歌手的时候就往state里面的singer添加了对应的歌手对象
    ...mapGetters(['singer']),
      title() {
      return this.singer.name
      },
    bgImage() {
      return this.singer.avatar
    }
  },

  created() {
    this._getDetail()
    
  },
  methods: {
    _getDetail() {
      //没有singer的信息返回singer列表
      if (!this.singer.id){
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK){
          //console.log(res)
          this.songs = this._normalizeSongs(res.data.list)
           //console.log(this.songs)
        }
      })
    },

    _normalizeSongs(list){
      let ret = []
      list.forEach((item) => {
        let {musicData} =item
        //console.log(musicData)
        getSongVkey(musicData.songmid).then((res) => {
          if (res.code===ERR_OK) {

            const vkey = res.req_0.data.midurlinfo[0].vkey;
            if(musicData.songid && musicData.albummid){
              ret.push(createSong(musicData, vkey))
            }
          }
        })

      })
      return ret
    }

  },
    components: {
      MusicList
    }

}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

@import "~common/stylus/variable"



.slide-enter-active, .slide-leave-active
  transition: all 0.3s

.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)



</style>

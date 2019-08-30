<template>
  <transition name="slide">
    <div class="add-song"  @click.stop v-show="showFlag">
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="hide">
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="search-box-wrapper">
        <search-box ref="searchBox" placeholder="搜索歌曲" @query="onQueryChange"></search-box>
      </div>
      <div class="shortcut" v-show="!query">
        <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
        <div class="list-wrapper">
          <scroll class="list-scroll" ref="songList" v-if="currentIndex===0" :data="playHistory">
            <div class="list-inner">
              <song-list :songs="playHistory" @select="selectSong" :rank="false"></song-list>
            </div>
          </scroll>
          <scroll class="list-scroll" ref="searchList"  v-if="currentIndex===1" :data="searchHistory" :refreshDelay="refreshDelay">
            <div class="list-inner">
              <search-list @delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory"></search-list>
            </div>
          </scroll>
        </div>
      </div>
      <div class="search-result" v-show="query">
        <suggest :query="query" :showSinger="showSinger" @select="selectSuggest" @listScroll="blurInput"></suggest>
      </div>
      <top-tip ref="topTip">
        <div class="tip-title">
          <i class="icon-ok"></i>
          <span class="text">1首歌曲已经添加到播放队列</span>
        </div>
      </top-tip>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
     import SearchBox from 'base/search-box/search-box'
     import SongList from 'base/song-list/song-list'
     import SearchList from 'base/search-list/search-list'
     import Scroll from 'base/scroll/scroll'
     import Switches from 'base/switches/switches'
    import TopTip from 'base/top-tip/top-tip'
     import Suggest from 'components/suggest/suggest'
     import {searchMixin} from 'common/js/mixin'
     import {mapGetters, mapActions} from 'vuex'
     import Song from 'common/js/song'

  export default {
    mixins: [searchMixin],
    data() {
      return {
        showFlag: false,
        showSinger: false,
        currentIndex: 0,
        songs: [],
        switches: [
          {
            name: '最近播放'
          },
          {
            name: '搜索历史'
          }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'playHistory'
      ])
    },
    methods: {
      show() {
        this.showFlag = true
        setTimeout(() => {
          if (this.currentIndex === 0) {
            this.$refs.songList.refresh()
          } else {
            this.$refs.searchList.refresh()
          }
        }, 20)
      },
      hide() {
        this.showFlag = false
      },

      selectSong(song, index) {
        if (index !== 0) {  //为什么要不等于0 也就是第一首歌不添加呢 因为addsong组件的显示是要player的显示 player的显示又要有播放列表 播放列表又需要你播放过一首歌曲才有，也就是第一首歌其实就是现在正在播放的歌曲
          this.insertSong(new Song(song))  //因为这个是从localstorage里面获得的不是song的实例没法获取歌词所以得new一个song出来
          this.$refs.topTip.show()
        }
      },
      selectSuggest() {
        this.$refs.topTip.show()
        this.saveSearch()
      },
      switchItem(index) {
        this.currentIndex = index
      },
      ...mapActions([
        'insertSong'
      ])
    },
    components: {
         SearchBox,
         SongList,
         SearchList,
         Scroll,
         Switches,
         TopTip,
         Suggest
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .add-song
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 200
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .header
      position: relative
      height: 44px
      text-align: center
      .title
        line-height: 44px
        font-size: $font-size-large
        color: $color-text
      .close
        position: absolute
        top: 0
        right: 8px
        .icon-close
          display: block
          padding: 12px
          font-size: 20px
          color: $color-theme

    .search-box-wrapper
      margin: 20px
    .shortcut
      .list-wrapper
        position: absolute
        top: 165px
        bottom: 0
        width: 100%
        .list-scroll
          height: 100%
          overflow: hidden
          .list-inner
            padding: 20px 30px
    .search-result
      position: fixed
      top: 124px
      bottom: 0
      width: 100%
    .tip-title
      text-align: center
      padding: 18px 0
      font-size: 0
      .icon-ok
        font-size: $font-size-medium
        color: $color-theme
        margin-right: 4px
      .text
        font-size: $font-size-medium
        color: $color-text
</style>

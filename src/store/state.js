import {playMode} from 'common/js/config'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'

const state = {
  singer: {},
  //播放器的状态
  playing: false,
  fullScreen: false,  //是否全屏
  playlist: [],   //播放列表  播放随机的时候  这个与下面的那个sequenceList的顺序就不同
  sequenceList: [],  //顺序列表
  mode: playMode.sequence,
  currentIndex: -1,  //用playlist  加这个index 就能算到currentsong
   disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
   favoriteList:loadFavorite()
}

export default state

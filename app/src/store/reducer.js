import * as types from './actionTypes'

// 给一个初始的 state 树
const defaultState = {
  // 当前展示的歌曲列表
  musicList: null,

  // 是否展示当前歌曲列表
  showMusicList: false,

  // 控制歌手详情的显示
  showSingerInfo: false,

  // 歌手详情
  singerInfo: null,

  // 当前播放的歌曲
  currentMusic: {
    id: 442009238,
    musicName: '上野公园',
    musicUrl: '',
    imgUrl:
      'http://p2.music.126.net/64JozXeLm7ErtXpwGrwwEw==/109951162811190850.jpg',
    singers: [{
      id: 12195169,
      name: 'Atta Girl'
    }],
    album: {
      id: null,
      name: 'Everyone Loves You When You Were Still A Kid'
    } 
  }
}

export default (state = defaultState, action) => {
  if(action.type === types.CHANGE_CURRENT_MUSIC_LIST){
    const newState = deepCopy(state)
    newState.musicList = action.value
    console.log(action.value)
    if(action.value){
      newState.showMusicList = true
    }
    return newState
  }
  return state
}

function deepCopy (val) {
  return JSON.parse(JSON.stringify(val));
}
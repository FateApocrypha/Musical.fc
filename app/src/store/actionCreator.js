
import * as types from './actionTypes';
import { getMusicUrl, getMusicLyric, getSingerInfo, getAlbumInfo, getMusicDetail, getMusicListDetail } from '../api';
import { findIndex } from '../commons/js/utils';


export const getChangeCurrentMusicListAction = (value) => {
  return {
    type: types.CHANGE_CURRENT_MUSIC_LIST,
    value
  }
}
/**
 * 切换当前播放列表
 */
export const getChangePlayListAction = (value) => {
  return {
    type: types.CHANGE_PLAY_LIST,
    value
  }
}
/**
 * 改变播放状态
 */
export const getChangePlayingStatusAction = (status) => {
  return {
    type: types.CHANGE_PLAYING_STATUS,
    status
  }
}
/**
 * 改变当前播放索引
 */
export const getChangeCurrentIndex = (index) => ({
  type: types.CHANGE_CURRENT_INDEX,
  index
})
/**
 * 改变当前播放歌曲信息
 * @param {Object} value
 */
export const changeCurrentMusicAction = (value) => ({
  type: types.CHANGE_CURRENT_MUSIC,
  value
});

// 获取歌单详情
export const getMusicListDetailAction = (id) => {
  return dispatch => {
    // dispatch(getChangeShowLoadingAction(true));
    getMusicListDetail(id)
    .then(({ data }) => {
       // 将歌单传入 redux 中的 musicList
      data.playlist.tracks = formatMusicListTracks(data.playlist.tracks);
      // 改变当前歌单列表
      console.log(data.playlist)
      dispatch(getChangeCurrentMusicListAction(data.playlist))
    })
    .catch((err) => {

    })
  }
}
// 
export const getChangeCurrentMusic = (value, loadCacheMusic = false) => {
  return (dispatch, getState) => {
    const state = getState()
    const list = state.playList
    // 从歌曲列表中寻找当前歌曲的 index
    const index = findIndex(list, value)
    // 当点击的歌曲是正在播放的歌曲，直接返回
    if (index === state.currentIndex && !loadCacheMusic) {
      return
    }
    if (index >= 0) {
      // 如果 index >= 0 就直接修改 currentIndex
      dispatch(getChangeCurrentIndex(index))
    } else {
      // 如果没有这首歌
      // 1. push 这首歌到 playList 中
      // 2. 改变 index
      list.push(value)
      dispatch(getChangePlayListAction(list))
      dispatch(getChangeCurrentIndex(list.length - 1))
    }
    dispatch(changeCurrentMusicAction(value))
    // dispatch(getCurrentMusicLyric())
    getMusicUrl(value.id).then(({ data: { data } }) => {
      if (!data[0].url) {
        // message.info('歌曲暂无版权，我帮你换首歌吧')
        if (index !== list.length - 1) {
          // dispatch(playNextMusicAction())
        }
        return
      }
      value.musicUrl = data[0].url
      dispatch(changeCurrentMusicAction(value))

      // 因为是打开程序的时候加载上次关闭的时候播放的歌，但是不能播放，所以需要暂停
      if (loadCacheMusic) {
        const STOP = false
        dispatch(getChangePlayingStatusAction(STOP))
      }

      // 搜索的歌曲会没有图片，所以去歌曲详情弄一张图片回来
      if (!value.imgUrl) {
        getMusicDetail(value.id).then(({data}) => {
          value.imgUrl = data.songs[0].al.picUrl
          dispatch(changeCurrentMusicAction(value))
        })
      }
    })
  }
}
function formatMusicListTracks (list) {
  return list.map((item) => {
    const singers = item.ar.map((item) => {
      return {
        id: item.id,
        name: item.name
      };
    });
    return {
      id: item.id,
      musicName: item.name,
      imgUrl: item.al.picUrl,
      singers,
      album: {
        id: item.al.id,
        name: item.al.name
      }
    };
  });
}
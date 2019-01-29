/**
 * 歌单列表展示组件
 * 用于展示所点击的歌单歌曲列表和相关的歌单信息
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { If } from 'react-if'
import {
  getChangePlayListAction,
  getChangeCurrentIndex,
  playNextMusicAction,
  getToggleCollectPlaylist
} from '../../store/actionCreator'
import SongList from '../SongList'
import './index.scss'
class MusicList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollToTop: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.musicList) {
      return;
    }
    // 当 musicList 发生改变的时候，滚动条置于最上层
    if (nextProps.musicList.id !== this.props.musicList.id) {
      this.setState(() => ({
        scrollToTop: true
      }));
    }
  }
  componentDidUpdate () {
    if (this.state.scrollToTop) {
      this.refs.musicList.scrollTo(0, 0);
      this.setState(() => ({
        scrollToTop: false
      }));
    }
  }
  render() {
    const musicList = this.props.musicList
    return (
      <div
        className={
          this.props.showMusicList && !this.props.showSingerInfo
          ? 'music-list-container'
          : 'hide-music-list-container'
        }
        ref="musicList"
      >
        <SongList 
          className="show-list-container"
          list={musicList ? musicList.tracks: []}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    musicList: state.musicList,
    showMusicList: state.showMusicList,
    showSingerInfo: state.showSingerInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeMusicList(value) {
      dispatch(getChangePlayListAction(value))
      dispatch(getChangeCurrentIndex(-1))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicList)
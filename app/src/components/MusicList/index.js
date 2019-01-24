/**
 * 歌单列表展示组件
 * 用于展示所点击的歌单歌曲列表和相关的歌单信息
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

class MusicList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div
        className={
          this.props.showMusicList && !this.props.showSingerInfo
          ? 'music-list-container'
          : 'hide-music-list-container'
        }
        ref="musicList"
      >
        {"歌单列表"}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    musicList: state.musicList,
    showMusicList: state.showMusicList,
    showSingerInfo: state.showSingerInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicList);
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { If, Then, Else } from 'react-if'
import {
  getChangeCurrentMusic,
  getAlbumInfoAction,
  getAddToLikeListAction
} from '../../store/actionCreator'
import { findIndex } from '../../commons/js/utils'
import './index.scss'
class SongList extends Component {
  

  renderMusicList = () => {
    return this.props.list.map((item, index) => {
      let count = index + 1;
      if (count < 10) {
        count = '0' + count;
      }
      return (
        <li key={item.id} className="list-li">
          <div className="count">{count}</div>
          <div className="music-name">
            <span
              className="highlight"
              onClick={() => this.props.handleChangeCurrentMusic(item)}
            >
              {item.musicName}
            </span>
          </div>
          <div className="singer-name">
            {/* <RenderSingrs singers={item.singers} /> */}
          </div>
          <div className="album-name">
            <span
              className="highlight"
              // onClick={() => this.props.handleGetAlbumInfo(item.album.id)}
            >
              {item.album.name}
            </span>
          </div>
          <div className="control-btn">
            {/* <If condition={findIndex(this.props.likesList, item) < 0}>
              <Then>
                <span
                  className="like-music"
                  // onClick={() => this.props.handleAddToLikeList(item)}
                >
                  <i
                    className="iconfont icon-will-love"
                    title="添加到我喜欢的音乐"
                  />
                </span>
              </Then>
              <Else>
                <span
                  className="dislike-music"
                  // onClick={() => this.props.handleAddToLikeList(item)}
                >
                  <i className="iconfont icon-love" title="不喜欢这首歌啦~" />
                </span>
              </Else>
            </If> */}
          </div>
        </li>
      );
    });
  }
  render(){
    return (
      <div className="show-list-container">
        <ul>
          <If condition={this.props.showTitle}>
            <li className="title">
              <div className="count" />
              <div className="music-name">
                <span>歌曲名</span>
              </div>
              <div className="singer-name">
                <span>歌手</span>
              </div>
              <div className="album-name">
                <span>专辑</span>
              </div>
            </li>
          </If>
          {this.renderMusicList()}
        </ul>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    playList: state.playList,
    likesList: state.collector ? state.collector.foundList[0].tracks : null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChangeCurrentMusic (item) {
      dispatch(getChangeCurrentMusic(item))
    },
  }
}
SongList.defaultProps = {
  showTitle: true
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongList)
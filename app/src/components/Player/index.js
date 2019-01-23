import React, {
  Component
} from 'react';
import { withRouter } from 'react-router-dom';
import { If, Then, Else } from 'react-if';
import { PLAY_MODE_TYPES } from '../../commons/js/config';
import { findIndex, imageRatio, format } from '../../commons/js/utils.js';
import './index.scss';
import ProgressBar from '../ProgressBar';
class Player extends Component {

  componentWillReceiveProps ({ playing }) {
    if (!playing) {
      this.refs.audio.pause();
    }
  }
  volumeChange = () => {}
  handleShowMusicDetial = () => {}
  percentChange = () => {}
  percentChangeEnd = () => {}
  // 渲染播放控制器
  renderPlayerControl() {
    return (
      <div className="player-control-container">
        <div className="play-control-btn">
          <div className="prev-music">
            <i className="iconfont icon-prev"
              // onClick={this.props.playPrevMusic}
            />
          </div>
          <div className="play">
            <If condition={this.props.playing}>
              {/* 如果正在播放，显示暂停按钮 */}
              <Then>
                <i className="iconfont icon-stop"
                  // onClick={() =>
                  //   this.handleChangePlayingStatus(PLAYING_STATUS.paused)
                  // }
                />
              </Then>
              {/* 如果音乐暂停，显示播放按钮 */}
              <Else>
                <i className="iconfont icon-bofangicon"
                  // onClick={() =>
                  //   this.handleChangePlayingStatus(PLAYING_STATUS.playing)
                  // }
                />
              </Else>
            </If>
          </div>
          <div className="next-music">
            <i className="iconfont icon-test"
              // onClick={this.props.playNextMusic}
            />
          </div>
        </div>
      </div>
    )
  }
  // 渲染关注，播放顺序，播放历史列表
  renderExtraControl() {
    return (
      <div className="right-control-btn">
        <i className="iconfont icon-list"
          // onClick={this.handleShowPlayList}
        />
        <div className="change-play-mode">
          <i className={[
              'iconfont icon-next',
              // this.props.playMode === PLAY_MODE_TYPES.SEQUENCE_PLAY
              //   ? ''
              //   : 'hide'
            ].join(' ')}
            // onClick={() =>
            //   this.props.changePlayMode(PLAY_MODE_TYPES.RANDOM_PLAY)
            // }
          />
          <i className={[
              'iconfont icon-loop',
              this.props.playMode === PLAY_MODE_TYPES.LOOP_PLAY
                ? ''
                : 'hide'
            ].join(' ')}
            // onClick={() =>
            //   this.props.changePlayMode(PLAY_MODE_TYPES.SEQUENCE_PLAY)
            // }
          />
          <i className={[
              'iconfont icon-random',
              this.props.playMode === PLAY_MODE_TYPES.RANDOM_PLAY
                ? ''
                : 'hide'
            ].join(' ')}
            // onClick={() =>
            //   this.props.changePlayMode(PLAY_MODE_TYPES.LOOP_PLAY)
            // }
          />
        </div>
      </div>
    )
  }
  render() {

    return (
      <div className="player-container">
        <div className="player-left-container">
          <div className="music-img" onClick={this.handleShowMusicDetial}>
            {/* <img src={currentMusic ? currentMusic.imgUrl + imageRatio(64) : ''} alt="" /> */}
          </div>
          <div className="music-info">
            <p className="music-name" onClick={this.handleShowMusicDetial}>
              {/* {currentMusic ? currentMusic.musicName : ''} */}
              {'以父之名'}
              <If condition={true}>
                <Then>
                  <span className="like-music" 
                    // onClick={() => this.props.handleAddToLikeList(currentMusic)}
                    >
                    <i className="iconfont icon-will-love" title="添加到我喜欢的音乐"></i>
                  </span>
                </Then>
                <Else>
                  <span className="dislike-music" 
                    // onClick={() => this.props.handleAddToLikeList(currentMusic)}
                    >
                    <i className="iconfont icon-love" title="不喜欢这首歌啦~"></i>
                  </span>
                </Else>
              </If>
            </p>
            <p className="singer-name">
              {/* {currentMusic ? <RenderSingers singers={currentMusic.singers} /> : ''} */}
              {'周杰伦'}
            </p>
          </div>
        </div>
        <div className="player-middle-container">
          {
            this.renderPlayerControl()
          }
          <div className="progress-bar-group">
            <div className="play-time">
              <span className="current-time">
                {/* {format(this.props.currentTime)} */}
                {'00:20'}
              </span>
            </div>
            <div className="progress-bar-container">
              <ProgressBar
                percent={0.5}
                percentChange={this.percentChange}
                percentChangeEnd={this.percentChangeEnd}
              />
            </div>
            <div className="play-time">
              <span className="duration">{"03:20"}</span>
            </div>
          </div>
        </div>
        <div className="player-right-container">
          {
            this.renderExtraControl()
          }
          <div className="audio-volume">
            <i className="iconfont icon-volume-up" />
            <ProgressBar
              percent={1}
              percentChange={this.volumeChange}
              percentChangeEnd={this.volumeChange}
            />
          </div>
        </div>
      </div>
    )
  }
}
export default Player
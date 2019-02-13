import React, {
  Component
} from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { If, Then, Else } from 'react-if'
import { PLAY_MODE_TYPES } from '../../commons/js/config'
import { findIndex, imageRatio, format } from '../../commons/js/utils.js'
import { getChangePlayingStatusAction, playNextMusicAction, playPrevMusicAction, getChangePlayModeAction } from '../../store/actionCreator'
import ProgressBar from '../ProgressBar'
import PlayList from '../PlayList'
import './index.scss'

const DEFAULT_TIME = 0
export const PLAYING_STATUS = {
  PAUSED: false,
  PLAYING: true
}
class Player extends Component {
  constructor(props){
    super(props)

    this.state = {
      duration: DEFAULT_TIME,
      currentTime: DEFAULT_TIME,
      move: false,
      percent: 0,
      showPlayList: false
    }
  }
  componentWillReceiveProps ({ playing }) {
    if (!playing) {
      this.refs.audio.pause()
    }
  }
  volumeChange = () => {}
  handleShowMusicDetial = () => {}
  percentChange = (percent) => {
    if (this.props.showMusicDetail) {
      const currentTime = this.state.duration * percent;
      this.refs.musicDetail.seek(currentTime);
    }
    this.setState(() => {
      return {
        percent,
        move: true
      }
    })
  }
  percentChangeEnd = (percent) => {
    const currentTime = this.state.duration * percent
    this.refs.audio.currentTime = currentTime
    if(this.props.showMusicDetail){
      this.refs.musicDetail.seek(currentTime)
    }
    this.setState(() => {
      return {
        percent,
        currentTime,
        move: false
      }
    })
  }
  handleUpdateTime = () => {}
  handlePlayNextMusic = () => {

  }
  // 音乐播放触发 audio 标签的 updatetime 事件
  // 这个时候获取 currentTime 得到音乐的时间
  handleUpdateTime = (e) => {
    if (this.state.move) {
      return
    }
    const { currentTime, duration } = e.target
    let percent = Math.floor((currentTime / duration) * 1000) / 1000
    if (isNaN(percent)) {
      percent = 0
    }
    this.setState(() => {
      return {
        currentTime,
        percent,
        duration
      }
    })
  }
  // 展示当前播放列表
  handleShowPlayList = () => {
    if(!this.state.showPlayList) {
      document.addEventListener('click', this.handleShowPlayList)
    } else {
      document.removeEventListener('click', this.handleShowPlayList)
    }
    this.setState((prevState) => ({
      showPlayList: !prevState.showPlayList
    }), 
    () => {
      this.refs.playList.scrollToCurrentMusic()
    })
  }
  // 改变当前播放动态
  handleChangePlayingStatus = (status) => {
    if(this.props.playList && this.props.playList.length === 0){
      return
    }
    this.props.changePlayingStatus(status)
    const audio = this.refs.audio
    if(status === PLAYING_STATUS.PLAYING){
      audio.play()
    } else {
      audio.pause()
    }

  }
  // 渲染播放控制器
  renderPlayerControl() {
    return (
      <div className="player-control-container">
        <div className="play-control-btn">
          <div className="prev-music">
            <i className="iconfont icon-prev"
              onClick={this.props.playPrevMusic}
            />
          </div>
          <div className="play">
            <If condition={this.props.playing}>
              {/* 如果正在播放，显示暂停按钮 */}
              <Then>
                <i className="iconfont icon-stop"
                  onClick={() =>
                    this.handleChangePlayingStatus(PLAYING_STATUS.PAUSED)
                  }
                />
              </Then>
              {/* 如果音乐暂停，显示播放按钮 */}
              <Else>
                <i className="iconfont icon-bofangicon"
                  onClick={() =>
                    this.handleChangePlayingStatus(PLAYING_STATUS.PLAYING)
                  }
                />
              </Else>
            </If>
          </div>
          <div className="next-music">
            <i className="iconfont icon-test"
              onClick={this.props.playNextMusic}
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
          onClick={this.handleShowPlayList}
        />
        <div className="change-play-mode">
          <i className={[
              'iconfont icon-next',
              this.props.playMode === PLAY_MODE_TYPES.SEQUENCE_PLAY
                ? ''
                : 'hide'
            ].join(' ')}
            onClick={() =>
              this.props.changePlayMode(PLAY_MODE_TYPES.RANDOM_PLAY)
            }
          />
          <i className={[
              'iconfont icon-loop',
              this.props.playMode === PLAY_MODE_TYPES.LOOP_PLAY
                ? ''
                : 'hide'
            ].join(' ')}
            onClick={() =>
              this.props.changePlayMode(PLAY_MODE_TYPES.SEQUENCE_PLAY)
            }
          />
          <i className={[
              'iconfont icon-random',
              this.props.playMode === PLAY_MODE_TYPES.RANDOM_PLAY
                ? ''
                : 'hide'
            ].join(' ')}
            onClick={() =>
              this.props.changePlayMode(PLAY_MODE_TYPES.LOOP_PLAY)
            }
          />
        </div>
      </div>
    )
  }
  render() {
    const { currentMusic } = this.props
    return (
      <div className="player-container">
        <div className="player-left-container">
          <div className="music-img" onClick={this.handleShowMusicDetial}>
            <img src={currentMusic ? currentMusic.imgUrl + imageRatio(64) : ''} alt="" />
          </div>
          <div className="music-info">
            <p className="music-name" onClick={this.handleShowMusicDetial}>
              {currentMusic ? currentMusic.musicName : ''}
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
                {format(this.state.currentTime)}
                {/* {'00:20'} */}
              </span>
            </div>
            <div className="progress-bar-container">
              <ProgressBar
                percent={this.state.percent}
                percentChange={this.percentChange}
                percentChangeEnd={this.percentChangeEnd}
              />
            </div>
            <div className="play-time">
              <span className="duration">{format(this.state.duration)}</span>
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
        <div
          className={`${
            this.state.showPlayList ? '' : 'hide-play-list'
          } play-list-container`}
        >
          <PlayList ref="playList" showPlayList={this.state.showPlayList}/>
        </div>
        <audio
          autoPlay
          src={currentMusic ? currentMusic.musicUrl : ''}
          ref="audio"
          onTimeUpdate={this.handleUpdateTime}
          onEnded={this.handlePlayNextMusic}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    playing: state.playing,
    currentMusic: state.currentMusic,
    playList: state.playList,
    playMode: state.playMode
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePlayingStatus(status) {
      dispatch(getChangePlayingStatusAction(status))
    },
    playNextMusic() {
      dispatch(playNextMusicAction())
    },
    playPrevMusic() {
      dispatch(playPrevMusicAction())
    },
    changePlayMode(value) {
      dispatch(getChangePlayModeAction(value))
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Player)
)
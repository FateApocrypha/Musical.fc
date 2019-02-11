import React, { Component } from 'react'
import { connect } from 'react-redux'
import { If, Then, Else } from 'react-if'
import './index.scss'
class PlayList extends Component {

  scrollToCurrentMusic = () => {
    if(this.props.playList.length === 0) {
      return
    }
    const distance = this.props.currentIndex * 51
    this.refs.playListUl.scrollTo(0, distance)
  }
  renderPlayList() {
    return this.props.playList.map((item, index) => {
      return (
        <li className="" key={item.id}>

        </li>
      )
    })
  }
  render(){
    const length = this.props.playList.length
    return (
      <div 
        className="play-list"
        onClick={(e) => { e.nativeEvent.stopImmediatePropagation() }}
      >
        <div className="list-info">
          <span className="music-count">共 {length} 首</span>
          <span className="delete">全部清空</span>
        </div>
        <If condition={length === 0}>
          <Then>
            <div className="empty-list">你没有添加的歌曲</div>
          </Then>
          <Else>
            <ul ref="playListUl">
              {this.renderPlayList()}
            </ul>
          </Else>
        </If>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    playList: state.playList
  }
}
const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(PlayList)
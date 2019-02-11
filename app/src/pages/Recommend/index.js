import React, {
  Component
} from 'react';
import {
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../../components/Loading';
import { getRecommendList } from '../../api/index';
import {
  imageRatio,
  formatPlayCount
} from '../../commons/js/utils'
import {
  getChangeCurrentMusicListAction,
  getMusicListDetailAction
} from '../../store/actionCreator';
import './index.scss';
class Recommend extends Component {
  constructor (props) {
    super(props);
    this.state = {
      recommendList: [],
      gotRecomment: false,
      showLoading: true
    }
  }

  componentWillMount() {
    this.handleGetRecommendList()
  }

  handleGetRecommendList = (updateTime = null) => {
    getRecommendList(updateTime)
    .then(({data}) => {
      if(data.playList && data.playList.length === 0){
        // message.info('已经到底啦~');
        this.setState(() => ({
          gotRecommend: false,
          showLoding: false
        }));
        return;
      }
      this.setState((prevState) => ({
        recommendList: prevState.recommendList.concat(data.playlists),
        gotRecommend: false,
        showLoding: false
      }))
    })
    .catch(err => {})
  }
  // 列表滚动
  handleScroll = () => {
    const recommendList = this.refs.recommendList
    const scrollAtBottom = recommendList.scrollHeight - (recommendList.scrollTop + recommendList.clientHeight) === 0
    if(scrollAtBottom && !this.state.gotRecommend) {
      this.setState(() => ({
        gotRecommend: true,
        showLoding: false
      }), ()=> {
        const index = this.state.recommendList.length - 1
        this.handleGetRecommendList(this.state.recommendList[index].updateTime)
      })
    }
  }
  // 渲染推荐列表
  renderRecommendList() {
    let {
      recommendList
    } = this.state
    return recommendList.map((item) => {
      return (
        <li key={item.id}>
          <div
            className="list-img-container"
            onClick={() => this.props.handleGetMusicListDetail(item.id)}
          >
            <i className="iconfont icon-play" />
            <img className="list-img" src={item.coverImgUrl + imageRatio(153)} alt="" />
            <div className="played-counts">
              <i className="iconfont icon-erji" />
              <span>{formatPlayCount(item.playCount)}</span>
            </div>
            <div className="shadow" />
          </div>
          <p className="list-name">{item.name}</p>
        </li>
      );
    });
  }
  render () {
    return (
      <div
        className = {
          [
            'recommend-container',
            this.props.showMusicList || this.props.showSingerInfo ?
            'hide-recommend-container' :
            ''
          ].join(' ')
        }
      >
        <ul 
        className="recommend-list"
        onScroll={this.handleScroll}
        ref="recommendList"
        >
          {this.renderRecommendList()}
          {this.state.showLoading && <Loading />}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    showMusicList: state.showMusicList,
    showSingerInfo: state.showSingerInfo
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleChangeCurrentMusicList(list) {
      dispatch(getChangeCurrentMusicListAction(list))
    },
    handleGetMusicListDetail(id) {
      dispatch(getMusicListDetailAction(id))
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Recommend)
)
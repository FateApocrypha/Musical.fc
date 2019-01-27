import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'

import './App.scss'
import Header from './components/Header/index'
import Player from './components/Player'
import MusicList from './components/MusicList'

import Recommend from './pages/Recommend'
import Search from './pages/Search'
import Title from './renderer/components/Title'
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <MusicList />
          <Player />
          <div className="app-background" />
          <div className="play-container">
            <div className="play-side">
              {"菜单"}
            </div>
            {/* exact 路径完全相等的时候才显示路由内的内容 */}
            <Route exact path="/" component={Recommend} />
            <Route path="/search" component={Search} />
          </div>
          <Title />
        </div>
      </Router>
    )
  }
}

export default App

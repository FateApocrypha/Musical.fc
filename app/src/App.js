import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import Recommend from './pages/Recommend'
import Search from './pages/Search'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="app-background" />
          {/* exact 路径完全相等的时候才显示路由内的内容 */}
          <Route exact path="/" component={Recommend} />
          <Route path="/search" component={Search} />
        </div>
      </Router>
    );
  }
}

export default App;

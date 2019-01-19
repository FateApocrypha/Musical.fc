import React, {
  Component
} from 'react';
import './index.scss'
const {remote} = window.require('electron');
const currentWindow = remote.getCurrentWindow();

class Title extends Component {

  render() {
    return (
      <div className="title" onDoubleClick = {() => currentWindow.minimize()}>
        <div className="title-btn-group">
        </div>
      </div>
    )
  }
}

export default Title
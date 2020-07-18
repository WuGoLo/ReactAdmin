import React, { Component } from 'react';
import { Divider } from 'antd';

class App extends Component {
  render() {
    return (
      <div style={{height: '100%'}}>
        {this.props.children}
      </div>
    )
  }
}

export default App
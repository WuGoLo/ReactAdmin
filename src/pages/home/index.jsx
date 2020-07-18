import React, { Component } from 'react'

const content = { width: '100%', height: '500px', backgroundColor: '#fff', margin: '16px', textAlign: 'center'}

class Home extends Component {
  render() {
    return (
      <div style={content}>这是首页内容</div>
    )
  }
}

export default Home
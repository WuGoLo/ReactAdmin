import React, { Component } from 'react';
import {Row , Col} from 'antd'

import Utiles from '@/utils/filters'

import headerStyle from './index.module.scss'
let {
  header, header_top, header_botm
} = headerStyle


class Header extends Component {
  state = {  }
  componentWillMount() {
    this.setState({
      userName: '凌宇'
    })
    setInterval(() => {
      let currentTime = Utiles.formatDate(new Date().getTime())
      this.setState({currentTime})
    }, 1000)
  }
  render() { 
    return ( 
      <div className={header}>
        <Row className={header_top}>
          <Col span="23">欢迎，{ this.state.userName }</Col>
          <Col span="1">
            <a href="">退出</a>
          </Col>
        </Row>
        <Row className={header_botm}>
          <Col span="4">首页</Col>
          <Col span="20" style={{textAlign: "right"}}>
            <span style={{marginRight: "30px"}}>{this.state.currentTime}</span>
            <span>晴转多云</span>
          </Col>
        </Row>
      </div>
    );
  }
}
 
export default Header;
import React, { Component } from 'react';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

import { NavLink } from 'react-router-dom'
const { SubMenu } = Menu;

import siderStyle from './index.module.scss'

import menuData from '@/data/menuConfig'

class Sider extends Component {
  componentWillMount() {
    let dataNode = this.renderMenu(menuData)
    this.setState({dataNode})
  }
  state = { 
    // data: []
  }
  renderMenu(menuData) {
    return menuData.map((item) => {
      if(item.children) {
        return (
          <SubMenu key={item.key} title={item.title}>
            { this.renderMenu(item.children) }
          </SubMenu>
        )
      }
    return <Menu.Item key={item.key} title={item.title}>
            <NavLink to={item.key}>{item.title}</NavLink>
          </Menu.Item>
    })
  }
  handleClick =(e)=> {

  }
  render() { 
    return ( 
      <div style={{height: '100%'}}>
        <a href="#" className={siderStyle.logo}>
          <img src="#" alt="logo"/>
        </a>
        <Menu onClick={ this.handleClick } mode="vertical" theme="dark">
          { this.state.dataNode }
        </Menu>
      </div>
    );
  }
}
 
export default Sider;
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Sider from '@/layout/Sider'
import Header from '@/layout/Header'
import Footer from '@/layout/Footer'

import adminStyle from '@/assets/css/admin.module.scss'

class Admin extends Component {
  state = {  }
  render() { 
    return (
      <Row className={adminStyle.page}>
        <Col flex='320px' className={adminStyle.sider}>
          <Sider></Sider>
        </Col>
        <Col flex='auto' className={adminStyle.center}>
          <Row className={adminStyle.header}>
            <Header></Header>
          </Row>
          <Row>
            { this.props.children }
          </Row>
          <Row className={adminStyle.footer}>
            <Footer></Footer>
          </Row>
        </Col>
      </Row>
    );
  }
}
 
export default Admin;
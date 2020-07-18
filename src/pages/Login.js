import React, { Component } from 'react';

import { Card, Form, Input, Icon, Button, Checkbox } from 'antd';

const loginBox = {height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee'}
const FormItem = Form.Item

const loaction = location.href

class Login extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('这是表单的值集: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={loginBox}>
        <Card title="登录" bordered={false} style={{width: 500}} headStyle={{textAlign: "center"}} bodyStyle={{marginTop: 20}}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入用户名"
                />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入密码"
                />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>记住密码</Checkbox>)}
              <a style={{float: "right"}} href="">
                忘记密码
              </a>
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" style={{display: "block", width: "100%"}}>
                登录
              </Button>
              <a href={loaction + 'register'} style={{float: "right"}}>注册</a>
            </FormItem>
          </Form>
        </Card>
      </div>

    )
  }
}

export default Form.create({ name: 'normal_login' })(Login);
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, AutoComplete, Row, Col, Button, Checkbox } from 'antd'

const FormItem = Form.Item
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
// 模拟级联地址
const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

class Register extends Component {

  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  // 提交表单
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(!err) {
        console.log('注册表单值集：' + values)
      }
    })
  }
  // 校验密码
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  // 确认密码blur事件
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  // 确认密码校验
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };
  // 网址改变事件
  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  render() {

    const { getFieldDecorator } = this.props.form // 获取表单对象值集
    const { autoCompleteResult } = this.state; // 网址数据
    const formItemLayout = { // 表单布局配置
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    // 电话号码前置内容
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );
    // 网址格式化
    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));
    // 没有label的样式
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 4,
        },
      },
    };
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee', padding: 20}}>
        <Card title="注册" bordered={false} bodyStyle={{width: 900}}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <FormItem label="邮箱">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="密码" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password />)}
            </FormItem>
            <FormItem label="确认密码" hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </FormItem>
            <FormItem
              label={
                <span>
                  昵称&nbsp;
                  <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
              >
                {getFieldDecorator('nickname', {
                  rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                })(<Input />)}
            </FormItem>
            <FormItem label="常居地址">
              {getFieldDecorator('residence', {
                initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                rules: [
                  { type: 'array', required: true, message: 'Please select your habitual residence!' },
                ],
              })(<Cascader options={residences} />)}
            </FormItem>
            <FormItem label="电话号码">
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: 'Please input your phone number!' }],
              })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
            </FormItem>
            <FormItem label="网址">
              {getFieldDecorator('website', {
                rules: [{ required: true, message: 'Please input website!' }],
              })(
                <AutoComplete
                  dataSource={websiteOptions}
                  onChange={this.handleWebsiteChange}
                  placeholder="website"
                >
                  <Input />
                </AutoComplete>,
              )}
            </FormItem>
            <FormItem label="验证码" extra="We must make sure that your are a human.">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator('captcha', {
                    rules: [{ required: true, message: 'Please input the captcha you got!' }],
                  })(<Input />)}
                </Col>
                <Col span={12}>
                  <Button>获取验证码</Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(
                <Checkbox>
                  I have read the <a href="">agreement</a>
                </Checkbox>,
              )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Form.create({ name: 'register' })(Register);
import React,{ Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import './style.css';

//引入axios进行ajax请求
import axios from 'axios';
import  memeryUtil from '../../utils/memeryUtil';
import storage from '../../utils/storageUtil';

//表单引入
import { Form, Icon, Input, Button, Checkbox ,message } from 'antd';

class NormalLoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      submitable: true,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeSubmitable = this.changeSubmitable.bind(this);
  }

  /** 
   * 表单提交事件相应
   */
  handleSubmit = e => {
    e.preventDefault(); //阻止默认事件
   

    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(this.state.submitable === false ) {
          message.error('不要重复提交表单',2);
          return false;
        }
        this.changeSubmitable(false);

        //发送post请求，提交表单信息
        // axios.post('/api/login', {
        //   username: values.username,
        //   password: values.password
        // })
        axios.get('/api/login').then( res=> {
          const data = res.data;
          if(data.status === 1) {
            message.success('登陆成功',this.changeSubmitabl);
            memeryUtil.user['id'] = data.data.id;
          }else {
            message.error(data.message,this.changeSubmitable);
          }
         
        }).catch(err => {
          message.error(err.message,this.changeSubmitable);
        });
      }
    });
  };

  changeSubmitable( able ) {
    this.setState({
      submitable: able || !this.state.submitable
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <Link className="login-form-forgot" to="/login">
            Forgot password
          </Link>
          <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'280px'}}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

/**
 * 将 redux 管理的 state 传给 组件的props
 */
const mapState = (state)=> {
  return {

  }
};

/**
 * 将 操作 state的 函数传给组件的props 
 */
const mapDispatch = (dispatch)=> {
  return {

  }
};




// const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitable: true,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeSubmitable = this.changeSubmitable.bind(this);
  }

  /** 
   * 表单提交事件相应
   */
  handleSubmit = e => {
    e.preventDefault(); //阻止默认事件

    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(this.state.submitable === false ) {
          message.error('不要重复提交表单',2);
          return false;
        }
        this.changeSubmitable(false);


        //发送post请求，提交表单信息
        // axios.post('/api/login', {
        //   username: values.username,
        //   password: values.password
        // })
        axios.get('/api/login').then( res=> {
          const data = res.data;
          if(data.status === 1 ) {
            message.success('登陆成功',this.changeSubmitabl);
            memeryUtil.user['id'] = data.data.id;
            this.setState({
              logined: true
            });
          }else {
            message.error(data.message,this.changeSubmitable);
          }
          
        }).catch(err => {
          message.error(err.message,this.changeSubmitable);
        });
      }
    });
  };

  changeSubmitable( able ) {
    this.setState({
      submitable: able || !this.state.submitable
    })
  }


    render () {
        const user = memeryUtil.user;       //用户登陆信息， 如果登陆就 跳转到别处
        if(user && user.id) {
          return <Redirect to="/main" />
        }

        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                {/* <Breadcrumb style={{ margin: '16px 0' }}>
                   <Breadcrumb.Item>login</Breadcrumb.Item>
                   <Breadcrumb.Item>user</Breadcrumb.Item>
                   <Breadcrumb.Item>tom</Breadcrumb.Item>
                </Breadcrumb> */}
                <div className="login-page">
                    <div className="meng">
                        <div className="inner">
                            <h2 style={{color:'#FFFFFFFF',textAlign:'center'}}>——————  Welcome!  ——————</h2>
                            <div style={{width:'380px',height:'280px',margin:'0px auto',padding:'20px 0px',backgroundColor:'#FFFFFFFF'}}>
                                <div style={{width:'280px',margin:'0px auto',backgroundColor:'#FFFFFFFF'}}>
                                
                                <Form onSubmit={this.handleSubmit} className="login-form">
                                  <Form.Item>
                                    {getFieldDecorator('username', {
                                      rules: [{ required: true, message: 'Please input your username!' }],
                                    })(
                                      <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                      />,
                                    )}
                                  </Form.Item>
                                  <Form.Item>
                                    {getFieldDecorator('password', {
                                      rules: [{ required: true, message: 'Please input your Password!' }],
                                    })(
                                      <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                      />,
                                    )}
                                  </Form.Item>
                                  <Form.Item>
                                    {getFieldDecorator('remember', {
                                      valuePropName: 'checked',
                                      initialValue: true,
                                    })(<Checkbox>Remember me</Checkbox>)}
                                    <Link className="login-form-forgot" to="/login">
                                      Forgot password
                                    </Link>
                                    <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'280px'}}>
                                      Log in
                                    </Button>
                                  </Form.Item>
                                </Form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            
        )
    }
}


export default Form.create({ name: 'normal_login' })(Login);
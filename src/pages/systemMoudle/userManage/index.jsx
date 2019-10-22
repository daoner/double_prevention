import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import axios from 'axios';
import { Breadcrumb, Table, Tag, Divider, Button, Icon, Modal, message, Select,  Input, Form } from 'antd';
import './style.css';


const dataSource = [
    {
        userId: '1',
        userName: '胡彦斌',
        roleName: '普通用户',
        deptId: '1'
    },
    {
      userId: '2',
      userName: '胡彦斌',
      roleName: '管理员',
      deptId: '2'
  },
];




class UserManage extends Component {

    constructor(props) {
        super(props);

        this.state = {
          isUpdate: false,  //是否是更新操作
          modal_visible: false,
          userId: undefined,
          username: '',
          deptId: undefined,
          roleId: undefined
        }
    }


    /**
     * 删除列表某项记录
     * @param {删除项} text 
     */
    deleteItem(text) {
          const { pagenationProps, getUserList } = this.props;

         Modal.confirm({
            title: '确定删除该项吗?',
            okText: 'Yes',
            okType: 'danger',
            okButtonProps: {
              disabled: false,
            },
            cancelText: 'No',
            onOk() {
              axios.post('/api/user/delete',{ // 发送请求删除项目
                userId: text.userId
              }).then(res=>{
                message.success('删除成功！',2);
                //更新显示列表
                //发送请求，获取数据列表
                getUserList(pagenationProps.get('pageSize'), pagenationProps.get('current'));
              }).catch(error=> {
                message.error(error.message);
              });
              console.log('OK,发送异步请求');
            }
        });
    }
    

    componentDidMount() {
        const { pagenationProps } = this.props;
        //发送请求，获取数据列表
        this.props.getUserList(pagenationProps.get('pageSize'), pagenationProps.get('current'));

    }
    render() {

      const columns = [
            {
              title: 'ID',
              dataIndex: 'userId',
              key: 'userId'
            },
            {
              title: '用户名',
              dataIndex: 'userName',
              key: 'userName',
            },
            {
              title: '角色',
              dataIndex: 'roleName',
              key: 'roleName',
              render: (text,item)=> {
                return (
                  <span>
                    <span>{text}</span>
                    <Divider type="vertical" />
                    {
                      text === '普通用户'?  <Tag color="green" onClick={(item)=>{console.log('授权')}}>授权</Tag> 
                              :  <Tag onClick={(item)=>{console.log('取消授权')}}>取消授权</Tag>
                    }
                  </span>
                )
              }
            },
            {
              title: '所属部门',
              dataIndex: 'deptId',
              key: 'deptId',
            },
          
            {
              titel:'操作',
              key: 'action',
              render: (text) => {
                return (
                  <span>
                    <Tag color="blue" onClick={()=>{
                      this.setState({
                        isUpdate: true,
                        modal_visible: true,
                        userId: text.userId,
                        username: text.userName,
                        roleId: text.roleId,
                        deptId: text.deptId
                      })
                    }}>修改</Tag>
                    <Tag color="magenta" onClick={(text)=>{this.deleteItem(text)}}>删除</Tag>
                  </span>
                )
              }
            }
        ];

        const { getFieldDecorator } = this.props.form;
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>系统维护与管理</Breadcrumb.Item>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div className="contentWrap">
                    <div style={{width: "90%",  margin: "50px auto 0"}}>
                        <Button type="primary" className="button" onClick={()=>{
                          this.setState({
                            modal_visible: true
                          })
                        }} ><Icon type="plus"/>添加</Button>
                    </div>
                    <Table className="tableClass" bordered  dataSource={dataSource} columns={columns} loading={false}/>
                    <Modal 
                        title={this.state.isUpdate?'修改角色':'添加角色'}
                        confirmLoading={false}
                        visible={this.state.modal_visible}
                        maskClosable = {false}
                        onOk={()=>{
                            this.props.form.validateFields((err, values) => {
                                if (!err) {
                                    console.log('Received values of form: ', values);
                                    if(this.state.isUpdate) { //更新操作
                                       const data = {
                                          userId: this.state.userId,
                                          userName: values.username,
                                          password:values.password,
                                          deptId: values.deptId,
                                          roleId: this.state.roleId
                                       }
                                       axios.post('/api/user/update',data).then(res=>{
                                          if(res.data.status === 1) {
                                              message.success('更新成功',2);
                                              this.setState({
                                                modal_visible: false
                                              })
                                          }else {
                                              message.error(res.data.message,2);
                                          }
                                       }).catch(error=>{
                                            message.error(error.message,2);
                                       })
                                    }else { //新增操作
                                       const data = {
                                          userId: values.userid,
                                          userName: values.username,
                                          password:values.password,
                                          deptId: values.deptId,
                                          roleId: 1
                                       }
                                      axios.post('/api/user/insert',data).then(res=>{
                                          if(res.data.status === 1) {
                                              message.success('更新成功',2);
                                              this.setState({
                                                modal_visible: false
                                              })
                                          }else {
                                              message.error(res.data.message,2);
                                          }
                                      }).catch(error=>{
                                            message.error(error.message,2);
                                      })
                                    }
                                }else {
                                    message.info('请填写必要信息',2);
                                }
                            });
                          
                        }}
                        onCancel={()=>{
                          this.setState({ 
                            modal_visible: false
                          })
                        }}
                        afterClose={()=>{
                            this.setState({ //关闭对话框时，清除数据
                              isUpdate: false,  
                              userId: undefined,
                              username: '',
                              deptId: undefined,
                              roleId: undefined
                            })
                        }}
                        width="800px"
                    >
                    
                        <Form onSubmit={this.handleSubmit} className="login-form" labelCol={{span:4}} wrapperCol={{span:16}}>
                            <Form.Item label="用户id">
                                {getFieldDecorator('userid', {
                                    initialValue: this.state.userId,
                                    rules: [{ required: true, message: '请输入用户id!' },{ pattern: /^[0-9]\d*$/, message: '请输入数字编号!' }],
                                })(<Input maxLength="16" />)}
                            </Form.Item>
                            <Form.Item label="用户密码">
                                {
                                  this.state.isUpdate ? 
                                  getFieldDecorator('password', {
                                    initialValue: '',
                                  })(<Input type='password' maxLength="16" disabled/>) :
                                  getFieldDecorator('password', {
                                    initialValue: '',
                                    rules: [{ required: true, message: '请输入用户密码!' },
                                      { pattern: /^[0-9a-zA-Z_]*$/, message: '密码是字母数字下划线!' },
                                      { min: 6, message: '至少6位置!' }],
                                  })(<Input type='password' maxLength="16" />)
                                  
                                }
                            </Form.Item>
                            <Form.Item label="用户姓名">
                              {getFieldDecorator('username', {
                                  initialValue: this.state.username,
                                  rules: [{ required: true, message: '请输入用户姓名!' }],
                              })(<Input maxLength="10" />)}
                            </Form.Item>
                            <Form.Item label="所属部门">
                              {getFieldDecorator('deptId', {
                                  initialValue: this.state.deptId,
                                  rules: [{ required: true, message: '请选择部门!' }],
                              })(
                                <Select>
                                    <Select.Option value='1'>部门1</Select.Option>
                                    <Select.Option value='2'>部门2</Select.Option>
                                    <Select.Option value='3'>部门3</Select.Option>
                                </Select>
                              )}
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </div>
        )
    }
}



const mapState = (state)=> {
  return {
      userList: state.getIn(['user','userList']),
      pagenationProps: state.getIn(['user','pagenationProps'])
  }
};

const mapDispatch = (dispatch)=> {
  return {
    getUserList(pageSize, current) {
      dispatch(actionCreator.getUserList(pageSize,current));
    }
  }
}


export default connect(mapState,mapDispatch)(Form.create({ name: 'user_form' })(UserManage));
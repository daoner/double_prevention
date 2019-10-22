import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  actionCreator } from './store';
import { Breadcrumb, Table, Tag,  Modal, message,Button, Icon, Form, Input } from 'antd';

import axios from 'axios';
import './style.css';

  
class RoleManage extends Component { 
    constructor(props) {
      super(props);

      this.state = {
        modal_visible: false,  //对话框显示
        isUpdate: false,  //是否是更新
        roleName: '', //角色名
        roleId: undefined
      }


      this.deleteItem = this.deleteItem.bind(this);
    }

    componentDidMount() {
      //组件挂在的时候 发送请求显示数据
      this.props.changeRoleList();
        
    }
    /**
     * 删除列表某项记录
     * @param {删除项} text 
     */
    deleteItem(text) {
      Modal.confirm({
          title: '确定删除该项吗?',
          okText: 'Yes',
          okType: 'danger',
          okButtonProps: {
            disabled: false,
          },
          cancelText: 'No',
          onOk() {
            axios.post('/api/role/delete',{
              id: text.id
            }).then(res=>{
              console.log(res);
              message.success('删除成功！',2);
            }).catch(error=> {
              message.error(error.message);
            });
            console.log('OK,发送异步请求');
             //这里删除item
          }
        });
    }


    render() {
        //表格的列属性
        const columns = [
          {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: '角色名',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '操作',
            key: 'action',
            render:(text)=>{
              return (
                <span>
                  <Tag color="blue" onClick={()=> {
                     this.setState({
                       modal_visible: true,
                       isUpdate: true,
                       roleId: text.id,
                       roleName: text.name
                     })
                  }}>修改</Tag>
                  <Tag color="magenta" onClick={(text)=>{this.deleteItem(text)}}>删除</Tag>
                </span>
              )
            }
          }
        ];
      
      
        //获取到列表数据
        const {roleList, pagenationProps } = this.props; 
        const data = roleList.toJS();                 // immutable 转成js对象
        const JSpagenationProps = pagenationProps.toJS();   //immutable 转成 js对象

        const { getFieldDecorator } = this.props.form;
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>系统维护与管理</Breadcrumb.Item>
                    <Breadcrumb.Item>角色管理</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div className="contentWrap">
                    <div style={{width: "90%",  margin: "50px auto 0"}}>
                        <Button type="primary" className="button" onClick={()=>{
                           this.setState({modal_visible: true});
                        }} ><Icon type="plus"/>添加</Button>
                    </div>
                    <Table className="tableClass" bordered pagenation={JSpagenationProps} columns={columns} dataSource={data} />
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
                                          id: this.state.roleId,
                                          name: values.name
                                        }
                                        axios.post('api/role/update',data).then(res=>{
                                            if(res.data.status === 1) {
                                              message.success('修改成功',2);
                                              this.setState({
                                                modal_visible: false
                                              })
                                            }else {
                                                message.error(res.data.message,2);
                                            }
                                        }).catch(error=>{
                                            message.error(error.message,2);
                                        })
                                    }else {
                                        const data = {
                                            name: values.name
                                        }
                                        axios.post('api/role/insert',data).then(res=>{
                                            if(res.data.status === 1) {
                                                message.success('添加成功',2);
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
                              roleName: '',
                              roleId: undefined
                            })
                        }}
                        width="800px"
                    >
                    
                        <Form onSubmit={this.handleSubmit} className="login-form" labelCol={{span:4}} wrapperCol={{span:16}}>
                            <Form.Item label="角色名">
                              {getFieldDecorator('name', {
                                  initialValue: this.state.roleName,
                                  rules: [{ required: true, message: '请输入角色名!' }],
                              })(<Input maxLength="20" />)}
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </div>
        )
    }
}


//将 store 数据传给组件props
const mapState = (state)=> {
  return {
    roleList: state.getIn(['role','roleList']),
    pagenationProps: state.getIn(['role','pagenationProps'])
  }
};

const mapDispatch = (dispatch)=> {
  return {
    changeRoleList() {
      dispatch(actionCreator.getRoleList());
    }
  }
};

export default connect(mapState,mapDispatch)(Form.create({ name: 'role_form' })(RoleManage));
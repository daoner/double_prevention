import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  actionCreator } from './store';
import { Breadcrumb, Table, Tag,  Modal, message,Button, Icon } from 'antd';

import axios from 'axios';
import './style.css';

  
class RoleManage extends Component { 
    constructor(props) {
      super(props);
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
            render:()=>{
              return (
                <span>
                  <Tag color="blue" onClick={()=> {console.log('xxx')}}>修改</Tag>
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

        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>系统维护与管理</Breadcrumb.Item>
                    <Breadcrumb.Item>角色管理</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div className="contentWrap">
                    <div style={{width: "90%", margin: "0 auto"}}>
                        <Button type="primary" className="button" ><Icon type="plus"/>添加</Button>
                    </div>
                    <Table className="tableClass" bordered pagenation={JSpagenationProps} columns={columns} dataSource={data} />
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

export default connect(mapState,mapDispatch)(RoleManage);
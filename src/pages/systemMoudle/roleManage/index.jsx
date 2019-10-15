import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreate, actionCreator } from './store';
import { Breadcrumb, Table, Tag, Divider } from 'antd';
import './style.css';

const dataSource = [
    {
        key: '1',
        name: '管理员',
    },
    {
      key: '2',
      name: '普通用户',
    },
];

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
            <Tag color="blue" onClick={console.log('xxx')}>修改</Tag>
            <Tag color="magenta" onClick={(text)=>{console.log('delete role ')}}>删除</Tag>
          </span>
        )
      }
    }
  ];
  
class RoleManage extends Component { 

    componentDidMount() {
        this.props.changeRoleList();
    }


    render() {
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
                  <Divider orientation="right">Right Text</Divider>
                    <Table bordered pagenation={pagenationProps} columns={columns} dataSource={data} />
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
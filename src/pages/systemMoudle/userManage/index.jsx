import React, { Component } from 'react';
import { Breadcrumb, Table, Tag, Divider } from 'antd';
import './style.css';


const dataSource = [
    {
        key: '1',
        userName: '胡彦斌',
        roleName: '普通用户',
        deptId: '部门id'
    },
    {
      key: '2',
      userName: '胡彦斌',
      roleName: '管理员',
      deptId: '部门id'
  },
];

const columns = [
  {
    title: 'ID',
    dataIndex: 'key',
    key: 'id'
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
            text == '普通用户'?  <Tag color="green" onClick={(item)=>{console.log('授权')}}>授权</Tag> 
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
    render: () => {
      return (
        <span>
          <Tag color="blue" onClick={console.log('updata user')}>修改</Tag>
          <Tag color="magenta" onClick={(text)=>{console.log('delete user ')}}>删除</Tag>
        </span>
      )
    }
  }
];


class UserManage extends Component {
    componentDidMount() {
        console.log('DidMount UserManange');
    }
    render() {
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>系统维护与管理</Breadcrumb.Item>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div className="contentWrap">
                    <Table bordered  dataSource={dataSource} columns={columns} loading={false}/>
                </div>
            </div>
        )
    }
}

export default UserManage;
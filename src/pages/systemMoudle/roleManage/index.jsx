import React, { Component } from 'react';
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
      dataIndex: 'key',
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
    render() {
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
                    <Table bordered columns={columns} dataSource={dataSource} />
                </div>
            </div>
        )
    }
}

export default RoleManage;
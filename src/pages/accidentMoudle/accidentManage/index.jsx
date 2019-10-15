import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import './style.css';

//table引入
import { Table, Divider, Icon, Button } from 'antd';

//搜索框引入
import { Input } from 'antd';
const { Search } = Input;

//tabel数据
const columns = [
  {
    title: '事故ID',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: '事故名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '发生时间',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '发生地点',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>删除</a>
        <Divider type="vertical" />
        <a>详情</a>
        <Divider type="vertical" />
        <a>修改</a>
      </span>
    ),
  },
];

//table数据
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

class AccidentManage extends Component {
    render() {
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>事故管理与统计</Breadcrumb.Item>
                    <Breadcrumb.Item>事故信息管理</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div className="contentWrap">
                    <div style={{width:'90%',margin:'20px auto',height:'80px'}}>
                    <Search
                    className="searchClass"
                    placeholder="input search text"
                    enterButton="Search"
                    size="large"
                    onSearch={value => console.log(value)}
                    />
                    <Button style={{float:'right',width:'79px',height:'40px',margin:'20px 0px'}}>
                     <Link to="/main/accident/manage/add"><Icon type="plus" />添加</Link> 
                    </Button>
                    </div>

                    <Table
                    className="tableClass"
                    bordered="true"
                    columns={columns} dataSource={data} />
                </div>
            </div>
        )
    }
}

export default AccidentManage;
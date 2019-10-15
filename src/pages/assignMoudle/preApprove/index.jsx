import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import './style.css';

//table引入
import { Table, Divider, Tag, Button, Icon} from 'antd';

//搜索框引入
import { Input } from 'antd';
const { Search } = Input;

//tabel数据
const columns = [
  {
    title: '危险作业ID',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '危险作业项目名',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '申请时间',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '作业地点',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '状态',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>审批通过</a>
        <Divider type="vertical" />
        <a>退回</a>
        <Divider type="vertical" />
        <a>详情</a>
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

class PreApprove extends Component {
    render() {
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>授权许可</Breadcrumb.Item>
                    <Breadcrumb.Item>作业审批</Breadcrumb.Item>
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
                    {/* <Button style={{float:'right',width:'79px',height:'40px',margin:'20px 0px'}}><Icon type="plus" />添加</Button> */}
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

export default PreApprove;
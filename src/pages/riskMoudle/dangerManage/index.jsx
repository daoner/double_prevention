import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import './style.css';



//table引入
import { Table, Divider, Tag, Button , Icon} from 'antd';

//搜索框引入
import { Input } from 'antd';
const { Search } = Input;

//tabel数据
const columns = [
  {
    title: '危险源ID',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '风险点ID',
    dataIndex: 'address',
    key: 'address',
  }, 
  {
    title: '风险源名称',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '易发生的危险类型',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '风险值',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '危险源等级',
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
    title: '负责单位',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '负责人id',
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


class DangerManage extends Component {
    render() {
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>风险管理与评估</Breadcrumb.Item>
                    <Breadcrumb.Item>危险源管理</Breadcrumb.Item>
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
                    <Button style={{float:'right',width:'79px',height:'40px',margin:'20px 0px'}}><Icon type="plus" />添加</Button>
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

export default DangerManage;
import React, { Component } from 'react';
import { Breadcrumb, Table, Button, Input, Icon } from 'antd';
import { Link } from 'react-router-dom';

import './style.css';

const Search = Input.Search;

const dataSource = [
    {
        key:"1",
        name: '风险点xxxx',
        place: '风险位置',
        level: '3',
        telephone: '5434345'
    },
    {
        key:"2",
        name: '风险点xxx',
        place: '风险位置',
        level: '2',
        telephone: '12356786'
    },
    {
        key:"3",
        name: '风险点xxx',
        place: '风险位置',
        level: '2',
        telephone: '123456879'
       },
];

const columns = [
    {
        title: 'ID',
        dataIndex: 'key',
        key: 'id'
     },
    {
       title: '风险点',
       dataIndex: 'name',
       key: 'name'
    },
    {
        title: '风险点位置',
        dataIndex: 'place',
        key: 'place'
    },
    {
       title: '风险点等级',
       dataIndex: 'level',
       key: 'level'
    },
    {
        title: '应急电话',
        dataIndex: 'telephone',
        key: 'telephone'
     }
  ];
  
class RiskManage extends Component {

    toAddRisk() {

    }

    render() {
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>风险管理与评估</Breadcrumb.Item>
                    <Breadcrumb.Item>风险管理</Breadcrumb.Item>
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
                            <Link to="/main/risk/manage/add"><span><Icon type="plus" /><span>&nbsp;添加</span></span></Link>
                        </Button>
                    </div>
                    <Table
                        className="tableClass"
                        bordered
                        columns={columns} 
                        dataSource={dataSource} />
                </div>
            </div>
        )
    }
}

export default RiskManage;
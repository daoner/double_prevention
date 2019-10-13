import React, { Component } from 'react';
import { Breadcrumb, Table } from 'antd';
import './style.css';

const dataSource = [
    { 
        key: '0123',
        riskplace: '风险的位置',
        name: '易燃物爆炸',
        type: '易发生的事故类型',
        L: '可能性',
        E: '频繁程度',
        C: '事故后果',
        D: '风险值',
        degree: '危险源源等级',
        measure: '措施1 2 3 ',
        level: '管控层级',
        depId: '责任单位',
        userId: '责任人id'
        
    },
    { 
        key: '0123',
        riskplace: '风险的位置',
        name: '易燃物爆炸',
        type: '易发生的事故类型',
        L: '可能性',
        E: '频繁程度',
        C: '事故后果',
        D: '风险值',
        degree: '危险源源等级',
        measure: '措施1 2 3 ',
        level: '管控层级',
        depId: '责任单位',
        userId: '责任人id'
        
    },
    { 
        key: '0123',
        riskplace: '风险的位置',
        name: '易燃物爆炸',
        type: '易发生的事故类型',
        L: '可能性',
        E: '频繁程度',
        C: '事故后果',
        D: '风险值',
        degree: '危险源源等级',
        measure: '措施1 2 3 ',
        level: '管控层级',
        depId: '责任单位',
        userId: '责任人id'
        
    }
];

const columns = [
    {
        title: 'ID',
        dataIndex: 'key',
        key: 'id'
    },
    {
        title: '危险源名称',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '易发生事故类型',
        dataIndex: 'type',
        key: 'type'
    }, 
    {
        title: '风险值（L*E*C)',
        dataIndex: 'D',
        key: 'D'
    },
    {
        title: '危险源等级',
        dataIndex: 'degree',
        key: 'degree'
    }   
]

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
                    <Table dataSource={dataSource} columns={columns} border />
                </div>
            </div>
        )
    }
}

export default DangerManage;
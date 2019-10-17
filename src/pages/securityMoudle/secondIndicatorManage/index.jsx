import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//引入store
import { connect } from 'react-redux';
import { actionCreator as firstIndicatorActions } from '../firstIndicatorManage/store';   //引入一下一级检查表中的方法，用于获取checktable的select信息
import { actionCreator } from './store';

import { Table, Button, Icon, Tag, Divider,  Breadcrumb, Select } from 'antd';

class SecondIndicatorManage extends Component {
    

    render() {
        console.log(this.props,'second indicator')
        //table数据
        const dataSource = [
            { id: 1, content: '作业人员身体精神状况良好,无饮酒现象', addDate: '2012-5-23' },
            { id: 2, content: '组织作风良好，作业人员工作积极', addDate: '2012-5-23' }
        ];

        //table 列属性
        const ccc = [
            { title: 'ID', dataIndex: 'id', key: 'id' },
            { title: '内容', dataIndex: 'content', key: 'project' },
            { title: '添加时间', dataIndex: 'addDate', key: 'addDate' },
            {
                title: '操作',
                key: 'action',
                render: ()=>(<span>
                    <Tag color="blue">详情</Tag>
                    <Divider type="vertical"/>
                    <Tag color="red">删除</Tag>
                </span>)
            }
        ];




        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>安全检查与隐患管理</Breadcrumb.Item>
                    <Breadcrumb.Item>检查表管理</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div className="contentWrap">
                    <div style={{width:'90%',margin:'20px auto',height:'80px'}}>
                        <Select
                            size="large"
                            style={{ width: 200, display:"inline-block",margin: "20px 0" }}
                            placeholder="Select a checktable"
                            onChange={(e,v)=>{console.log(e,v,'selet change ')}}
                        >
                            <Select.Option value="1">检查表1</Select.Option>
                            <Select.Option value="2">检查表2</Select.Option>
                            <Select.Option value="3">检查表3</Select.Option>
                        </Select>   
                        <Select
                            size="large"
                            style={{ width: 200, display:"inline-block",margin: "20px 0" }}
                            placeholder="Select a checktable"
                            onChange={(e,v)=>{console.log(e,v,'selet change ')}}
                        >
                            {/* <Select.Option value="item1">item1</Select.Option>
                            <Select.Option value="item2">item2</Select.Option>
                            <Select.Option value="item3">item3</Select.Option> */}
                        </Select>   
                        {/* <Search
                            className="searchClass"
                            placeholder="input search text"
                            enterButton="Search"
                            size="large"
                            onSearch={value => console.log(value)}
                        /> */}
                        <Link>
                        <Button style={{float:'right',width:'79px',height:'40px',margin:'20px 0px'}}><Icon type="plus" />添加</Button>
                        </Link>
                    </div>
                    <Table
                        className="tableClass"
                        bordered="true"
                        columns={ccc} dataSource={dataSource} />
                </div>
            </div>
        )
    }
}


//将 store 数据传给组件props
const mapState = (state)=> {
    return {
        secondIndicatorList: state.getIn(['secondIndicator','secondIndicatorList']),    //显示再列表里面的数据
        pagenationProps: state.getIn(['secondIndicator','pagenationProps']),        //分页的属性设置

        SelectCheckTableList: state.getIn(['firstIndicator','selectList']),     //检查表id和name 的list
        SelectFirstIndicatorList: state.getIn(['secondIndicator','SelectFirstIndicatorList']),  //一级检查表id和name的list
    }
  };

//将操作store的方法传给组件props
const mapDispatch = (dispatch)=> {
    return {
        getSelectCheckTableList() { //获取检查表id name 的列表信息
            dispatch(firstIndicatorActions.getSelectList());
        },
        getSelectFirstIndicatorList() { //获取一级指标的选择框列表信息
            dispatch(actionCreator.getSelectFirstIndicatorList());
        }
    }
};
export default connect(mapState, mapDispatch)(SecondIndicatorManage);
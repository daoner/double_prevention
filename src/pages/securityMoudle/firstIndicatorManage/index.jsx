import React, { Component } from 'react';
import { Link }from 'react-router-dom';

import { connect } from 'react-redux';
import { actionCreator } from './store';

import { Table, Button, Icon, Tag, Divider, Input } from 'antd';
const Search = Input.Search;

class FirstIndicatorManage extends Component {
    render() {

        console.log(this.props, 'fist indicator');
        //table数据
        const dataSource = [
            { id: 1, project: '作业行为', addDate: '2012-5-23' }
        ];

        //table 列属性
        const ccc = [
            { title: 'ID', dataIndex: 'id', key: 'id' },
            { title: '项目', dataIndex: 'project', key: 'project' },
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
            <div>
                <div className="contentWrap">
                    <div style={{width:'90%',margin:'20px auto',height:'80px'}}>
                        <Search
                            className="searchClass"
                            placeholder="input search text"
                            enterButton="Search"
                            size="large"
                            onSearch={value => console.log(value)}
                        />
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
      firstIndicatorList: state.getIn(['firstIndicator','firstIndicatorList']),
      pagenationProps: state.getIn(['firstIndicator','pagenationProps'])
    }
  };

//将操作store的方法传给组件props
const mapDispatch = (dispatch)=> {
    return {
        getFistIndicatorList() {
        }
    }
};

export default connect(mapState,mapDispatch)(FirstIndicatorManage);
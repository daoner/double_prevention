import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Table, Divider, Breadcrumb ,Button, Icon,Tag, Modal } from 'antd';
import './style.css';

import { ActionCreator } from './store';

const columns = [
    { 
        title: 'depId',
        dataIndex: 'depId',
        key: 'depId',
        // render: text => <Tag color="magenta">{text}</Tag>,
    },
    {
        title: 'depName',
        dataIndex: 'depName',
        key: 'depName',
    },
    {
        title: 'depAddress',
        dataIndex: 'depAddress',
        key: 'depAddress',
    },
    {
        title: 'depPhone',
        dataIndex: 'depPhone',
        key: 'depPhone',
    },
    {
        title: 'depDesc',
        dataIndex : 'depDesc',
        key: 'depDesc'
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => { 
        return (
        <span>
            <Tag color="pink">Invite {record.depId}</Tag>
            <Divider type="vertical" />
            <Tag color="magenta">Delete</Tag>
        </span>
        )},
    },
];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => {
        // console.log(record);
        // disabled: record.pedId === '0001', // Column configuration not to be checked
        // pedId: record.pedId,
    },  
};


class OrganizationManage extends Component {
    componentDidMount() {
        this.props.getList();
    }
   
    render() {
        const {list, pagenationProps, modal_visible } = this.props;  //获取到 数据列表和分页设置属性 （immtable对象）
        const { handleShowModal, handleHideModal } = this.props;

        const jsList = list.toJS(); //将immutable对象转js对象
        const JSpagenationProps = { ...pagenationProps.toJS() };
        JSpagenationProps.onChange = this.props.handleChangePage;   //设置回调
        JSpagenationProps.onShowSizeChange =  this.props.handleChangePage;

        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>系统维护与管理</Breadcrumb.Item>
                    <Breadcrumb.Item>机构管理</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div className="contentWrap">
                    <Button type="primary" className="button"  onClick={handleShowModal}><Icon type="plus"/>添加</Button>
                    <Table rowSelection={rowSelection} pagination={JSpagenationProps} dataSource={jsList} columns={columns} loading={false}/>
                </div>
                <Modal 
                    title='标题'
                    confirmLoading={false}
                    visible={modal_visible}
                    maskClosable = {false}
                    onOk={()=>{console.log('ok');handleHideModal()}}
                    onCancel={()=>{console.log('cancle');handleHideModal()}}
                    afterClose={()=>{console.log('agterClose')}}
                    width="800px"
                    >
                    
                </Modal>
            </div>
        )
    }


}

const mapState = (state)=> {
    return {
        list: state.getIn(['organization','list']),
        pagenationProps: state.getIn(['organization','pagenationProps']),
        modal_visible : state.getIn(['organization','modal_visible'])
    }
};

const mapDispatch = (dispatch)=> {
    return {
        getList() {
            dispatch(ActionCreator.getOrganizationList());
        },
        /** 改变页号 */
        handleChangePage(current,pageSize) {
            dispatch(ActionCreator.changePage(current,pageSize));
        },
        handleShowModal() {
            console.log('show')
            dispatch(ActionCreator.showModal());
        },
        handleHideModal() {
            dispatch(ActionCreator.hideModal());
        }
    }
  }
export default connect(mapState,mapDispatch)(OrganizationManage);
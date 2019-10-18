import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { actionCreator } from './store';

import { Table, Button, Icon, Tag, Divider, Input, Breadcrumb, Select, Modal, Form,message } from 'antd';
import { getSelectList } from './store/actionCreator';
const Search = Input.Search;

class FirstIndicatorManage extends Component {

    componentDidMount() {
        this.props.getSelectList();
    }


    render() {
        const { changeModalVisible, modal_visible, modal_project }  = this.props;
        const { checkTableId } = this.props;

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
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
                    <Link to="/main/firstIndicator/manage/detail">
                        <Tag color="blue" onClick={()=>{ console.log('跳转到详情') }}>详情</Tag>
                    </Link>    
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
                    <Breadcrumb.Item>一级指标管理</Breadcrumb.Item>
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
                        {/* <Search
                            className="searchClass"
                            placeholder="input search text"
                            enterButton="Search"
                            onSearch={value => console.log(value)}
                        /> */}
                        <Button style={{float:'right',width:'79px',height:'40px',margin:'20px 0px'}} onClick={()=>{changeModalVisible(true)}} >
                            <Icon type="plus" />添加
                        </Button>
                        <Modal 
                            title='添加一级标准'
                            confirmLoading={false}
                            visible={modal_visible}
                            maskClosable = {false}
                            onOk={()=>{
                                this.props.form.validateFields((err, values) => {
                                    if (!err) {
                                      console.log('Received values of form: ', values);
                                      changeModalVisible(false)
                                      /**
                                       * 添加一级指标，发送post请求
                                       */
                                        axios.post('/api/firstLevelIndicator/insert',{
                                            checkTableId: checkTableId,
                                            project: values.project
                                        }).then(res=>{
                                            const data = res.data;
                                            if(data.status === 1) {
                                                message.success('success');
                                                changeModalVisible(false)
                                                this.props.form.resetFields(); //重置表单数据
                                            }else {
                                                message.error('添加失败');
                                            }
                                        }).catch(error=>{
                                            message.error(error.message);
                                        })
                                    }
                                });
                            }}
                            onCancel={()=>{ //取消按钮响应， 重置表单数据
                                changeModalVisible(false)
                                this.props.form.resetFields(); //重置表单数据
                            }}
                            afterClose={()=>{console.log('agterClose')}}
                            width="800px"
                            >
                                <Form.Item label="项目">
                                    {getFieldDecorator('project', {
                                        rules: [{ required: true,  message: '请输入检查项目!' }],
                                        initialValue: modal_project
                                    })(
                                        <Input placeholder="一级指标项目" />,
                                    )}
                                </Form.Item>
                                
                        </Modal>
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
        pagenationProps: state.getIn(['firstIndicator','pagenationProps']),

        selectList: state.getIn(['firstIndicator','selectList']),  //选择框的list
        checkTableId: state.getIn(['firstIndicator','checkTableId']),     //所  属检查表的id
        modal_visible: state.getIn(['firstIndicator','modal_visible']),   
        modal_project: state.getIn(['firstIndicator','modal_project'])
    }
  };

//将操作store的方法传给组件props
const mapDispatch = (dispatch)=> {
    return {
        //改变模态框显示与否
        changeModalVisible(visible) {
            dispatch(actionCreator.changeModalVisible(visible));
        },
        //获取select列表值
        getSelectList() {
            dispatch(actionCreator.getSelectList());
        }
    }
};

export default connect(mapState,mapDispatch)(Form.create({ name: 'firstIndicator' })(FirstIndicatorManage));
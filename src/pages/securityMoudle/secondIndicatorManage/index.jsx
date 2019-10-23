import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Qs from 'qs';
//引入store
import { connect } from 'react-redux';
import { actionCreator as firstIndicatorActions } from '../firstIndicatorManage/store';   //引入一下一级检查表中的方法，用于获取checktable的select信息
import { actionCreator } from './store';

import { Table, Button, Icon, Tag, Divider,  Breadcrumb, Select, Modal, message, Input, Form } from 'antd';

class SecondIndicatorManage extends Component {
    constructor(props) {
        super(props)
        //state
        this.state = {
            checkTableSelect: [],
            firstSelect: [],
            checkTableId: '',
            firstId: '',    //当前的firstId
            modal_visible: false,
            modal_content: '',
            isUpdate: false,
            secondId: '',

            secondIndicatorList:[],  //列表要显示的列表信息
            pagenationProps: {
                pageSize: 5,  //每页条数
                current: 1,  //当前页数
                total: 0,    //总的记录数目
                showSizeChanger: true,  //是否可以改变pageSize
                showQuickJumper: true, //是否可以快速跳转到某页
            },
        }

        //绑定this
        this.deleteItem = this.deleteItem.bind(this);
        this.getCheckTableSelect = this.getCheckTableSelect.bind(this); //得到checktable的下拉列表list
        this.handleChangeCheckTable = this.handleChangeCheckTable.bind(this);   //改变检查表获取一级表
        this.handleChangeFirst = this.handleChangeFirst.bind(this);     //改变一级指标 获取 list

    }

    /**
     * 得到checktable的下拉列表list
     */
    getCheckTableSelect() {
        axios.get('/api/checkTable/getIdAndNameList').then(res=>{
            const data = res.data;
            if(data.status === 1) {
                this.setState({
                    checkTableSelect: data.data
                })
            }
        }).catch(error=>{
            console.log(`get checkTalbe select error in second: ${ error.message}`)
        })
    }
    componentDidMount() {
        this.getCheckTableSelect(); //初始化
    }

    /**
     * //改变检查表获取一级表
     * @param {*} value 
     * @param {*} e 
     */
    handleChangeCheckTable(value,e) {
        axios.post(`/api/firstLevelIndicator/getAllList`,Qs.stringify({checkTableId: value }),{
            headers: {
                'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }).then(res=>{
            const data = res.data;
            if(data.status === 1) {
                this.setState({
                    firstSelect: data.data
                })
            }
        }).catch(error=>{
            console.log(`get first SelectList error in second: ${ error.message}`)
        })
        this.setState({
            checkTableId:value
        })
    }
    
    /**
     * 改变一级selcet获取list
     * @param {*} value 
     * @param {*} e 
     */
    handleChangeFirst(value,e) {
        axios.post(`/api/secondLevelIndicator/getList`,Qs.stringify({
            firstLevelIndicatorId: value,
            pageSize:this.state.pagenationProps.pageSize,
            pageNum:this.state.pagenationProps.current
        }),{
            headers: {
                'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }).then(res=>{
            const data = res.data;
            if(data.status === 1) {
                this.setState({
                    secondIndicatorList: data.data.list,
                    pagenationProps: {
                        pageSize: data.data.pageSize,  //每页条数
                        current: data.data.pageNum,  //当前页数
                        total: data.data.total,    //总的记录数目
                        showSizeChanger: true,  //是否可以改变pageSize
                        showQuickJumper: true, //是否可以快速跳转到某页
                    },
                })
            }
        }).catch(error=>{
            console.log(`get first SelectList error in second: ${ error.message}`)
        })
        this.setState({
            firstId: value
        })
    }



     /**
     * 删除列表某项记录
     * @param {删除项} text 
     */
    deleteItem(text) {
        Modal.confirm({
            title: '确定删除该项吗?',
            okText: 'Yes',
            okType: 'danger',
            okButtonProps: {
              disabled: false,
            },
            cancelText: 'No',
            onOk() {
              axios.post('/api/secondLevelIndicator/delete',Qs.stringify({
                secondLevelIndicatorId: text.id
              }),{
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
                }
              }).then(res=>{
                console.log(res);
                message.success('删除成功！',2);
                this.handleChangeFirst(this.state.firstId);
              }).catch(error=> {
                message.error(error.message);
              });
               //这里删除item
            }
          });
      }

      

    render() {
       
        
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
                render: (value)=>(<span>
                    <Link to={`/main/secondIndicator/manage/detail/${value.id}`}>
                        <Tag color="blue">详情</Tag>
                    </Link>
                    <Divider type="vertical"/>
                    <Tag onClick={()=>{
                        this.setState({
                            modal_content: value.content,
                            isUpdate: true,
                            modal_visible: true,
                            secondId: value.id
                        })
                    }}>修改</Tag>
                    <Divider type="vertical"/>
                    <Tag color="red" onClick={()=>{this.deleteItem(value)}}>删除</Tag>
                </span>)
            }
        ];



        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>安全检查与隐患管理</Breadcrumb.Item>
                    <Breadcrumb.Item>二级指标管理</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div className="contentWrap">
                    <div style={{width:'90%',margin:'20px auto',height:'80px'}}>
                        
                        <Select
                            size="large"
                            style={{ width: 200, display:"inline-block",margin: "20px 0" }}
                            placeholder="Select a checktable"
                            onChange={this.handleChangeCheckTable}
                        >
                            {
                                this.state.checkTableSelect.map(item=>(
                                    <Select.Option value={item.id}>{item.name}</Select.Option>
                                ))
                            }
                            {/* <Select.Option value="1">检查表1</Select.Option>
                            <Select.Option value="2">检查表2</Select.Option>
                            <Select.Option value="3">检查表3</Select.Option> */}
                        </Select>   
                        <Select
                            size="large"
                            style={{ width: 200, display:"inline-block",margin: "20px 0" }}
                            placeholder="Select a checktable"
                            onChange={this.handleChangeFirst}
                        >
                            {
                                this.state.firstSelect.map(item=>(
                                    <Select.Option value={item.id}>{item.project}</Select.Option>
                                ))
                            }
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
                        <Button style={{float:'right',width:'79px',height:'40px',margin:'20px 0px'}} onClick={()=>{
                            this.setState({
                                modal_visible: true
                            })
                        }} ><Icon type="plus" />添加</Button>
                        </Link>
                    </div>
                    <Table
                        className="tableClass"
                        bordered="true"
                        columns={ccc} 
                        dataSource={this.state.secondIndicatorList} 
                        // dataSource={dataSource}
                        pagination={this.state.pagenationProps} />
                    <Modal 
                            title={ this.state.isUpdate? '修改二级指标' : '添加二级指标'}
                            confirmLoading={false}
                            visible={this.state.modal_visible}
                            maskClosable = {false}
                            onOk={()=>{
                                if(this.state.firstId == '') {
                                    message.info('请选择一级指标');
                                    return;
                                }
                                this.props.form.validateFields((err, values) => {
                                    if (!err) {
                                      console.log('Received values of form: ', values);
                                      if(this.state.isUpdate) {
                                            ///api/SecondLevelIndicator/update
                                            axios.post('/api/secondLevelIndicator/update',Qs.stringify({
                                                id: this.state.secondId,
                                                firstLevelIndicatorId: this.state.firstId,
                                                content: values.content,
                                                // addDate: 
                                                // isDelete: 
                                                // deleteDate: 
                                            }),{
                                                headers: {
                                                    'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
                                                }
                                            }).then(res=>{
                                                const data = res.data;
                                                if(data.status === 1) {
                                                    message.success('修改成功');
                                                    this.setState({ 
                                                        modal_visible: false,
                                                        isUpdate: false,
                                                        modal_content: '',
                                                    })
                                                    this.handleChangeFirst(this.state.firstId);
                                                    this.props.form.resetFields(); //重置表单数据
                                                }else {
                                                    message.error('修改失败');
                                                }
                                            }).catch(error=>{
                                                message.error(error.message);
                                            })
                                      }else {
                                            //添加second，发送post请求
                                            axios.post('/api/secondLevelIndicator/insert',Qs.stringify({
                                                firstLevelIndicatorId: this.state.firstId,
                                                content: values.content
                                            }),{
                                                headers: {
                                                    'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
                                                }
                                            }).then(res=>{
                                                const data = res.data;
                                                if(data.status === 1) {
                                                    message.success('添加成功');
                                                    this.setState({ modal_visible: false })
                                                    this.handleChangeFirst(this.state.firstId);
                                                    this.props.form.resetFields(); //重置表单数据
                                                }else {
                                                    message.error('添加失败');
                                                }
                                            }).catch(error=>{
                                                message.error(error.message);
                                            })
                                      }
                                      
                                    }
                                });
                            }}
                            onCancel={()=>{ //取消按钮响应， 重置表单数据
                                this.setState({
                                    modal_visible: false,
                                    modal_content: '',
                                    isUpdate: false
                                })
                                this.props.form.resetFields(); //重置表单数据
                            }}
                            afterClose={()=>{console.log('agterClose')}}
                            width="800px"
                            >
                                <Form.Item label="项目">
                                    {getFieldDecorator('content', {
                                        rules: [{ required: true,  message: '请输入检查内容!' }],
                                        initialValue: this.state.modal_content
                                    })(
                                        <Input placeholder="二级指标检查内容" />,
                                    )}
                                </Form.Item>
                                
                        </Modal>
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

export default connect(mapState, mapDispatch)(Form.create({ name: 'secondIndicator' })(SecondIndicatorManage));
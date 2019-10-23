import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Qs from 'qs';
import { connect } from 'react-redux';
import { actionCreator } from './store';

import { Table, Button, Icon, Tag, Divider, Input, Breadcrumb, Select, Modal, Form,message } from 'antd';

class FirstIndicatorManage extends Component {

    constructor(props) {
        super(props); 
 
     
        this.deleteItem = this.deleteItem.bind(this);
        this.handleUpdateTable = this.handleUpdateTable.bind(this); //添加 删除成功后更新列表显示
    }

    componentDidMount() {

        this.props.getSelectList();
    }

    /**
     * 更新显示列表
     */
    handleUpdateTable() {
        let { checkTableId, pagenationProps ,getFirstList } = this.props;
        const JSpagenationProps = pagenationProps.toJS();   
        getFirstList(checkTableId,JSpagenationProps.pageSize, JSpagenationProps.current);
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
              axios.post(`/api/firstLevelIndicator/delete`,Qs.stringify({
                firstLevelIndicatorId: text.id
              }),{
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
                }
              }).then(res=>{
                // console.log(res);
                message.success('删除成功！',2);
                this.handleUpdateTable();
              }).catch(error=> {
                message.error(error.message);
              });
            //   console.log('OK,发送异步请求');
               //这里删除item
            }
          });
      }




    render() {
        const { selectList, firstIndicatorList ,changeModalVisible, modal_visible, modal_project ,getFirstList, changeCheckTableId }  = this.props;
        const { pagenationProps }  = this.props;
        let { checkTableId } = this.props;
        const JSselectList = selectList.toJS();
        const JSfirstIndicatorList = firstIndicatorList.toJS();     //数据列表
        const JSpagenationProps = pagenationProps.toJS();   
        JSpagenationProps.onChange = (pageNum, pageSize)=>{getFirstList(checkTableId,pageSize, pageNum)};
        JSpagenationProps.onShowSizeChange = (pageNum, pageSize)=>{getFirstList(checkTableId,pageSize, pageNum)};
      

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
                render: (value)=>(<span>
                    <Link to={`/main/firstIndicator/manage/detail/${value.id}`}>
                        <Tag color="blue" >详情</Tag>
                    </Link>    
                    <Divider type="vertical"/>
                    <Tag color="red" onClick={()=>{this.deleteItem(value)}} >删除</Tag>
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
                            onChange={(value,e)=>{
                                changeCheckTableId(value);
                                getFirstList(value, JSpagenationProps.pageSize, JSpagenationProps.current);
                            }}
                        >
                            {
                                JSselectList.map(item=>(
                                    <Select.Option value={item.id}>{item.name}</Select.Option>
                                ))
                                
                            }
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
                                        axios.post('/api/firstLevelIndicator/insert',Qs.stringify({
                                            checkTableId: checkTableId,
                                            project: values.project
                                        }),{
                                            headers: {
                                                'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
                                            }
                                        }).then(res=>{
                                            const data = res.data;
                                            if(data.status === 1) {
                                                message.success('添加成功');
                                                changeModalVisible(false)
                                                this.props.form.resetFields(); //重置表单数据
                                                this.handleUpdateTable();
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
                        columns={ccc} dataSource={JSfirstIndicatorList} />
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
        },
        //获取firstIndicator列表
        getFirstList(checkTableId, pageSize, pageNum) {
            dispatch(actionCreator.getFirstList(checkTableId, pageSize, pageNum))
        },
        //改变checktableid
        changeCheckTableId(id) {
            dispatch(actionCreator.changeCheckTableId(id));
        }
    }
};

export default connect(mapState,mapDispatch)(Form.create({ name: 'firstIndicator' })(FirstIndicatorManage));
import React, { Component } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import {  Table,  Breadcrumb ,Button, Icon,Tag, Modal,
         message , Input, Form
} from 'antd';
import './style.css';

import { ActionCreator } from './store';
import { showModal } from './store/actionCreator';



//删除这里相应
function deleteItem(text){
    Modal.confirm({
        title: '确定删除该部门吗?',
        okText: 'Yes',
        okType: 'danger',
        okButtonProps: {
          disabled: false,
        },
        cancelText: 'No',
        onOk() {
          console.log('OK,发送异步请求');
          axios.post('/api/deportment/delete',{deptId: text.deptId}).then(res=>{
              if(res.data.status === 1) {
                message.success('删除成功',2);

              }
          }).catch(error=>{
              message.error(error.message,2);
          })
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    console.log(text);
    //这里删除item
}

function updateItem(text) {

}

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
    constructor(props) {
        super(props);
        this.state={
            isUpdate: false,
            deptId: undefined,
            deptName: '',
            deptAddress: '',
            deptPhone: '',
            deptDesc:''
        }

    }
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




        const columns = [
            { 
                title: '部门Id',
                dataIndex: 'deptId',
                key: 'deptId',
                // render: text => <Tag color="magenta">{text}</Tag>,
            },
            {
                title: '部门名称',
                dataIndex: 'deptName',
                key: 'deptName',
            },
            {
                title: '部门地址',
                dataIndex: 'deptAddress',
                key: 'deptAddress',
            },
            {
                title: '部门电话',
                dataIndex: 'deptPhone',
                key: 'deptPhone',
            },
            {
                title: '部门简介',
                dataIndex : 'deptDesc',
                key: 'deptDesc'
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => { 
                return (
                <span>
                    <Tag color="blue" onClick={()=>{
                        console.log(text)
                        this.setState({
                            isUpdate:true,
                            deptId:text.deptId,
                            deptName: text.deptName,
                            deptPhone: text.deptPhone,
                            deptAddress: text.deptAddress,
                            deptDesc: text.deptDesc
                        });
                        handleShowModal()
                    }}>修改</Tag>
                    <Tag color="magenta" onClick={()=>{deleteItem(text)}}>删除</Tag>
                </span>
                )},
            },
        ];

        const { getFieldDecorator } = this.props.form;
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>系统维护与管理</Breadcrumb.Item>
                    <Breadcrumb.Item>机构管理</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div className="contentWrap">
                    <div style={{width: "90%", margin: "50px auto 0"}}>
                        <Button type="primary" className="button"  onClick={()=>{
                             this.setState({
                                 isUpdate: false,
                               
                            });
                             handleShowModal()}
                        }>
                             <Icon type="plus"/>添加</Button>
                    </div>
                    <Table className="tableClass" bordered rowSelection={rowSelection} pagination={JSpagenationProps} dataSource={jsList} columns={columns} loading={false}/>
                </div>
                <Modal 
                    title={this.state.isUpdate?'修改部门':'添加部门'}
                    confirmLoading={false}
                    visible={modal_visible}
                    maskClosable = {false}
                    onOk={()=>{
                        this.props.form.validateFields((err, values) => {
                            if (!err) {
                                console.log('Received values of form: ', values);
                                if(this.state.isUpdate) {   //更新
                                    const data = {
                                        deptId:this.state.deptId,
                                        deptName: values.deptName,
                                        deptAddress: values.deptAddress,
                                        deptPhone: values.deptPhone,
                                        deptDesc: values.deptDesc
                                    }
                                    axios.post('api/deportment/update',data).then(res=>{
                                        if(res.data.status === 1) {
                                            message.success('修改成功',2);
                                            handleHideModal(); //成功之后隐藏
                                        }else {
                                            message.error(res.data.message,2);
                                        }
                                    }).catch(error=>{
                                        message.error(error.message,2);
                                    })
                                }else { //添加
                                    const data = {
                                        deptName: values.deptName,
                                        deptAddress: values.deptAddress,
                                        deptPhone: values.deptPhone,
                                        deptDesc: values.deptDesc
                                    }
                                    axios.post('api/deportment/insert',data).then(res=>{
                                        if(res.data.status === 1) {
                                            message.success('添加成功',2);
                                            handleHideModal(); //成功之后隐藏
                                        }else {
                                            message.error(res.data.message,2);
                                        }
                                    }).catch(error=>{
                                        message.error(error.message,2);
                                    })
                                }
                                // handleHideModal(); //成功之后隐藏
                            }else {
                                message.info('请填写必要信息',2);
                            }
                        });
                       
                    }}
                    onCancel={()=>{
                        // this.setState({  
                        //     deptId: undefined,
                        //     deptName: '',
                        //     deptPhone: '',
                        //     deptAddress: '',
                        //     deptDesc: ''
                        // });
                        handleHideModal()}}
                    afterClose={()=>{console.log('agterClose')}}
                    width="800px"
                    >
                    
                    <Form onSubmit={this.handleSubmit} className="login-form" labelCol={{span:4}} wrapperCol={{span:16}}>
                        <Form.Item label="部门名称">
                        {getFieldDecorator('deptName', {
                            initialValue: this.state.deptName,
                            rules: [{ required: true, message: '请输入部门名字!' }],
                        })(
                            <Input maxLength="20" />,
                        )}
                        </Form.Item>
                        <Form.Item label="部门地址">
                        {getFieldDecorator('deptAddress', {
                            initialValue: this.state.deptAddress,
                            rules: [{ required: true, message: '请输入部门地址!' }],
                        })(
                            <Input maxLength="20"/>,
                        )}
                        </Form.Item>

                        <Form.Item label="部门电话">
                        {getFieldDecorator('deptPhone', {
                            initialValue: this.state.deptPhone,
                            rules: [{ required: true, message: '请输入部门电话!' }],
                        })(
                            <Input maxLength="15" />,
                        )}
                        </Form.Item>
                        <Form.Item label="部门简介">
                        {
                            getFieldDecorator('deptDesc', {
                                initialValue: this.state.deptDesc,
                                rules:[ { required: true, message: '请输入部门简介'} ],
                            })(<Input maxLength="20" />)
                        }
                        </Form.Item>
                    </Form>

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
export default connect(mapState,mapDispatch)(Form.create({ name: 'organization_form' })(OrganizationManage));
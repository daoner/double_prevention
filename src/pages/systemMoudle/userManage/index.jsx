import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import axios from 'axios';
import { Breadcrumb, Table, Tag, Divider, Button, Icon, Modal, message } from 'antd';
import './style.css';


const dataSource = [
    {
        key: '1',
        userName: '胡彦斌',
        roleName: '普通用户',
        deptId: '部门id'
    },
    {
      key: '2',
      userName: '胡彦斌',
      roleName: '管理员',
      deptId: '部门id'
  },
];




class UserManage extends Component {

    /**
     * 删除列表某项记录
     * @param {删除项} text 
     */
    deleteItem(text) {
          const { pagenationProps, getUserList } = this.props;

         Modal.confirm({
            title: '确定删除该项吗?',
            okText: 'Yes',
            okType: 'danger',
            okButtonProps: {
              disabled: false,
            },
            cancelText: 'No',
            onOk() {
              axios.post('/api/user/delete',{ // 发送请求删除项目
                userId: text.userId
              }).then(res=>{
                message.success('删除成功！',2);
                //更新显示列表
                //发送请求，获取数据列表
                getUserList(pagenationProps.get('pageSize'), pagenationProps.get('current'));
              }).catch(error=> {
                message.error(error.message);
              });
              console.log('OK,发送异步请求');
            }
        });
    }
    

    componentDidMount() {
        const { pagenationProps } = this.props;
        //发送请求，获取数据列表
        this.props.getUserList(pagenationProps.get('pageSize'), pagenationProps.get('current'));

    }
    render() {

      const columns = [
            {
              title: 'ID',
              dataIndex: 'key',
              key: 'id'
            },
            {
              title: '用户名',
              dataIndex: 'userName',
              key: 'userName',
            },
            {
              title: '角色',
              dataIndex: 'roleName',
              key: 'roleName',
              render: (text,item)=> {
                return (
                  <span>
                    <span>{text}</span>
                    <Divider type="vertical" />
                    {
                      text === '普通用户'?  <Tag color="green" onClick={(item)=>{console.log('授权')}}>授权</Tag> 
                              :  <Tag onClick={(item)=>{console.log('取消授权')}}>取消授权</Tag>
                    }
                  </span>
                )
              }
            },
            {
              title: '所属部门',
              dataIndex: 'deptId',
              key: 'deptId',
            },
          
            {
              titel:'操作',
              key: 'action',
              render: () => {
                return (
                  <span>
                    <Tag color="blue" onClick={console.log('updata user')}>修改</Tag>
                    <Tag color="magenta" onClick={(text)=>{this.deleteItem(text)}}>删除</Tag>
                  </span>
                )
              }
            }
        ];

        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>系统维护与管理</Breadcrumb.Item>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div className="contentWrap">
                    <div style={{width: "90%", margin: "0 auto"}}>
                        <Button type="primary" className="button" ><Icon type="plus"/>添加</Button>
                    </div>
                    <Table className="tableClass" bordered  dataSource={dataSource} columns={columns} loading={false}/>
                </div>
            </div>
        )
    }
}



const mapState = (state)=> {
  return {
      userList: state.getIn(['user','userList']),
      pagenationProps: state.getIn(['user','pagenationProps'])
  }
};

const mapDispatch = (dispatch)=> {
  return {
    getUserList(pageSize, current) {
      dispatch(actionCreator.getUserList(pageSize,current));
    }
  }
}


export default connect(mapState,mapDispatch)(UserManage);
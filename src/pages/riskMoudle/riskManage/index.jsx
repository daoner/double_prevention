import React, { Component } from 'react';
import { Breadcrumb, Table, Button, Input, Icon, message, Modal, Divider, Tag } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Qs from 'qs';

import './style.css';

const Search = Input.Search;

const dataSource = [
    {
        id:"1",
        name: '风险点xxxx',
        place: '风险位置',
        level: '3',
        telephone: '5434345'
    },
    {
        id:"2",
        name: '风险点xxx',
        place: '风险位置',
        level: '2',
        telephone: '12356786'
    },
    {
        id:"3",
        name: '风险点xxx',
        place: '风险位置',
        level: '2',
        telephone: '123456879'
       },
];


  
class RiskManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableList:[],
            pagenationProps: {
                pageSize:5,
                current: 1,
                total: 0,
                showSizeChanger: true,  //是否可以改变pageSize
                showQuickJumper: true, //是否可以快速跳转到某页
            }
        }
        //绑定this
        this.getTableList = this.getTableList.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
    }

    componentDidMount() {
        this.getTableList(5,1);
    }
    /**
     * 
     * @param {每页条数}} pageSize 
     * @param {当前页号} pageNum 
     */
    getTableList(pageSize, pageNum) {
        axios.get(`/api/risk/getList?pageSize=${pageSize}&pageNum=${pageNum}`).then(res=>{
            const data =res.data;
            if(res.status === 1) {
                this.setState({
                    tableList: data.data.list,
                    pagenationProps: {
                        pageSize: data.data.pageSize,
                        current: data.data.pageNum,
                        total: data.data.total,
                        showSizeChanger: true,  //是否可以改变pageSize
                        showQuickJumper: true, //是否可以快速跳转到某页
                    }
                })
            }else {
                message.info(data.message || '信息获取失败');
            }
        }).catch(error=>{
            message.error(error.message);
        })
    }

    /**
     * 换页操作
     * @param {页号}} pageNum 
     * @param {每页条数} pageSize 
     */
    handleChangePage(pageNum, pageSize) {
        this.getTableList(pageSize,pageNum);
    }

    /**
     * 删除指定id的项目
     * @param {id}} id 
     */
    handleDelete(id) {
        Modal.confirm({
            title: '确定删除该风险信息吗?',
            okText: 'Yes',
            okType: 'danger',
            okButtonProps: {
              disabled: false,
            },
            cancelText: 'No',
            onOk() {
              console.log('OK,发送异步请求');
              axios.post('/api/deportment/delete',Qs.stringify({id: id})).then(res=>{
                  if(res.data.status === 1) {
                    message.success(res.data.message || '删除成功',2);
                    //刷新页面
                    this.getTableList(this.state.pagenationProps.pageSize, this.state.pagenationProps.current);
                  }
              }).catch(error=>{
                  message.error(error.message,2);
              })
            }
          });
    }

    render() {
        //table数据
        const tableList = this.state.tableList;

        //分页器
        let pagination = this.state.pagenationProps;
        pagination.onShowSizeChanger = this.handleChangePage;
        pagination.onChange = this.handleChangePage;

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
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
             },
             {
                 title: '操作',
                 key: 'action',
                 render: (text)=>( <span>
                    <Link to={`/main/risk/manage/update/${text.id}`}><Tag>修改</Tag></Link>
                    <Divider type='vertical'/>
                    <Tag color="red" onClick={()=>{this.handleDelete(text.id)}}>删除</Tag>
                 </span>)
             }
          ];
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
                        pagination={pagination}
                        columns={columns} 
                        dataSource={tableList} />
                </div>
            </div>
        )
    }
}

export default RiskManage;
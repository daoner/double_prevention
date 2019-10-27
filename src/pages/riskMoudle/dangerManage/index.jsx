import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Qs from 'qs';

import { Breadcrumb } from 'antd';
import './style.css';



//table引入
import { Table, Divider, message, Button , Icon, Modal} from 'antd';

//搜索框引入
import { Input } from 'antd';
const { Search } = Input;

//tabel数据


//table数据
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];


class DangerManage extends Component {

    constructor(props) {
        super(props);
        //state数据
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
        this.handleDelete = this.handleDelete.bind(this);
    }
    componentDidMount() {
      this.getTableList(5, 1);
    }

    /**
     * 获取table 的数据
     * @param {每页数目}} pageSize 
     * @param {当前页号} pageNum 
     */
    getTableList(pageSize, pageNum) {
        axios.get(`/api/hazard/getList?pageSize=${pageSize}&pageNum=${pageNum}`).then(res=>{
            const data =res.data;
            if(data.status === 1) {
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
     * 换页
     * @param {*} pageNum 
     * @param {*} pageSize 
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
              axios.post('/api/hazard/delete',Qs.stringify({id: id})).then(res=>{
                  if(res.data.status === 1) {
                    message.success(res.data.message || '删除成功',2);
                    //刷新页面
                    this.getTableList(this.state.pagenationProps.pageSize,1);
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
        const pagination = this.state.pagenationProps;
        pagination.onShowSizeChanger = this.handleChangePage;
        pagination.onChange = this.handleChangePage;


        const columns = [
          // {
          //   title: '危险源ID',
          //   dataIndex: 'id',
          //   key: 'id',
          // },
          // {
          //   title: '风险点ID',
          //   dataIndex: 'riskId',
          //   key: 'riskId',
          // }, 
          {
            title: '风险源名称',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '易发生的危险类型',
            dataIndex: 'type',
            key: 'type',
          },
          {
            title: 'L(可能性)',
            dataIndex: 'L',
            key: 'L',
          },
          {
            title: 'E(频繁程度)',
            dataIndex: 'E',
            key: 'E',
          },
          {
            title: 'C(事故后果)',
            dataIndex: 'C',
            key: 'C',
          },
          {
            title: '危险源等级',
            dataIndex: 'degree',
            key: 'degree',
          },
          {
            title: '管理措施',
            dataIndex: 'measure',
            key: 'measure',
          },
          {
            title: '管控层级',
            dataIndex: 'level',
            key: 'level',
          },
          {
            title: '操作',
            key: 'action',
            render: (text, record) => (
              <span>
                <a onClick={()=>{this.handleDelete(text.id)}}>删除</a>
                <Divider type="vertical" />
                <Link to={`/main/risk/danger/update/${text.id}`}><a>修改</a></Link>
              </span>
            ),
          },
        ];

        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>风险管理与评估</Breadcrumb.Item>
                    <Breadcrumb.Item>危险源管理</Breadcrumb.Item>
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
                    <Link to="/main/risk/danger/add">
                      <Button style={{float:'right',width:'79px',height:'40px',margin:'20px 0px'}}><Icon type="plus" />添加</Button>
                    </Link>
                    </div>
                    <Table
                    className="tableClass"
                    bordered
                    pagination={pagination}
                    columns={columns} dataSource={tableList} />
                </div>
            </div>
        )
    }
}

export default DangerManage;
import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './style.css';

//table引入
import { Table,  Tag, message } from 'antd';
//搜索框引入
import { Input } from 'antd';
const { Search } = Input;


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

class HadApprove extends Component {
    constructor(props) {
        super(props);
        //state 数据
        this.state = {
            list:[], //用于table显示的list
            pagenationProps: {  //分页器
                pageSize: 5,  //每页条数
                current: 1,  //当前页数
                total: 0,    //总的记录数目
                showSizeChanger: true,  //是否可以改变pageSize
                showQuickJumper: true, //是否可以快速跳转到某页
            },
        }

        //绑定this
        this.getList = this.getList.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
      
    }
    componentDidMount() {
        this.getList(); //初始化获取list信息
    }

    /**
     * 获取显示列表
     * @param {每页条数} pageSize 
     * @param {当前页号} pageNum 
     */
    getList(pageSize,pageNum) {
        pageSize = pageSize || this.state.pagenationProps.pageSize;   //默认 pageSize
        pageNum = pageNum || 1;      //默认 pageNum
        axios.get(`/api/dangerousoperation/getListNoWait?pageSize=${pageSize}&pageNum=${pageNum}`).then(res=>{
            const data = res.data;
            if(data.status === 1) {
                let pagenationProps = JSON.parse(JSON.stringify(this.state.pagenationProps)); //分页属性
                pagenationProps.pageSize = data.data.pageSize;
                pagenationProps.current = data.data.pageNum;
                pagenationProps.total = data.data.total;
                //更新state数据
                this.setState({
                    list: data.data.list, //列表值
                    pagenationProps
                })
            }
        }).catch(error=>{
            message.error(error.message,2)
        })
    }

    /**
     * 换页
     * @param {*} pageNum 
     * @param {*} pageSize 
     */
    handleChangePage(pageNum, pageSize) {
        this.getList(pageSize, pageNum);
    }

    render() {
        const tableList = this.state.list;
        let pagenationProps = this.state.pagenationProps;
        pagenationProps.onChange = this.handleChangePage;
        pagenationProps.onShowSizeChange = this.handleChangePage;

      const columns = [
        {
          title: '危险作业ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '作业名',
          dataIndex: 'name',
          key: 'name',
        }, 
       
        {
          title: '作业地点',
          dataIndex: 'place',
          key: 'place',
        },
        {
          title: '申请人',
          dataIndex: 'curator',
          key: 'curator',
        },
        // {
        //   title: '状态',
        //   key: 'tags',
        //   dataIndex: 'tags',
        //   render: tags => (
        //     <span>
        //       {tags.map(tag => {
        //         let color = tag.length > 5 ? 'geekblue' : 'green';
        //         if (tag === 'loser') {
        //           color = 'volcano';
        //         }
        //         return (
        //           <Tag color={color} key={tag}>
        //             {tag.toUpperCase()}
        //           </Tag>
        //         );
        //       })}
        //     </span>
        //   ),
        // },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <span>
               <span>
                <Link to={`/main/assign/detail/${text.id}`}><a>详情</a></Link>
              </span>
            </span>
          ),
        },
      ];

        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>授权许可</Breadcrumb.Item>
                    <Breadcrumb.Item>审批记录</Breadcrumb.Item>
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
                    {/* <Button style={{float:'right',width:'79px',height:'40px',margin:'20px 0px'}}><Icon type="plus" />添加</Button> */}
                    </div>
                    <Table
                    className="tableClass"
                    bordered
                    pagination={pagenationProps}
                    columns={columns} dataSource={tableList} />
                </div>
            </div>
        )
    }
}

export default HadApprove;
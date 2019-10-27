import React, { Component } from 'react';
import { Breadcrumb, message } from 'antd';
import axios from 'axios';
import Qs from 'qs';

import { Link } from 'react-router-dom';
import './style.css';
//table引入
import { Table, Divider, Tag, Button, Icon, Modal } from 'antd';
//搜索框引入
import { Input } from 'antd';
import memery from '../../../utils/memeryUtil';



class AppluRecord extends Component {

    constructor(props) {
        super(props);
        //state
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
        this.deleteItem = this.deleteItem.bind(this);
        this.getList = this.getList.bind(this);
        this.handleKeepFile = this.handleKeepFile.bind(this);
        this.handleDrawBack = this.handleDrawBack.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
    }

    /**
     * 挂载的生命周期
     */
    componentDidMount() {
        this.getList(); //初始化获取list信息
    }

    /**
     * 获取table的list
     * @param {每页条数}} pageSize 
     * @param {当前页号} pageNum 
     */
    getList(pageSize, pageNum) {
        pageSize = pageSize || this.state.pagenationProps.pageSize;   //默认 pageSize
        pageNum = pageNum || 1;      //默认 pageNum
        axios.get(`/api/dangerousoperation/getList?pageSize=${pageSize}&pageNum=${pageNum}`).then(res=>{
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
            }else {
              message.error('获取信息失败',2)
            }
        }).catch(error=>{
            message.error(error.message,2)
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
              axios.post('/api/dangerousoperation/delete', Qs.stringify({dangerousoperationId: text.id}),{
                  headers: { 'Content-Type':'application/x-www-form-urlencoded' }
              }).then(res=>{
                  message.success(res.data.message );
                  //更新list
                  this.getList();
              }).catch(error=> {
                  message.error(error.message);
              });
          }
        });
    }

    /**
     * 归档
     * @param {事件id}} id 
     */
    handleKeepFile(id) {
        Modal.confirm({
          title: '确定归档吗?',
          okText: 'Yes',
          cancelText: 'No',
          onOk() {
              axios.post('/api/dangerousoperation/file',Qs.stringify({dangerousoperationId: id}),{
                  headers: { 'Content-Type':'application/x-www-form-urlencoded' }
              }).then(res=>{
                  message.success(res.data.message || '归档成功');
              }).catch(error=>{
                  message.error(error.message);
              })
          }
        });
        
    }

    /**
     *  撤回
     * @param {事件id} id 
     */
    handleDrawBack(id) {
        Modal.confirm({
          title: '确定撤回吗?',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
              axios.post('/api/dangerousoperation/withdraw',Qs.stringify({dangerousOperationId: id}),{
                headers: { 'Content-Type':'application/x-www-form-urlencoded' }
              }).then(res=>{
                  message.success(res.data.message || '撤回成功');
              }).catch(error=>{
                  message.error(error.message);
              })
          }
        });
       
    }

    /**
     * 根据分页的进行换页的事件响应
     * @param {要显示的页} pageNum 
     * @param {每页的条数} pageSize 
     */
    handleChangePage(pageNum,pageSize) {
        this.getList(pageSize,pageNum);
    }


    render() {
        const data = this.state.list;   //table 数据列表
        const pagenationProps = this.state.pagenationProps; //分页设置
        pagenationProps.onChange = this.handleChangePage;
        pagenationProps.onShowSizeChange = this.handleChangePage;

      const { Search } = Input;

      //tabel数据
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
                <a onClick={()=>{this.deleteItem(text)}}>删除</a>
                <Divider type="vertical" />
                <Link to={`/main/assign/detail/${text.id}`}><a>详情</a></Link>
                {/* <Divider type="vertical" />
                <a onClick={()=>{this.handleDrawBack(text.id)}}>撤回</a> */}
                <Divider type="vertical" />
                <a onClick={()=>{this.handleKeepFile(text.id)}}>归档</a>
              </span>
            ),
          },
        ];
      
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>授权许可</Breadcrumb.Item>
                    <Breadcrumb.Item>申请记录</Breadcrumb.Item>
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
                      columns={columns} 
                      dataSource={data} />
                </div>
            </div>
        )
    }
}

export default AppluRecord;
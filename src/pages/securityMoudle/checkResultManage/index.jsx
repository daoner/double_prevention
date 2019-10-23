import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Table, Divider, Tag, Input, Modal, message} from 'antd';
import axios from 'axios';
import Qs from 'qs';

 /**
 * 安全检查结果管理  查询 、详细、修改、删除、批量导出
 */

const dataSource = [
    {
        key: '1',
        id: '0001',
        checkPeople: '胡彦斌',
        checkedDep: '1号矿井',
        checkTime: '西湖区湖底公园1号',
        status: '未整改'
    },
    {
      key: '2',
      id: '0005',
      checkPeople: '王羲之',
      checkedDep: '西区配电室',
      checkTime: '1998-02-12 6:00',
      status: '整改中'
    },
    {
      key: '3',
      id: '0007',
      checkPeople: '王羲之',
      checkedDep: '西区配电室',
      checkTime: '1998-02-12 6:00',
      status: '已整改'
    },
    {
      key: '2',
      id: '0112',
      checkPeople: '王羲之',
      checkedDep: '西区配电室',
      checkTime: '1998-02-12 6:00',
      status: '已逾期'
    },
];

class CheckResultManage extends Component {
    constructor(props){
        super(props);
        this.state = {
            tableList: [],
            pagenationProps: {
                pageSize: 5,
                current: 1,
                total: 0,
                showSizeChanger: true,  //是否可以改变pageSize
                showQuickJumper: true, //是否可以快速跳转到某页
            }
        }

        //绑定this
        this.deleteItem = this.deleteItem.bind(this);
        this.getTableList = this.getTableList.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
    }

    componentDidMount() {
        this.getTableList(5,1);
    }

    getTableList(pageSize, pageNum) {
      axios.get(`/api/input/getList?pageSize=${pageSize}&pageNum=${pageNum}`).then(res=>{
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

    handleChangePage(pageNum, pageSize) {
       this.getTableList(pageSize,pageNum);
    }

    /**
     * 删除列表某项记录
     * @param {删除项} text 
     */
    deleteItem(text) {
        // const { pagenationProps, getUserList } = this.props;

        Modal.confirm({
            title: '确定删除该项吗?',
            okText: 'Yes',
            okType: 'danger',
            okButtonProps: {
              disabled: false,
            },
            cancelText: 'No',
            onOk() {
              axios.post('url',{ // 发送请求删除项目
                // userId: text.userId
              }).then(res=>{
                if(res.data.status === 1) {
                    message.success('删除成功！',2);
                    //更新显示列表
                    //发送请求，获取数据列表
                    this.getTableList(this.state.pagenationProps.pageSize, this.state.pagenationProps.pageNum);
                }
              }).catch(error=> {
                message.error(error.message);
              });
              console.log('OK,发送异步请求');
            }
        });
    }




    render() {

        const tableList = this.state.tableList;

        let pagination = this.state.pagenationProps;
        pagination.onShowSizeChanger = this.handleChangePage;
        pagination.onChange = this.handleChangePage;


        const ccc = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
              },
              {
                title: '检查表明',
                dataIndex: 'checkTableName',
                key: 'checkTableName',
              },
              {
                title: '检查部门',
                dataIndex: 'deptName',
                key: 'deptName',
              },
              {
                title: '检查日期',
                dataIndex: 'checkDate',
                key: 'checkDate',
              },
              {
                title: '检查类型',
                dataIndex: 'type',
                key: 'type',
              },
              {
                title: '是否合格',
                dataIndex: 'isQulified',
                key: 'isQulified',
                render: (text)=>{}
              },
              {
                title: '不合格说明',
                dataIndex: 'desc',
                key: 'desc',
              },
              {
                title:'参检人',
                dataIndex: 'otherPerson',
                key:'otherPerson'
              },
            {
                title: '操作',
                key: 'action',
                render: (text,value)=>(<span>
                    <Link to={`/main/checktable/result/detail/${text.id}`}>
                        <Tag color="blue">详情</Tag>
                    </Link>    
                    <Divider type="vertical"/>
                    <Tag color="red" onClick={()=>{this.deleteItem(text)}}>删除</Tag>
                    <Divider type="vertical"/>
                    <Tag color="red">修改</Tag>
                </span>)
            }
        ];

        return (
            <div className="page">
               {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>安全检查与隐患管理</Breadcrumb.Item>
                    <Breadcrumb.Item>检查结果</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div className="contentWrap">
                    <div style={{width:'90%',margin:'20px auto',height:'80px'}}>
                        <Input.Search
                            className="searchClass"
                            placeholder="input search text"
                            enterButton="Search"
                            size="large"
                            onSearch={value => console.log(value)}
                        />
                    </div>
                    <Table className="tableClass" bordered columns={ccc} dataSource={dataSource} pagination={pagination} />
                </div>
            </div>
        )
    }
}



export default CheckResultManage;
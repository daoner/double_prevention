import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Table, Divider, Tag, Input, Modal, message} from 'antd';
import axios from 'axios';

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

        this.deleteItem = this.deleteItem.bind(this);
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
                }
              }).catch(error=> {
                message.error(error.message);
              });
              console.log('OK,发送异步请求');
            }
        });
    }




    render() {
        const ccc = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
              },
              {
                title: '检查人',
                dataIndex: 'checkPeople',
                key: 'checkPeople',
              },
              {
                title: '被检单位',
                dataIndex: 'checkedDep',
                key: 'checkedDep',
              },
              {
                title: '检查时间',
                dataIndex: 'checkTime',
                key: 'checkTime',
              },
            {
                title: '操作',
                key: 'action',
                render: (text,value)=>(<span>
                    <Link>
                        <Tag color="blue" onClick={()=>{ console.log('跳转到详情') }}>详情</Tag>
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
                    <Table className="tableClass" bordered={true} columns={ccc} dataSource={dataSource} />
                </div>
            </div>
        )
    }
}



export default CheckResultManage;
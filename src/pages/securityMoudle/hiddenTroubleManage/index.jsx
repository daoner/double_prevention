import React, { Component } from 'react';
import { Table, Breadcrumb, Select, Divider, Tag } from 'antd';


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




class HiddenTroubleManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          type: 1,  //隐患类型
          dataList: []  //隐患列表
        }
    }


    render() {

      const columns = [
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
                <Tag color="blue" onClick={()=>{console.log(text,value)}}>详情</Tag>
                
                { value.status === '未整改' ? (
                    <span><Divider type="vertical" /><Tag colur="yellow">下发整改</Tag></span>) : (null) 
                }
                {
                  value.status === '整改中' ? (
                    <span><Divider type="vertical" /><Tag colur="yellow">整改完成</Tag></span>) : (null) 
                }
                
                {
                  value.status === '整改中' || value.status === '已逾期' ? (
                    <span><Divider type="vertical" /><Tag colur="yellow">撤回</Tag></span>) : (null) 
                }
            </span>)
          }
        ];

        return (
            <div className="page">
               {/* 导航路径 */}
               <Breadcrumb className="path">
                    <Breadcrumb.Item>安全检查与隐患管理</Breadcrumb.Item>
                    <Breadcrumb.Item>隐患整改信息</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div className="contentWrap">
                <div style={{width:'90%',margin:'20px auto',height:'80px'}}>
                        <Select
                            size="large"
                            style={{ width: 200, display:"inline-block",margin: "20px 0" }}
                            placeholder="Select a checktable"
                            onChange={(e,v)=>{console.log('selet change ',e)}}
                        >
                            <Select.Option value="未整改">未整改</Select.Option>
                            <Select.Option value="整改中">整改中</Select.Option>
                            <Select.Option value="已整改">已整改</Select.Option>
                            <Select.Option value="已逾期">已逾期</Select.Option>
                        </Select>   
                        {/* <Search
                            className="searchClass"
                            placeholder="input search text"
                            enterButton="Search"
                            onSearch={value => console.log(value)}
                        /> */}
                    </div>
                    <Table className="tableClass" bordered={true} columns={columns} dataSource={dataSource} />
                </div>
            </div>
        )
    }
}

export default HiddenTroubleManage;
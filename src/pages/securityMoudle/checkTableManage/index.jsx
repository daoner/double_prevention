import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
//引入antd
import { Table, Button, Input, Divider, Tag, Icon } from 'antd';
const Search = Input.Search;




class CheckTableManage extends Component {
    render() {
        //table列属性
        const columns = [
            { title: 'ID', dataIndex: 'id', key: 'id' },
            { title: '检查表名', dataIndex: 'name', key: 'name' },
            { title: '类别', dataIndex: 'type', key: 'type' },
            { title: '添加时间', dataIndex: 'addDate', key: 'addDate' },
            { 
                title: '操作', 
                key: 'action', 
                render:()=>(<span>
                    <Tag color="blue">详情</Tag>
                    <Divider type="vertical" />
                    <Tag colur="orange">修改</Tag>
                </span>)
            }
        ]

        //table数据
        const dataSource = [];

        return (
            <div>
                 <div className="contentWrap">
                    <div style={{width:'90%',margin:'20px auto',height:'80px'}}>
                    <Search
                    className="searchClass"
                    placeholder="input search text"
                    enterButton="Search"
                    size="large"
                    onSearch={value => console.log(value)}
                    />
                    <Link>
                      <Button style={{float:'right',width:'79px',height:'40px',margin:'20px 0px'}}><Icon type="plus" />添加</Button>
                    </Link>
                    </div>
                    <Table
                        className="tableClass"
                        bordered="true"
                        columns={columns} dataSource={dataSource} />
                </div>
            </div>
        )
    }
}

export default CheckTableManage;
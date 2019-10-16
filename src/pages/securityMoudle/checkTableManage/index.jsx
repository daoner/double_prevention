import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { actionCreator } from './store';

//引入antd
import { Table, Button, Input, Divider, Tag, Icon, Breadcrumb } from 'antd';
const Search = Input.Search;




class CheckTableManage extends Component {

    componentDidMount() {
        this.props.getCheckTableList();
    }

    render() {
        //获取store 的数据
        const { checkTableList, pagenationProps}  = this.props;  //immutable对象
        const data = checkTableList.toJS();
        const JSpagenationProps = pagenationProps.toJS();


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
                    <Tag colur="yellow">修改</Tag>
                </span>)
            }
        ]

        

        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>安全检查标准管理</Breadcrumb.Item>
                    <Breadcrumb.Item>检查表管理</Breadcrumb.Item>
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
                        <Link to="/main/checktable/manage/add" >
                            <Button style={{float:'right',width:'79px',height:'40px',margin:'20px 0px'}}><Icon type="plus" />添加</Button>
                        </Link>
                    </div>
                    <Table
                        className="tableClass"
                        bordered
                        pagenation={JSpagenationProps}
                        columns={columns} dataSource={data} />
                </div>
            </div>
        )
    }
}


//将 store 数据传给组件props
const mapState = (state)=> {
    return {
      checkTableList: state.getIn(['checkTable','checkTableList']),
      pagenationProps: state.getIn(['checkTable','pagenationProps'])
    }
  };

//将操作store的方法传给组件props
const mapDispatch = (dispatch)=> {
    return {
        getCheckTableList() {
            dispatch(actionCreator.getCheckTableList());
        }
    }
};

export default connect(mapState,mapDispatch)(CheckTableManage);
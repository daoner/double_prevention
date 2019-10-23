import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import Qs from 'qs';
import { actionCreator } from './store';

//引入antd
import { Table, Button, Input, Divider, Tag, Icon, Breadcrumb, Modal, message } from 'antd';
const Search = Input.Search;




class CheckTableManage extends Component {
    constructor(props) {
        super(props);

        this.deleteItem = this.deleteItem.bind(this);
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
              axios.post('/api/checkTable/delete',Qs.stringify({checkTableId: text.id}),{
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
                }
              }
              ).then(res=>{
                message.success('删除成功！',2);
                //重新请求list
                const { pagenationProps , getCheckTableList }  = this.props;
                const pageSize = pagenationProps.get('pageSize');
                const current = pagenationProps.get('current');
                getCheckTableList(pageSize, current);
              }).catch(error=> {
                message.error(error.message);
              });
              console.log('OK,发送异步请求');
               //这里删除item
            }
          });
      }

    componentDidMount() {
        const { pagenationProps , getCheckTableList }  = this.props;
        const pageSize = pagenationProps.get('pageSize');
        const current = pagenationProps.get('current');
        getCheckTableList(pageSize, current);
    }

    render() {
        //获取store 的数据
        const { checkTableList, pagenationProps}  = this.props;  //immutable对象
        const data = checkTableList.toJS();
        const JSpagenationProps = pagenationProps.toJS();

        //设置换页的回调
        JSpagenationProps.onChange = this.props.handleChangePage;  
        JSpagenationProps.onShowSizeChange =  this.props.handleChangePage;


        //table列属性
        const columns = [
            { title: 'ID', dataIndex: 'id', key: 'id' },
            { title: '检查表名', dataIndex: 'name', key: 'name' },
            { title: '类别', dataIndex: 'type', key: 'type' },
            { title: '添加时间', dataIndex: 'addDate', key: 'addDate' },
            { 
                title: '操作', 
                key: 'action', 
                render:(text,value)=>(<span>
                    <Link to={`/main/checktable/manage/detail/${text.id}`}><Tag color="blue">详情</Tag></Link>
                    <Divider type="vertical" />
                    <Tag colur="yellow">修改</Tag>
                    <Divider type="vertical"/>
                    <Tag color="red" onClick={()=>{this.deleteItem(text)}} >删除</Tag>
                </span>)
            }
        ]

        

        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>安全检查与隐患管理</Breadcrumb.Item>
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
                        pagination={JSpagenationProps}
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
        getCheckTableList(pageSize,pageNum) {
            dispatch(actionCreator.getCheckTableList(pageSize,pageNum));
        },


        handleChangePage(current,pageSize) {
            dispatch(actionCreator.getCheckTableList(pageSize,current));
        },
    }
};

export default connect(mapState,mapDispatch)(CheckTableManage);
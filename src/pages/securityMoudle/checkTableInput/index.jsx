import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Breadcrumb, Card, Icon, message } from 'antd';

import './style.css';
import imgURL from '../../../statics/images/checktable_preview.png';

class CheckTableInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            //检查表简单list，title和id
            checkTableMiniList:[],
        }
    }

    componentDidMount() {
        //获取所有检查表的id和name
        /*
        成功：
            {
                "status": 1,
                "data": [
                    {
                        "id": 1,
                        "name":"001检查表"
                    },
                    {
                        "id":2,
                        "name": "检查表0002"
                    }
                ]
            }
        */
        axios.get('/api/checkTable/getIdAndNameList').then(res=>{
            if(res.data.status === 1) {
                this.setState({
                    checkTableMiniList: res.data.data
                })
            }else {
                message.error(res.data.message || '获取检查表列表失败',2);
            }
        }).catch(error=>{
            message.error(error.message,2);
        })
    }


    render() {
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>安全检查与隐患管理</Breadcrumb.Item>
                    <Breadcrumb.Item>检查表一览</Breadcrumb.Item>
                </Breadcrumb>
                <div className="contentWrap" >
                    <ul className="card-list clearfix">
                        {
                            this.state.checkTableMiniList.map(item=>(
                                <li>
                                    <Card 
                                        cover={ <img alt="name" src={imgURL} /> }
                                        actions={[
                                            <Link to={`/main/checktable/Input/detail/${item.id}`}><span key='detail'><Icon type="info-circle" />详情</span></Link>,
                                        <Link to={`/main/checktable/Input/add/${item.id}`}><span key='edit'><Icon type="edit"/>录入</span></Link>,
                                        ]}
                                    >
                                        <Card.Meta title={item.name} />
                                    </Card>
                                </li>
                            ))
                        }

                        <li>
                            <Card 
                                cover={ <img alt="name" src={imgURL} /> }
                                actions={[
                                    <Link to="/main/checktable/Input/detail/1"><span key='detail'><Icon type="info-circle" />详情</span></Link>,
                                    <Link to="/main/checktable/Input/add/1"><span key='edit'><Icon type="edit"/>录入</span></Link>,
                                ]}
                            >
                                <Card.Meta title="test" />
                            </Card>
                        </li>
                       
                    </ul>
                </div>
                
            </div>
        )
    }
}
export default CheckTableInput;
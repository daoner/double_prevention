import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Card, Icon } from 'antd';

import './style.css';
import imgURL from '../../../statics/images/checktable_preview.png';

class CheckTableInput extends Component {
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
                        <li>
                            <Card 
                                cover={ <img alt="name" src={imgURL} /> }
                                actions={[
                                    <Link to="/main/checktable/Input/detail/1"><span key='detail'><Icon type="info-circle" />详情</span></Link>,
                                    <Link to="/main/checktable/Input/add"><span key='edit'><Icon type="edit"/>录入</span></Link>,
                                ]}
                            >
                                <Card.Meta
                                    title="矿山日常制度检查表"
                                />
                            </Card>
                        </li>
                        <li>
                            <Card 
                                cover={ <img alt="name" src={imgURL} /> }
                                actions={[
                                    <span key='detail'><Icon type="info-circle" />详情</span>,
                                    <span key='edit'><Icon type="edit"/>录入</span>,
                                ]}
                            >
                                <Card.Meta
                                    title="矿山日常制度检查表"
                                />
                            </Card>
                        </li>
                        <li>
                            <Card 
                                cover={ <img alt="name" src={imgURL} /> }
                                actions={[
                                    <span key='detail'><Icon type="info-circle" />详情</span>,
                                    <span key='edit'><Icon type="edit"/>录入</span>,
                                ]}
                            >
                                <Card.Meta
                                    title="矿山日常制度检查表"
                                />
                            </Card>
                        </li>
                        <li>
                            <Card 
                                cover={ <img alt="name" src={imgURL} /> }
                                actions={[
                                    <span key='detail'><Icon type="info-circle" />详情</span>,
                                    <span key='edit'><Icon type="edit"/>录入</span>,
                                ]}
                            >
                                <Card.Meta
                                    title="矿山日常制度检查表"
                                />
                            </Card>
                        </li>
                        <li>
                            <Card 
                                cover={ <img alt="name" src={imgURL} /> }
                                actions={[
                                    <span key='detail'><Icon type="info-circle" />详情</span>,
                                    <span key='edit'><Icon type="edit"/>录入</span>,
                                ]}
                            >
                                <Card.Meta
                                    title="矿山日常制度检查表"
                                />
                            </Card>
                        </li>
                        <li>
                            <Card 
                                cover={ <img alt="name" src={imgURL} /> }
                                actions={[
                                    <span key='detail'><Icon type="info-circle" />详情</span>,
                                    <span key='edit'><Icon type="edit"/>录入</span>,
                                ]}
                            >
                                <Card.Meta
                                    title="矿山日常制度检查表"
                                />
                            </Card>
                        </li>
                        <li>
                            <Card 
                                cover={ <img alt="name" src={imgURL} /> }
                                actions={[
                                    <span key='detail'><Icon type="info-circle" />详情</span>,
                                    <span key='edit'><Icon type="edit"/>录入</span>,
                                ]}
                            >
                                <Card.Meta
                                    title="矿山日常制度检查表"
                                />
                            </Card>
                        </li> 
                    </ul>
                </div>
                
            </div>
        )
    }
}
export default CheckTableInput;
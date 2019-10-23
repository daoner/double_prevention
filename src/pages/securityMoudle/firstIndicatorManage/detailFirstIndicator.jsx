/**
 * 一级指标详情
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Breadcrumb, Form, Input, Button, Radio } from 'antd';
import './style.css';

class DetailFirstIndicator extends Component {

    render() {
        const { firstIndicatorList } = this.props;  //获取到list, immutable 对象
        const JSfirstIndicatorList = firstIndicatorList.toJS();
        const id = this.props.match.params.id;
        let firstIndicatorInfo = {};
        for(let i=0;  i<JSfirstIndicatorList.length;i++  ) {
            if(JSfirstIndicatorList[i].id == id) {
                firstIndicatorInfo = JSON.parse(JSON.stringify(JSfirstIndicatorList[i]));
                break;
            }
        }
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>安全检查与隐患管理</Breadcrumb.Item>
                    <Breadcrumb.Item>一级指标管理</Breadcrumb.Item>
                    <Breadcrumb.Item>指标详情</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div className="contentWrap">
                    <div style={{width:"80%", margin:"50px auto"}}>
                        <Form  labelCol={ {span: 6 }} wrapperCol={{ span: 14 }} disabled>
                            <Form.Item label="项目id">
                                <Input type="text" disabled  value={firstIndicatorInfo.id}/>
                            </Form.Item>
                            <Form.Item label="所属检查表">
                                <Input type="text" disabled  value={firstIndicatorInfo.checkTable}/>
                            </Form.Item>
                            <Form.Item label="项目名">
                                <Input type="text" disabled  value={firstIndicatorInfo.project} />
                            </Form.Item>
                            <Form.Item label="添加时间">
                                <Input type="text" disabled  value={firstIndicatorInfo.addDate}/>
                            </Form.Item>
                            <Form.Item label="是否删除">
                                <Radio.Group disabled>
                                    <Radio value="是" checked={ firstIndicatorInfo.isDelete }>是</Radio>
                                    <Radio value="否" checked={ !firstIndicatorInfo.isDelete }>否</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="删除时间">
                                <Input type="text" disabled  value={firstIndicatorInfo.isDelete ? firstIndicatorInfo.deleteDate : ''}/>
                            </Form.Item>
                            <Form.Item wrapperCol={{span: 4, offset:6}}>
                                <Link to="/main/firstIndicator/manage">
                                    <Button>返回</Button>
                                </Link>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = (state)=>({
    firstIndicatorList: state.getIn(['firstIndicator','firstIndicatorList'])
})
export default connect(mapState,null)(DetailFirstIndicator);
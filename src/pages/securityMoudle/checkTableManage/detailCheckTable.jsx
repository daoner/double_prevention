/**
 * 一级指标详情
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Breadcrumb, Form, Input, Button, Radio } from 'antd';

class DetailCheckTable extends Component {

    render() {
        const { checkTableList } = this.props;  //获取到list, immutable 对象
        const JScheckTableList = checkTableList.toJS();
        const id = this.props.match.params.id;
        let checkTableInfo = {};
        for(let i=0;  i<JScheckTableList.length;i++  ) {
            if(JScheckTableList[i].id == id) {
                checkTableInfo = JSON.parse(JSON.stringify(JScheckTableList[i]));
                break;
            }
        }
        // console.log(checkTableInfo)
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>安全检查与隐患管理</Breadcrumb.Item>
                    <Breadcrumb.Item>检查表管理</Breadcrumb.Item>
                    <Breadcrumb.Item>检查表详情</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div className="contentWrap">
                    <div style={{width:"80%", margin:"50px auto"}}>
                        <Form  labelCol={ {span: 6 }} wrapperCol={{ span: 14 }} disabled>
                            <Form.Item label="检查表id">
                                <Input type="text" disabled  value={checkTableInfo.id || ''}/>
                            </Form.Item>
                            <Form.Item label="检查表名">
                                <Input type="text" disabled  value={checkTableInfo.name || ''}/>
                            </Form.Item>
                            <Form.Item label="检查表编号">
                                <Input type="text" disabled  value={checkTableInfo.identifier || ''}/>
                            </Form.Item>
                            <Form.Item label="检查表类别">
                                <Input type="text" disabled  value={checkTableInfo.type || ''} />
                            </Form.Item>
                            <Form.Item label="所属部门">
                                <Input type="text" disabled  value={checkTableInfo.dept || ''} />
                            </Form.Item>
                            <Form.Item label="添加时间">
                                <Input type="text" disabled  value={checkTableInfo.addDate || ''}/>
                            </Form.Item>
                            <Form.Item label="是否删除">
                                <Radio.Group disabled>
                                    <Radio value="是" checked={checkTableInfo.isDelete}>是</Radio>
                                    <Radio value="否" checked={!checkTableInfo.isDelete}>否</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="删除时间">
                                <Input type="text" disabled  value={checkTableInfo.isDelete? checkTableInfo.deleteDate : ''}/>
                            </Form.Item>
                            <Form.Item wrapperCol={{span: 4, offset:6}}>
                                <Link to="/main/checktable/manage">
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
    checkTableList: state.getIn(['checkTable','checkTableList'])
})

export default connect(mapState,null)(DetailCheckTable);
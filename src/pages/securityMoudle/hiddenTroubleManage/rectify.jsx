/**
 * 检查结果录入组件
 */
import React, { Component } from 'react';
import axios from 'axios';
import Qs from 'qs';

import { Breadcrumb,   Button, message, Form, Input,  DatePicker} from 'antd';

import UpLoad from '../checkTableInput/upload';
import { formateDate } from '../../../utils/dateUtil';

class AddCheckTableResult extends Component {
    constructor(props) {
        super(props); 

        this.handleSubmit = this.handleSubmit.bind(this);

    }



    /**
     * 提交表单
     * @param {} e 
     */
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                let formdata = {
                    id: this.props.match.params.id,
                    desc: values.desc,
                    finishDate: formateDate(new Date(values.finishDate._d), 'yyyy-MM-dd'),
                    rPhoto: values.rPhoto || ''
                }
                // console.log(formdata);
                axios.post('/api/input/rectify', Qs.stringify(formdata),{
                    headers: {
                        'Content-Type':'application/x-www-form-urlencoded;'
                    }
                }).then(res=>{
                    if(res.data.status === 1) {
                        message.success( res.data.message || "完成整改成功");
                        this.props.history.goBack();
                    }else {
                        message.error(res.data.message || "完成整改失败");
                    }                    
                }).catch(error=>{
                    message.error(error.message);
                })

            }else {
                message.info('请填写完整信息');
            }
             
        });
    }

    /**
     * render
     */
    render() {

        const { getFieldDecorator } = this.props.form;
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>安全检查与隐患管理</Breadcrumb.Item>
                    <Breadcrumb.Item>检查表一览</Breadcrumb.Item>
                    <Breadcrumb.Item>检查结果录入</Breadcrumb.Item>
                </Breadcrumb>
                <div className="contentWrap"  style={{paddingTop: '50px'}}>
                    
                    <Form labelCol={{span:6}} wrapperCol={{span: 14}} onSubmit={this.handleSubmit} >
                        <Form.Item label="整改说明">
                            {getFieldDecorator('desc', {
                                rules: [{ required: true, message: '请输入整改说明!' }],
                            })(
                                <Input maxLength="80" placeholder="整改说明" />,
                            )}
                        </Form.Item>

                        {/* 检查类型  */}
                        <Form.Item label="完成日期">
                            {getFieldDecorator('finishDate', {
                                rules: [{ required: true, message: '请选择检查类型!' }],
                            })(
                                <DatePicker />,
                            )}
                        </Form.Item>
                        
                        <Form.Item label="整改图片">
                            {getFieldDecorator('rPhoto', {
                                rules: [{ required: false, message: '请上传图片!' }],
                            })(
                                <UpLoad action="/api/input/savePicture" />,
                            )}
                        </Form.Item>
                      
                        
                        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
export default Form.create({ name: 'checktable_result' })(AddCheckTableResult);


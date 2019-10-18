/**
 * 检查结果录入组件
 */
import React, { Component } from 'react';
import { Breadcrumb,  Divider, Button, message} from 'antd';
import { Form, Input, Radio, DatePicker, Switch } from 'antd';

import UpLoad from './upload';

class AddCheckTableResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ishide: true
        };

        this.handleSwitch = this.handleSwitch.bind(this);
        this.getHiddenArea = this.getHiddenArea.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * switch响应函数，是否显示隐藏部分
     */
    handleSwitch() {
        this.setState({
            ishide: !this.state.ishide
        })
    }
    /**
     * 隐藏区域结构
     * @param {*} getFieldDecorator 
     */
    getHiddenArea(getFieldDecorator) {
        const ishide = this.state.ishide;
        if(ishide) {
            return null;
        }else {
            return (
                <div>
                    <Form.Item label="隐患类型">
                        {getFieldDecorator('HDtype', {
                            rules: [{ required: true, message: '请输入隐患类型!' }],
                        })(
                            <Input maxLength="10" placeholder="隐患类型" />,
                        )}
                    </Form.Item>
                    <Form.Item label="隐患描述">
                        {getFieldDecorator('HDcontent', {
                            rules: [{ required: true, message: '请输入隐患描述!' }],
                        })(
                            <Input.TextArea style={{maxHeight:"100px"}} maxLength="80" placeholder="隐患描述..." />,
                        )}
                    </Form.Item>
                    <Form.Item label="隐患图片">
                        {getFieldDecorator('HDphoto', {
                            rules: [{ required: false, message: '请上传图片!' }],
                        })(
                            <UpLoad action="/api/input/savePicture" />,
                        )}
                    </Form.Item>
                    
                </div>
                
            )
        }
    }


    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }else {
                // console.log(err,values)
                message.info('请正确填写必要信息!')
            }
        });
    }

    /**
     * render
     */
    render() {
        const mylist = [
            { 
                id: 1, 
                project: '日常饮食检查',
                list: [
                    { secondLevelId: 11, content: '西红柿' },
                    { secondLevelId: 12, content: '吃西红柿' },
                    { secondLevelId: 13, content: '绝对不吃西红柿' },
                    { secondLevelId: 14, content: '打死不吃西红柿' }
                ]
            },
            { 
                id: 5, 
                project: '环境卫生检查' ,
                list: [
                    { secondLevelId: 11, content: '西红柿' },
                    { secondLevelId: 12, content: '吃西红柿' },
                    { secondLevelId: 13, content: '绝对不吃西红柿' },
                    { secondLevelId: 14, content: '打死不吃西红柿' }
                ]
            }
        ];
 

        const { getFieldDecorator } = this.props.form;
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>安全检查与隐患管理</Breadcrumb.Item>
                    <Breadcrumb.Item>检查表一览</Breadcrumb.Item>
                    <Breadcrumb.Item>检查结果录入</Breadcrumb.Item>
                </Breadcrumb>
                <div className="contentWrap" >
                    <Divider type="horizontal">检查结果录入</Divider>
                    <Form labelCol={{span:6}} wrapperCol={{span: 14}} onSubmit={this.handleSubmit} >
                        <Form.Item label="录入表单id">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入事故名称!' }],
                            })(
                                <Input placeholder="这个使用js生成" />,
                            )}
                        </Form.Item>

                        {/* 把表项列出来 */}
                        {
                        }

                        
                        {/* 检查类型  */}
                        <Form.Item label="检查类型">
                            {getFieldDecorator('type', {
                                rules: [{ required: true, message: '请选择检查类型!' }],
                            })(
                                <Radio.Group>
                                    <Radio value="日常检查" >日常检查</Radio>
                                    <Radio value="定期检查">定期检查</Radio>
                                    <Radio value="专业性检查">专业性检查</Radio>
                                    <Radio value="不定期检查">不定期检查</Radio>
                                </Radio.Group>
                            )}
                        </Form.Item>
                        {/* 最终检查结果 */}
                        <Form.Item label="检查结果">
                            {getFieldDecorator('isqualified', {
                                rules: [{ required: true, message: '请选择检查结果!' }],
                            })(
                                <Radio.Group>
                                    <Radio value="1" checked>合格</Radio>
                                    <Radio value="0">不合格</Radio>
                                </Radio.Group>
                            )}
                        </Form.Item>
                        <Form.Item label="不合格说明">
                            {getFieldDecorator('desc', {
                                rules: [{ required: false, message: '请输入不合格说明!' }],
                            })(
                                <Input.TextArea maxLength="20" placeholder="不合格说明" />,
                            )}
                        </Form.Item>
                        {/* 检查日期  */}
                        <Form.Item label="检查日期">
                            {getFieldDecorator('checkDate', {
                            rules: [{ required: true, message: '请确定检查日期!' }],
                            })(
                                <DatePicker />,
                            )}
                        </Form.Item>

                        {/* 检查人信息 */}
                        <Form.Item label="检查人">
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入检查人!' }],
                            })(
                                <Input maxLength="10" placeholder="杜甫" />,
                            )}
                        </Form.Item>
                        {/* 参检人 */}
                        <Form.Item label="其他参检人">
                            {getFieldDecorator('otherPeople')(
                                <Input maxLength="20" placeholder="李白" />,
                            )}
                        </Form.Item>

                        {/* 开关  */}
                        <Form.Item label="是否有隐患">
                            {getFieldDecorator('switch', { 
                                valuePropName: 'checked' 
                            })(
                                <Switch checkedChildren="是" unCheckedChildren="否" onChange={this.handleSwitch} />
                            )}
                        </Form.Item>

                        { this.getHiddenArea(getFieldDecorator) }
                        
                        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
export default Form.create({ name: 'checktable_result' })(AddCheckTableResult);


/*
var data = {
			checktableId: 1,	//模板id
			inputId：1111111,	//录入表的id
			lise: [
				{ secondLevelid: 21, isqualified: 1, desc: 说明 },
				{ secondLevelid: 21, isqualified: 1, desc: 说明 }
			],
		1	checkDate: 2019-4-5,
		1	userName:
			deptId:
			deptedId:
		1	isqualified: 1,
		1	desc: shuom,
		1	type:
		1	otherPerple:

			isHd: true,
			Hd: {
				type: 
                hPhoto:""
                content:
                
				status: "未整改",
				startDate: 1970-01-01,
				endDate: 1970-01-01,
				finishDate: 1970-01-01,
				rPhoto: "",
				desc: "描述",
				isFile: 0,
				dispatchUserId: uid,
				dispatchDeptId: 
				deptId: 222， //负责整改部门
			}
		}


*/
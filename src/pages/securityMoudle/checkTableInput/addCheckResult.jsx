/**
 * 检查结果录入组件
 */
import React, { Component } from 'react';
import axios from 'axios';
import { Breadcrumb,  Divider, Button, message} from 'antd';
import { Form, Input, Radio, DatePicker, Switch, Select } from 'antd';

import UpLoad from './upload';
import { generateUUID } from '../../../utils/UUID';       //生成uuid
import { formateDate } from '../../../utils/dateUtil';
import memery from '../../../utils/memeryUtil';

class AddCheckTableResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ishide: true,
            mylist: [],
            allDept:[]
            // mylist: [
            //     { 
            //         id: 1, 
            //         project: '日常饮食检查',
            //         list: [
            //             { secondLevelId: 11, content: '西红柿' },
            //             { secondLevelId: 12, content: '吃西红柿' },
            //             { secondLevelId: 13, content: '绝对不吃西红柿' },
            //             { secondLevelId: 14, content: '打死不吃西红柿' }
            //         ]
            //     },
            //     { 
            //         id: 5, 
            //         project: '环境卫生检查' ,
            //         list: [
            //             { secondLevelId: 21, content: '西红柿' },
            //             { secondLevelId: 22, content: '吃西红柿' },
            //             { secondLevelId: 23, content: '绝对不吃西红柿' },
            //             { secondLevelId: 24, content: '打死不吃西红柿' }
            //         ]
            //     }
            // ]
        };

        this.handleSwitch = this.handleSwitch.bind(this);
        this.getHiddenArea = this.getHiddenArea.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        /*
        {
            "checkTableName": "name",
            "checkTableId": 1,
            "firstList": [
                    {
                        "firstProject": "你好",
                        "firstId": 1
                        "secondList": [
                        {
                            "secondId": 2,
                            "content": "哈哈哈"
                        }
                        ],
                    },
            ]
        }
        */
        let firstlist;  //检查条目的list
        let deptlist;   //所有部门的list
        //获取所有一级和二级的检查条目
        axios.post('/api/checkTable/getAllInfoById',{ checkTableId: this.props.match.params.id }).then(res=>{
            firstlist = res.data.firstList
        }).catch(error=>{
            message.error(error.message,2);
        })
        // 获取所有部门的 id 和 name
        axios.get('/api/department/getAllDept').then(res=>{
            if(res.data.status === 1) {
                deptlist = res.data.list;
            }
        }).catch(error=>{
            message.error(error.message,2);
        })
        this.setState({
            mylist: firstlist || [],
            allDept: deptlist || []
        })

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
                            rules: [{ required: true, message: '请选择隐患类型!' }],
                        })(
                            <Radio.Group>
                                <Radio value="普通隐患" >普通隐患</Radio>
                                <Radio value="重大隐患">重大隐患</Radio>
                                <Radio value="严重隐患">严重隐患</Radio>
                            </Radio.Group>
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
/*
var data = {
			checktableId: 1,	//模板id
			inputId：1111111,	//录入表的id
			list: [
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

    /**
     * 提交表单
     * @param {} e 
     */
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let datainfo = {
                    checktableId: this.props.match.params.id,  //动态路由获取id
                    inputId: generateUUID(),    //uuid

                    checkDate: formateDate(new Date(values.checkDate._d),'yyyy-MM-dd'),     //
                    userName: values.username,  //监察人
                    deptId: memery.user.deptId, //检查的单位
                    deptedId: values.deptedId || '',
                    isqualified: values.isqualified,    //是否合格
                    desc: values.desc,  //不合格说明
                    type: values.type,  //检查类型
                    otherPerson: values.otherPeople,    //参与检查的人

                    isHd: values.isHd === undefined ? false : true, //是否由隐患
                    Hd: {
                        type: values.HDtype || '',
                        hPhoto: values.HDphoto || '',
                        content: values.HDcontent || '',
                    },
                    list: [],   //每一项

                }
                const mylist = this.state.mylist;
                for(let i=0, count=0;i<mylist.length;i++){
                    for(let j=0; j<mylist[i].list.length; j++, count++){
                        let iname = mylist[i].id + '-' + mylist[i].list[j].secondLevelId;
                        datainfo.list[count] = {
                            secondLevelId : mylist[i].list[j].secondLevelId,
                            isqualified: values[iname],
                            desc: ''
                        }
                    }
                }
                // console.log('???',JSON.stringify(datainfo));
                axios.post('url',{data: JSON.stringify(datainfo) }).then(res=>{
                    if(res.data.status === 1) {
                        message.success('录入成功',2);
                        // 跳转。。。
                    }else {
                        message.error(res.data.message || '录入失败' , 2);
                    }
                }).catch(error=>{
                    message.error(error.message,2);
                })
                
            }else {
                message.info('请正确填写必要信息!')
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
                <div className="contentWrap" >
                    
                    <Form labelCol={{span:6}} wrapperCol={{span: 14}} onSubmit={this.handleSubmit} >
                        {
                            this.state.mylist.map((item1)=>(
                                <div>
                                    <Form.Item labelCol={{span:6}} label={item1.project}></Form.Item>
                                    {
                                        item1.list.map(item2 =>(
                                            <Form.Item labelCol={{span:10}} label={`${item2.content}`}>
                                                {getFieldDecorator(`${item1.id}-${item2.secondLevelId}`, {
                                                    rules: [{ required: true, message: '确定是否合格!' }],
                                                })(
                                                    <Radio.Group>
                                                        <Radio value="1">合格</Radio>
                                                        <Radio value="0">不合格</Radio>
                                                    </Radio.Group>
                                                )}
                                            </Form.Item>
                                        ))
                                    }
                                </div>
                                
                            ))
                        }

                        <Form.Item label="被检查单位">
                            {getFieldDecorator('deptedId', {
                                rules: [{ required: true, message: '请选择被检单位!' }],
                            })(
                                <Select
                                    placeholder="select a deportment"
                                    // onChange={(e,v)=>{console.log(e,v,'selet change ')}}
                                >
                                    {
                                        this.state.allDept.map(item=>(
                                            <Select.Option value={item.id}>{item.name}</Select.Option>
                                        ))
                                    }
                                </Select>  
                            )}
                        </Form.Item>
                         

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
                            {getFieldDecorator('isHd', { 
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
			list: [
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
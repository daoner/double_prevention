/**
 * 检查结果录入组件
 */
import React, { Component } from 'react';
import { Breadcrumb } from 'antd';


class AddCheckTableResult extends Component {
    render() {
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>安全检查与隐患管理</Breadcrumb.Item>
                    <Breadcrumb.Item>检查表一览</Breadcrumb.Item>
                    <Breadcrumb.Item>检查结果录入</Breadcrumb.Item>
                </Breadcrumb>
                <div className="contentWrap" >
                    填入表单信息
                </div>
            </div>
        )
    }
}
export default AddCheckTableResult;


/*
var data = {
			checktableId: 1,	//模板id
			inputId：1111111,	//录入表的id
			lise: [
				{ secondLevelid: 21, isqualified: 1, desc: 说明 },
				{ secondLevelid: 21, isqualified: 1, desc: 说明 }
			],
			checkDate: 2019-4-5,
			userName:
			deptId:
			deptedId:
			isqualified: 1,
			desc: shuom,
			type:
			otherPerple:

			isHd: true,
			Hd: {
				type: 
				hPhoto:""
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
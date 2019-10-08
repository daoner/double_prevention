import React, { Component } from 'react';
import {  Menu,  Icon } from 'antd';
import {Link} from 'react-router-dom';
/*<span><Link to="/main"><Icon type="home"/>主页</Link></span>*/

const { SubMenu } = Menu;
class LeftNav extends Component {
    render() {
        return (
           <div>
          {/* logo 部分 */}
          <div className="logo"><span><Icon type="home"></Icon><span>这里是logo</span></span></div>

          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1"><Link to="/main"><span><Icon type="home"/>主页</span></Link></Menu.Item>
            <SubMenu key="sub1" title={<span><Icon type="book"/><span>授权许可</span></span>}>
              <Menu.Item key="sub1-1"><Link to="/main/assign/apply">作业申请</Link></Menu.Item>
              <Menu.Item key="sub1-2"><Link to="/main/assign/applyRecord">申请记录</Link></Menu.Item>
              <Menu.Item key="sub1-3"><Link to="/main/assign/preApprove">作业审批</Link></Menu.Item>
              <Menu.Item key="sub1-4"><Link to="/main/assign/hadApprove">审批记录</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="bug" /><span>事故管理与统计</span></span>}>
              <Menu.Item key="sub2-1"><Link to="/main/accident/manage">事故信息管理</Link></Menu.Item>
              <Menu.Item key="sub2-2"><Link to="/main/accident/wounde">人员伤亡</Link></Menu.Item>
              <Menu.Item key="sub2-3"><Link to="/main/accident/statistic"></Link>统计分析</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title={<span><Icon type="fire"/><span>风险管理与评估</span></span>}>
              <Menu.Item key="sub3-1"><Link to="/main/risk/manage">风险管理</Link></Menu.Item>
              <Menu.Item key="sub3-2"><Link to="/main/risk/danger">危险源管理</Link></Menu.Item>
              <Menu.Item key="sub3-3"><Link to="/main/risk/statistic">统计分析</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" title={<span><Icon type="insurance" /><span>安全检查与隐患管理</span></span>}>
              <SubMenu key="sub4-1" title="安全检查标准管理">
                <Menu.Item key="sub4-1-1">检查表管理</Menu.Item>
                <Menu.Item key="sub4-1-2">检查内容管理</Menu.Item>
                <Menu.Item key="sub4-1-3">检查标准管理</Menu.Item>
              </SubMenu>
              <Menu.Item key="sub4-2">检查表录入</Menu.Item>
              <Menu.Item key="sub4-3">安全检查结果</Menu.Item>
              <Menu.Item key="sub4-4">隐患整改信息</Menu.Item>
              <Menu.Item key="sub4-5">隐患分类统计</Menu.Item>
            </SubMenu>
            <SubMenu key="sub5" title={<span><Icon type="setting" /><span>系统维护与管理</span></span>}>
              <Menu.Item key="sub5-1"><Link to="/main/manage/organization">机构管理</Link></Menu.Item>
              <Menu.Item key="sub5-2"><Link to="/main/manage/role">角色管理</Link></Menu.Item>
              <Menu.Item key="sub5-3"><Link to="/main/manage/user">用户管理</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </div>
        )
    }
}

export default LeftNav;
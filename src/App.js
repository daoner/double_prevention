import React, {Component} from 'react';
import { Layout, Menu,  Icon } from 'antd';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';


import Login from './pages/login';

import UserManage from './pages/systemMoudle/userManage';
import OrganizationManage from './pages/systemMoudle/organizationManage';
import RoleManage from './pages/systemMoudle/roleManage';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
class App extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <HashRouter>
        {/* 左侧菜单部分 */}
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          {/* logo 部分 */}
          <div className="logo"><span><Icon type="home"></Icon><span>这里是logo</span></span></div>
        
          <Menu theme="dark" defaultSelectedKeys={['4']} mode="inline">
            <Menu.Item key="1"><Link to="/login">Login</Link></Menu.Item>
            <Menu.Item key="2"><Icon type="home"/><span>主页</span></Menu.Item>
            <SubMenu key="sub1" title={<span><Icon type="book"/><span>授权许可</span></span>}>
              <Menu.Item key="sub1-1">作业申请</Menu.Item>
              <Menu.Item key="sub1-2">申请记录</Menu.Item>
              <Menu.Item key="sub1-3">作业审批</Menu.Item>
              <Menu.Item key="sub1-4">审批记录</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="bug" /><span>事故管理与统计</span></span>}>
              <Menu.Item key="sub2-1">事故信息管理</Menu.Item>
              <Menu.Item key="sub2-2">人员伤亡</Menu.Item>
              <Menu.Item key="sub2-3">统计分析</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title={<span><Icon type="fire"/><span>风险管理与评估</span></span>}>
              <Menu.Item key="sub3-1">风险管理</Menu.Item>
              <Menu.Item key="sub3-2">危险源管理</Menu.Item>
              <Menu.Item key="sub3-3">统计分析</Menu.Item>
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
              <Menu.Item key="sub5-1"><Link to="/manage/organization">机构管理</Link></Menu.Item>
              <Menu.Item key="sub5-2"><Link to="/manage/role">角色管理</Link></Menu.Item>
              <Menu.Item key="sub5-3"><Link to="/manage/user">用户管理</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        {/**内容部分 */}
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            
            <Switch>
              <Route path="/" exact />
              <Route path="/login" component={Login}/>
              <Route path="/manage/user" component={UserManage} />
              <Route path="/manage/role" component={RoleManage} />
              <Route paht="/manage/organization" component={OrganizationManage} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
        </HashRouter>
      </Layout>
    );
  }
}

export default App;
import React, {Component} from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import { Layout, Menu,  Icon } from 'antd';
import LeftNav from '../../commen/leftNav';

import Home from '../home';

/* 作业授权许可模块 */
import Apply from '../assignMoudle/apply';
import ApplyRecord from '../assignMoudle/applyRecord';
import PreApprove from '../assignMoudle/preApprove';
import HadApprove from '../assignMoudle/hadApprove';

/* 风险管理与评估 */
import RiskManage from '../riskMoudle/riskManage';
import DangerManage from '../riskMoudle/dangerManage';
import RiskStatistic from '../riskMoudle/statistic';

/* 事故管理统计模块 */
import AccidentManage from '../accidentMoudle/accidentManage';
import WoundeManage from '../accidentMoudle/woundeManage';
import AccidentStatistic from '../accidentMoudle/statistic';

/* 系统维护管理模块 */
import UserManage from '../systemMoudle/userManage';
import OrganizationManage from '../systemMoudle/organizationManage';
import RoleManage from '../systemMoudle/roleManage';

const { Header, Content, Footer, Sider } = Layout;

class Main extends Component {
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
        <LeftNav/>
        </Sider>
        {/**内容部分 */}
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Switch>
              <Route path="/main" exact component={Home} />

              {/* 作业申请审批 */}
              <Route path="/main/assign/apply" component={Apply} />
              <Route path="/main/assign/applyRecord" component={ApplyRecord} />
              <Route path="/main/assign/preApprove" component={PreApprove} />
              <Route path="/main/assign/hadApprove" component={HadApprove} />

            

              <Route path="/main/accident/manage" component={AccidentManage}/>
              <Route path="/main/accident/wounde" component={WoundeManage}/>
              <Route path="/main/accident/statistic" component={AccidentStatistic} />

              {/* 风险管理与评估 */}
              <Route path="/main/risk/manage" component={RiskManage} />
              <Route path="/main/risk/danger" component={DangerManage} />
              <Route path="/main/risk/statistic" component={RiskStatistic} />

              {/* 系统管理 */}
              <Route path="/main/manage/user" component={UserManage} />
              <Route path="/main/manage/role" component={RoleManage} />
              <Route paht="/main/manage/organization" component={OrganizationManage} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
        </HashRouter>
      </Layout>
    );
  }
}

export default Main;
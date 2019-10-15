import React, {Component} from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Layout   } from 'antd';
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

import AddRisk from '../riskMoudle/riskManage/addrisk';

/* 事故管理统计模块 */
import AccidentManage from '../accidentMoudle/accidentManage';
import WoundeManage from '../accidentMoudle/woundeManage';
import AccidentStatistic from '../accidentMoudle/statistic';

import AccidentAdd from '../accidentMoudle/accidentManage/accidentAdd';
import WoundeAdd from '../accidentMoudle/woundeManage/woundeAdd';

/* 系统维护管理模块 */
import UserManage from '../systemMoudle/userManage';
import OrganizationManage from '../systemMoudle/organizationManage';
import RoleManage from '../systemMoudle/roleManage';


/* 安全检查与隐患 */
import CheckTableManage from '../securityMoudle/checkTableManage';
import FirstIndicatorManage from '../securityMoudle/firstIndicatorManage';
import SecondIndicatorManage from '../securityMoudle/secondIndicatorManage';
import CheckTableInput from '../securityMoudle/checkTableInput';

import CheckResultManage from '../securityMoudle/checkResultManage';
import HiddenTroubleManage from '../securityMoudle/hiddenTroubleManage';
import HiddenTroubleStatic from '../securityMoudle/hiddentTroubleStatic';


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

            
              {/*   事故管理与统计  */}
              <Route exact path="/main/accident/manage" component={AccidentManage}/>
              <Route exact path="/main/accident/wounde" component={WoundeManage}/>
              <Route path="/main/accident/statistic" component={AccidentStatistic} />

              <Route exact path="/main/accident/manage/add" component={AccidentAdd} />
              <Route exact path="/main/accident/wounde/add" component={WoundeAdd} />


              {/* 风险管理与评估 */}
              <Route exact path="/main/risk/manage" component={RiskManage} />
              <Route path="/main/risk/danger" component={DangerManage} />
              <Route path="/main/risk/statistic" component={RiskStatistic} />

              <Route  exact path="/main/risk/manage/add" component={AddRisk} />

              {/* 安全检查与隐患管理  */}
              <Route path="/main/checktable/manage" component={ CheckTableManage } />
              <Route path="/main/firstIndicator/manage" component={ FirstIndicatorManage } />
              <Route path="/main/secondIndicator/manage" component={ SecondIndicatorManage } />

              <Route path="/main/checktable/Input" component={ CheckTableInput } />
              <Route path="/main/checktable/result" component={ CheckResultManage } />
              <Route path="/main/hiddentTrouble/manage" component={ HiddenTroubleManage } />

              <Route path="/main/hiddentTrouble/statistic" component={ HiddenTroubleStatic } />

              {/* 系统管理 */}
              <Route path="/main/manage/user" component={UserManage} />
              <Route path="/main/manage/role" component={RoleManage} />
              <Route paht="/main/manage/organization" component={OrganizationManage} />

              

            </Switch>
          </Content>
          {/* <Footer style={{ textAlign: 'center', height: "60px", lineHeight: '60px', margin: '0px',padding: '0px' }}>
            双重预防机制管理系统 ©2019.10.10 by 黎杏、蔡杰、罗迪、韩翔羽、崔佳豪
          </Footer> */}
        </Layout>
        </HashRouter>
      </Layout>
    );
  }
}

export default Main;
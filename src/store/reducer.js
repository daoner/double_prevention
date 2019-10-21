import { combineReducers } from 'redux-immutable';
//机构管理的reducer
import { reducer as organizationReducer } from '../pages/systemMoudle/organizationManage/store';
//角色管理的reducer
import { reducer as roleReducer } from '../pages/systemMoudle/roleManage/store';
//用户管理的reducer
import { reducer as userReducer } from '../pages/systemMoudle/userManage/store';
//检查表模板的reducer
import { reducer as checkTableReducer } from  '../pages/securityMoudle/checkTableManage/store';
//检查表一级标题的reducer
import { reducer as firstIndicatorReducer } from '../pages/securityMoudle/firstIndicatorManage/store';
//检查表二级标题的reducer
import { reducer as secondIndicatorReducer } from '../pages/securityMoudle/secondIndicatorManage/store';
//隐患的reducer
import { reducer as hiddenTroubleReducer } from '../pages/securityMoudle/hiddenTroubleManage/store';

//事故管理的 reducer
import { reducer as accidentReducerManage } from '../pages/accidentMoudle/accidentManage/store';

export default combineReducers({
    organization: organizationReducer,
    role: roleReducer,
    user: userReducer,
    checkTable: checkTableReducer,
    firstIndicator: firstIndicatorReducer,
    secondIndicator: secondIndicatorReducer,
    accident: accidentReducerManage,
    hiddenTrouble: hiddenTroubleReducer
});

import { combineReducers } from 'redux-immutable';
//机构管理的reducer
import { reducer as organizationReducer } from '../pages/systemMoudle/organizationManage/store';
//角色管理的reducer
import { reducer as roleReducer } from '../pages/systemMoudle/roleManage/store';
//用户管理的reducer
import { reducer as userReducer } from '../pages/systemMoudle/userManage/store';
//检查表模板的reducer
import { reducer as checkTableReducer } from  '../pages/securityMoudle/checkTableManage/store';


export default combineReducers({
    organization: organizationReducer,
    role: roleReducer,
    user: userReducer,
    checkTable: checkTableReducer
});

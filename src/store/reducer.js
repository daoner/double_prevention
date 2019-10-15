import { combineReducers } from 'redux-immutable';
//机构管理的reducer
import { reducer as organizationReducer } from '../pages/systemMoudle/organizationManage/store';
//角色管理的reducer
import { reducer as roleReducer } from '../pages/systemMoudle/roleManage/store';
import { reducer as userReducer } from '../pages/systemMoudle/userManage/store';

export default combineReducers({
    organization: organizationReducer,
    role: roleReducer,
    user: userReducer
});

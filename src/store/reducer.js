import { combineReducers } from 'redux-immutable';
//机构管理的reducer
import { reducer as organizationReducer } from '../pages/systemMoudle/organizationManage/store';
//角色管理的reducer
import { reducer as roleReducer } from '../pages/systemMoudle/roleManage/store';


export default combineReducers({
    organization: organizationReducer,
    role: roleReducer
});

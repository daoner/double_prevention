import { combineReducers } from 'redux-immutable';
import { reducer as organizationReducer } from '../pages/systemMoudle/organizationManage/store';

export default combineReducers({
    organization: organizationReducer
});

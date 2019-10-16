import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
    submitSuccess: false,       //是否提交的标志， 为true 重定向到列表页面
});

const reducer = ( state=defaultState, action)=> {
    switch(action.type) {
        case actionTypes.CHANGE_SUBMIT_SUCCESS:
            return state.set('submitSuccess',action.submitSuccess);
        default: 
            return state;
    }
}

export default reducer;
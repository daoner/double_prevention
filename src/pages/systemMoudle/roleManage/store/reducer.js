import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';


const defaultState = fromJS({
    roleList:[],
    pageSize: 5,
    pageNum: 0,
    total: 0    
});

const reducer = (state=defaultState, action)=> {
    switch(action.type) {
        //改变显示列表
        case actionTypes.CHANGE_ROLE_LIST:
            return state.merge({
                'list':fromJS(action.list),
                pageNum: action.pageNum,
                pageSize: action.pageSize,
                total: action.total
            });
        default:
            return state;
    }
}

export default reducer;
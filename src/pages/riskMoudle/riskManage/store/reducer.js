import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
    allrisk:[],     //所有的risk信息
    pagenationProps: {
        pageSize:5,
        current: 1,
        total: 0,
        showSizeChanger: true,  //是否可以改变pageSize
        showQuickJumper: true, //是否可以快速跳转到某页
    }
});
const reducer = (state=defaultState, action ) => {
    switch(action.type) {

        default: 
            return state;
    }
}



export default reducer;
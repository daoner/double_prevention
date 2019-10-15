import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';


const defaultState = fromJS({
    roleList:[],
    pagenationProps: {
        pageSize: 5,  //每页条数
        current: 1,  //当前页数
        total: 1,    //总的记录数目
        showSizeChanger: true,  //是否可以改变pageSize
        showQuickJumper: true, //是否可以快速跳转到某页
    },
});

const reducer = (state=defaultState, action)=> {
    switch(action.type) {
        //改变显示列表
        case actionTypes.CHANGE_ROLE_LIST:
            return state.set('roleList',fromJS(action.list))
                .setIn(['pagenationProps','pageSize'],action.pageSize)
                .setIn(['pagenationProps','current'],action.pageNum)
                .setIn(['pagenationProps','total'],action.total);
        default:
            return state;
    }
}

export default reducer;
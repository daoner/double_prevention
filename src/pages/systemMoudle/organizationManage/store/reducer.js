import { fromJS } from 'immutable';
import * as ActionTypes from './actionTypes';

const defaultState = fromJS({

    list:[],    // 机构列表
    pagenationProps: {
        pageSize: 5,  //每页条数
        current: 1,  //当前页数
        total: 1,    //总的记录数目
        showSizeChanger: true,  //是否可以改变pageSize
        showQuickJumper: true, //是否可以快速跳转到某页
    },
   
    modal_visible: false,

    newOrganization: {

    },
    modigyOrganization: {

    }
});

const reducer =  (state = defaultState,action)=>{
    switch(action.type) {
        case ActionTypes.CHANGE_ORGANIZATION_LIST:
            return state.set('list',fromJS(action.list))
                .setIn(['pagenationProps','pageSize'],action.pageSize)
                .setIn(['pagenationProps','current'],action.pageNum)
                .setIn(['pagenationProps','total'],action.total);
        case ActionTypes.CHANGE_PAGE:
            return state.setIn(['pagenationProps','current'],action.current).setIn(['pagenationProps','pageSize'],action.pageSize);
        case ActionTypes.SHOW_MODAL:
            return state.set('modal_visible',true);
        case ActionTypes.HIDE_MODAL:
            return state.set('modal_visible',false);
        default:
            return state;
    }
}

export default reducer;
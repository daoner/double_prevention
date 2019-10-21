import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
    checkTableList:[],  //列表要显示的列表信息
    pagenationProps: {
        pageSize: 5,  //每页条数
        current: 1,  //当前页数
        total: 0,    //总的记录数目
        showSizeChanger: true,  //是否可以改变pageSize
        showQuickJumper: true, //是否可以快速跳转到某页
    },


    //表单部分属性
    formDisabled: false,    //是否禁用
    submitSuccess: false,   //是否提交成功

});


const reducer = (state=defaultState,action) => {
    switch(action.type) {
        case actionTypes.CHANGE_CHECKTABLE_LIST: //改变显示列表 ，list，pageSize, pageNum, total
            return state.set('checkTableList',fromJS(action.list))
            .setIn(['pagenationProps','pageSize'],action.pageSize)
            .setIn(['pagenationProps','current'], action.pageNum)
            .setIn(['pagenationProps','total'], action.total);
        case actionTypes.CHANGE_SUBMIT_SUCCESS:
            return state.set('submitSuccess',action.submitSuccess);
        default: 
            return state;
    }
}

export default reducer;
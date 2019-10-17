import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
    secondIndicatorList:[],  //列表要显示的列表信息
    pagenationProps: {
        pageSize: 5,  //每页条数
        current: 1,  //当前页数
        total: 1,    //总的记录数目
        showSizeChanger: true,  //是否可以改变pageSize
        showQuickJumper: true, //是否可以快速跳转到某页
    },


    // 一级标题选择框的列表
    SelectFirstIndicatorList:[],
});

const reducer = (state=defaultState, action) => {
    switch(action.type) {
        case actionTypes.CHANGE_SELECT_FIRSTINDICATOR_LIST: 
            return state.set('SelectFirstIndicatorList',fromJS(action.list));
        default:
            return state;
    }
}
export default reducer;
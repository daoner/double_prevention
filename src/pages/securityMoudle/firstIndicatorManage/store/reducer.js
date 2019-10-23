import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
    firstIndicatorList:[],  //列表要显示的列表信息
    pagenationProps: {
        pageSize: 5,  //每页条数
        current: 1,  //当前页数
        total: 1,    //总的记录数目
        showSizeChanger: true,  //是否可以改变pageSize
        showQuickJumper: true, //是否可以快速跳转到某页
    },

    //检查表的id和name ，用于select选择框
    selectList: [],

    //所属检查表id
    checkTableId: undefined,
    //弹出框内容
    modal_visible: false,   //modal消息框是否显示
    modal_project: ''       //弹出框的project 项目内容
});

const reducer = (state=defaultState, action) => {
    switch(action.type) {
        case actionTypes.CHANGE_MODAL_VISIBLE:
            return state.set('modal_visible',action.modal_visible); 
        case actionTypes.CHANGE_SELECT_LIST:
            return state.set('selectList',fromJS(action.list)); //根据id 更新select的list
        case actionTypes.CHANGE_CHECKTABLE_ID:
            return state.set('checkTableId',action.id); //跟新所选id
        case actionTypes.CHANGE_FIRST_LIST:
            return state.set('firstIndicatorList', fromJS(action.list))
                        .setIn(['pagenationProps','pageSize'],action.pageSize)
                        .setIn(['pagenationProps','current'],action.pageNum)
                        .setIn(['pagenationProps','total'],action.total);
        default:
            return state;
    }
}
export default reducer;
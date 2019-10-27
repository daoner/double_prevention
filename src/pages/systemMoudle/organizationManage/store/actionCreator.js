import * as ActionTypes from './actionTypes';
import axios from 'axios';

export const getOrganizationList = (pageSize,pageNum)=>{
    return (dispatch)=>{
        axios.get(`/api/department/getList?pageSize=${pageSize}&pageNum=${pageNum}`).then(res=>{
            if(res.data.status === 1) {
                dispatch(changeList(res.data.data.list, res.data.data.pageSize, res.data.data.pageNum, res.data.data.total));
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
};


export const changeList = (list, pageSize, pageNum, total) => ({
    type: ActionTypes.CHANGE_ORGANIZATION_LIST,
    list,
    pageSize,
    pageNum,
    total
});

//换页处理
export const changePage = (current,pageSize) => ({
    type: ActionTypes.CHANGE_PAGE,
    current,
    pageSize
});

//显示模态框
export const showModal = ()=>({
    type: ActionTypes.SHOW_MODAL
});

//隐藏模态框
export const hideModal = ()=>({
    type: ActionTypes.HIDE_MODAL
})

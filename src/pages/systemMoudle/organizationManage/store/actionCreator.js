import * as ActionTypes from './actionTypes';
import axios from 'axios';

export const getOrganizationList = ()=>{
    return (dispatch)=>{
        axios.get("/api/organization/list?size=5&page=1").then(res=>{
            dispatch(changeList(res.data))
        }).catch((err)=>{
            console.log(err);
        })
    }
};


export const changeList = (list) => ({
    type: ActionTypes.CHANGE_ORGANIZATION_LIST,
    list
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

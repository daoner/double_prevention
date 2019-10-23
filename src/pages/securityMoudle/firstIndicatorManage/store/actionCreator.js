import * as actionTypes from './actionTypes';
import axios from 'axios';

/**
 * 改变模态框显示
 * @param {true | false}} modal_visible 
 */
export const changeModalVisible = (modal_visible)=>({
    type: actionTypes.CHANGE_MODAL_VISIBLE,
    modal_visible
})


/**
 * 发送请求 获取 checktable的 id 和 name 的列表
 */
export const getSelectList = () => {
    return (dispatch) => {
        axios.get('/api/checkTable/getIdAndNameList').then(res=>{
            const data = res.data;
            if(data.status === 1) {
                dispatch(changeSelectList(data.data));
            }
        }).catch(error=>{
            console.log(`getSelectList error: ${ error.message}`)
        })
    }
}

const changeSelectList = (list)=>({
    type: actionTypes.CHANGE_SELECT_LIST,
    list
});



export const getFirstList = (checkTableId, pageSize, pageNum) => {
    return (dispatch) => {
        axios.get(`/api/firstLevelIndicator/getList?checkTableId=${checkTableId}&pageSize=${pageSize}&pageNum=${pageNum}`).then(res=>{
            const data = res.data;
            if(data.status === 1) {
                dispatch(changeFirstList(data.data.list, data.data.pageSize, data.data.pageNum, data.data.total));
            }
        }).catch(error=>{
            console.log(`getSelectList error: ${ error.message}`)
        })
    }
}

const changeFirstList = (list, pageSize, pageNum, total) =>({
    type: actionTypes.CHANGE_FIRST_LIST,
    list,
    pageSize,
    pageNum,
    total
})


export const changeCheckTableId = (id)=>({
    type: actionTypes.CHANGE_CHECKTABLE_ID,
    id
})
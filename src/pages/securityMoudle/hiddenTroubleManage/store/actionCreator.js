import * as actionTypes from './actionTypes';
import axios from 'axios';
import { message } from 'antd';


/**
 * 
 * @param {状态 ：未整改、已整改、整改中、已逾期} status 
 * @param {*} pageSize 
 * @param {*} pageNum 
 */
export const getTableList = (status,pageSize,pageNum) => {
    return (dispatch)=>{
        axios.get(`/api/input/getListHiddenDanger?status=${status}&pageNum=${pageNum}&pageSize=${pageSize}`).then(res=>{
            const data = res.data;
            if(data.status === 1) {
                dispatch(changeTableList(
                    data.data.list,
                    data.data.total,
                    data.data.pageSize,
                    data.data.pageNum
                ))
            }
        }).catch(error=>{
            message.error(error.message);
        })
    }
}

const changeTableList = ( list, total, pageSize, pageNum )=>({
    type: actionTypes.CHANGE_TABLE_LIST,
    list,
    pageSize,
    total,
    pageNum
})
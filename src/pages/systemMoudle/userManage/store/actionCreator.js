import * as actionTypes from './actionTypes';
import axios from 'axios';


/**
 * 对外接口，发送ajax请求 然后改变列表
 */
export const getUserList = ()=>{
    return (dispatch)=> {
        console.log("???")
        axios.get('/api/user/getList').then(res=>{
            console.log(res);
        }).catch(error => {
            console.log(error);
        })
    }
};

/**
 * 
 * @param {数据列表} list 
 * @param {页面条数} pageSize 
 * @param {当前页号} pageNum 
 * @param {总记录条数} total 
 */
const changeUserList = ( list,pageSize,pageNum,total )=>({
    type: actionTypes.CHANGE_USER_LIST,
    pageSize,
    pageNum,
    total
});
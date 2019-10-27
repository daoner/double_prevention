import * as actionTypes from './actionTypes';
import axios from 'axios';


/**
 * 对外接口，发送ajax请求 然后改变列表
 */
export const getUserList = (pageSize, current)=>{
    return (dispatch)=> {
        axios.get(`/api/user/getList?pageNum=${current}&pageSize=${pageSize}`).then(res=>{
            const data =res.data;
            //成功之后
            if(data.status === 1) {
                dispatch(changeUserList(
                    data.data.list,
                    data.data.pageSize,
                    data.data.pageNum,
                    data.data.total))
            }else {
                console.log(data.message);
            }
            
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
    list,
    pageSize,
    pageNum,
    total
});
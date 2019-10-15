import * as actionTypes from './actionTypes';
import axios from 'axios';

//获取列表的
export const geRoleList = ()=> {
    return (dispatch)=> {
        axios.get('/api/role/getList').then(res=>{
            console.log('getList--->');
            console.log(res)
        }).catch(error=>{
            console.log('getList--->');
            console.log(error)
        })
    }
};


/**
 * 根据list更新显示列表
 * list 数据列表
 * pageNum  当前页号
 * pageSize 每页条数
 * total 总记录条数
 */
export const changeRoleList = (list,pageNum, pageSize, total) => ({
   type: actionTypes.CHANGE_ROLE_LIST, 
   list, 
   pageNum,
   pageSize,
   total,
});
import * as actionTypes from './actionTypes';
import axios from 'axios';

//获取列表的
export const getRoleList = (pageSize, pageNum)=> {
    return (dispatch)=> {
        axios.get(`/api/role/getList?pageSize=${pageSize}&pageNum=${pageNum}`).then(res=>{
            const data = res.data;
            if(data.status === 1) {
                dispatch(changeRoleList(
                    data.data.list,
                    data.data.pageNum,
                    data.data.pageSize,
                    data.data.total
                    ));
            }else {
                console.log(data.message);
            }
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
import * as actionTypes from './actionTypes';
import axios from 'axios';



/**
 * 对外接口，发送请求获取checkTable列表信息
 */
export const getCheckTableList = () => {
    return (dispatch) => {
        axios.get('api/checkTable/getList').then(res=>{
            console.log(res)
            const data = res.data;
            if(data.status === 1) {  //返回成功
                dispatch(
                    changeCheckTalbeList(
                        data.data.list,
                        data.data.pageSize,
                        data.data.pageNum,
                        data.data.total
                    )
                )
            }else {

            }
        }).catch(error=>{
            console.log(error)
        })
    }
}

/**
 * 
 * @param {table的数据列表} list 
 * @param {每页条数} pageSize 
 * @param {当前页号} pageNum 
 * @param {总记录条数} total 
 */
const changeCheckTalbeList = (list, pageSize, pageNum, total)=> ({
    type: actionTypes.CHANGE_CHECKTABLE_LIST,
    list,
    pageSize,
    pageNum,
    total
})
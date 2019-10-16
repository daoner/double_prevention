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
            dispatch()
        }).catch(error=>{
            console.log(`getSelectList error: ${ error.message}`)
        })
    }
}

const changeSelectList = (list)=>({
    type: actionTypes.CHANGE_SELECT_LIST,
    list
});
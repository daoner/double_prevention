import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getSelectFirstIndicatorList = ()=> {
    return (dispatch)=>{
        /**
         * 请求一级指标选择框的信息， 
         */
        axios.get('/api/firstIndicator/getIdAndProjectList').then(res=>{
            const data = res.data;
            if(data.status === 1) {
                dispatch(changeSelectFirstIndicatorList);
            }else {
                console.log(data.message);
            }
        }).catch(error=>{
            console.log(`getSelectFirstIndicatorList error: ${error.message}`);
        });
    }
}

/**
 * 派发改变一级指标select的action
 * @param {select data of firstIndicator list} list 
 */
const changeSelectFirstIndicatorList = (list) => ({
    type: actionTypes.CHANGE_SELECT_FIRSTINDICATOR_LIST,
    list
});
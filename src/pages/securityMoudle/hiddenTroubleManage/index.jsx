import React, { Component } from 'react';
import { Table } from 'antd';


const dataSource = [
    {
        key: '1',
        id: '0001',
        checkPeople: '胡彦斌',
        checkedDep: '1号矿井',
        checkTime: '西湖区湖底公园1号',
    },
    {
      key: '2',
      id: '0005',
      checkPeople: '王羲之',
      checkedDep: '西区配电室',
      checkTime: '1998-02-12 6:00',
    },
];

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '检查人',
    dataIndex: 'checkPeople',
    key: 'checkPeople',
  },
  {
    title: '被检单位',
    dataIndex: 'checkedDep',
    key: 'checkedDep',
  },
  {
    title: '检查时间',
    dataIndex: 'checkTime',
    key: 'checkTime',
  }
];


class HiddenTroubleManage extends Component {
    render() {
        return (
            <div>
                隐患管理，注意分类查询   未处理、整改中、已处理（整改完毕）、已预期
                <Table columns={columns} dataSrouc={dataSource} />
            </div>
        )
    }
}

export default HiddenTroubleManage;
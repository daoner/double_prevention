import React, { Component } from 'react';

import { Breadcrumb, message } from 'antd';
import axios from 'axios';

// 引入 ECharts 主模块
import echarts from 'echarts';
//




// const data = [
//     [
//         {value:335, name:'一般隐患'},
//         {value:310, name:'较大隐患'},
//         {value:234, name:'严重隐患'},
//     ],
//     [
//         {value:1, name:'一般隐患'},
//         {value:2, name:'较大隐患'},
//         {value:2, name:'严重隐患'},
//         {value:3, name:'b类安全隐患'},
//         {value:4, name:'百度'},
//         {value:5, name:'其他'}
//     ],
//     [
//         {value:10, name:'一般隐患'},
//         {value:20, name:'较大隐患'},
//         {value:30, name:'严重隐患'},
//         {value:40, name:'b类安全隐患'},
//         {value:50, name:'百度'},
//         {value:60, name:'其他'}
//     ],
//     [
//         {value:7, name:'a类安全隐患'},
//         {value:7, name:'较大事故隐患'},
//         {value:7, name:'a类安全隐患'},
//         {value:7, name:'b类安全隐患'},
//         {value:7, name:'百度'},
//         {value:7, name:'其他'}
//     ]
// ]

class HiddenTroubleStatic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myChart: null,
            lastName: '',  //上一次点击的图标位置
            isAll: true,
            data1:[],
            data2:[],
            total:[],
            data:[],

        }
        //绑定this
        this.chartClick = this.chartClick.bind(this);       //图标点击
    }

    componentDidMount() {
        var myChart = echarts.init(document.getElementById('chart'));
        this.setState({
            myChart
        })
        
        axios.get('/api/input/getNumberHiddenDanger').then(res=>{
            if(res.data.status === 1) {
                let data1 = [];
                let data2 = [];
                for(let i=0; i<res.data.data.length;i++) {
                    data1.push({
                        value: res.data.data[i].total,
                        name: res.data.data[i].hdStatus
                    });
                    data2.push(res.data.data[i].list);
                }
                let total = [
                    { value: res.data.totalYB, name: '一般隐患' },
                    { value: res.data.totalJD, name: '较大隐患' },
                    { value: res.data.totalYZ, name: '严重隐患' }
                ];

                // console.log(data1);
                // console.log(data);
                // console.log(total);
                this.setState({
                    data1: data1,
                    total: total,
                    data: data2
                })
               
                // let totalYB = 0;
                // let totalJD = 0;
                // let totalYZ = 0;
                // for(let i=0; i<data2.length;i++) {
                //     for(let j=0; j<data2[i].length;j++) {

                //     }
                // }


            }else {
                message.error( res.data.message || '获取数据失败')
            }
        }).catch(error=>{
            message.error(error.message);
        })

      
        myChart.on('click',this.chartClick)
    }

    chartClick(parama) {
        // console.log(parama)
        const data1 = this.state.data1;
        data1.forEach((item,index)=>{   
            if(item.name === parama.data.name){
                if(parama.data.name == this.state.lastName) {   //点了同一个
                    if(this.state.isAll){
                        this.setState({
                            isAll: !this.state.isAll,
                            data2: this.state.data[index]
                        })
                    }else {
                        this.setState({
                            isAll: !this.state.isAll,
                            data2: this.state.total
                        })
                    }
                    
                }else {
                    this.setState({
                        isAll: false,
                        data2: this.state.data[index],
                        lastName: parama.data.name
                    })
                }
            }
        })
      
    }



    render() {
        const data2 = this.state.data2
        const option = {
            //标题配置
        //     title: {
        //         text: 'ECharts 入门示例'
        //     },
            //图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:['未整改','已整改','整改中','已逾期','','一般隐患','较大隐患','严重隐患']
            },
            //系列列表。每个系列通过 type 决定自己的图表类型
            series: [   
                {
                    name:'整改类型',
                    type:'pie', //饼图
                    selectedMode: 'single',//选中模式，表示是否支持多个选中，默认关闭，支持布尔值和字符串，字符串取值可选'single'，'multiple'，分别表示单选还是多选。
                    radius: [0, '30%'], //半径(内半径，外半径)
        
                    label: {    //饼图图形上的文本标签位置
                        normal: {
                            position: 'inner'
                        }
                    },
                    // labelLine: {    //标签的视觉引导线样式，在 label 位置 设置为'outside'的时候会显示视觉引导线。
                    //     normal: {
                    //         show: false
                    //     }
                    // },
                    data:this.state.data1
                },
                {
                    name:'隐患类型',
                    type:'pie',
                    radius: ['40%', '55%'],
                    label: {
                        normal: {
                            /*
                                字符串模板 模板变量有：
                                {a}：系列名。
                                {b}：数据名。
                                {c}：数据值。
                                {d}：百分比。
                                {@xxx}：数据中名为'xxx'的维度的值，如{@product}表示名为'product'` 的维度的值。
                                {@[n]}：数据中维度n的值，如{@[3]}` 表示维度 3 的值，从 0 开始计数。
                            */
                            // '{b:c} {d}'
                            formatter:  '{a|{b}:{c} {d}%}',
                            // '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                            backgroundColor: '#eee',
                            borderColor: '#aaa',
                            borderWidth: 1,
                            borderRadius: 4,
                            // shadowBlur:3,
                            // shadowOffsetX: 2,
                            // shadowOffsetY: 2,
                            // shadowColor: '#999',
                            // padding: [0, 7],
                            rich: {
                                a: {
                                    color: '#999',
                                    lineHeight: 22,
                                    align: 'center',
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                    borderColor: '#aaa',
                                    width: '100%',
                                    borderWidth: 0.5,
                                    height: 0
                                },
                                b: {
                                    fontSize: 16,
                                    lineHeight: 33
                                },
                                per: {
                                    color: '#eee',
                                    backgroundColor: '#334455',
                                    padding: [2, 4],
                                    borderRadius: 2
                                }
                            }
                        }
                    },
                    data:data2
                }
            ]
        };
        if(this.state.myChart) this.state.myChart.setOption(option);
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>安全检查与隐患管理</Breadcrumb.Item>
                    <Breadcrumb.Item>一级指标管理</Breadcrumb.Item>
                    <Breadcrumb.Item>指标详情</Breadcrumb.Item>
                </Breadcrumb>
                <div className="contentWrap">
                    隐患分类统计
                    <div id="chart" style={{width:"90%",height:"600px",margin:"20px auto"}}>

                    </div>
                </div>
            </div>
           
        )
    }
}

export default HiddenTroubleStatic;
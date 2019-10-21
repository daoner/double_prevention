import React, { Component } from 'react';

import { Breadcrumb } from 'antd';

// 引入 ECharts 主模块
import echarts from 'echarts';
//




const data = [
    [
        {value:335, name:'a类安全隐患'},
        {value:310, name:'较大事故隐患'},
        {value:234, name:'a类安全隐患'},
        {value:135, name:'b类安全隐患'},
        {value:1048, name:'百度'},
        {value:102, name:'其他'}
    ],
    [
        {value:1, name:'a类安全隐患'},
        {value:2, name:'较大事故隐患'},
        {value:2, name:'a类安全隐患'},
        {value:3, name:'b类安全隐患'},
        {value:4, name:'百度'},
        {value:5, name:'其他'}
    ],
    [
        {value:10, name:'a类安全隐患'},
        {value:20, name:'较大事故隐患'},
        {value:30, name:'a类安全隐患'},
        {value:40, name:'b类安全隐患'},
        {value:50, name:'百度'},
        {value:60, name:'其他'}
    ],
    [
        {value:7, name:'a类安全隐患'},
        {value:7, name:'较大事故隐患'},
        {value:7, name:'a类安全隐患'},
        {value:7, name:'b类安全隐患'},
        {value:7, name:'百度'},
        {value:7, name:'其他'}
    ]
]

class HiddenTroubleStatic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myChart: null,
            data1:[
                {value:679, name:'未整改'},
                {value:335, name:'已整改'},
                {value:679, name:'整改中'},
                {value:1548, name:'已逾期'}
            ],
            data2:[]
        }
        this.chartClick = this.chartClick.bind(this);
    }

    componentDidMount() {
     
        var myChart = echarts.init(document.getElementById('chart'));
        this.setState({
            myChart
        })
        

      
        myChart.on('click',this.chartClick)
    }

    chartClick(parama) {
        const data1 = this.state.data1;
        data1.forEach((item,index)=>{   
            if(item.name === parama.data.name){
                console.log('update')
                this.setState({
                    data2: data[index]
                })
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
                data:['未整改','已整改','整改中','已逾期','','a类安全隐患','较大事故隐患','a类安全隐患','b类安全隐患','百度','其他']
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
                    data:[
                        {value:679, name:'未整改'},
                        {value:335, name:'已整改'},
                        {value:679, name:'整改中'},
                        {value:1548, name:'已逾期'}
                    ]
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
                            formatter:  '{a|{b}:{c} {d}}',
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
                                    align: 'center'
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
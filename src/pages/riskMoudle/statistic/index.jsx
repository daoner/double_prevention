import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import echarts from 'echarts';
import './style.css';

class RiskStatistic extends Component {
    componentDidMount() {
        var myChart = echarts.init(document.getElementById('chart'));
        let option = {
            title : {
                text: '风险等级信息',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['等级A','等级B','等级C','等级D','等级E','等级F']
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'等级A'},
                        {value:310, name:'等级B'},
                        {value:234, name:'等级C'},
                        {value:135, name:'等级D'},
                        {value:1548, name:'等级E'},
                        {value:513, name:'等级F'},
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        
        let option2 = {
            color: ['#fb7293','#37a2da','#32c5e9','#9fe6b8','#ffdb5c','#ff9f7f'],
            title : {
                text: '事故类型统计',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['第一类','第二类','第三类','第四类']
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'第一类'},
                        {value:310, name:'第二类'},
                        {value:234, name:'第三类'},
                        {value:135, name:'第四类'},
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        
        var myChart2 = echarts.init(document.getElementById('chart2'));
        myChart.setOption(option);
        myChart2.setOption(option2);
    }
    render() {
        return (
            <div className="page">
                {/* 导航路径 */}
                <Breadcrumb className="path">
                    <Breadcrumb.Item>风险管理与评估</Breadcrumb.Item>
                    <Breadcrumb.Item>统计分析</Breadcrumb.Item>
                </Breadcrumb>
                {/* 内容区域 */}
                <div className="contentWrap" style={{height:"600px"}}>
                    <div id="chart" style={{float: 'left',width:"30%",height:"300px",margin:"60px 0 60px 200px"}}></div>
                    <div id="chart2" style={{float: 'left',width:"30%",height:"300px",margin:"60px  0 60px 100px"}}></div>
                </div>
            </div>
        )
    }
}

export default RiskStatistic;
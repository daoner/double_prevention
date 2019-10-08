import React,{ Component } from 'react';
import { Breadcrumb } from 'antd';
import './style.css';
export default class Login extends Component {
    render () {
        return (
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                   <Breadcrumb.Item>login</Breadcrumb.Item>
                   <Breadcrumb.Item>user</Breadcrumb.Item>
                   <Breadcrumb.Item>tom</Breadcrumb.Item>
                </Breadcrumb>
                <div className="login-page">login</div>
            </div>
            
        )
    }
}
import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import {Outlet} from "react-router-dom";
import {items} from "../../../data/menu-items";
import logo from '../../../assets/images/logo.svg'
import logoCollapsed from '../../../assets/images/logo-collapsed.png'
const {  Content, Footer, Sider } = Layout;

export const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    return (
        <>
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div style={{textAlign: "center"}}>
                        {!collapsed && <img src={logo} style={{width: '100%', padding: 16,}} alt={'Logo'}/>}
                        {collapsed && <img src={logoCollapsed} style={{width: '48px', padding: 4,}} alt={'Logo collapsed'}/>}
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
                </Sider>
                <Layout>
                    <Content style={{margin: '16px 16px 0'}}>
                        <div style={{padding: 24, minHeight: 360, background: colorBgContainer}}>
                            <Outlet/>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Crypto Dashboard ©2023 Created by Group 11-009</Footer>
                </Layout>
            </Layout>
        </>
    )
}
import React, {useEffect, useState} from 'react';
import {Layout, Menu, theme, Typography} from 'antd';
import {Link, Outlet, useLocation} from "react-router-dom";
import logo from '../../../assets/images/logo.svg'
import logoCollapsed from '../../../assets/images/logo-collapsed.png'
import {useAppDispatch} from "../../../utils/hooks/use-app-dispatch";
import {getAllCurrencies} from "../../../services/thunks/currencies";
import {getUserFavouriteCurrencies} from "../../../services/thunks/user-currencies";
import {ItemType} from "antd/es/menu/hooks/useItems";
import {DollarOutlined, UserOutlined} from "@ant-design/icons";
import {getUser} from "../../../services/thunks/user";

const {Content, Footer, Sider} = Layout;

export const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUser())
        dispatch(getAllCurrencies())
    }, [])

    const items: ItemType[] = [
        {
            key: '',
            icon: React.createElement(DollarOutlined),
            label: <Link to={'/'}>Криптовалюты</Link>,
        },
        {
            key: 'user',
            icon: React.createElement(UserOutlined),
            label: 'Профиль',
            children: [
                {
                    key: 'profile',
                    label: <Link to={'/profile'}>Личный кабинет</Link>,
                },
                {
                    key: 'login',
                    label: <Link to={'/login'}>Войти</Link>
                },
                {
                    key: 'registration',
                    label: <Link to={'/registration'}>Зарегестрироваться</Link>
                },
                {
                    key: 'logout',
                    label: <Link to={'/logout'}>Выйти</Link>,
                }
            ]
        },

    ];

    return (
        <>
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div style={{textAlign: "center"}}>
                        {!collapsed && <img src={logo} style={{width: '100%', padding: 16,}} alt={'Logo'}/>}
                        {collapsed &&
                            <img src={logoCollapsed} style={{width: '48px', padding: 4,}} alt={'Logo collapsed'}/>}
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['']} mode="inline" items={items}/>
                </Sider>
                <Layout>
                    <Content style={{margin: '16px 16px 0', height: '100%'}}>
                        <div style={{padding: 24, minHeight: 360, background: 'white'}}>
                            <Outlet/>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Crypto Dashboard ©2023 Created by Group 11-009</Footer>
                </Layout>
            </Layout>
        </>
    )
}
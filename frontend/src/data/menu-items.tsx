import {
    DollarOutlined,
    UserOutlined
} from '@ant-design/icons';

import React from "react";
import {ItemType} from "antd/es/menu/hooks/useItems";
import { Link } from 'react-router-dom';

export const items: ItemType[] = [
    {
        key: 'home',
        icon: React.createElement(DollarOutlined),
        label: <Link to={'/'}>Криптовалюты</Link>,
    },
    {
        key: 'profile',
        icon: React.createElement(UserOutlined),
        label: <Link to={'/profile'}>Профиль</Link>,
    }
];
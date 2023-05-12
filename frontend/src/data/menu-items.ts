import {
    DollarOutlined
} from '@ant-design/icons';

import React from "react";
import {ItemType} from "antd/es/menu/hooks/useItems";

export const items: ItemType[] = [
    {
        key: '1',
        icon: React.createElement(DollarOutlined),
        label: 'Криптовалюты',
    }
];
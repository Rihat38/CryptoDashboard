import {CaretDownOutlined, CaretUpOutlined} from "@ant-design/icons";
import {Space, Typography} from "antd";
import {usdFormatter} from "../../../utils/formatters";

import styles from './course-dynamics.module.css'
import clsx from "clsx";

interface ICourseDynamicsProps {
    value: number,
    percent?: boolean,
    colored?: boolean,
    size?: 'small' | 'large'
}

export const CourseDynamics = ({value, percent = true, size, colored = true}: ICourseDynamicsProps) => {

    return (
        <Space>
            <Typography.Text strong className={clsx(
                styles.default,
                {
                    [styles.large]: size === 'large',
                    [styles.small]: size === 'small',
                    [styles.error]: colored && value < 0,
                    [styles.success]: colored && value > 0,
                }
            )} style={{margin: 0}}>
                {value < 0 ? <CaretDownOutlined/> : <CaretUpOutlined/>}
                {percent ? `${Math.abs(value)} %` : usdFormatter.format(Math.abs(value))}
            </Typography.Text>
        </Space>
    )
}
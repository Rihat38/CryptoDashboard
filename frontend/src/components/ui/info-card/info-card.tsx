import {Card, Statistic, Typography} from "antd";
import {IconComponentProps} from "@ant-design/icons/es/components/Icon";
import {ReactNode} from "react";

interface IInfoCardProps {
    title: string,
    value: number|string,
    icon?: ReactNode,
    suffix?: ReactNode
}

export const InfoCard = ({title, value, icon, suffix}: IInfoCardProps) => {
    return (
        <Card>
            <Statistic
                title={title}
                value={value}
                prefix={icon}
                suffix={suffix}
            />
        </Card>
    )
}
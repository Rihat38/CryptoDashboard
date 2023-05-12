import {Typography} from "antd";
import styles from './table-column-ceil.module.css'
import {BaseType} from "antd/es/typography/Base";

interface ITableColumnCeil {
    value: string | number,
    image?: string,
    type?: BaseType,
    symbol?: string,
    strong?: boolean,
}

export const TableColumnCeil = ({value, image, type, strong = false, symbol}: ITableColumnCeil) => {
    return (
        <div className={`${styles.name}`}>
            {image && <img height={'24px'} src={image} alt={`${value} image`}/>}
            <Typography.Text strong={strong}
                             type={value < 0 ? 'danger' : type}>{value}</Typography.Text>
            {symbol && <Typography.Text type={'secondary'} strong>{symbol.toUpperCase()}</Typography.Text>}
        </div>
    )
}
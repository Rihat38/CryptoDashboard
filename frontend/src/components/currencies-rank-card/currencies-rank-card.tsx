import {Avatar, List, Space, Typography} from "antd";
import {useAppSelector} from "../../utils/hooks/use-app-selector";
import {Link} from "react-router-dom";
import {TableColumnCeil} from "../ui/table-ceil/table-column-ceil";

export const CurrenciesRankCard = () => {
    const currencies = useAppSelector(state => state.currencies.currencies)
    return (
        <>
            <List
                size={'small'}
                style={{maxWidth: '420px'}}
                itemLayout={'horizontal'}
                bordered
                header={<Typography.Text type={"secondary"} strong>Лучшее за последнее время</Typography.Text>}
                dataSource={currencies!}
                renderItem={(item, index) => (
                    <List.Item>
                        <Link to={`coins/${item.id}`}>
                            <Space>
                                <Typography.Text strong type={"secondary"}>{index}</Typography.Text>
                                <TableColumnCeil value={item.name} strong image={item.image} symbol={item.symbol}/>
                            </Space>
                        </Link>
                        <Typography.Text strong
                                         type={item.market_cap_change_24h < 0 ? 'danger' : 'success'}>{item.market_cap_change_24h} $</Typography.Text>
                    </List.Item>
                )}
            />
        </>
    )
}
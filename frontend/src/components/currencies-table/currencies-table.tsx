import {Space, Table} from "antd";
import {useAppSelector} from "../../utils/hooks/use-app-selector";
import {ColumnsType} from "antd/es/table";
import {ICurrencyMarketData} from "../../utils/types";
import {Link} from "react-router-dom";
import {TableColumnCeil} from "../ui/table-ceil/table-column-ceil";
import {Key, useEffect, useState} from "react";
import {TableRowSelection} from "antd/es/table/interface";
import {useAppDispatch} from "../../utils/hooks/use-app-dispatch";
import {subscribeToCoin, unSubscribeFromCoin} from "../../services/thunks/user-currencies";
import {difference, filterArrByIDs, intersection} from "../../utils/functions";
import {getCurrenciesWithKey} from "../../services/selectors/currencies";
import {StarFilled, StarOutlined} from "@ant-design/icons";

const currenciesColumns: ColumnsType<ICurrencyMarketData> = [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
        render: (value, props) => {
            return <>
                <Space>
                    <Link to={`/coins/${props.id}`}>
                        <TableColumnCeil value={value} symbol={props.symbol} strong image={props.image}/>
                    </Link>
                </Space>
            </>
        },
    },
    {
        title: 'Цена',
        dataIndex: 'current_price',
        key: 'current_price',
        render: (value) => {
            return <TableColumnCeil value={value} strong/>
        },
        sorter: (a, b) => a.current_price - b.current_price,
    },
    {
        title: 'Изменение цены 24 ч.',
        dataIndex: 'price_change_24h',
        key: 'price_change_24h',
        render: (value) => {
            return <TableColumnCeil value={value} symbol={'$'} strong type={value < 0 ? 'danger' : 'success'}/>
        }
    },
    {
        title: 'Рыночная капитализация',
        dataIndex: 'market_cap',
        key: 'market_cap',
        render: (value) => {
            return <TableColumnCeil value={value} symbol={'$'} strong/>
        },
        sorter: (a, b) => a.market_cap - b.market_cap,
    },
    {
        title: 'Объём проданного',
        dataIndex: 'total_volume',
        key: 'total_volume',
        render: (value) => {
            return <TableColumnCeil value={value} symbol={'$'} strong/>
        },
        sorter: (a, b) => a.total_volume - b.total_volume,
    },
    {
        title: 'Монет в обороте',
        dataIndex: 'circulating_supply',
        key: 'circulating_supply',
        render: (value) => {
            return <TableColumnCeil value={value} strong/>
        },
        sorter: (a, b) => a.circulating_supply - b.circulating_supply,
    },
];

interface ICurrenciesTableProps {
    isUserFavorites?: boolean,
}

export const CurrenciesTable = ({isUserFavorites = false}: ICurrenciesTableProps) => {
    const currencies = useAppSelector(getCurrenciesWithKey)
    const favorites = useAppSelector(state => state.userCurrencies.favourites)
    const [dataSource, setDataSource] = useState<(ICurrencyMarketData & { key: Key })[]>()
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isUserFavorites) {
            let favoriteKeys = favorites.map(el => (el.name))
            let newDataSource = filterArrByIDs(currencies, favoriteKeys)
            setDataSource([...newDataSource])
        } else if (!isUserFavorites) {
            setDataSource(currencies)
        }
    }, [currencies, favorites])

    useEffect(() => {
        if (dataSource) {
            let currencyKeys = dataSource.map((el: ICurrencyMarketData & { key: Key }) => (el.key))
            let favoriteKeys = favorites.map(el => (el.name))
            let intersectionKeys = intersection(currencyKeys, favoriteKeys)
            setSelectedRowKeys([...intersectionKeys])
        }
    }, [dataSource, favorites])


    const onSelectChange = (newSelectedRowKeys: Key[]) => {
        let favoriteKeys = favorites.map(el => (el.name))
        if (newSelectedRowKeys.length > favorites.length) {
            let newKey = difference(newSelectedRowKeys, favoriteKeys)
            dispatch(subscribeToCoin(newKey!.toString()));
        } else if (newSelectedRowKeys.length < favorites.length) {
            let unsubscribeKey = difference(favoriteKeys, newSelectedRowKeys)
            dispatch(unSubscribeFromCoin(unsubscribeKey!.toString()));
        }
    };

    const rowSelection: TableRowSelection<ICurrencyMarketData> = {
        selectedRowKeys,
        onChange: onSelectChange,
        columnTitle: 'Избранное',
    };

    return (
        <>
            {currencies &&
                <Table rowSelection={rowSelection}
                       sortDirections={['ascend', 'descend']}
                       dataSource={dataSource}
                       columns={currenciesColumns}/>}
        </>
    )
}

export const UserFavoritesTable = () => <CurrenciesTable isUserFavorites={true}/>

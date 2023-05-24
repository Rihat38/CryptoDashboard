import {
    BlockOutlined,
    BoldOutlined,
    CodeOutlined,
    DownOutlined,
    ExportOutlined,
    GithubOutlined,
    LinkOutlined,
    MinusOutlined, RedditOutlined,
    TeamOutlined
} from "@ant-design/icons";
import {Card, Collapse, Divider, Dropdown, Empty, Space, Typography} from "antd";
import {useAppSelector} from "../../../utils/hooks/use-app-selector";
import {Chip} from "../chip/chip";

import styles from './coin-details-card.module.css'
import {useEffect, useState} from "react";
import {ItemType} from "antd/es/menu/hooks/useItems";

export const CoinDetailsCard = () => {
    const {currentCurrencyDetailed, success} = useAppSelector(state => state.currency)
    const [reposMenu, setReposMenu] = useState<ItemType[]>()
    const [forumMenu, setForumMenu] = useState<ItemType[]>()
    const [blockChainMenu, setBlockChainMenu] = useState<ItemType[]>()

    useEffect(() => {
        if (currentCurrencyDetailed) {
            let github = currentCurrencyDetailed.links.repos_url.github;
            let bitbucket = currentCurrencyDetailed.links.repos_url.bitbucket;
            let reddit = currentCurrencyDetailed.links.subreddit_url;
            setReposMenu([
                {
                    key: 'git_hub',
                    type: 'group',
                    label: <Typography.Text strong><GithubOutlined/> GitHub</Typography.Text>,
                    children: github.length > 0 ? github
                        .map((el, index) => (
                            {
                                key: `git_hub-${index}`,
                                label: <Typography.Link type={'secondary'} strong
                                                        href={currentCurrencyDetailed?.links.homepage[0]}>
                                    <Space>
                                        <LinkOutlined/>
                                        {el}
                                    </Space>
                                </Typography.Link>
                            })) : [
                        {
                            key: 'git_hub-empty',
                            label: <Typography.Text>Нет данных</Typography.Text>,
                            icon: <MinusOutlined/>
                        }
                    ],
                },
                {
                    key: 'bitbucket',
                    type: 'group',
                    label: <Typography.Text strong><BoldOutlined/> BitBucket</Typography.Text>,
                    children: bitbucket.length > 0 ? bitbucket
                        .map((el, index) => (
                            {
                                key: `bitbucket-${index}`,
                                label: <Typography.Link type={'secondary'} strong
                                                        href={currentCurrencyDetailed?.links.homepage[0]}>
                                    <Space>
                                        <LinkOutlined/>
                                        {el}
                                    </Space>
                                </Typography.Link>
                            })) : [
                        {
                            key: 'bitbucket-empty',
                            label: <Typography.Text>Нет данных</Typography.Text>,
                            icon: <MinusOutlined/>
                        }
                    ],
                },
            ])
            setForumMenu([...currentCurrencyDetailed.links.official_forum_url.map((el, index) => (el ? {
                key: `${el}-${index}`,
                label: <Typography.Link href={el} strong><LinkOutlined/> {el}</Typography.Link>,
            } : null)), reddit ? {
                key: 'reddit',
                label: <Typography.Link href={reddit} strong><RedditOutlined/> {reddit}</Typography.Link>
            } : null])
            setBlockChainMenu(currentCurrencyDetailed.links.blockchain_site.map((el, index) => (el ? {
                key: `${el}-${index}`,
                label: <Typography.Link href={el} strong><LinkOutlined/> {el}</Typography.Link>,
            } : null)))
        }
    }, [currentCurrencyDetailed])

    const renderTitle = () => {
        if (currentCurrencyDetailed) {
            return (
                <div className={styles.titleWrapper}>
                    <img src={currentCurrencyDetailed.image.small} alt={currentCurrencyDetailed.name}/>
                    <Typography.Title style={{margin: 0}}>{currentCurrencyDetailed.name}</Typography.Title>
                    <Chip>
                        <Typography.Title level={5} type={'secondary'}
                                          style={{margin: 0}}>{currentCurrencyDetailed.symbol.toUpperCase()}</Typography.Title>
                    </Chip>
                </div>
            )
        }

        return null
    }

    return (
        <>
            {success && <Card
                size={'default'}
                title={renderTitle()}
            >
                <Space direction={"vertical"}>
                    <Space wrap>
                        <Chip size={"small"} type={'primary'}>
                            Ранг: #{currentCurrencyDetailed?.market_cap_rank}
                        </Chip>
                        <Chip size={"small"}>
                            <Space>
                                <Typography.Text strong>Обновлено:</Typography.Text>
                                <Typography.Text strong>
                                    {new Date(currentCurrencyDetailed?.last_updated!).toLocaleString()}
                                </Typography.Text>
                            </Space>
                        </Chip>
                    </Space>
                    <Divider/>
                    <Space wrap>
                        <Chip>
                            <Typography.Link type={'secondary'} strong
                                             href={currentCurrencyDetailed?.links.homepage[0]}>
                                <Space>
                                    <LinkOutlined/>
                                    Домашняя
                                </Space>
                            </Typography.Link>
                        </Chip>
                        {currentCurrencyDetailed?.links.repos_url &&
                            <Chip>
                                <Dropdown menu={{items: reposMenu}} trigger={['click']}>
                                    <Typography.Link type={'secondary'} strong onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            <CodeOutlined/>
                                            Исходный код
                                            <DownOutlined/>
                                        </Space>
                                    </Typography.Link>
                                </Dropdown>
                            </Chip>}
                        {currentCurrencyDetailed?.links.official_forum_url.filter(el => el !== '').length! > 0 &&
                            <Chip>
                                <Dropdown menu={{items: forumMenu}} trigger={['click']}>
                                    <Typography.Link type={'secondary'} strong onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            <TeamOutlined/>
                                            Форумы
                                            <DownOutlined/>
                                        </Space>
                                    </Typography.Link>
                                </Dropdown>
                            </Chip>}
                        {currentCurrencyDetailed?.links.blockchain_site.filter(el => el !== '').length! > 0 &&
                            <Chip>
                                <Dropdown menu={{items: blockChainMenu}} trigger={['click']}>
                                    <Typography.Link type={'secondary'} strong onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            <BlockOutlined/>
                                            Блокчейн
                                            <DownOutlined/>
                                        </Space>
                                    </Typography.Link>
                                </Dropdown>
                            </Chip>}
                    </Space>
                </Space>
            </Card>}
        </>
    )
}
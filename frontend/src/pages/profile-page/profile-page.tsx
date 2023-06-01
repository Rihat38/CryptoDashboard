import {Card, Menu, Space, Typography} from "antd";
import {ProfileCard} from "../../components/ui/profile-card/profile-card";

import styles from './profile-page.module.css'
import {ItemType} from "antd/es/menu/hooks/useItems";
import {NavLink, Outlet} from "react-router-dom";
import {useState} from "react";
import {InfoCard} from "../../components/ui/info-card/info-card";
import {ClockCircleOutlined, RiseOutlined, StarOutlined} from "@ant-design/icons";
import {BASE_MEDIA_URL} from "../../utils/api";
import {useAppSelector} from "../../utils/hooks/use-app-selector";


export const ProfilePage = () => {
    const [activeMenuItem, setActiveMenuItem] = useState('')
    const {user} = useAppSelector(state => state.user)
    const menuRoutes: ItemType[] = [
        {
            key: 'subscriptions',
            label: <NavLink end to={'subscriptions'} onClick={() => setActiveMenuItem('subscriptions')}>
                {({isActive}) => (
                    <Typography.Text className={styles.route} strong
                                     type={isActive ? undefined : 'secondary'}>Подписки</Typography.Text>
                )}
            </NavLink>
        },
        {
            key: 'predictions',
            label: <NavLink end to={'predictions'} onClick={() => setActiveMenuItem('predictions')}>
                {({isActive}) => (
                    <Typography.Text className={styles.route} strong
                                     type={isActive ? undefined : 'secondary'}>Мои прогнозы</Typography.Text>
                )}
            </NavLink>
        }
    ]

    if(!user) return null

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.imgWrapper}>
                    <img
                        className={styles.banner}
                        src={BASE_MEDIA_URL+user.media?.background}
                        alt="banner"/>
                </div>
                <div className={styles.profileCardsWrapper}>
                    <ProfileCard/>
                    <Space className={styles.infoCardsWrapper}>
                        <InfoCard icon={<RiseOutlined/>} title={'Прогнозов сделано'} value={56}/>
                        <InfoCard icon={<StarOutlined/>} title={'Подписок'} value={56}/>
                        <InfoCard icon={<ClockCircleOutlined/>} title={'Зарегестрирован'}
                                  value={new Date().toLocaleString()}/>
                    </Space>
                </div>
                <div>
                </div>
                <div className={styles.contentWrapper}>
                    <Menu mode="horizontal" activeKey={activeMenuItem} items={menuRoutes}/>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}
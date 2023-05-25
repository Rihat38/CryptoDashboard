import {Menu, Typography} from "antd";
import {ProfileCard} from "../../components/ui/profile-card/profile-card";

import styles from './profile-page.module.css'
import {ItemType} from "antd/es/menu/hooks/useItems";
import {NavLink, Outlet} from "react-router-dom";
import {useState} from "react";


export const ProfilePage = () => {
    const [activeMenuItem, setActiveMenuItem] = useState('')

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
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.imgWrapper}>
                    <img
                        className={styles.banner}
                        src="https://damion.club/uploads/posts/2022-01/1641958224_39-damion-club-p-foni-dlya-programmistov-39.jpg"
                        alt="banner"/>
                </div>
                <div className={styles.profileCardWrapper}>
                    <ProfileCard/>
                </div>
                <div className={styles.contentWrapper}>
                    <Menu mode="horizontal" activeKey={activeMenuItem} items={menuRoutes}/>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}
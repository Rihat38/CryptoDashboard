import {ExportOutlined, GithubOutlined, InstagramOutlined, WhatsAppOutlined} from "@ant-design/icons";
import {Avatar, Button, Card, Divider, Space, Typography, Image} from "antd";
import styles from './profile-card.module.css'

export const ProfileCard = () => {

    const handleClick = () => {

    }

    return (
        <>
            <Card size={'small'} className={styles.card}>
                <Space direction={"vertical"} align={"center"}>
                    <Avatar size={128} className={styles.avatar}
                            src={<Image
                                src={`https://avatars.mds.yandex.net/i?id=aa5b98cce18955ddf2e258afc119e623ab087dc3-6335046-images-thumbs&n=13`}
                            />}/>
                    <Typography.Title level={2} style={{margin: 0}}>Damir Guzaerov</Typography.Title>
                    <Typography.Title level={5} style={{margin: 0}}
                                      type={"secondary"}>guzaerov.damir49@gmail.com</Typography.Title>
                    <Space>
                        <Button type={'link'} icon={<InstagramOutlined/>} href={'100'}/>
                        <Divider type={"vertical"}/>
                        <Button type={'link'} icon={<GithubOutlined/>} href={'100'}/>
                        <Divider type={"vertical"}/>
                        <Button type={'link'} icon={<WhatsAppOutlined/>} href={'100'}/>
                    </Space>
                    <Button type={"primary"} size={"middle"} onClick={handleClick}>Выйти <ExportOutlined/></Button>
                </Space>
            </Card>
        </>
    )
}
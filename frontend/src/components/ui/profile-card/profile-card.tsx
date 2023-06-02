import {ExportOutlined, GithubOutlined, InstagramOutlined, WhatsAppOutlined} from "@ant-design/icons";
import {Avatar, Button, Card, Divider, Space, Typography, Image, Modal} from "antd";
import styles from './profile-card.module.css'
import {logout} from "../../../services/thunks/user";
import {clearFavorites} from "../../../services/slices/user-currencies";
import {useAppDispatch} from "../../../utils/hooks/use-app-dispatch";
import {useAppSelector} from "../../../utils/hooks/use-app-selector";
import {useState} from "react";
import {UserEditForm} from "../../forms/user-edit-form/user-edit-form";
import {BASE_MEDIA_URL} from "../../../utils/api";

export const ProfileCard = () => {
    const dispatch = useAppDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const {user} = useAppSelector(state => state.user)

    const handleClick = () => {
        dispatch(logout())
        dispatch(clearFavorites())
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleEditClick = () => {
        setIsModalOpen(true)
    }

    if (!user) return null
    return (
        <>
            <Card size={'small'} className={styles.card}>
                <Space direction={"vertical"} align={"center"}>
                    <Avatar size={128} className={styles.avatar}
                            src={<Image
                                src={`${BASE_MEDIA_URL}${user.media?.avatar}`}
                            />}/>
                    <Typography.Title level={2} style={{margin: 0}}>{user.username}</Typography.Title>
                    <Typography.Title level={5} style={{margin: 0}}
                                      type={"secondary"}>{user.email}</Typography.Title>
                    <Space>
                        <Button type={"primary"} size={"middle"}
                                onClick={handleEditClick}>Редактировать<ExportOutlined/></Button>
                        <Button type={"primary"} size={"middle"} onClick={handleClick}>Выйти<ExportOutlined/></Button>
                    </Space>
                </Space>
            </Card>
            <Modal title="Редактирование профиля"
                   open={isModalOpen}
                   onCancel={handleCancel}
                   footer={[
                       <Button key="back" onClick={handleCancel}>
                           Отмена
                       </Button>,
                   ]}
            >
                <UserEditForm onFinish={handleOk}/>
            </Modal>
        </>
    )
}
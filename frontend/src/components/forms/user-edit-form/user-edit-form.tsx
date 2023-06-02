import {Button, Form, Input} from "antd";
import {useAppSelector} from "../../../utils/hooks/use-app-selector";
import {ChangeEvent, useState} from "react";
import {useAppDispatch} from "../../../utils/hooks/use-app-dispatch";
import {editImages, editUser} from "../../../services/thunks/user";

interface IUserEditFormProps {
    onFinish?: (() => void) | undefined
}

export const UserEditForm = ({onFinish}: IUserEditFormProps) => {
    const {user} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const [avatar, setAvatar] = useState<File>();
    const [banner, setBanner] = useState<File>();

    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setAvatar(e.target.files[0]);
        }
    };

    const handleBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setBanner(e.target.files[0]);
        }
    };

    const handleFinish = (values: any) => {
        console.log(values)

        dispatch(editImages({avatar: avatar, banner: banner}))
        dispatch(editUser(values))
        if (typeof onFinish === 'function')
            onFinish()
    }

    return (
        <>
            <Form
                encType={'multipart/form-data'}
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                onFinish={handleFinish}
                initialValues={{'username': user?.username, 'email': user?.email}}
            >
                <Form.Item
                    name='avatar' label="Аватар">
                    <input type="file" name={'avatar'} onChange={handleAvatarChange}/>
                </Form.Item>
                <Form.Item
                    name='banner'
                    label="Баннер">
                    <input type="file" name={'banner'} onChange={handleBannerChange}/>
                </Form.Item>
                <Form.Item
                    label="Логин"
                    name="username"
                    rules={[{required: true, message: 'Это поле обязательно!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Почта"
                    name="email"
                    rules={[{required: true, message: 'Это поле обязательно!'}, {
                        type: "email",
                        message: 'Неверный формат почты!'
                    }]}
                >
                    <Input/>
                </Form.Item>
                <Button type="primary"
                        htmlType="submit">
                    Сохранить
                </Button>
            </Form>
        </>
    )
}
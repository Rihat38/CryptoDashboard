import {Button, Form, Input, message, Typography} from "antd";
import {useAppDispatch} from "../../../utils/hooks/use-app-dispatch";
import styles from "../styles.module.css";
import {useEffect, useState} from "react";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {login} from "../../../services/thunks/user";
import {useAppSelector} from "../../../utils/hooks/use-app-selector";

export const LoginPage = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const {error, failed, requested} = useAppSelector(state => state.user)
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const showError = (message: string) => {
        messageApi.error(message);
    };

    const onFinish = (values: any) => {

        dispatch(login({
            username: values.username,
            password: values.password
        }))
    };

    useEffect(()=>{
        if(failed && error && error.message)
            showError(error.message)
    },[failed,error])

    return (
        <section>
            {contextHolder}
            <Typography.Title type={"secondary"}>Авторизация</Typography.Title>
            <Form form={form} name="horizontal_login" onFinish={onFinish}>
                <Form.Item
                    name="username"
                    rules={[{required: true, message: 'Это поле обязательно!'}]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Логин"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: 'Это поле обязательно!'}]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Пароль"
                    />
                </Form.Item>
                <Form.Item shouldUpdate>
                    {() => (
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={
                                !form.isFieldsTouched(true) ||
                                !!form.getFieldsError().filter(({errors}) => errors.length).length
                            }
                        >
                            Войти
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </section>
    )
}
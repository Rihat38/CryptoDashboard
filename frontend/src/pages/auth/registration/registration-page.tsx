import {Button, Form, Input, Typography} from "antd";
import {useAppDispatch} from "../../../utils/hooks/use-app-dispatch";
import {LockOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";
import {login, register} from "../../../services/thunks/user";

export const RegistrationPage = (): JSX.Element => {
    const dispatch = useAppDispatch()

    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        dispatch(register({
            username: values.username,
            email: values.email,
            password: values.password
        }))
    };

    return (
        <section>
            <Typography.Title type={"secondary"}>Регистрация</Typography.Title>
            <Form form={form} name="horizontal_login" onFinish={onFinish}>
                <Form.Item
                    name="username"
                    rules={[{required: true, message: 'Это поле обязательно!'}]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                           placeholder="Придумайте логин для входа"/>
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[{type: "email", message: 'Неверный формат почты!'},
                        {required: true, message: 'Это поле обязательно!'}]}
                >
                    <Input
                        prefix={<MailOutlined className="site-form-item-icon"/>}
                        type="email"
                        placeholder="Введите почту"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: 'Это поле обязательно!'}]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Придумайте пароль"
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
                            Зарегестрироваться
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </section>
    )
}
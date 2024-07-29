import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../auth/AuthContext';
import { API } from '../../constants/constant';
import { setToken } from '../../auth/helper';
import Loader from '../../components/Loading/Loading';
import { ISignUp } from './Login.interface';

const SignUp: React.FC = () => {

    const navigate = useNavigate();

    const { setUser } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async (values: ISignUp) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API}/auth/local/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            if (data?.error) {
                throw data?.error;
            } else {
                setToken(data.jwt);
                setUser(data.user);
                message.success(`Welcome to Ayna Chat application ${data.user.username}!`);
                navigate("/chat", { replace: true });
            }
        } catch (error: any) {
            console.error(error);
            message.error(`Failed: ${error.message}`)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <Form
                            name="signup"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Please input your Email!' }]}
                            >
                                <Input type="email" placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input type="password" placeholder="Password" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    Sign Up
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                )
            }
        </>
    );
};

export default SignUp;

import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../auth/AuthContext';
import Loader from '../../components/Loading/Loading';
import { API } from '../../constants/constant';
import { setToken } from '../../auth/helper';
import { ISignIn } from './Login.interface';

const SignIn: React.FC = () => {

    const navigate = useNavigate();

    const { setUser } = useAuthContext();

    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async (values:ISignIn) => {
        setIsLoading(true);
        try {
            const value = {
                identifier: values.email,
                password: values.password,
            };
            const response = await fetch(`${API}/auth/local`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });

            const data = await response.json();
            if (data?.error) {
                throw data?.error;
            } else {
                setToken(data.jwt);
                setUser(data.user);
                message.success(`Welcome back ${data.user.username} to Ayna Chat application!`);
                navigate("/chat");
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
            {isLoading ? (
                <>
                    <Loader />
                </>
            ) : (
                <>

                    <Form
                        name="signin"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your Email!', type:'email' }]}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input type="password" placeholder="Password" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Sign In
                            </Button>
                        </Form.Item>
                    </Form >
                </>
            )}
        </>

    );
};

export default SignIn;

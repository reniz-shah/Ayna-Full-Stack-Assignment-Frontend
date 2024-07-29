import React from 'react';
import { Tabs, Row, Col } from 'antd';
import type { TabsProps } from 'antd';
import 'antd/dist/reset.css';
import SignIn from './SignIn';
import SignUp from './SignUp';

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Sign In',
        children: <SignIn />,
    },
    {
        key: '2',
        label: 'Sign Up',
        children: <SignUp />,
    },
];
const Login: React.FC = () => (
    <div style={{ padding: '50px 20px' }}>
        <Row justify="center">
            <Col xs={24} sm={20} md={16} lg={12} xl={8}>
                <Tabs defaultActiveKey="1" items={items} />
            </Col>
        </Row>
    </div>
);

export default Login;

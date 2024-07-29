import React from 'react';
import { Tabs, Row, Col } from 'antd';
import 'antd/dist/reset.css';
import SignIn from './SignIn';
import SignUp from './SignUp';

const { TabPane } = Tabs;

const Login: React.FC = () => (
    <div style={{ padding: '50px 20px' }}>
        <Row justify="center">
            <Col xs={24} sm={20} md={16} lg={12} xl={8}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Sign In" key="1">
                        <SignIn />
                    </TabPane>
                    <TabPane tab="Sign Up" key="2">
                        <SignUp />
                    </TabPane>
                </Tabs>
            </Col>
        </Row>
    </div>
);

export default Login;

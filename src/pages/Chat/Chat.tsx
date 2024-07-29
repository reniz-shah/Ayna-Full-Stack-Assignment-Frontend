import { useEffect, useState } from 'react';
import { Layout, Menu, Input, List, Avatar, Button } from 'antd';
import { UserOutlined, SendOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import './Chat.css';
import { IMessage } from './Chat.interface';
import { useAuthContext } from '../../auth/AuthContext';
import { io } from 'socket.io-client';
import { AVATAR_API, API } from '../../constants/constant';

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;
const socket = io(API);


const Chat = () => {
    const [messages, setMessages] = useState<IMessage[]>(() => {
        const storedMessages = localStorage.getItem('messages');
        return storedMessages ? JSON.parse(storedMessages) : [];
    });

    const [newMessage, setNewMessage] = useState<string>('');
    const { user } = useAuthContext();

    const handleSend = () => {
        if (newMessage.trim() !== '' && user) {
            const message : IMessage = { user: user?.username, message: newMessage }
            socket.emit('sendMessage', message);           
            setNewMessage('');
        }
    };


    useEffect(() => {
        socket.on('receiveMessage', (message:IMessage) => {
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages, message];
                localStorage.setItem('messages', JSON.stringify(updatedMessages));
                return updatedMessages;
            });
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);


    return (
        <Layout className='Layout'>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="logo">
                    <img src="../../../ayna_logo.jpg" alt="Logo" />
                    <h3>Ayna</h3>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        Chat Room
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header className='Header'>
                    <h2 style={{ margin: '16px' }}>Ayna Chat Application</h2>
                </Header>
                <Content className='Content'>
                    <div>
                        <List
                            itemLayout="horizontal"
                            dataSource={messages}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={`${AVATAR_API}/${user?.username}`} />}
                                        title={item.user}
                                        description={item.message}
                                    />
                                </List.Item>
                            )}
                        />

                    </div>
                </Content>
                <Footer className='Footer'>
                    <TextArea
                        rows={2}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                    />
                    <Button
                        type="primary"
                        icon={<SendOutlined />}
                        onClick={handleSend}
                    >
                        Send
                    </Button>
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Chat;

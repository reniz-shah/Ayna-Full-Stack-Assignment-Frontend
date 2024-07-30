import { useEffect, useState } from 'react';
import { Layout, Menu, Input, List, Avatar, Button } from 'antd';
import { UserOutlined, SendOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import './Chat.css';
import { IMessage } from './Chat.interface';
import { io } from 'socket.io-client';
import { API, AVATAR_API, SERVER } from '../../constants/constant';
import { getToken, getUser } from '../../auth/helper';
import Loader from '../../components/Loading/Loading';

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;
const socket = io(SERVER);

const Chat = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<string[]>([]);
    const user = getUser();
    const [newMessage, setNewMessage] = useState<string>('');

    const handleSend = () => {
        if (newMessage.trim() !== '' && user) {
            const message: IMessage = { user: user, message: newMessage }
            socket.emit('sendMessage', message);
            setNewMessage('');
        }
    };

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const fetchMessages = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${API}/messages?filters[users_permissions_user][$eq]=${parseInt(user.id)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                }
            });

            const data = await response.json();
            if (data.data.length <= 0)
                setMessages([])
            else
                setMessages(data.data[0].attributes.messages);
        } catch (error) {
            setMessages([])
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMessages();

    }, []);



    useEffect(() => {
        socket.on('receiveMessage', (message: string[]) => {
            setMessages(message);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);


    return (
        <>
            <Layout className='Layout'>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                >
                    <div className="logo">
                        <img src="https://reniz-shah.github.io/Ayna-Full-Stack-Assignment-Frontend/assets/ayna_logo-ybOeh6yF.jpg" alt="Logo" />
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
                        {
                            loading ? (
                                <Loader />
                            ) : (

                                <div>
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={messages}
                                        renderItem={(item) => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    avatar={<Avatar src={`${AVATAR_API}/${user?.username}`} />}
                                                    title={user.username}
                                                    description={item}
                                                />
                                            </List.Item>
                                        )}
                                    />

                                </div>
                            )
                        }
                    </Content>
                    <Footer className='Footer'>
                        <TextArea
                            autoSize={{ minRows: 2, maxRows: 5 }}
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            onKeyDown={handleKeyDown}
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
        </>
    );
};

export default Chat;

import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket;

const Chat = () => { 
    const location = useLocation();

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);

    const ENDPOINT = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

    
    
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        if (!name || !room) {
            alert("Name and room are required!");
            window.location.href = '/';
            return;
        }
        
        socket = io(ENDPOINT, {
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        });

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, (response) => {
            if (response?.error) {
                alert(response.error);
                window.location.href = '/';
            } else {
                setIsConnected(true);
            }
        });

        return () => {
            socket.disconnect();
            socket.off();
        }

    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        })
        
        return () => {
            socket.off('message');
        };
    }, []);

    // function for sending msgs
    const sendMessage = e => {
        e.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }



    return (
        <div className='outerContainer'>
            <div className='container'>
                <InfoBar room = {room}/>
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />

            </div>
        </div>
        
    ) 
}

export default Chat;
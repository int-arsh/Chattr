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

    const ENDPOINT = 'http://localhost:5000';

    
    
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        if (!name || !room) {
            alert("Name and room are required!");
            return;
        }
        
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, (response) => {
            if (response?.error) alert(response.error);
        });

        return () => {
            socket.disconnect();
            socket.off();
        }

    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages]);

    // function for sending msgs
    const sendMessage = e => {
        e.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    // debug
    console.log(message, messages);


    return (
        <div className='outerContainer'>
            <div className='container'>
                <InfoBar room = {room}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                <Messages messages={messages} name={name} />

            </div>
        </div>
        
    ) 
}

export default Chat;
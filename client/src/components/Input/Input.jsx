import React from 'react'
import './Input.css'

const Input = ({message, setMessage, sendMessage}) => (
    <form className="form">
        <input 
        type="text"
        className="input"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={e => e.key === 'Enter' ? sendMessage(e) : null}
        />
        <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
    </form>
);

export default Input
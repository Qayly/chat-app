import React, { useState, useEffect } from 'react';

const App = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Fetch messages from an API or database
        const fetchMessages = async () => {
            // Example API call:
            // const response = await fetch('/api/messages');
            // const data = await response.json();
            // setMessages(data);
        };
        fetchMessages();
    }, []);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages([...messages, { text: newMessage, id: Date.now() }]);
            setNewMessage('');
        }
    };

    return (
        <div>
            <h1>Chat Application</h1>
            <div>
                {messages.map(message => (
                    <div key={message.id}>{message.text}</div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default App;
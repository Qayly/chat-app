import React, { useState, useEffect } from 'react';
import Calculator from './components/Calculator';
import './App.css';

const App = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [showCalculator, setShowCalculator] = useState(false);

    useEffect(() => {
        const fetchMessages = async () => {
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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSendMessage();
    };

    return (
        <div className="app">
            <div className="chat-container">
                <div className="chat-header">
                    <h1>Chat Application</h1>
                    <button
                        className={`calc-toggle-btn${showCalculator ? ' active' : ''}`}
                        onClick={() => setShowCalculator(!showCalculator)}
                        title="Toggle Calculator"
                    >
                        🧮
                    </button>
                </div>

                <div className="chat-body">
                    <div className="messages">
                        {messages.map(message => (
                            <div key={message.id} className="message user">
                                {message.text}
                            </div>
                        ))}
                    </div>

                    <div className="input-area">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type a message..."
                        />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div>

                {showCalculator && (
                    <div className="calculator-panel">
                        <Calculator />
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;

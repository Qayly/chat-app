class WebSocketService {
    constructor(url) {
        this.url = url;
        this.socket = null;
    }

    connect() {
        this.socket = new WebSocket(this.url);
        this.socket.onopen = () => this.onOpen();
        this.socket.onmessage = (event) => this.onMessage(event);
        this.socket.onclose = () => this.onClose();
        this.socket.onerror = (error) => this.onError(error);
    }

    onOpen() {
        console.log('WebSocket connection opened.');
    }

    onMessage(event) {
        console.log('Message received:', event.data);
        // handle incoming messages
    }

    onClose() {
        console.log('WebSocket connection closed.');
    }

    onError(error) {
        console.error('WebSocket error:', error);
    }

    sendMessage(message) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        } else {
            console.error('WebSocket is not open. Unable to send message.');
        }
    }
}

// Exporting the WebSocketService class for usage in other parts of the application.
module.exports = WebSocketService;
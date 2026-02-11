export type MessageHandler = (data: any) => void;

class WebSocketService {
  socket: WebSocket | null = null;
  url: string;
  messageHandler?: MessageHandler;

  constructor(url: string) {
    this.url = url;
  }

  connect(handler: MessageHandler) {
    this.socket = new WebSocket(this.url);
    this.messageHandler = handler;

    this.socket.onopen = () => {
      console.log("Connected to WebSocket");
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.messageHandler?.(data);
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error", error);
    };
  }

  disconnect() {
    this.socket?.close();
  }
}

export default WebSocketService;
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  const min = 100;
  const max = 250;
  let i = 0;
  const randomInterval = Math.floor(Math.random() * (max - min + 1)) + min;

  setInterval(() => {
    const level = {
      price: 100.0 + (30 - i) * 0.25,
      bidSize: Math.floor(10 + Math.abs(30 - i) * 1.7),
      askSize: Math.floor(12 + Math.abs(i - 30) * 1.5),
    }

    ws.send(
      JSON.stringify(level)
    );

    i++;
  }, randomInterval);
});

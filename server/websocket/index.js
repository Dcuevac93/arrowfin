import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });



wss.on("connection", (ws) => {
  const min = 100;
  const max = 250;
  let i = 0;
  const randomInterval = Math.floor(Math.random() * (max - min + 1)) + min;

  setInterval(() => {
    const mid = 100.0
    const tick = 0.25
    const count = 20
    const half = Math.floor(count / 2)
    const idx = i % count

    const level = {
      price: mid + (half - idx) * tick,
      bidSize: Math.floor(Math.random() * 10 + Math.abs(half - idx) * 1.7),
      askSize: Math.floor(Math.random() * 12 + Math.abs(idx - half) * 1.5),
    }

    ws.send(JSON.stringify(level));

    i++;
  }, randomInterval);
});

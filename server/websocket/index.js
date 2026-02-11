import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });



wss.on("connection", (ws) => {
  const min = 100;
  const max = 250;
  const randomInterval = Math.floor(Math.random() * (max - min + 1)) + min;

  const mid = 100.0;
  const tick = 0.25;
  const count = 20;
  const half = Math.floor(count / 2);

  const intervalId = setInterval(() => {
    const batchSize = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
    const usedIdx = new Set();
    const levels = [];

    while (levels.length < batchSize) {
      const idx = Math.floor(Math.random() * count);
      if (usedIdx.has(idx)) continue;
      usedIdx.add(idx);

      levels.push({
        price: mid + (half - idx) * tick,
        bidSize: Math.floor(Math.random() * 10 + Math.abs(half - idx) * 1.7),
        askSize: Math.floor(Math.random() * 12 + Math.abs(idx - half) * 1.5),
      });
    }

    ws.send(JSON.stringify(levels));
  }, randomInterval);

  ws.on("close", () => {
    clearInterval(intervalId);
  });
});

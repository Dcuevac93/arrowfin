import { useEffect, useRef, useState } from "react";
import WebSocketService from "../services/websocket";

const useLevelsWebSocket = <T>(url: string): T[] => {
  const [levels, setLevels] = useState<T[]>([]);
  const wsRef = useRef<WebSocketService | null>(null);

  useEffect(() => {
    wsRef.current = new WebSocketService(url);

    wsRef.current.connect((message) => {
      setLevels((prevLevels) => [...prevLevels, message]);
    });

    return () => {
      wsRef.current?.disconnect();
    };
  }, [url]);

  return levels;
}

export default useLevelsWebSocket;
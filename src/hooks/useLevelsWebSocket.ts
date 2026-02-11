import { useEffect, useRef } from 'react'
import WebSocketService from '../services/websocket'

const useLevelsWebSocket = <TMessage>(url: string, onMessage: (message: TMessage) => void) => {
  const wsRef = useRef<WebSocketService | null>(null)

  useEffect(() => {
    wsRef.current = new WebSocketService(url)

    wsRef.current.connect((message) => {
      onMessage(message as TMessage)
    })

    return () => {
      wsRef.current?.disconnect()
    }
  }, [url, onMessage])
}

export default useLevelsWebSocket
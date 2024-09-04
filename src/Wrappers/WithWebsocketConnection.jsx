import React, { useState, useEffect, useRef } from 'react';
import { getUserToken } from '../Components/Bujji/Functions/localStorage';

const token = getUserToken()

const WithWebsocketConnection = (WrappedComponent) => {
    return (props) => {
        const ws = useRef(null);
        const [isConnected, setIsConnected] = useState(false);
        const [latestResponse, setLatestResponse] = useState(null);

        const sendQuery = (query) => {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                ws.current.send(JSON.stringify(query));
            }
        };

        // Function to setup the WebSocket connection and define event handlers
        const setupWebSocket = () => {
            ws.current = ws.current || new WebSocket(`ws://127.0.0.1:8000/ws/chat?token=${token}`);

            ws.current.onopen = () => {
                console.log("WebSocket connected!");
                setIsConnected(true);
            };

            ws.current.onmessage = (event) => {
                const data = JSON.parse(event.data);
                setLatestResponse(prev => ({ ...data }));
            };

            ws.current.onerror = (event) => {
                console.error("WebSocket error observed:", event);
            };

            ws.current.onclose = (event) => {
                console.log(`WebSocket is closed now`);
            };
        };

        useEffect(() => {
            setupWebSocket();
            return () => {
                if (ws.current.readyState === WebSocket.OPEN) {
                    ws.current.close();
                    setIsConnected(false);
                }
            };
        }, []);
        return (
            <WrappedComponent {...props} isConnected={isConnected} sendQuery={sendQuery} latestResponse={latestResponse} />
        )
    }
}

export default WithWebsocketConnection
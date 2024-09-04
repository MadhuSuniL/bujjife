import React, { useState, useEffect, useRef } from 'react';
import { getUserToken } from '../Components/Bujji/Functions/localStorage';
import { addNewResponse, addNewResponseChunk } from '../redux/Slice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const token = getUserToken()

const WithWebsocketConnection = (WrappedComponent) => {
    return (props) => {
        const ws = useRef(null);
        const { topic_id } = useParams()
        const topicId = topic_id || 'all'
        const dispatch = useDispatch()
        const [isConnected, setIsConnected] = useState(false);
        const [isLoading, setIsLoading] = useState(false);
        const [isStreaming, setIsStreaming] = useState(false);
        const setNewResponseChunk = (newResponseChunk, topicId) => dispatch(addNewResponseChunk({ newResponseChunk, topicId }))

        const sendQuery = (query) => {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                setIsLoading(true)
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
                if (data.content === '<start>') {
                    setIsStreaming(true)
                    setIsLoading(false)
                }
                else if (data.content === '<end>') {
                    setIsStreaming(false)
                }
                else {
                    setNewResponseChunk(data, topicId)
                };
            }

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
            <WrappedComponent
                {...props}
                isConnected={isConnected}
                isLoading={isLoading}
                isStreaming={isStreaming}
                sendQuery={sendQuery}
            />
        )
    }
}

export default WithWebsocketConnection
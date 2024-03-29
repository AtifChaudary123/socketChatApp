import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:3001')

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3001'); // Replace with your server URL

    setSocket(newSocket);

    /* return () => {
      newSocket.disconnect();
    }; */
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};

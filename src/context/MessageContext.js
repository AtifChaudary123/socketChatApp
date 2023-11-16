import React, { createContext, useContext, useState } from 'react';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [newMessage, setMessage] = useState([]);

  const selectMessage = (message) => {
    setMessage(message);
  };

  return (
    <MessageContext.Provider value={{ newMessage, selectMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageContext = () => {
  return useContext(MessageContext);
};
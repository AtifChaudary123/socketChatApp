import React, { createContext, useContext, useState } from 'react';
import axios from "axios";

const UserContext = createContext();
const items = JSON.parse(localStorage.getItem('items'));

export const UserProvider = ({ children }) => {
  const [sUser, setUser] = useState({});
  const [aMessages, setMessages] = useState([]);
  const [aNewMessages, setNewMessages] = useState([]);

  const selectUser = async (user) => {
    setUser(user);
    try {
      const data = {
        receiver_id: user.id,
      };

      const headers = {
        Authorization: `Bearer ${items.token}`,
      };
      const response = await axios.post('http://127.0.0.1:8000/api/v1/message', data, { headers });

      if (response?.status === 200) {
        let allMessages = response?.data?.data;
        setMessages(allMessages)
        console.log("context message", allMessages);
      }
    } catch (error) {
      console.log("context message", error);
    }
  };

  const selectNewMessages = (message) => {
    setNewMessages(message);
  };

  return (
    <UserContext.Provider value={{ sUser, aMessages, aNewMessages, selectUser, setMessages, selectNewMessages }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
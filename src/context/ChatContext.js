import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
//import { useSocket } from "../context/SocketContext";
// import io from "socket.io-client";

const ChatContext = createContext();
const items = JSON.parse(localStorage.getItem("items"));

export const ChatProvider = ({ children }) => {
  // const socket = io("http://localhost:3001");
  //const socket = useSocket();
  const [sUser, setUser] = useState({});
  const [allMessages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState([]);

  const selectUser = async (user) => {
    setUser(user);
    try {
      const data = {
        receiver_id: user.id,
      };

      const headers = {
        Authorization: `Bearer ${items.token}`,
      };
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/message",
        data,
        { headers }
      );

      if (response?.status === 200) {
        let allMessages = response?.data?.data;
        setMessages(allMessages);
        console.log("context message", allMessages);
      }
    } catch (error) {
      console.log("context message", error);
    }
  };

  const selectMessages = (message) => {
    setMessages([...allMessages, message]);
  };

  const selectNewMessages = (message) => {
    setNewMessages(message);
  };

  return (
    <ChatContext.Provider
      value={{
        sUser,
        allMessages,
        newMessages,
        selectUser,
        selectMessages,
        selectNewMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(ChatContext);
};

import React, { useEffect } from "react";
import User from "../component/User";
import Message from "../component/Message";
import { useUserContext } from '../context/UserContext';
import { useMessageContext } from '../context/MessageContext';
import io from 'socket.io-client';

export default function Chat() {
  const { sUser, selectNewMessages } = useUserContext();
  const { newMessage, selectMessage } = useMessageContext();
  const socket = io('http://localhost:3001');

  useEffect(() => {
    socket.emit("sendChatToClient", {message: newMessage});

    /* return () => {
      socket.disconnect();
    }; */
  }, [newMessage]);

  useEffect(() => {
    socket.on('sendChatToServer', (newMessage) => {
      console.log("socket receuive", newMessage);
      selectNewMessages(newMessage);
    });
  }, [socket]);

  return (
    <>
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex h-full w-full overflow-x-hidden">
            <User />
            {Object.keys(sUser).length > 0 && <Message />}
        </div>
      </div>
    </>
  );
}

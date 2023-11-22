import React, { useEffect, useState, useRef } from "react";
import { useChatContext } from "../context/ChatContext";
//import { useSocket } from "../context/SocketContext";
import axios from "axios";
import { toast } from "react-toastify";
import io from "socket.io-client";
const socket = io("http://localhost:3001");

const items = JSON.parse(localStorage.getItem("items"));

//console.log("socket", socket.id);
export default function Message() {
  // const socket = useSocket();
  const { sUser, allMessages, selectMessages } = useChatContext();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  let authUser = JSON.parse(localStorage.getItem("items"));

  const handleTextAreaChange = (e) => {
    setMessage(e.target.value);
    socket.emit("typing", {
      from_user_id: items.id,
      to_user_id: sUser.id,
      chat_message: e.target.value,
    });
  };

  useEffect(() => {
    // Scroll to the end when messages are updated
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages(allMessages);
  }, [allMessages]);

  useEffect(() => {
    //console.log("Socket in useEffect:", socket, allMessages);

    /* socket.on('roomConnection', (data) => {
      console.log('data', data)
      socket.roomId = data.roomId
    }) */

    socket.on("sendChatToServer", (data) => {
      console.log("socket receuive", data);
      selectMessages(data);

      /* if (!allMessages.some((item) => item.id === data.id)) {
        selectMessages(data);
        // if (data.from === socket.id) {
        //   selectMessages(data);
        // } 
      } */
    });
  }, [socket, messages]);

  const scrollToBottom = () => {
    // Using current to access the DOM element
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth',  });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        from_user_id: items.id,
        to_user_id: sUser.id,
        chat_message: message,
      };

      const headers = {
        Authorization: `Bearer ${items.token}`,
      };
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/send-message",
        data,
        { headers }
      );

      if (response?.status === 201) {
        socket.emit("sendChatToClient", {
          ...response.data.data,
          to: socket.roomId,
        });
        setMessage("");
        //selectMessages(data);
      } else {
        toast.warning("warning", response?.status);
      }
    } catch (error) {
      let data = error.response?.data;
      let msg = data?.errors ? data?.errors : error;

      toast.error(msg);
      Object.keys(data?.errors).forEach((field) => {
        const firstError = data?.errors[field][0];
        toast.error(`${firstError}`);
      });
    }
  };

  return (
    <>
      <div className="flex flex-col flex-auto h-full p-6">
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
          <div className="flex flex-col h-full overflow-x-auto mb-4">
            <div className="flex flex-col h-full">
              <div className="grid grid-cols-12 gap-y-2">
                {/* {console.log("All Message final result", allMessages)} */}
                {messages?.map((message) => {
                  const isSender = message.from_user_id === authUser.id;
                  const messageClass = isSender
                    ? "col-start-6 col-end-13"
                    : "col-start-1 col-end-8";
                  const bgColorClass = isSender
                    ? "mr-3 bg-indigo-100"
                    : "ml-3 bg-white";
                  const msgSideClass = isSender
                    ? "items-center justify-start flex-row-reverse"
                    : "flex-row items-center";

                  return (
                    <>
                      <div
                        key={message.id}
                        className={`${messageClass} p-3 rounded-lg`}
                      >
                        <div className={`flex ${msgSideClass}`}>
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            {message.from_user_id}
                          </div>
                          <div
                            className={`relative ml-3 text-sm ${bgColorClass} py-2 px-4 shadow rounded-xl`}
                          >
                            <div>{message.chat_message}</div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
            <div className="flex-grow ml-4">
              <div className="relative w-full">
                <input
                  type="text"
                  id="messageInput"
                  className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                  value={message}
                  onChange={handleTextAreaChange}
                />
              </div>
            </div>
            <div className="ml-4">
              <button
                className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                onClick={submit}
              >
                <span>Send</span>
                <span className="ml-2">
                  <svg
                    className="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

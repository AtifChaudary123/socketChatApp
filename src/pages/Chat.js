import React from "react";
import User from "../component/User";
import Message from "../component/Message";
import { useChatContext } from '../context/ChatContext';

export default function Chat() {
  const { sUser } = useChatContext();

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

import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/Login";
import ChatPage from "./pages/Chat";
import RootLayout from "./pages/Root";
import Toaster from "./component/Toaster";
import { ChatProvider } from "./context/ChatContext";
import { SocketProvider } from "./context/SocketContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <SocketProvider>
      <RootLayout />
      // </SocketProvider>
    ),
    children: [
      { path: "/", element: <LoginPage /> },
      {
        path: "/chat",
        element: (
          // <SocketProvider>
          <ChatProvider>
            <ChatPage />
          </ChatProvider>
          // </SocketProvider>
        ),
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/Login";
import ChatPage from "./pages/Chat";
import RootLayout from "./pages/Root";
import Toaster from "./component/Toaster";
import { UserProvider } from './context/UserContext';
import { MessageProvider } from "./context/MessageContext";

const router = createBrowserRouter([
  { 
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <LoginPage />},
      { path: '/chat', element: 
      <UserProvider>
        <MessageProvider>
        <ChatPage />
        </MessageProvider>
      </UserProvider>}
    ]
  }
])

export default function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}
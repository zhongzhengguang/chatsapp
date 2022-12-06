import React from "react";
import Sidebar from "../components/Sidebar";
import ChatroomComponents from "../components/ChatroomComponents";
export default function chatroom() {
  return (
    <div className=" flex bg-black h-[100%] w-screen">
      <Sidebar />
      <ChatroomComponents />
    </div>
  );
}

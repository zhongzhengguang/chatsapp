import React, { useContext } from "react";
import { BsCameraVideoFill } from "react-icons/bs";
import { BsPersonPlusFill } from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
function ChatroomComponent() {
  const { data } = useContext(ChatContext);
  return (
    <div className=" w-full ">
      <div className="text-white p-2  border-b h-[10vh] border-gray-600">
        <div className=" flex justify-between items-center ">
          <div className=" text-2xl text-gray-500 p-5">
            {data.user?.displayName}
          </div>
          <div className=" flex space-x-5 h-[10vh] w-[15vh] ">
            <BsCameraVideoFill className="w-full h-full " />
            <BsPersonPlusFill className="w-full h-full " />
            <BiDotsHorizontalRounded className="w-full h-full " />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between h-full">
        <Messages />
        <Input />
      </div>
    </div>
  );
}

export default ChatroomComponent;

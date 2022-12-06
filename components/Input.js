import React, { useContext, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { v4 as uuid } from "uuid";
import {
  arrayUnion,
  Timestamp,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

function Input() {
  const [text, setText] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  console.log(text);
  const handleSend = async () => {
    if (text)
      try {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text: text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
        await updateDoc(doc(db, "usersChats", currentUser.uid), {
          [data.chatId + ".lastmessage"]: {
            text: text,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });
        setText("");
      } catch (err) {}
  };
  return (
    <div className="text-white border-t h-[30vh] bg-gray-1000 ">
      <div className=" flex items-center p-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder=" Enter a message"
          className="flex items-center p-5 border-none outline-none w-full bg-black"
        />
        <div className=" flex w-[10vh] space-x-10 justify-between h-[5vh]">
          <button onClick={handleSend}>
            <IoMdSend className="w-full h-full " />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Input;

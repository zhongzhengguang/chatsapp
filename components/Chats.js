import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from "../context/ChatContext";

function Chats() {
  const router = useRouter();
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, "usersChats", currentUser.uid),
        (doc) => {
          setChats(doc.data());
        }
      );
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const EnterChatRoomAndhandleSelect = (user) => {
    router.push("/chatroom");
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  // change Object to an array

  if (Object.entries(chats))
    return (
      <div className="cursor-pointer hover:bg-gray-400 rounded-md">
        {Object?.entries(chats).map((chat) => (
          <div
            className="mt-5 flex space-x-5 "
            key={chat[0]}
            onClick={() => EnterChatRoomAndhandleSelect(chat[1].userInfo)}
          >
            <img
              src={chat[1].userInfo.photoURL}
              className="rounded-full h-14"
            />
            <div>
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1]?.lastmessage?.text}</p>
            </div>
          </div>
        ))}
      </div>
    );
}

export default Chats;

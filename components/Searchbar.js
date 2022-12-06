import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
function Searchbar() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    // check whether the group (chast in firestore) exists , if not create
    // =  檢查組（firestore 中的 chast）是否存在，如果不存在則創建
    // combined = 組合
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const chats = await getDoc(doc(db, "chats", combinedId));
      if (!chats.exists()) {
        // create a chat in chats collection  = 在聊天集合中創建聊天
        await setDoc(doc(db, "chats", combinedId), {
          messages: [],
        });
        await updateDoc(doc(db, "usersChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "usersChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}
    setUser(null);
    setUsername("");
  };

  return (
    <div className=" border-b pb-5 border-gray-600 ">
      <div className="w-full">
        <div className="flex h-20 items-center">
          <input
            onKeyDown={handleKey}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="find a user"
            className="flex items-center p-5 border-none outline-none w-full bg-black"
            value={username}
          />
        </div>
        {user?.displayName == username ? (
          <div
            onClick={handleSelect}
            className="mt-5 flex space-x-5 hover:bg-gray-500 cursor-pointer"
          >
            <div className=" w-10 h-10 ">
              <img src={user.photoURL} alt="" className=" rounded-full" />
            </div>
            <div>
              <span>{user.displayName}</span>
              <p>hello</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Searchbar;

import React, { useContext } from "react";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import Chats from "./Chats";
import { AuthContext } from "../context/AuthContext";
function Sidebar() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="w-[40ch] h-screen text-white border-r border-gray-500 p-2">
      <div className=" flex justify-between p-5 border-b border-gray-500 items-center">
        {currentUser && (
          <img
            src={currentUser.photoURL}
            alt="/"
            className="rounded-full h-12"
          />
        )}
        <p>{currentUser.displayName}</p>
        <Navbar className="text-white " />
      </div>
      <Searchbar />
      <Chats />
    </div>
  );
}

export default Sidebar;

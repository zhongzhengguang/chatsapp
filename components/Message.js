import React, { useContext } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  return (
    <div className=" p-2 w-full">
      {message.senderId === data.user.uid ? (
        <div className="p-2 flex items-start">
          <div className="">
            <div className="w-10 h-10">
              <img
                className=" rounded-full"
                src={
                  message.senderId === currentUser.uid
                    ? currentUser.photoURL
                    : data.user.photoURL
                }
                alt="/"
              />
            </div>
          </div>
          <div className=" flex items-end space-x-2">
            <p className=" bg-green-300 rounded-xl items-center flex p-2 ml-5 h-11">
              {message.text}
            </p>
            <span className=" text-gray-500 text-sm">just now</span>
          </div>
        </div>
      ) : (
        <div className="p-2 flex justify-end space-x-3 ">
          <div className=" flex items-end space-x-2">
            <span className=" text-gray-500 text-sm">just now</span>
            <p className=" bg-green-300 rounded-xl items-center flex p-2 ml-5 h-11">
              {message.text}
            </p>
          </div>
          <div className="w-10 h-10 ">
            <img
              className=" rounded-full"
              src={
                message.senderId === currentUser.uid
                  ? currentUser.photoURL
                  : data.user.photoURL
              }
              alt="/"
            />
          </div>
        </div>
      )}
    </div>
    // <div className=" p-2 flex items-start">
    //   <div className="w-10 h-10">
    //     <img
    //       className=" rounded-full"
    //       src={
    //         message.senderId === currentUser.uid
    //           ? currentUser.photoURL
    //           : data.user.photoURL
    //       }
    //       alt="/"
    //     />
    //   </div>
    //   <div className=" flex items-end space-x-2">
    //     <p className=" bg-green-300 rounded-xl items-center flex p-2 ml-5 h-11">
    //       {message.text}
    //     </p>
    //     <span className=" text-gray-500 text-sm">just now</span>
    //   </div>
    // </div>
  );
}

export default Message;

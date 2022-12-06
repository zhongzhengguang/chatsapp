import React from "react";
import { BiLogIn } from "react-icons/bi";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
function Register() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  return (
    <div className=" grid items-center h-[100vh] w-full justify-center bg-black">
      <div className="flex flex-col border shadow-2xl p-10 w-full text-white">
        <div className="h-[20vh] w-[30vh]">
          <BiLogIn className="w-full h-full text-white" />
        </div>
        <form className=" flex flex-col space-y-4">
          <input
            className="flex items-center p-5 border-b outline-none w-full bg-black"
            placeholder="displayName"
            type="text"
          />
          <input
            className="flex items-center p-5 border-b outline-none w-full bg-black"
            placeholder="email"
            type="email"
          />
          <input
            className="flex items-center p-5 border-b outline-none w-full bg-black"
            placeholder="password"
            type="text"
          />
        </form>
        <button
          onClick={() => signInWithGoogle()}
          className="mt-10 border rounded-lg w-full p-2 h-10 hover:scale-105 ease-in  duration-300 "
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Register;

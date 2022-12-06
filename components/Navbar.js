import React from "react";
import { GrLogout } from "react-icons/Gr";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
function Navbar() {
  const [user, loading, error] = useAuthState(auth);
  const SignOut = () => {
    auth.signOut();
  };
  return (
    <div>
      <div className="h-[3vh] w-[5]">
        <GrLogout
          onClick={SignOut}
          className="text-white w-full h-full hover:scale-150 ease-in  duration-300 "
        />
      </div>
    </div>
  );
}

export default Navbar;

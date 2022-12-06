import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "../firebase";
import Register from "./register";
import Loading from "./loading";
import { useEffect } from "react";
import { setDoc, doc, getDoc, Timestamp } from "firebase/firestore";
import { AuthContextProvider } from "../context/AuthContext";
import { ChatContextProvider } from "../context/ChatContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const createUsersAndUsersChats = async () => {
      if (user) {
        try {
          await setDoc(doc(db, "users", user.uid), {
            displayName: user.displayName,
            email: user.email,
            lastSeen: Timestamp.now(),
            photoURL: user.photoURL,
            uid: user.uid,
          });
          const createUsersChats = await getDoc(
            doc(db, "usersChats", user.uid)
          );
          if (!createUsersChats.exists()) {
            await setDoc(doc(db, "usersChats", user.uid), {});
          }
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    };
    createUsersAndUsersChats();
  }, [user]);

  if (loading) return <Loading />;
  if (!user) return <Register />;
  if (user)
    return (
      <AuthContextProvider>
        <ChatContextProvider>
          <Component {...pageProps} />
        </ChatContextProvider>
      </AuthContextProvider>
    );
}

export default MyApp;

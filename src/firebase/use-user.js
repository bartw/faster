import { useState, useEffect } from "react";
import useFirebase from "./use-firebase";

const useUser = () => {
  const firebase = useFirebase();
  const [user, setUser] = useState(firebase.getUser());

  useEffect(
    () =>
      firebase.auth.onAuthStateChanged(user => {
        setUser(user ? user : null);
      }),
    [firebase]
  );

  return user;
};

export default useUser;

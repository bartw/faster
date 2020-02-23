import React from "react";
import { useFirebase } from "./firebase";

const LogOutButton = () => {
  const firebase = useFirebase();

  return (
    <button type="button" onClick={() => firebase.logOut()}>
      Log out
    </button>
  );
};

export default LogOutButton;

import { useState } from "react";
import Swal from "sweetalert2";
import FirebaseAuthentication from "./../firebase/firebaseinit/firebaseinit";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
FirebaseAuthentication();
const UseFirebase = () => {
  const [loader, setLoader] = useState(true);

  //   const location = useLocation();
  //   const history = useHistory();
  //   const redirect = location.state?.from || "/";
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const googleSign = () => {
    return signInWithPopup(auth, provider);
  };
  onAuthStateChanged(auth, (user) => {
    if (user) {
      //   console.log("onouth", user);
      setUser(user);
    } else {
      setUser("");
    }
  });
  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Successfully LogOut",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const loginWithEmailAndPass = (email, password) => {
    setLoader(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  return {
    googleSign,
    user,
    error,
    logOut,
    setUser,
    setError,
    loginWithEmailAndPass,
  };
};

export default UseFirebase;

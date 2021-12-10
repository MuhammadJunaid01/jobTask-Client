import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import FirebaseAuthentication from "./../firebase/firebaseinit/firebaseinit";
import { useLocation } from "react-router";
import { useHistory } from "react-router";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
FirebaseAuthentication();
const UseFirebase = () => {
  const [loader, setLoader] = useState(true);
  const [admin, setAdmin] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const redirect = location.state?.from || "/";
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const googleSign = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        const email = user.email;
        const displayName = user.displayName;
        googleUserSave(email, displayName);
        history.push(redirect);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
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
  const regesterWithEmail = (email, password, name) => {
    setLoader(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const newUser = { email, displayName: name };
        setUser(newUser);
        const user = userCredential.user;
        saveUser(email, name, "POST");
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {});
        setUser(user);
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        // ..
      })
      .finally(() => {
        setLoader(false);
      });
  };
  const saveUser = (email, displayName, method) => {
    console.log("called ");
    const user = { email, displayName };
    fetch("http://localhost:5000/users", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
  };
  const googleUserSave = (email, displayName) => {
    console.log("called google");
    const user = { email, displayName };
    fetch("http://localhost:5000/users", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
  };
  useEffect(() => {
    fetch(`http://localhost:5000/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setAdmin(data.admin);
      });
  }, [user.email]);
  return {
    googleSign,
    user,
    error,
    logOut,
    setUser,
    setError,
    loginWithEmailAndPass,
    regesterWithEmail,
    admin,
  };
};

export default UseFirebase;

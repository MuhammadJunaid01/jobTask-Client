import { initializeApp } from "firebase/app";
import firebaseConfig from "./../firebaseconfig";
const FirebaseAuthentication = () => {
  return initializeApp(firebaseConfig);
};
export default FirebaseAuthentication;

import { auth } from "../../components/firebaseClient";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// Signup
export const emailSignUp = async ({email, password}) => {
  try {
    console.log(email, password)
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Signup Error: ", error.message);
    throw error;
  }
};

// Login
export const emailLogin = async ({email, password}) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Login Error: ", error.message);
    throw error;
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout Error: ", error.message);
    throw error;
  }
};

// Monitor Auth State
export const monitorAuthState = (callback) => {
  onAuthStateChanged(auth, callback);
};

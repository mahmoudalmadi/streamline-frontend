import { auth } from "../../components/firebaseClient";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/navigation"

// Signup
export const emailSignUp = async ({email, password}) => {
  try {
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
export const logout = async (router) => {
  try {
    router.push("/")
    window.location.reload()
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

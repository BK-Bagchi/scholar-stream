//prettier-ignore
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile, signOut } from "firebase/auth";
import { auth, googleProvider } from "./firebase.config";

export const registerUser = async (name, email, password, photoURL) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(result.user, { displayName: name, photoURL });
  return result.user;
};

export const loginUser = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

export const logoutUser = async () => {
  await signOut(auth);
};

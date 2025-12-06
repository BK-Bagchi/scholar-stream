import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
//prettier-ignore
import { loginUser, loginWithGoogle, logoutUser, registerUser } from "../firebase/firebase.auth";
import { AuthAPI } from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const { displayName: name, email, photoURL } = currentUser;
      setUser({ name, email, photoURL });
      setLoading(false);
    });
    setLoading(false);
    return () => unsubscribe();
  }, []);

  const issueJWTToken = async (accessToken) => {
    try {
      const res = await AuthAPI.issueToken({ accessToken });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
  const register = async (name, email, password, photoURL) => {
    const user = await registerUser(name, email, password, photoURL);
    console.log(user);
    await login(email, password);
  };

  const login = async (userEmail, password) => {
    const user = await loginUser(userEmail, password);
    const { accessToken, displayName: name, email, photoURL } = user;
    const res = await issueJWTToken(accessToken);
    const { _id } = res.user;
    localStorage.setItem("token", res.token);
    localStorage.setItem("userId", _id);
    setUser({ _id, name, email, photoURL });
  };

  const googleLogin = async () => {
    const user = await loginWithGoogle();
    const { accessToken, displayName: name, email, photoURL } = user;
    const res = await issueJWTToken(accessToken);
    const { _id } = res.user;
    localStorage.setItem("token", res.token);
    localStorage.setItem("userId", _id);
    setUser({ _id, name, email, photoURL });
  };

  const logout = async () => {
    await logoutUser();
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, googleLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;

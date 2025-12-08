import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
//prettier-ignore
import { loginUser, loginWithGoogle, logoutUser, registerUser } from "../firebase/firebase.auth";
import { AuthAPI, ProfileAPI } from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await ProfileAPI.getUserProfile();
        const { _id, name, email, avatar: photoURL, role } = res.data.profile;
        setUser({ _id, name, email, photoURL, role });
      } catch (error) {
        console.error("Profile fetch failed:", error);
      }

      setLoading(false);
    });

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
    const { _id, role } = res.user;
    localStorage.setItem("token", res.token);
    setUser({ _id, name, email, photoURL, role });
  };

  const googleLogin = async () => {
    const user = await loginWithGoogle();
    const { accessToken, displayName: name, email, photoURL } = user;
    const res = await issueJWTToken(accessToken);
    const { _id, role } = res.user;
    localStorage.setItem("token", res.token);
    setUser({ _id, name, email, photoURL, role });
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

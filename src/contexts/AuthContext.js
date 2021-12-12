import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import setAuthToken from "../utils/setAuthToken";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    loading: true,
    isAuthenticated: false,
    error: null,
    isUpdated: false,
  });

  // State for handling Auth modal
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const handleAuthModalOpen = () => setAuthModalOpen(true);
  const handleAuthModalClose = () => setAuthModalOpen(false);
  // ===================================

  // State for handleing profile auth modal
  const [profileAuthModalopen, setProfileAuthModalOpen] = React.useState(true);
  const handleProfileAuthModalOpen = () => setProfileAuthModalOpen(true);
  const handleProfileAuthModalClose = () => setProfileAuthModalOpen(false);
  // =================================

  // Functionalities for authentification
  // Auth with google
  const googleLogin = async (userData) => {
    try {
      setAuth({
        ...auth,
        user: null,
        loading: true,
        isAuthenticated: false,
        error: null,
        isUpdated: false,
      });
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      const { data } = await axios.post(
        `/api/v1/auth/googlelogin`,
        userData,
        config
      );
      //   Success
      localStorage.setItem("token", data.token);
      setAuth({
        ...auth,
        loading: false,
        isAuthenticated: true,
        user: data.user,
      });
    } catch (error) {
      setAuth({
        ...auth,
        error: error.response.data.message,
      });
      setTimeout(() => {
        setAuth({
          ...auth,
          error: null,
        });
      }, 5000);
    }
  };

  // Auth with facebook
  const facebookLogin = async (userData) => {
    try {
      setAuth({
        ...auth,
        user: null,
        loading: true,
        isAuthenticated: false,
        error: null,
        isUpdated: false,
      });
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      const { data } = await axios.post(
        `/api/v1/auth/facebooklogin`,
        userData,
        config
      );
      //   Success
      localStorage.setItem("token", data.token);
      setAuth({
        ...auth,
        loading: false,
        isAuthenticated: true,
        user: data.user,
      });
    } catch (error) {
      setAuth({
        ...auth,
        error: error.response.data.message,
      });
      setTimeout(() => {
        setAuth({
          ...auth,
          error: null,
        });
      }, 5000);
    }
  };

  // Auth Profile
  const authProfile = async (userData) => {
    try {
      setAuth({
        ...auth,
        error: null,
        isUpdated: false,
      });
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      await axios.post(`/api/v1/profile/`, userData, config);
      //   Success
      setAuth({
        ...auth,
        loading: false,
        isAuthenticated: true,
        isUpdated: true,
      });
      setAuth({
        ...auth,
        isUpdated: false,
      });
    } catch (error) {
      setAuth({
        ...auth,
        error: error.response.data.message,
      });
      setTimeout(() => {
        setAuth({
          ...auth,
          error: null,
        });
      }, 5000);
    }
  };

  // Load user
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      setAuth({
        ...auth,
        user: null,
        loading: true,
        isAuthenticated: false,
        error: null,
        isUpdated: false,
      });
      const { data } = await axios.get(`/api/v1/auth/me`);

      console.log("{}", data);

      setAuth({
        ...auth,
        loading: false,
        isAuthenticated: true,
        user: data.user,
      });
    } catch (error) {
      localStorage.removeItem("token");
      console.log(error.response.data.message);
      setAuth({
        ...auth,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: null,
      });
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await axios.get(`/api/v1/auth/logout`);

      localStorage.removeItem("token");
      setAuth({ ...auth, loading: false, isAuthenticated: false, user: null });
    } catch (error) {
      setAuth({
        ...auth,
        error: error.response.data.message,
      });
      setTimeout(() => {
        setAuth({
          ...auth,
          error: null,
        });
      }, 5000);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    // Auth Modal
    authModalOpen,
    handleAuthModalOpen,
    handleAuthModalClose,
    profileAuthModalopen,
    handleProfileAuthModalOpen,
    handleProfileAuthModalClose,
    setAuthModalOpen,
    setProfileAuthModalOpen,
    // Auth request
    googleLogin,
    facebookLogin,
    loadUser,
    authProfile,
    logout,
    // Auth States
    auth,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

import React, { createContext, useReducer, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
};

const UserContext = createContext(initialState);

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("authToken", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };

    case "LOGOUT":
      localStorage.removeItem("authToken");
      return {
        ...initialState,
        loading: false,
      };

    case "FINISH_LOADING":
      return {
        ...state,
        loading: false,
      };

    case "UPDATE_ADDRESS":
      return {
        ...state,
        user: { ...state.user, address: action.payload },
      };

    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const fetchProfile = async (token) => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch({
          type: "LOGIN",
          payload: {
            token,
            user: {
              id: res.data.user._id,
              name: res.data.user.name,
              email: res.data.user.email,
              role: res.data.user.role,
              address: res.data.user.address,
            },
          },
        });
      } catch (error) {
        console.error("Profile fetch failed:", error);
        dispatch({ type: "LOGOUT" });
      }
    };

    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          dispatch({ type: "LOGOUT" });
          return;
        }
        fetchProfile(token);
      } catch {
        dispatch({ type: "LOGOUT" });
      }
    } else {
      dispatch({ type: "FINISH_LOADING" });
    }
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

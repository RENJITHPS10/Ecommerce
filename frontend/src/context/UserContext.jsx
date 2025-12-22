import React, { createContext, useReducer, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

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

    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);

        if (decoded.exp * 1000 < Date.now()) {
          dispatch({ type: "LOGOUT" });
          return;
        }

        dispatch({
          type: "LOGIN",
          payload: {
            token,
            user: {
              id: decoded.id,
              Name: decoded.Name,
              email: decoded.email,
              role: decoded.role,
            },
          },
        });
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

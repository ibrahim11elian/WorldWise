import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext();

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=kjshf",
};

const initialState = {
  user: null,
  isAuthenticated: false,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    default:
      throw new "Unknown Action Type"();
  }
};

export default function AuthContextProvider({ children }) {
  const [store, setStore] = useLocalStorage("user", initialState);
  const [user, dispatch] = useReducer(userReducer, store);

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({
        type: "LOGIN",
        payload: FAKE_USER,
      });

      setStore({ ...FAKE_USER, isAuthenticated: true });
    }
  }

  function logout() {
    dispatch({ type: "LOGOUT" });

    setStore({ isAuthenticated: false });
  }

  return (
    <AuthContext.Provider value={{ ...user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used inside AuthContext");
  }
  return context;
};

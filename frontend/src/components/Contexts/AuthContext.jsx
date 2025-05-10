import { createContext, useContext, useState } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuth, setisAuth] = useState(false);
  const [user,setuser] = useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken , isAuth , setisAuth , user, setuser }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
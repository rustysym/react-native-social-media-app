import { useEffect, useState } from "react";
import firebase ,{onAuthStateChanged}from "firebase/auth";
import auth from "../config/FirebaseConfig";
import { AuthContext } from "./AuthContext";


export const AuthProvider: React.FC<Children> = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [isLoading,setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true)
    const isLogged =  onAuthStateChanged(auth,(user) => {  
        setUser(user)
        setIsLoading(false)
      })
    return isLogged;
  }, []);
  return <AuthContext.Provider value={{isLoading,user}}>{children}</AuthContext.Provider>;
};
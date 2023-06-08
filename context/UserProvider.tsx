import {useState } from "react";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";
import auth from "../config/FirebaseConfig";
import { UserContext } from "./UserContext";
import { updateProfile } from "firebase/auth/react-native";


export const UserProvider: React.FC<User> = ({ children }) => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [name,setName] = useState("")
    const createAccount = async () => {
        try {
          await createUserWithEmailAndPassword(auth,
            email,
            password
          ).then(async(res)=>{
            const user = res.user;
            await updateProfile(user,{displayName:name})
          });
          
        } catch (error) {
          console.error(error);
        }
      };
      
      const signIn = async () => {
        try {
          await signInWithEmailAndPassword(auth,
            email,
            password
          );
        } catch (error) {
          console.error(error);
        }
      };
      
      const signOut = async () => {
        await auth.signOut();
      };
  return <UserContext.Provider value={{email,password,setEmail,setPassword,createAccount,signIn,signOut,name,setName}}>{children}</UserContext.Provider>;
};
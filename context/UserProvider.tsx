import {useContext, useState} from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import auth, {firestore} from '../config/FirebaseConfig';
import {UserContext} from './UserContext';
import {updateProfile} from 'firebase/auth/react-native';
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import {AuthContext} from './AuthContext';

export const UserProvider: React.FC<User> = ({children}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const {user} = useContext(AuthContext);
  const createAccount = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        async res => {
          const user = res.user;
          await updateProfile(user, {displayName: name});

          const docRef = doc(firestore, 'users', user.uid);
          await setDoc(docRef, {
            fName: '',
            lName: '',
            email: email,
            createdAt: Timestamp.fromDate(new Date()),
            about: '',
            country: '',
            phone: '',
            userImg: null,
          });
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    await auth.signOut();
  };
  const getUser = async () => {
    const refCol = collection(firestore, 'users');
    const refDoc = doc(refCol, `${user?.uid}`);
    await getDoc(refDoc).then(snap => {
      if (snap.exists()) {
        setUserData(snap.data());
      }
    });
  };

  return (
    <UserContext.Provider
      value={{
        email,
        password,
        setEmail,
        setPassword,
        createAccount,
        signIn,
        signOut,
        name,
        setName,
        getUser,
        userData,
        setUserData,
      }}>
      {children}
    </UserContext.Provider>
  );
};

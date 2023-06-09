import {useContext, useState} from 'react';
import {database, firestore, storage} from '../config/FirebaseConfig';
import {PostContext} from './PostContext';

import {AuthContext} from './AuthContext';
import { collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref } from 'firebase/storage';
import { Alert, Text, View } from 'react-native';


interface Types {
  children: React.ReactNode;
  fetchPost?: () => Promise<any>;
  updates?: any;
  deletePost? : (postId:any) => Promise<any>;
}
export const PostProvider: React.FC<Types> = ({children}) => {
  const [posts, setPosts] = useState<Posts[]>();
  const [userPosts, setUserPosts] = useState<Posts[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);
  const {user} = useContext(AuthContext);
  /*const {user} = useContext(AuthContext);
  let userName = user?.displayName;
  let uid = user?.uid;
  const writeUserData = (photos: any, text: string) => {
    const postData = {
      author: userName,
      uid: uid,
      text: text,
      photos: photos,
    };
    const newPostKey = push(child(ref(database), 'posts')).key;
    const updates: {[updates: string]: any} = {};
    updates['/posts/' + uid + newPostKey] = postData;
    return update(ref(database), updates);
  };*/
 
  const fetchPost = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(firestore, 'posts'),
        orderBy('postTime', 'desc'),
      );
       onSnapshot(q, snapshot => {
        const list: any = [];
        snapshot.forEach(async doc => {
          const {post, postImage, postTime, userId} = doc.data();
        await Promise.all(list.push({
            id: doc.id,
            userId: userId,
            userName: user?.displayName,
            postTime: postTime,
            post: post,
            postImage: postImage,
            liked: false,
            likes: 0,
            comments: 0,
          }))
          setPosts(list);
          setLoading(false)
        });
      });
      
    } catch (error) {
      console.log(error);
    }
    
  };
  const fetchUserPosts = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(firestore, 'posts'),
        where('userId', '==', user.uid),
        orderBy('postTime', 'desc'),
      );
       onSnapshot(q, snapshot => {
        const list: any = [];
        snapshot.forEach(async doc => {
          const {post, postImage, postTime, userId} = doc.data();
        await Promise.all(list.push({
            id: doc.id,
            userId: userId,
            userName: user?.displayName,
            postTime: postTime,
            post: post,
            postImage: postImage,
            liked: false,
            likes: 0,
            comments: 0,
          }))
          setUserPosts(list);
          setLoading(false)
        });
      });
      
    } catch (error) {
      console.log(error);
    }
    
  };
  const deletePost = async(postId: any):Promise<any> => {
    const colRef = collection(firestore, 'posts');
    const docRef = doc(colRef,`${postId}`)
    const snap = await getDoc(docRef)
    
    if(snap.exists()){
      const {postImage} = snap.data();

      const storageRef = ref(storage,(postImage))
      if(postImage !== null){
       
        deleteObject(storageRef).then(()=>{
          console.log("image deleted")
          deleteFirestoreData(postId)
        }).catch((e)=>{
          console.log("error",e)
        })
      }
      else{
        console.log("else return")
        deleteFirestoreData(postId)
      }
    }
  };
 const  deleteFirestoreData = (postId:any)=>{
  const colRef = collection(firestore, 'posts');
  const docRef = doc(colRef,postId)
  deleteDoc(docRef).then(()=>{
    Alert.alert("Post Deleted")
    setDeleted(true);
    setIsOpen(false)
  })
 }
  return (
    <PostContext.Provider value={{fetchPost,loading,setLoading,posts,deletePost,setIsOpen,isOpen,deleted,setDeleted,fetchUserPosts,userPosts}}>
      {children}
    </PostContext.Provider>
  );
};

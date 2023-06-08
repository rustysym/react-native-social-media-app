interface Auth{
  children:React.ReactNode
  signIn?:() => void
  signOut?:() => void
  createAccount?:() => void
  email?:string
  password?:string
  setEmail?:React.Dispatch<React.SetStateAction<string>>
  setPassword?:React.Dispatch<React.SetStateAction<string>>
}
interface User{
  children:React.ReactNode
  signIn?:()=> void
  signOut?:()=> void
  createAccount?:()=> void 
  email?:string
  password?:string
  name?:string
 
}

interface Children{
  children:React.ReactNode
}
interface Api {
  id: string
  url: string
};
interface Posts  {
  index?:any,
  id?: string,
  userId?:any,
  userName?: string,
  userImage?: string,
  postTime?: any,
  post?:string,
  postImage?:string | null,
  liked?:boolean,
  likes?:number,
  comments?:number,
  
}

//@env types
declare module '@env' {
  export const FB_API_KEY: string;
  export const FB_PROJECT_ID: string;
  export const FB_APP_ID: string;
  export const FB_MSG_SENDER_ID: string;
  export const FB_STORAGE_BUCKET: string;
  export const FB_MEASUREMENT_ID: string;
  export const FB_DB_URL: string;
  export const FB_AUTH_DOMAIN: string;
}
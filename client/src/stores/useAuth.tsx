// this store is related to anything concerne auth and forms
import {create} from 'zustand'
import axios from '../api/axiosInstance.ts'
export interface Authform {
  IsLoading : boolean,
    user : {
      userId  : string ,
      username  : string , 
      email : string , 
      role  : string , 
      authenticate : boolean
    } | null ,
    SignUpformData: {
      username: string;
      email: string;
      password: string;
    };
    SignInformData: {
      email: string;
      password: string;
    };
    setSignUpFormData : (data : SignUp ) => void ;
    setSignInFormData : (data : SignIn ) => void ;
    hanldeSignUp : (  e : React.FormEvent<HTMLFormElement>) => void;
    hanldeSignIn : (  e : React.FormEvent<HTMLFormElement>) => void;
    checkAuth  : () => void
    Loggout  : () => void
  }
type SignUp = {
    username: string;
    email: string;
    password: string;
}
type SignIn = {
    email: string;
    password: string;
}

export const useAuthData   = create<Authform>((set , get)=> ({
    IsLoading : true,
    user : null,
    SignUpformData :{
        username : '',
        email : '', 
        password : '' 

    }, 
    SignInformData :{
        email : "", 
        password : '' 

    },
    setSignUpFormData : (Form : SignUp) => set({SignUpformData :Form}) , 
    setSignInFormData : (Form : SignIn) => set({SignInformData :Form}) , 
    hanldeSignUp : async (e) => {
        try {
          e.preventDefault()
          const {SignUpformData} = get()
          const {data} = await axios.post('auth/register' , SignUpformData)
          console.log(data);
          
        } catch (error) {
          
        }
    },
    hanldeSignIn : async (e) => {
      try {
        e.preventDefault()
     
        const {SignInformData} = get()
        const {data} = await axios.post('auth/login' , SignInformData)
        if(data.success) { 
          sessionStorage.setItem('accessToken' , JSON.stringify(data.data.accessToken))
          set({user : { ...data.data.user , authenticate : true}})  
        }else{
          set({user : null})  
        }
        
      } catch (error) {
        console.log("while sign in in frontend "+error);
        
    }
  },
  checkAuth : async () => {
    try {
      const {data} = await axios.get('auth/check-auth')
      if(data.success) { 
        
        set({user : { ...data.data.user , authenticate : true} , IsLoading : false})  
      }else{
        set({user : null})  
      }
      
      
    } catch (error ) {
      console.log("while check auth in frontend "+error);
      if(!error?.response?.data?.success){
        set({user : null , IsLoading : false})  
      }
      
    }
  },
  Loggout : () => {
    try {
      set({user:null})
      sessionStorage.removeItem('accessToken')
    } catch (error) {
      console.log("while check auth in frontend "+error);
    }
  }
   
    
}))
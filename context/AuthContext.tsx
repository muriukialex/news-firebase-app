"use client"

import { auth } from "@/lib/firebase/firebase"
import type { User } from "firebase/auth"
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useLayoutEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signOutUser } from "@/lib/firebase/firestore/firestore"

type UserState = {
    user: User | null
    isLoggedIn: boolean
}

type ContextProps = {
  user: UserState | null
  setUser: Dispatch<SetStateAction<UserState | null>>
  handleSignOut: () => void
}

const AuthContext = createContext({} as ContextProps)

const initialState = {
  user:null,
  isLoggedIn:false
}
const setUserInLocalStorage = ({user, isLoggedIn}: {user: User | null, isLoggedIn: boolean}) => {
  const userData = {user, isLoggedIn}
  if (typeof window !== "undefined") {
    // client
    localStorage.setItem("user", JSON.stringify(userData))
  }
}


const getUserFromLocalStorage = (): UserState | null => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser) : initialState
  }
  return null
}


const AuthProvider = ({ children }: {children: ReactNode}) =>{
  const { push } = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<UserState | null>(getUserFromLocalStorage)

  const handleSignOut = () =>{
    signOutUser()
    return push("/")
  }

  useEffect(()=>{
    const subscribe = auth.onAuthStateChanged((userState)=>{
      setUser({isLoggedIn: userState ? true : false, user: userState})
      setUserInLocalStorage({user: userState, isLoggedIn: userState ? true : false})
      setLoading(false)
    })
    return subscribe
  },[])

  useLayoutEffect(() =>{
    if(user?.isLoggedIn){
      push("/home")
    } else{
      push("/")
    }
    
  }, [push, user?.isLoggedIn])

  const contextValue = {
    user,
    setUser,
    handleSignOut,
  }

  if(!user){
    return <div className="h-screen flex w-full justify-center items-center">Loading...</div>
  }


  return (
    <AuthContext.Provider value={contextValue}>
      {user.isLoggedIn ?  children : null}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthProvider
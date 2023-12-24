"use client"

import AuthProvider from "@/context/AuthContext"
import ArticleProvider from "@/context/ArticleContext"
import { useRouter } from "next/navigation"
import { signOutUser } from "@/lib/firebase/firestore/firestore"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { push } = useRouter()
  const handleSignOut = () =>{
    signOutUser()
    return push("/")
  }

  return (
    <AuthProvider>
      <ArticleProvider>
        <div className="fixed right-6 top-7">
          <button className="p-2 border-none bg-red-900" onClick={()=> handleSignOut()}>Sign out!</button>
        </div>
        {children}
      </ArticleProvider>
    </AuthProvider>
  )
}

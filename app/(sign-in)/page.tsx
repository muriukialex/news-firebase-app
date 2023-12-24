"use client"

import { ButtonStatusType, UserDataType, SignInSignUpErrorResponse } from "@/types"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { signInUser } from "@/lib/firebase/firestore/firestore"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const SignInPage = () =>{
  const {push} = useRouter()
  const [buttonState, setButtonState] = useState<ButtonStatusType>({
    status: "idle"
  })
  const {register, handleSubmit, formState: {errors}} = useForm<UserDataType>()

  const handleUserSignInForm = async (data: UserDataType) =>{
    setButtonState({
      status: "processing"
    })

    try {
      // sign in user
      const result = await signInUser(data)

      if("user" in result) {
        toast.success("Sign in was a success!")
        push("/home")
      } else if (result.errorMessage) {
        toast.error(result.errorMessage)

        setButtonState({
          status: "idle"
        })
      }

    } catch (error) {
      console.error(error)
      toast.error("An unknown error occurred.")

      setButtonState({
        status: "idle"
      })
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>News Aggregator</h1>
      <header>
            Sign In
      </header>
      <form className="w-1/2" onSubmit={handleSubmit(handleUserSignInForm)}>
        <div className="flex flex-col mb-3">
          <label htmlFor="email">Enter Email</label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="b-2 p-3 border-white text-black" 
            id="email" 
            {...register("email", { required: true })}/>
          {errors.email && (
            <span className="mt-2 mb-2 text-red-600">Email is required</span>
          )}
        </div>

        <div className="flex flex-col mb-3">
          <label htmlFor="password">Enter password</label>
          <input type="password" 
            placeholder="Enter your password" 
            className="b-2 p-3 border-white text-black" 
            id="password" 
            {...register("password", { required: true })} />
          {errors.password && (
            <span className="mt-2 mb-2 text-red-600">A password is required</span>
          )}
        </div>
                
        <div>
          <button onClick={handleSubmit(handleUserSignInForm)} className="bg-blue-600 p-2 rounded mt-4">
            {buttonState.status === "idle" ? "Sign In": "Processing..."}
          </button>
        </div>

        <div className="mt-4 underline">
          <Link href={"/sign-up"}>Create an account</Link>
        </div>
      </form>
    </div>
  )
}

export default SignInPage
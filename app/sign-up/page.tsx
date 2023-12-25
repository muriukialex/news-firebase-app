"use client"

import { ButtonStatusType, UserDataType } from "@/types"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { signUpUser } from "@/lib/firebase/firestore/firestore"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const SignUpPage = () => {
  const {push} = useRouter()
  const [buttonState, setButtonState] = useState<ButtonStatusType>({
    status: "idle"
  })
  const {register, handleSubmit, formState: {errors}} = useForm<UserDataType>()

  const handleUserSignUpForm = async (data: UserDataType) =>{
    console.log("data", data)
    setButtonState({
      status: "processing"
    })
    try {
      // sign up user
      const result = await signUpUser(data)

      console.log("result", result)

      if("user" in result) {
        toast.success("Sign up was a success!")
        push("/home")
        return
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
            Sign Up 
      </header>
      <form className="w-4/5 md:w-1/3 mb-60" onSubmit={handleSubmit(handleUserSignUpForm)}>
        <div className="flex flex-col mb-3">
          <label htmlFor="email">Enter Email</label>
          <input 
            type="email" 
            placeholder="Enter an email" 
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
            placeholder="Enter a password" 
            className="b-2 p-3 border-white text-black" 
            id="password" 
            {...register("password", { required: true })} />
          {errors.password && (
            <span className="mt-2 mb-2 text-red-600">A password is required</span>
          )}
        </div>
                
        <div>
          <button onClick={handleSubmit(handleUserSignUpForm)} className="bg-blue-600 p-2 rounded mt-4">
            {buttonState.status === "idle" ? "Sign Up": "Processing..."}
          </button>
        </div>

        <div className="mt-4 underline">
          <Link href={"/"}>Already have an account? Sign In</Link>
        </div>
      </form>
    </div>
  )
}

export default SignUpPage
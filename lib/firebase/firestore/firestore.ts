import { addDoc, collection, getDocs, query } from "firebase/firestore"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { db, auth } from "../firebase"
import type { NewsArticlesData, UserDataType, SignInSignUpErrorResponse } from "@/types"

export const signUpUser = async (data: UserDataType): Promise<SignInSignUpErrorResponse> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, data.email, data.password)
    return {
      user: result
    }
  } catch (error) {
    console.error(error)
    const errorResponse = error as {
        message: string
    }
    return {
      errorMessage: errorResponse.message
    }
  }  
}

export const signInUser = async (data: UserDataType): Promise<SignInSignUpErrorResponse> =>{
  try {
    const result = await signInWithEmailAndPassword(auth, data.email, data.password)
    return {
      user: result
    }
  } catch (error) {
    console.error(error)
    const errorResponse = error as {
        message: string
    }
    return {
      errorMessage: errorResponse.message
    }
  }  
}

export const signOutUser = async () =>{
  return await signOut(auth)
}

export const addNewsArticleToFavourites = async (data: NewsArticlesData) => {
  if(data === undefined){
    throw new Error("KIndly include news articles data")
  }

  try {
    const payload = {
      ...data,
      liked: true,
    }
    const docRef = await addDoc(collection(db, "favourite_articles"), payload)
    console.log("Document written with ID: ", docRef.id)
    return docRef
  } catch (error) {
    console.error(error)
    return error
  }
}

export const getFavouriteArticles = async () => {
  let q = query (collection(db, "favourite_articles"))
  const results = await getDocs(q) 

  return results.docs.map(result=>{
    return {
      id: result.id,
      ...result.data
    }
  })
}

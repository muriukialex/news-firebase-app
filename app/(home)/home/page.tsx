"use client"

import useNewsData from "@/hooks/useNewsData"
import ArticlesContainer from "@/components/ArticlesContainer"
import LoadingArticles from "@/components/LoadingArticles"
import type { NewsAPIErrorResponse } from "@/types"
import toast from "react-hot-toast"

const HomePage = () => {
  const { isLoading, data, error, mutate } = useNewsData()

  if(isLoading){
    return <LoadingArticles />
  }

  if(error){
    const errorMessage = error as NewsAPIErrorResponse
    toast.error(errorMessage.message)
    return (
      <div className="flex justify-center mt-[25%]">
        <button onClick={() => mutate()} className="p-2 border-none bg-cyan-800">Refetch news articles</button>
      </div>
    )}

  return (
    <div className="container mx-auto p-4">
      <ArticlesContainer articles={data?.data.articles} />
    </div>
  )
}

export default HomePage
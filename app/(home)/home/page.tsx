"use client"

import useNewsData from "@/hooks/useNewsData"
import ArticlesContainer from "@/components/ArticlesContainer"
import LoadingArticles from "@/components/LoadingArticles"

const HomePage = () => {
  const { isLoading, data, error, mutate } = useNewsData()

  if(isLoading){
    return <LoadingArticles />
  }

  if(error){
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